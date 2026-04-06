import { useEffect, useState } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConfirmDeleteModalProps {
  open: boolean;
  title?: string;
  message: string;
  isDeleting?: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  open,
  title = "Confirmer la suppression",
  message,
  isDeleting = false,
  onCancel,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setIsVisible] = useState(open);

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = setTimeout(() => setShouldRender(false), 180);
    return () => clearTimeout(timer);
  }, [open]);

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
        onClick={onCancel}
        aria-label="Fermer"
      />
      <div
        className={`relative w-full max-w-md rounded-xl border bg-card shadow-card p-6 transition-all duration-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="flex items-start gap-3">
          <div className="mt-0.5 h-9 w-9 rounded-full bg-destructive/10 text-destructive flex items-center justify-center">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{message}</p>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} disabled={isDeleting}>
            Annuler
          </Button>
          <Button variant="destructive" onClick={onConfirm} disabled={isDeleting}>
            {isDeleting ? "Suppression..." : "Supprimer"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;

