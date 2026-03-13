import { CircularProgress } from "@mui/material";

const Loader = () => {
  return (
    <div className="fixed inset-0 flex w-screen! h-screen! items-center justify-center bg-slate-50 z-100">
      <CircularProgress size={36} thickness={4} sx={{ color: "#4f46e5" }} />
    </div>
  );
};

export default Loader;
