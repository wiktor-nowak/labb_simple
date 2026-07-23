type SpecRow = {
  label: string;
  value: string;
};

type SpecTableProps = {
  rows: SpecRow[];
  className?: string;
  showEdges?: boolean;
};

export default function SpecTable({
  rows,
  className,
  showEdges = true,
}: SpecTableProps) {
  return (
    <div className={`${showEdges ? "border-t border-line" : ""} ${className ?? ""}`}>
      {rows.map((row, index) => (
        <div
          key={row.label}
          className={`flex flex-col gap-1 py-4 tablet:flex-row tablet:items-center tablet:justify-between tablet:gap-6 ${
            showEdges || index < rows.length - 1 ? "border-b border-line" : ""
          }`}
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-faint">
            {row.label}
          </span>
          <span className="font-sans text-paper tablet:text-right">
            {row.value}
          </span>
        </div>
      ))}
    </div>
  );
}
