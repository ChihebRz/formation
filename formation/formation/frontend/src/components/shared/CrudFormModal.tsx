import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export type CrudFieldType = "text" | "email" | "password" | "number" | "date" | "textarea" | "select";

export interface CrudFieldOption {
  value: string;
  label: string;
}

export interface CrudField {
  key: string;
  label: string;
  type?: CrudFieldType;
  placeholder?: string;
  required?: boolean;
  options?: CrudFieldOption[];
}

interface CrudFormModalProps {
  open: boolean;
  title: string;
  subtitle?: string;
  fields: CrudField[];
  values: Record<string, string>;
  error?: string;
  isSubmitting?: boolean;
  submitLabel?: string;
  onChange: (key: string, value: string) => void;
  onClose: () => void;
  onSubmit: () => void;
}

const fieldBaseClass =
  "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2";

const CrudFormModal = ({
  open,
  title,
  subtitle,
  fields,
  values,
  error,
  isSubmitting = false,
  submitLabel = "Enregistrer",
  onChange,
  onClose,
  onSubmit,
}: CrudFormModalProps) => {
  const [shouldRender, setShouldRender] = useState(open);
  const [isVisible, setIsVisible] = useState(open);
  const [inlineErrors, setInlineErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (open) {
      setShouldRender(true);
      setInlineErrors({});
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timer = setTimeout(() => setShouldRender(false), 180);
    return () => clearTimeout(timer);
  }, [open]);

  const requiredKeys = useMemo(
    () => fields.filter((field) => field.required).map((field) => field.key),
    [fields]
  );

  const handleSubmit = () => {
    const nextErrors: Record<string, string> = {};
    requiredKeys.forEach((key) => {
      if (!(values[key] ?? "").trim()) {
        nextErrors[key] = "Ce champ est obligatoire";
      }
    });

    setInlineErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      onSubmit();
    }
  };

  if (!shouldRender) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      <button
        className={`absolute inset-0 bg-black/40 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
        aria-label="Fermer"
      />
      <div
        className={`relative w-full max-w-2xl rounded-xl border bg-card shadow-card p-6 max-h-[90vh] overflow-y-auto transition-all duration-200 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <div className="mb-4">
          <h2 className="text-xl font-bold">{title}</h2>
          {subtitle ? <p className="text-sm text-muted-foreground mt-1">{subtitle}</p> : null}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fields.map((field) => {
            const fieldType = field.type ?? "text";
            const value = values[field.key] ?? "";
            const label = `${field.label}${field.required ? " *" : ""}`;

            if (fieldType === "textarea") {
              return (
                <div key={field.key} className="md:col-span-2 space-y-1">
                  <label className="text-sm font-medium">{label}</label>
                  <textarea
                    className={`min-h-24 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${
                      inlineErrors[field.key] ? "border-destructive" : "border-input"
                    }`}
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) => {
                      onChange(field.key, e.target.value);
                      if (inlineErrors[field.key]) {
                        setInlineErrors((prev) => {
                          const next = { ...prev };
                          delete next[field.key];
                          return next;
                        });
                      }
                    }}
                  />
                  {inlineErrors[field.key] ? <p className="text-xs text-destructive">{inlineErrors[field.key]}</p> : null}
                </div>
              );
            }

            if (fieldType === "select") {
              return (
                <div key={field.key} className="space-y-1">
                  <label className="text-sm font-medium">{label}</label>
                  <select
                    className={`${fieldBaseClass} ${inlineErrors[field.key] ? "border-destructive" : ""}`}
                    value={value}
                    onChange={(e) => {
                      onChange(field.key, e.target.value);
                      if (inlineErrors[field.key]) {
                        setInlineErrors((prev) => {
                          const next = { ...prev };
                          delete next[field.key];
                          return next;
                        });
                      }
                    }}
                  >
                    <option value="">Sélectionner...</option>
                    {(field.options ?? []).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  {inlineErrors[field.key] ? <p className="text-xs text-destructive">{inlineErrors[field.key]}</p> : null}
                </div>
              );
            }

            return (
              <div key={field.key} className="space-y-1">
                <label className="text-sm font-medium">{label}</label>
                <Input
                  type={fieldType}
                  placeholder={field.placeholder}
                  className={inlineErrors[field.key] ? "border-destructive" : ""}
                  value={value}
                  onChange={(e) => {
                    onChange(field.key, e.target.value);
                    if (inlineErrors[field.key]) {
                      setInlineErrors((prev) => {
                        const next = { ...prev };
                        delete next[field.key];
                        return next;
                      });
                    }
                  }}
                />
                {inlineErrors[field.key] ? <p className="text-xs text-destructive">{inlineErrors[field.key]}</p> : null}
              </div>
            );
          })}
        </div>

        {error ? <p className="mt-4 text-sm text-destructive whitespace-pre-line">{error}</p> : null}

        <div className="mt-6 flex items-center justify-end gap-2">
          <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
            Annuler
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Enregistrement..." : submitLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CrudFormModal;




