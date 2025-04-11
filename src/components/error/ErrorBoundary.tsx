
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundaryBase extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      
      return <DefaultErrorFallback error={this.state.error} />;
    }

    return this.props.children;
  }
}

interface ErrorFallbackProps {
  error?: Error;
}

const DefaultErrorFallback = ({ error }: ErrorFallbackProps) => {
  const { language } = useLanguage();
  
  return (
    <div className="flex items-center justify-center min-h-[200px] p-6 bg-card rounded-lg border border-border">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full">
            <AlertTriangle className="h-6 w-6 text-red-600 dark:text-red-400" />
          </div>
        </div>
        <h3 className="text-lg font-semibold mb-2">
          {translate("accessibility", "errorBoundary", language)}
        </h3>
        <p className="text-muted-foreground mb-4">
          {translate("accessibility", "errorBoundaryDesc", language)}
        </p>
        {error && (
          <div className="bg-muted p-3 rounded text-sm text-left mb-4 overflow-auto max-h-[200px]">
            <p className="font-mono">{error.message}</p>
          </div>
        )}
        <Button onClick={() => window.location.reload()}>
          {translate("accessibility", "retry", language)}
        </Button>
      </div>
    </div>
  );
};

export const ErrorBoundary = ErrorBoundaryBase;
