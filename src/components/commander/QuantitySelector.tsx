"use client";

interface QuantitySelectorProps {
  value: number;
  min?: number;
  max?: number;
  onChange: (qty: number) => void;
}

export default function QuantitySelector({
  value,
  min = 0,
  max,
  onChange,
}: QuantitySelectorProps) {
  return (
    <div className="flex items-center rounded-lg overflow-hidden" style={{ border: "1px solid #2a2a2a" }}>
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center transition-colors text-lg"
        style={{ color: "#C9A96E", background: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        aria-label="Diminuer"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold" style={{ color: "#F5F0E8" }}>{value}</span>
      <button
        onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
        className="w-9 h-9 flex items-center justify-center transition-colors text-lg"
        style={{ color: "#C9A96E", background: "transparent" }}
        onMouseEnter={(e) => (e.currentTarget.style.background = "#1a1a1a")}
        onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        disabled={max !== undefined && value >= max}
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}
