interface Props {
  title: string;
  description: string;
  icon: string;
}

export default function ServiceCard({ title, description, icon }: Props) {
  return (
    // <div className="bg-darkmode p-8 rounded-lg flex flex-col gap-3">
    <div className="bg-card p-8 rounded-lg flex flex-col gap-3">
      {/* Icon */}
      <div className="rounded-full bg-linear-to-r from-primary to-secondary w-fit p-4 flex items-center justify-center">
        <span className="text-2xl text-white">{icon}</span>
      </div>

      {/* Title */}
      <h5 className="text-white/80 text-lg font-medium capitalize">{title}</h5>

      {/* Description */}
      <p className="text-white/40 text-sm font-normal leading-relaxed">
        {description}
      </p>
    </div>
  );
}
