import { useState } from "react";
import CustomInput from "../../../components/CustomInput";
import CustomButton from "../../../components/CustomButton";
import CustomSelect from "../../../components/CustomSelect";

interface CreateUserForm {
  name: string;
  email: string;
  phone: string;
  roles: string[];
  address: string;
  aadhar_number: string;
  shop_ids: string[];
}

const roleOptions = ["admin", "manager", "staff"];
const shopOptions = ["shop1", "shop2", "shop3", "shop4", "shop5", "shop6"];

const CreateUser = () => {
  const [form, setForm] = useState<CreateUserForm>({
    name: "",
    email: "",
    phone: "",
    roles: [],
    address: "",
    aadhar_number: "",
    shop_ids: [],
  });

  const [errors, setErrors] = useState<Partial<CreateUserForm>>({});

  // Handle input change
  const handleChange = (field: keyof CreateUserForm, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Basic validation
  const validate = () => {
    const newErrors: Partial<CreateUserForm> = {};
    if (!form.name) newErrors.name = "Name is required";
    if (!form.email) newErrors.email = "Email is required";
    if (!form.phone) newErrors.phone = "Phone is required";
    if (form.roles.length === 0) newErrors.roles = "Select at least one role";
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    console.log("Submitting user:", form);
    // TODO: API call to create user
  };

  return (
    <div className="w-full my-2 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">Create User</h2>
      <form
        className="grid md:grid-cols-2 gap-2 gap-y-4"
        onSubmit={handleSubmit}
      >
        <CustomInput
          label="Name"
          value={form.name}
          onChange={(e) => handleChange("name", e.target.value)}
          errorText={errors.name}
          fixedErrorSpace
        />
        <CustomInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
          errorText={errors.email}
          fixedErrorSpace
        />
        <CustomInput
          label="Phone"
          type="tel"
          value={form.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          errorText={errors.phone}
          fixedErrorSpace
        />
        {/* <div>
          <label className="block font-medium mb-1">Roles</label>
          <div className="flex gap-4">
            {roleOptions.map((role) => (
              <label key={role} className="flex items-center gap-1">
                <input
                  type="checkbox"
                  checked={form.roles.includes(role)}
                  onChange={(e) => {
                    const newRoles = e.target.checked
                      ? [...form.roles, role]
                      : form.roles.filter((r) => r !== role);
                    handleChange("roles", newRoles);
                  }}
                  className="form-checkbox"
                />
                {role}
              </label>
            ))}
          </div>
          {errors.roles && (
            <p className="text-red-500 text-sm">{errors.roles}</p>
          )}
        </div> */}
        <CustomSelect
          value={form.roles}
          multiple
          onChange={(e) => handleChange("roles", e.target.value)}
          options={roleOptions.map((role) => ({ label: role, value: role }))}
          label="Roles"
          fixedErrorSpace
        />

        <CustomInput
          label="Address"
          value={form.address}
          onChange={(e) => handleChange("address", e.target.value)}
        />

        <CustomInput
          label="Aadhar Number"
          value={form.aadhar_number}
          onChange={(e) => handleChange("aadhar_number", e.target.value)}
        />

        <CustomSelect
          value={form.shop_ids}
          multiple
          onChange={(e) => handleChange("shop_ids", e.target.value)}
          options={shopOptions.map((shop) => ({ label: shop, value: shop }))}
          label="Shops"
          fixedErrorSpace
        />

        <CustomButton type="submit">Create User</CustomButton>
      </form>
    </div>
  );
};

export default CreateUser;
