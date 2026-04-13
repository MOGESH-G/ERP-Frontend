import { Box } from "@mui/material";

const NotFound = () => {
  return (
    <Box className="min-h-screen flex items-center justify-center bg-bg-base px-4">
      <Box className="bg-bg-paper border border-border-subtle rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
        {/* Big 404 */}
        <h1 className="text-5xl font-bold text-primary-500 mb-2">404</h1>

        {/* Title */}
        <h2 className="text-xl font-semibold text-text-header mb-2">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="text-text-body mb-6">
          The page you’re looking for doesn’t exist or has been moved.
        </p>

        {/* Actions */}
        <Box className="flex flex-col gap-3">
          <button
            onClick={() => window.history.back()}
            className="w-full py-2 rounded-lg bg-bg-elevated hover:bg-bg-subtle transition"
          >
            Go Back
          </button>

          <button
            onClick={() => (window.location.href = "/app")}
            className="w-full py-2 rounded-lg bg-primary-500 text-primary-contrast hover:bg-primary-600 transition"
          >
            Go to Home
          </button>
        </Box>
      </Box>
    </Box>
  );
};

export default NotFound;
