type SpecRow = {
  label: string;
  value: string;
};

type SpecTableProps = {
  rows: SpecRow[];
  className?: string;
};

export default function SpecTable({ rows, className }: SpecTableProps) {
  return (
    <div className={`border-t border-line ${className ?? ""}`}>
      {rows.map((row) => (
        <div
          key={row.label}
          className="flex flex-col gap-1 border-b border-line py-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {row.label}
          </span>
          <span className="font-sans text-paper sm:text-right">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
