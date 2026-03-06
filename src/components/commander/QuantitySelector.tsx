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
    <div className="flex items-center border border-sand rounded-lg overflow-hidden">
      <button
        onClick={() => onChange(Math.max(min, value - 1))}
        className="w-9 h-9 flex items-center justify-center text-brown hover:bg-cream-dark transition-colors text-lg"
        aria-label="Diminuer"
      >
        −
      </button>
      <span className="w-10 text-center text-sm font-semibold text-brown">{value}</span>
      <button
        onClick={() => onChange(max !== undefined ? Math.min(max, value + 1) : value + 1)}
        className="w-9 h-9 flex items-center justify-center text-brown hover:bg-cream-dark transition-colors text-lg"
        disabled={max !== undefined && value >= max}
        aria-label="Augmenter"
      >
        +
      </button>
    </div>
  );
}
