export default function EmptyState({
  title,
  description,
  icon,
}: {
  title: string;
  description?: string;
  icon?: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      {icon && <div className="text-5xl mb-4">{icon}</div>}
      <h3 className="text-lg font-serif font-semibold text-brown">{title}</h3>
      {description && <p className="mt-2 text-sm text-brown-light max-w-sm">{description}</p>}
    </div>
  );
}
