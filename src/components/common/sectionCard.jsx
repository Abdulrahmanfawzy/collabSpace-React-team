function SectionCard({ title, children }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <h3 className="mb-4 text-base font-semibold text-blue-900">
        {title}
      </h3>

      {children}
    </div>
  );
}

export default SectionCard;