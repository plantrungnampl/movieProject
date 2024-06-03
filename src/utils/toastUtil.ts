import { toast as toastify } from "@/components/ui/use-toast";

export const toast = (options: any) => {
  toastify({
    ...options,
    duration: options.duration || 5000,
  });
};
