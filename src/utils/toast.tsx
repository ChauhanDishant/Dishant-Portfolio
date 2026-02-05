import toast from "react-hot-toast";
import { NeonToast } from "@/components/atoms/NeonToast";

export const showToast = {
  success: (message: string) =>
    toast.custom((_t) => <NeonToast message={message} variant="success" />, {
      duration: 4000,
    }),

  error: (message: string) =>
    toast.custom((_t) => <NeonToast message={message} variant="error" />, {
      duration: 5000,
    }),

  loading: (message: string) =>
    toast.custom((_t) => <NeonToast message={message} variant="loading" />, {
      duration: Infinity,
    }),
};
