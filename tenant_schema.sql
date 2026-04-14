-- ================================================================
-- CORE — shops, users, roles
-- ================================================================

CREATE TABLE IF NOT EXISTS core.shops (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    shop_code TEXT NOT NULL UNIQUE,
    -- Short identifier used in invoice/receipt numbers (e.g. "BR1", "MAIN")
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    pincode TEXT,
    phone TEXT,
    gst_number TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_shops_active ON core.shops (is_active)
WHERE
    is_active = TRUE;

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS core.users (
    id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    shop_ids      UUID[]      NOT NULL DEFAULT '{}'::UUID[],
    name          TEXT        NOT NULL,
    phone         TEXT        NOT NULL UNIQUE,
    email         TEXT,
    password      TEXT        NOT NULL,   -- bcrypt hash; never store plaintext
    is_active     BOOLEAN     NOT NULL DEFAULT TRUE,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_users_phone ON core.users (phone);

CREATE INDEX IF NOT EXISTS idx_users_active ON core.users (is_active)
WHERE
    is_active = TRUE;
-- GIN for fast shop membership checks at app layer
CREATE INDEX IF NOT EXISTS idx_users_shop_ids ON core.users USING GIN (shop_ids);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS core.roles (
    id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
    name        TEXT        NOT NULL UNIQUE,
    description TEXT,
    -- { "<feature_key>": { "view": bool, "create": bool, "update": bool, "delete": bool } }
    permissions JSONB       NOT NULL DEFAULT '{}'::JSONB,
    is_system   BOOLEAN     NOT NULL DEFAULT FALSE,
    -- System roles (Admin, Cashier, Manager) cannot be deleted.
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_roles_permissions ON core.roles USING GIN (permissions);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS core.user_roles (
    user_id UUID NOT NULL REFERENCES core.users (id) ON DELETE CASCADE,
    role_id UUID NOT NULL REFERENCES core.roles (id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id),
    -- update_info omitted — junction rows are never updated, only inserted/deleted
    PRIMARY KEY (user_id, role_id)
);

CREATE INDEX IF NOT EXISTS idx_user_roles_user ON core.user_roles (user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_role ON core.user_roles (role_id);

-- ================================================================
-- CATALOG — tax rates, categories, products, price lists
-- ================================================================

CREATE TABLE IF NOT EXISTS catalog.tax_rates (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL UNIQUE, -- e.g. GST 18%
    rate NUMERIC(5, 2) NOT NULL CHECK (
        rate >= 0
        AND rate <= 100
    ),
    tax_type TEXT NOT NULL DEFAULT 'GST' CHECK (
        tax_type IN ('GST', 'TCS', 'TDS')
    ),
    -- GST breakdown
    cgst_rate NUMERIC(5, 2) DEFAULT 0,
    sgst_rate NUMERIC(5, 2) DEFAULT 0,
    igst_rate NUMERIC(5, 2) DEFAULT 0,
    -- pricing behavior
    is_inclusive BOOLEAN NOT NULL DEFAULT FALSE,
    -- usage flags
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS catalog.categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    parent_id UUID REFERENCES catalog.categories (id) ON DELETE SET NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id),
    UNIQUE (parent_id, name)
);

CREATE INDEX IF NOT EXISTS idx_categories_parent ON catalog.categories (parent_id)
WHERE
    parent_id IS NOT NULL;

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS catalog.products (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sku TEXT NOT NULL UNIQUE,
    name TEXT NOT NULL,
    description TEXT,
    category_id UUID REFERENCES catalog.categories (id) ON DELETE SET NULL,
    tax_rate_id UUID REFERENCES catalog.tax_rates (id) ON DELETE RESTRICT,
    tax_inclusive BOOLEAN NOT NULL DEFAULT FALSE,
    unit_id UUID NOT NULL REFERENCES catalog.unit (id),
    barcode TEXT UNIQUE,
    hsn_code TEXT,
    cost_price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (cost_price >= 0),
    base_selling_price NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (base_selling_price >= 0),
    mrp NUMERIC(12, 2) NOT NULL CHECK (mrp >= 0),
    track_inventory BOOLEAN NOT NULL DEFAULT TRUE,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_products_name_trgm ON catalog.products USING GIN (name gin_trgm_ops);

CREATE INDEX IF NOT EXISTS idx_products_barcode ON catalog.products (barcode)
WHERE
    barcode IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_products_sku ON catalog.products (sku);

CREATE INDEX IF NOT EXISTS idx_products_category ON catalog.products (category_id)
WHERE
    category_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_products_active ON catalog.products (is_active)
WHERE
    is_active = TRUE;

-- ────────────────────────────────────────────

CREATE TABLE catalog.units (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    code TEXT NOT NULL,
    category TEXT NOT NULL,
    base_unit_id UUID REFERENCES catalog.units (id),
    conversion_factor NUMERIC(20, 10),
    is_base_unit BOOLEAN DEFAULT FALSE,
    tenant_id UUID, -- NULL = global
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (tenant_id, code),
    UNIQUE (tenant_id, name)
);

-- ================================================================
-- INVENTORY — stock levels, movements
-- ================================================================

CREATE TABLE IF NOT EXISTS inventory.batches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id) ON DELETE RESTRICT,
    product_id UUID NOT NULL REFERENCES catalog.products (id) ON DELETE RESTRICT,
    batch_number TEXT NOT NULL,
    brand_name TEXT,
    barcode TEXT,
    packed_date DATE,
    expiry_date DATE,
    purchase_price NUMERIC(12, 2) NOT NULL CHECK (purchase_price >= 0),
    mrp NUMERIC(12, 2) NOT NULL CHECK (mrp >= 0),
    selling_price NUMERIC(12, 2) NOT NULL CHECK (selling_price >= 0),
    -- SAME KEYS AS PRODUCTS
    tax_rate_id UUID REFERENCES catalog.tax_rates (id),
    tax_inclusive BOOLEAN NOT NULL DEFAULT FALSE,
    quantity NUMERIC(12, 3) NOT NULL DEFAULT 0 CHECK (
        quantity >= reserved_quantity + damaged_quantity + returned_quantity
    ),
    reserved_quantity NUMERIC(12, 3) NOT NULL DEFAULT 0 CHECK (reserved_quantity >= 0),
    damaged_quantity NUMERIC(12, 3) NOT NULL DEFAULT 0 CHECK (damaged_quantity >= 0),
    returned_quantity NUMERIC(12, 3) NOT NULL DEFAULT 0 CHECK (returned_quantity >= 0),
    vendor_id UUID REFERENCES purchasing.vendors (id),
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    -- CONSISTENT NAMING
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id),
    UNIQUE (
        shop_id,
        product_id,
        batch_number
    )
);

CREATE INDEX IF NOT EXISTS idx_inventory_shop ON inventory.batches (shop_id);

CREATE INDEX IF NOT EXISTS idx_inventory_product ON inventory.batches (product_id);

CREATE INDEX IF NOT EXISTS idx_batches_expiry ON inventory.batches (expiry_date);

CREATE INDEX IF NOT EXISTS idx_batches_shop_product ON inventory.batches (shop_id, product_id);

-- ────────────────────────────────────────────
-- Append-only ledger. Never update or delete rows.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS inventory.stock_movements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id),
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    movement inventory.stock_movement NOT NULL,
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity <> 0),
    ref_type TEXT,
    ref_id UUID,
    note TEXT,
    unit_cost NUMERIC(12, 2),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
);

CREATE INDEX IF NOT EXISTS idx_stock_movements_product ON inventory.stock_movements (product_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_stock_movements_shop ON inventory.stock_movements (shop_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_stock_movements_ref ON inventory.stock_movements (ref_type, ref_id)
WHERE
    ref_id IS NOT NULL;

-- Stock Transfer

CREATE TABLE IF NOT EXISTS inventory.stock_transfers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    from_shop_id UUID NOT NULL REFERENCES core.shops (id),
    to_shop_id UUID NOT NULL REFERENCES core.shops (id),
    transfer_number TEXT NOT NULL,
    status TEXT NOT NULL CHECK (
        status IN (
            'draft',
            'shipped',
            'received',
            'cancelled'
        )
    ) DEFAULT 'draft',
    transfer_date DATE NOT NULL DEFAULT CURRENT_DATE,
    shipped_at TIMESTAMPTZ,
    received_at TIMESTAMPTZ,
    notes TEXT,
    created_by UUID REFERENCES core.users (id),
    updated_by UUID REFERENCES core.users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (from_shop_id, transfer_number),
    CHECK (from_shop_id <> to_shop_id)
);

CREATE INDEX IF NOT EXISTS idx_stock_transfers_from_shop ON inventory.stock_transfers (
    from_shop_id,
    transfer_date DESC
);

CREATE INDEX IF NOT EXISTS idx_stock_transfers_to_shop ON inventory.stock_transfers (
    to_shop_id,
    transfer_date DESC
);

CREATE TABLE IF NOT EXISTS inventory.stock_transfer_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    transfer_id UUID NOT NULL REFERENCES inventory.stock_transfers (id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_stock_transfer_lines_transfer ON inventory.stock_transfer_lines (transfer_id);

CREATE INDEX IF NOT EXISTS idx_stock_transfer_lines_product ON inventory.stock_transfer_lines (product_id);

-- ================================================================
-- PURCHASING — vendors, purchases, purchase returns
-- ================================================================

CREATE TABLE IF NOT EXISTS purchasing.vendors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    gst_number TEXT UNIQUE,
    pan_number TEXT,
    is_gst_registered BOOLEAN DEFAULT TRUE,
    phone TEXT,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    postal_code TEXT,
    country TEXT DEFAULT 'India',
    credit_limit NUMERIC(12, 2) DEFAULT 0 CHECK (credit_limit >= 0),
    credit_days INT DEFAULT 0 CHECK (credit_days >= 0),
    bank_name TEXT,
    account_number TEXT,
    ifsc_code TEXT,
    upi_id TEXT,
    vendor_type TEXT CHECK (
        vendor_type IN ('SUPPLIER', 'SERVICE', 'BOTH')
    ) DEFAULT 'SUPPLIER',
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_vendors_active ON purchasing.vendors (is_active)
WHERE
    is_active = TRUE;

CREATE INDEX IF NOT EXISTS idx_vendors_name_trgm ON purchasing.vendors USING GIN (name gin_trgm_ops);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchasing.purchases (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id),
    vendor_id UUID REFERENCES purchasing.vendors (id),
    purchase_number TEXT NOT NULL,
    status purchasing.purchase_status NOT NULL DEFAULT 'draft',
    purchase_date DATE NOT NULL DEFAULT CURRENT_DATE,
    vendor_invoice_no TEXT,
    vendor_invoice_date DATE,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    cgst_amount NUMERIC(12, 2) DEFAULT 0,
    sgst_amount NUMERIC(12, 2) DEFAULT 0,
    igst_amount NUMERIC(12, 2) DEFAULT 0,
    freight NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (freight >= 0),
    additional_charges NUMERIC(12, 2) NOT NULL DEFAULT 0,
    other_costs NUMERIC(12, 2) NOT NULL DEFAULT 0,
    total_landed_cost NUMERIC(14, 2) NOT NULL DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    paid_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
    due_amount NUMERIC(14, 2) GENERATED ALWAYS AS (total_amount - paid_amount) STORED,
    currency TEXT DEFAULT 'INR',
    received_at TIMESTAMPTZ,
    notes TEXT,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id),
    UNIQUE (shop_id, purchase_number)
);

CREATE INDEX IF NOT EXISTS idx_purchases_shop_date ON purchasing.purchases (shop_id, purchase_date DESC);

CREATE INDEX IF NOT EXISTS idx_purchases_supplier ON purchasing.purchases (supplier_id)
WHERE
    supplier_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_purchases_status ON purchasing.purchases (status)
WHERE
    status != 'billed';

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchasing.purchase_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    purchase_id UUID NOT NULL REFERENCES purchasing.purchases (id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit_cost NUMERIC(12, 2) NOT NULL CHECK (unit_cost >= 0),
    tax_rate_id UUID REFERENCES catalog.tax_rates (id),
    tax_rate NUMERIC(5, 2) DEFAULT 0,
    tax_amount NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    discount NUMERIC(12, 2) DEFAULT 0,
    line_total NUMERIC(12, 2) NOT NULL DEFAULT 0 CHECK (line_total >= 0),
    landed_cost_per_unit NUMERIC(12, 4) NOT NULL DEFAULT 0,
    prev_cost_price NUMERIC(12, 2),
    purchase_variance NUMERIC(12, 2),
    mrp NUMERIC(12, 2),
    selling_price NUMERIC(12, 2),
    suggested_sell_price NUMERIC(12, 2),
    batch_number TEXT,
    expiry_date DATE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchasing.purchase_returns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id),
    purchase_id UUID NOT NULL REFERENCES purchasing.purchases (id),
    vendor_id UUID REFERENCES purchasing.vendors (id),
    return_number TEXT NOT NULL,
    status sales.return_status NOT NULL DEFAULT 'pending',
    return_date DATE NOT NULL DEFAULT CURRENT_DATE,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    reason TEXT,
    reason_code TEXT CHECK (
        reason_code IN (
            'DAMAGED',
            'EXPIRED',
            'WRONG_ITEM',
            'OTHER'
        )
    ),
    created_by UUID REFERENCES core.users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (shop_id, return_number)
);

CREATE INDEX IF NOT EXISTS idx_purchase_returns_purchase ON purchasing.purchase_returns (purchase_id);

CREATE INDEX IF NOT EXISTS idx_purchase_returns_supplier ON purchasing.purchase_returns (supplier_id)
WHERE
    supplier_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_purchase_returns_status ON purchasing.purchase_returns (status)
WHERE
    status = 'pending';

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS purchasing.purchase_return_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    purchase_return_id UUID NOT NULL REFERENCES purchasing.purchase_returns (id) ON DELETE CASCADE,
    purchase_line_id UUID NOT NULL REFERENCES purchasing.purchase_lines (id),
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit_cost NUMERIC(12, 2) NOT NULL CHECK (unit_cost >= 0),
    tax_amount NUMERIC(12, 2) DEFAULT 0,
    cgst_amount NUMERIC(12, 2) DEFAULT 0,
    sgst_amount NUMERIC(12, 2) DEFAULT 0,
    igst_amount NUMERIC(12, 2) DEFAULT 0,
    line_total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_purchase_return_lines_return ON purchasing.purchase_return_lines (purchase_return_id);

-- ================================================================
-- CRM — groups, loyalty
-- ================================================================

CREATE TABLE IF NOT EXISTS crm.customers (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    name TEXT NOT NULL,
    phone TEXT UNIQUE,
    email TEXT,
    address TEXT,
    city TEXT,
    state TEXT,
    country TEXT DEFAULT 'India',
    pincode TEXT,
    credit_limit NUMERIC(14, 2) DEFAULT 0 CHECK (credit_limit >= 0),
    credit_days INT DEFAULT 0 CHECK (credit_days >= 0),
    wallet_balance NUMERIC(14, 2) DEFAULT 0,
    loyalty_points NUMERIC(10, 2) DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
);

CREATE INDEX IF NOT EXISTS idx_customers_phone ON crm.customers (phone)
WHERE
    phone IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_customers_active ON crm.customers (is_active)
WHERE
    is_active = TRUE;

-- ────────────────────────────────────────────
-- Denormalised per-shop spend summary.
-- Updated by app layer on each confirmed invoice.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS crm.customer_shop_stats (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    customer_id UUID NOT NULL REFERENCES crm.customers (id) ON DELETE CASCADE,
    shop_id UUID NOT NULL REFERENCES core.shops (id) ON DELETE CASCADE,
    total_invoices INT NOT NULL DEFAULT 0 CHECK (total_invoices >= 0),
    total_spent NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_spent >= 0),
    last_visited_at TIMESTAMPTZ,
    UNIQUE (customer_id, shop_id)
);

CREATE INDEX IF NOT EXISTS idx_customer_shop_stats_customer ON crm.customer_shop_stats (customer_id);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS crm.loyalty_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    customer_id UUID NOT NULL REFERENCES crm.customers (id) ON DELETE CASCADE,
    shop_id UUID REFERENCES core.shops (id),
    type crm.loyalty_tx_type NOT NULL,
    points NUMERIC(10, 2) NOT NULL,
    -- Positive = earn/adjust-up. Negative = redeem/expire/adjust-down.
    ref_type TEXT,
    ref_id UUID,
    note TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id)
);

CREATE INDEX IF NOT EXISTS idx_loyalty_tx_customer ON crm.loyalty_transactions (customer_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_loyalty_tx_ref ON crm.loyalty_transactions (ref_type, ref_id)
WHERE
    ref_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS crm.wallet_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    customer_id UUID NOT NULL REFERENCES crm.customers (id) ON DELETE CASCADE,
    shop_id UUID REFERENCES core.shops (id),
    type TEXT NOT NULL CHECK (
        type IN (
            'credit',
            'debit',
            'refund',
            'payment',
            'adjustment'
        )
    ),
    amount NUMERIC(14, 2) NOT NULL CHECK (amount > 0),
    -- Positive = add money, Negative = deduct
    signed_amount NUMERIC(14, 2) NOT NULL,
    balance_after NUMERIC(14, 2),
    ref_type TEXT, -- 'invoice', 'return', 'manual', etc
    ref_id UUID,
    note TEXT,
    created_by UUID REFERENCES core.users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_wallet_tx_customer ON crm.wallet_transactions (customer_id, created_at DESC);

CREATE INDEX IF NOT EXISTS idx_wallet_tx_ref ON crm.wallet_transactions (ref_type, ref_id)
WHERE
    ref_id IS NOT NULL;

-- ================================================================
-- SALES — invoices, payments, returns
-- ================================================================

CREATE TABLE IF NOT EXISTS sales.invoices (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id) ON DELETE RESTRICT,
    customer_id UUID REFERENCES crm.customers (id),
    user_id UUID REFERENCES core.users (id),
    price_list_id UUID REFERENCES catalog.price_lists (id),
    invoice_number TEXT NOT NULL,
    -- Recommended format: <SHOP_CODE>-<YYYYMM>-<SEQ> e.g. "BR1-202506-00042"
    offline_number TEXT,
    -- Temporary number assigned while offline; replaced by invoice_number on sync
    status sales.invoice_status NOT NULL DEFAULT 'draft',
    invoice_date DATE NOT NULL DEFAULT CURRENT_DATE,
    due_date DATE,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    discount_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
    taxable_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (taxable_amount >= 0),
    tax_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    round_off NUMERIC(12, 2) DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    paid_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (paid_amount >= 0),
    currency TEXT DEFAULT 'INR',
    payment_mode sales.payment_mode,
    -- Offline POS
    is_offline BOOLEAN NOT NULL DEFAULT FALSE,
    synced_at TIMESTAMPTZ,
    notes TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users (id),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (shop_id, invoice_number)
);

CREATE INDEX IF NOT EXISTS idx_invoices_customer ON sales.invoices (customer_id)
WHERE
    customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_invoices_date ON sales.invoices (invoice_date DESC);

CREATE INDEX IF NOT EXISTS idx_invoices_shop_date ON sales.invoices (shop_id, invoice_date DESC);

CREATE INDEX IF NOT EXISTS idx_invoices_status ON sales.invoices (status)
WHERE
    status != 'paid';

CREATE INDEX IF NOT EXISTS idx_invoices_offline ON sales.invoices (is_offline, synced_at)
WHERE
    is_offline = TRUE
    AND synced_at IS NULL;

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales.invoice_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    invoice_id UUID NOT NULL REFERENCES sales.invoices (id) ON DELETE CASCADE,
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    unit_id UUID REFERENCES catalog.unit (id),
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    cost_price NUMERIC(12, 2),
    discount_amount NUMERIC(12, 2) DEFAULT 0,
    discount_percent NUMERIC(5, 2) DEFAULT 0,
    taxable_value NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax_rate_id UUID REFERENCES catalog.tax_rates (id),
    cgst_amount NUMERIC(12, 2) DEFAULT 0,
    sgst_amount NUMERIC(12, 2) DEFAULT 0,
    igst_amount NUMERIC(12, 2) DEFAULT 0,
    tax_amount NUMERIC(12, 2) DEFAULT 0,
    line_total NUMERIC(14, 2) NOT NULL DEFAULT 0
);

CREATE INDEX IF NOT EXISTS idx_invoice_lines_invoice ON sales.invoice_lines (invoice_id);

CREATE INDEX IF NOT EXISTS idx_invoice_lines_product ON sales.invoice_lines (product_id);

-- ────────────────────────────────────────────
-- Separate payments table supports split payment across modes.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales.invoice_payments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    invoice_id UUID NOT NULL 
        REFERENCES sales.invoices(id) ON DELETE CASCADE,
    shop_id UUID NOT NULL 
        REFERENCES core.shops(id),
    mode sales.payment_mode NOT NULL,
    type TEXT NOT NULL CHECK (
        type IN ('payment','refund','adjustment')
    ) DEFAULT 'payment',
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    signed_amount NUMERIC(12,2) NOT NULL,
    reference TEXT,
    status TEXT CHECK (
        status IN ('completed','pending','failed')
    ) DEFAULT 'completed',
    currency TEXT DEFAULT 'INR',
    metadata JSONB DEFAULT '{}'::JSONB,
    day_closure_id UUID REFERENCES ops.day_closures(id),
    paid_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users(id)
);

CREATE INDEX IF NOT EXISTS idx_invoice_payments_invoice ON sales.invoice_payments (invoice_id);

CREATE INDEX IF NOT EXISTS idx_invoice_payments_shop ON sales.invoice_payments (shop_id, paid_at DESC);

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales.sales_returns (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id),
    return_number TEXT NOT NULL,
    invoice_id UUID NOT NULL REFERENCES sales.invoices (id),
    customer_id UUID REFERENCES crm.customers (id),
    status sales.return_status NOT NULL DEFAULT 'pending',
    return_date DATE NOT NULL DEFAULT CURRENT_DATE,
    business_date DATE NOT NULL DEFAULT CURRENT_DATE,
    subtotal NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (subtotal >= 0),
    tax_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (tax_amount >= 0),
    round_off NUMERIC(12, 2) DEFAULT 0,
    total_amount NUMERIC(14, 2) NOT NULL DEFAULT 0 CHECK (total_amount >= 0),
    is_post_gst BOOLEAN NOT NULL DEFAULT FALSE,
    reason TEXT,
    notes TEXT,
    created_by UUID REFERENCES core.users (id),
    processed_by UUID REFERENCES core.users (id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (shop_id, return_number)
);

CREATE INDEX IF NOT EXISTS idx_sales_returns_invoice ON sales.sales_returns (invoice_id);

CREATE INDEX IF NOT EXISTS idx_sales_returns_customer ON sales.sales_returns (customer_id)
WHERE
    customer_id IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_sales_returns_status ON sales.sales_returns (status)
WHERE
    status = 'pending';

-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales.sales_return_lines (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    sales_return_id UUID NOT NULL REFERENCES sales.sales_returns (id) ON DELETE CASCADE,
    invoice_line_id UUID REFERENCES sales.invoice_lines (id),
    product_id UUID NOT NULL REFERENCES catalog.products (id),
    batch_id UUID REFERENCES inventory.batches (id),
    unit_id UUID REFERENCES catalog.unit (id),
    quantity NUMERIC(12, 3) NOT NULL CHECK (quantity > 0),
    unit_price NUMERIC(12, 2) NOT NULL CHECK (unit_price >= 0),
    cost_price NUMERIC(12, 2),
    discount_amount NUMERIC(12, 2) DEFAULT 0,
    discount_percent NUMERIC(5, 2) DEFAULT 0,
    taxable_value NUMERIC(12, 2) NOT NULL DEFAULT 0,
    tax_rate_id UUID REFERENCES catalog.tax_rates (id),
    cgst_amount NUMERIC(12, 2) DEFAULT 0,
    sgst_amount NUMERIC(12, 2) DEFAULT 0,
    igst_amount NUMERIC(12, 2) DEFAULT 0,
    tax_amount NUMERIC(12, 2) DEFAULT 0,
    line_total NUMERIC(12, 2) NOT NULL DEFAULT 0,
    reason TEXT
);

CREATE INDEX IF NOT EXISTS idx_sales_return_lines_return ON sales.sales_return_lines (sales_return_id);

CREATE INDEX IF NOT EXISTS idx_sales_return_lines_invoice_line ON sales.sales_return_lines (invoice_line_id);

-- ────────────────────────────────────────────
-- Separate refunds table supports split refunds across modes.
-- ────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS sales.sales_return_refunds (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    sales_return_id UUID NOT NULL 
        REFERENCES sales.sales_returns(id) ON DELETE CASCADE,
    shop_id UUID NOT NULL 
        REFERENCES core.shops(id),
    mode sales.payment_mode NOT NULL,
    type TEXT NOT NULL CHECK (
        type IN ('refund','adjustment','reversal')
    ) DEFAULT 'refund',
    amount NUMERIC(12,2) NOT NULL CHECK (amount > 0),
    signed_amount NUMERIC(12,2) NOT NULL,
    external_reference TEXT,
    status TEXT CHECK (
        status IN ('completed','pending','failed')
    ) DEFAULT 'completed',
    currency TEXT DEFAULT 'INR',
    metadata JSONB DEFAULT '{}'::JSONB,
    day_closure_id UUID REFERENCES ops.day_closures(id),
    refunded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_by UUID REFERENCES core.users(id)
);

CREATE INDEX IF NOT EXISTS idx_sales_return_refunds_return ON sales.sales_return_refunds (sales_return_id);

CREATE INDEX IF NOT EXISTS idx_sales_return_refunds_shop ON sales.sales_return_refunds (shop_id, refunded_at DESC);
-- ================================================================
-- SYNC — offline POS
-- ================================================================

CREATE TABLE IF NOT EXISTS sync.offline_sync_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid (),
    shop_id UUID NOT NULL REFERENCES core.shops (id),
    device_id TEXT,
    entity_type TEXT NOT NULL, -- invoice, payment, return
    entity_id UUID, -- after sync
    offline_number TEXT NOT NULL,
    final_number TEXT,
    payload JSONB NOT NULL,
    status TEXT NOT NULL CHECK (
        status IN (
            'pending',
            'processing',
            'synced',
            'failed',
            'conflict'
        )
    ) DEFAULT 'pending',
    retry_count INT DEFAULT 0,
    error_message TEXT,
    conflict_reason TEXT,
    synced_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE (shop_id, offline_number)
);

CREATE INDEX IF NOT EXISTS idx_offline_sync_status ON sync.offline_sync_log (status)
WHERE
    status != 'synced';

CREATE INDEX IF NOT EXISTS idx_offline_sync_shop ON sync.offline_sync_log (shop_id, created_at DESC);