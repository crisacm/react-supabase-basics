// src/components/ToastProvider.tsx
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const ToastProvider = () => {
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
      containerId="app-toast-container"
    />
  );
};

// Hook personalizado para usar toast
export const useToast = () => {
  const showToast = (
    message: string,
    type: "success" | "error" | "info" | "warning" = "info"
  ) => {
    const options = {
      containerId: "app-toast-container",
      toastId: `toast-${Date.now()}`,
      autoClose: 5000,
      closeOnClick: false,
      draggable: false,
    };

    switch (type) {
      case "success":
        return toast.success(message, options);
      case "error":
        return toast.error(message, options);
      case "warning":
        return toast.warning(message, options);
      default:
        return toast.info(message, options);
    }
  };

  return { showToast };
};
