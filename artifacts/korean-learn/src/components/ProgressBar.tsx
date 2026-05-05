// Barra de progreso reutilizable
interface ProgressBarProps {
  percentage: number;
  color?: string;
  height?: string;
  showLabel?: boolean;
  animated?: boolean;
}

export function ProgressBar({
  percentage,
  color = "bg-purple-500",
  height = "h-3",
  showLabel = false,
  animated = true,
}: ProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, percentage));
  return (
    <div className="w-full">
      <div className={`w-full ${height} bg-gray-100 rounded-full overflow-hidden`}>
        <div
          className={`${height} ${color} rounded-full ${animated ? "transition-all duration-500" : ""}`}
          style={{ width: `${clamped}%` }}
        />
      </div>
      {showLabel && (
        <p className="text-xs text-muted-foreground mt-1 text-right">{clamped}% completado</p>
      )}
    </div>
  );
}
