type LocationMapProps = {
  address: string;
  className?: string;
};

export default function LocationMap({ address, className }: LocationMapProps) {
  const mapQuery = encodeURIComponent(address);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line bg-surface p-2 ${className ?? ""}`}
    >
      <iframe
        title={`Mapa dojazdu — ${address}`}
        src={`https://maps.google.com/maps?q=${mapQuery}&output=embed`}
        className="h-full min-h-105 w-full rounded-xl border-0 grayscale"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
