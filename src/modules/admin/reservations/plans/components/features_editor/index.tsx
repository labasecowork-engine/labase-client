import { useState } from "react";
import { Button, Input, Textarea } from "@/components/ui";
import { cn } from "@/utilities";
import { ClipboardPaste, List, Plus, X } from "lucide-react";

type Mode = "one" | "paste";

interface Props {
  value: string[];
  onChange: (features: string[]) => void;
}

const splitLines = (text: string): string[] =>
  text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export const FeaturesEditor = ({ value, onChange }: Props) => {
  const [mode, setMode] = useState<Mode>("one");
  const [pasted, setPasted] = useState(value.join("\n"));

  // Modo "una por una": siempre hay al menos una fila visible.
  const rows = value.length > 0 ? value : [""];

  const updateRow = (index: number, text: string) => {
    const next = [...rows];
    next[index] = text;
    onChange(next);
  };
  const addRow = () => onChange([...rows, ""]);
  const removeRow = (index: number) =>
    onChange(rows.filter((_, current) => current !== index));

  const switchTo = (next: Mode) => {
    if (next === mode) return;
    if (next === "paste") setPasted(value.join("\n"));
    setMode(next);
  };

  const onPasteChange = (text: string) => {
    setPasted(text);
    onChange(splitLines(text));
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-end gap-1">
        <button
          type="button"
          onClick={() => switchTo("one")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            mode === "one"
              ? "bg-stone-800 text-white"
              : "text-stone-500 hover:bg-stone-100"
          )}
        >
          <List className="size-3.5" />
          Una por una
        </button>
        <button
          type="button"
          onClick={() => switchTo("paste")}
          className={cn(
            "flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors",
            mode === "paste"
              ? "bg-stone-800 text-white"
              : "text-stone-500 hover:bg-stone-100"
          )}
        >
          <ClipboardPaste className="size-3.5" />
          Pegar todo
        </button>
      </div>

      {mode === "one" ? (
        <div className="space-y-2">
          {rows.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <Input
                value={feature}
                onChange={(e) => updateRow(index, e.target.value)}
                placeholder="Ej: Wi-Fi ilimitado"
              />
              <button
                type="button"
                onClick={() => removeRow(index)}
                aria-label="Quitar característica"
                className="flex size-9 shrink-0 items-center justify-center rounded-md border border-stone-200 text-rose-500 transition-colors hover:bg-rose-50"
              >
                <X className="size-4" />
              </button>
            </div>
          ))}
          <Button type="button" variant="outline" size="sm" onClick={addRow}>
            <Plus className="size-4" />
            Agregar característica
          </Button>
        </div>
      ) : (
        <Textarea
          value={pasted}
          onChange={(e) => onPasteChange(e.target.value)}
          placeholder={"Una característica por línea:\nWi-Fi ilimitado\nCafetería\nLocker personal"}
          rows={6}
        />
      )}
    </div>
  );
};
