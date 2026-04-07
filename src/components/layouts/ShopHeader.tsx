const ShopHeader = () => {
  return (
    <header className="h-16 flex items-center justify-between px-6 text-white bg-primary-500">
      <h1 className="font-semibold">Dashboard</h1>

      <div className="flex items-center gap-4">
        <button className="px-4 py-2 bg-white text-primary-500 rounded-lg">
          Add Order
        </button>

        <div className="w-10 h-10 rounded-full bg-white/30 flex items-center justify-center">
          👤
        </div>
      </div>
    </header>
  );
};

export default ShopHeader;
