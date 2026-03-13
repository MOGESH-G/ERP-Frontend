import { Snackbar, Alert, type AlertColor } from "@mui/material";
import { createRoot } from "react-dom/client";

type MessageType = AlertColor;

interface MessageOptions {
  message: string;
  type?: MessageType;
  duration?: number;
}

function showMessage({ message, type = "info", duration = 3000 }: MessageOptions) {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  const handleClose = () => {
    root.unmount();
    container.remove();
  };

  root.render(
    <Snackbar
      open
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert severity={type} variant="filled" onClose={handleClose}>
        {message}
      </Alert>
    </Snackbar>,
  );
}

export const message = {
  success: (msg: string) => showMessage({ message: msg, type: "success" }),

  error: (msg: string) => showMessage({ message: msg, type: "error" }),

  warning: (msg: string) => showMessage({ message: msg, type: "warning" }),

  info: (msg: string) => showMessage({ message: msg, type: "info" }),
};
