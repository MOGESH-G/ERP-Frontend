const Forbidden = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-base px-4">
      <div className="bg-bg-paper border border-border-subtle rounded-2xl p-8 max-w-md w-full text-center shadow-sm">
        {/* Icon */}
        <div className="mx-auto mb-4 w-16 h-16 flex items-center justify-center rounded-full bg-warning-bg text-warning text-3xl">
          🚫
        </div>

        {/* Title */}
        <h1 className="text-2xl font-semibold text-text-header mb-2">
          Access Denied
        </h1>

        {/* Description */}
        <p className="text-text-body mb-6">
          You don’t have permission to access this page.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
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
        </div>
      </div>
    </div>
  );
};

export default Forbidden;
