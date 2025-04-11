
import { Loader2 } from "lucide-react";

export interface LoadingProps {
  /**
   * The size of the loading spinner
   * @default "default"
   */
  size?: "sm" | "default" | "lg" | "xl";
  
  /**
   * The text to display alongside the spinner
   */
  text?: string;
  
  /**
   * Whether to center the loading indicator
   * @default false
   */
  center?: boolean;
  
  /**
   * Apply a full-page overlay with the spinner
   * @default false
   */
  fullScreen?: boolean;
}

export function Loading({ 
  size = "default", 
  text, 
  center = false,
  fullScreen = false
}: LoadingProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    default: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12"
  };

  const spinner = (
    <div className={`flex items-center ${text ? "space-x-2" : ""}`}>
      <Loader2 className={`${sizeClasses[size]} animate-spin text-primary`} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center">
        <div className="bg-card p-8 rounded-lg shadow-lg">
          {spinner}
        </div>
      </div>
    );
  }

  return center ? (
    <div className="w-full flex justify-center py-4">
      {spinner}
    </div>
  ) : spinner;
}

export function LoadingDots() {
  return (
    <div className="loading-dots">
      <span></span>
      <span></span>
      <span></span>
    </div>
  );
}
