import * as React from "react";
import { toast as sonnerToast } from "sonner";

type ToastActionElement = React.ReactNode;

export interface ToastProps {
  id?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: ToastActionElement;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  variant?: "default" | "destructive" | null | undefined;
}

let count = 0;

function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}

export function useToast() {
  const toast = (props: ToastProps) => {
    const id = props.id || genId();
    const title = props.title as string;
    const description = props.description as string;
    const message = description ? `${title} - ${description}` : title;

    if (props.variant === "destructive") {
      sonnerToast.error(message);
    } else {
      sonnerToast.success(message);
    }

    return {
      id,
      dismiss: () => sonnerToast.dismiss(id),
      update: (updatedProps: ToastProps) => {
        const updatedTitle = updatedProps.title as string;
        const updatedDesc = updatedProps.description as string;
        const updatedMsg = updatedDesc ? `${updatedTitle} - ${updatedDesc}` : updatedTitle;
        sonnerToast(updatedMsg);
      },
    };
  };

  return { toast };
}
