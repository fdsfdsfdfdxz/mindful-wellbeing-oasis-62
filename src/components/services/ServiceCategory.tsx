
import { ReactNode } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ServiceCategoryProps {
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}

const ServiceCategory = ({ title, description, children, className = "" }: ServiceCategoryProps) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div className="text-center max-w-3xl mx-auto">
        <h3 className="text-2xl font-bold mb-3">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {children}
      </div>
    </div>
  );
};

export default ServiceCategory;
