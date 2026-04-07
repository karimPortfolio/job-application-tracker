import React from 'react';
import { cn } from "@/lib/utils";

interface KnobProps {
  value: number;
  max?: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
  showValue?: boolean;
  disabled?: boolean;
}

export function Knob({ 
  value, 
  max = 100, 
  size = 100, 
  strokeWidth = 8, 
  className,
  showValue = true,
  disabled = false
}: KnobProps) {
  //=== SVG Math
  const center = size / 2;
  const radius = center - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const percentage = Math.min(Math.max(value, 0), max) / max;
  const offset = circumference - percentage * circumference;

  //=== dynamic color based on AI decision/rating
  const getProgressColor = (val: number) => {
    if (val > 80) return "text-green-500";
    if (val > 50) return "text-blue-500";
    if (val > 20) return "text-orange-500";
    return "text-red-500";
  };

  return (
    <div className={cn("relative flex items-center justify-center", disabled && "opacity-50 cursor-not-allowed", className)} style={{ width: size, height: size }}>
      <svg className="w-full h-full transform -rotate-90">
        {/* Background Track (Grey ring) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          fill="transparent"
          className="text-muted-foreground/20"
        />
        {/* Active Progress (The "Knob" part) */}
        <circle
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          style={{ 
            strokeDashoffset: offset,
            transition: 'stroke-dashoffset 0.5s ease-out' 
          }}
          strokeLinecap="round"
          fill="transparent"
          className={cn(getProgressColor(value))}
        />
      </svg>
      
      {/* Central Label (Quasar Style) */}
      {showValue && (
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-bold">{Math.round(value)}</span>
          <span className="text-[10px] uppercase opacity-50 font-medium">Match</span>
        </div>
      )}
    </div>
  );
}