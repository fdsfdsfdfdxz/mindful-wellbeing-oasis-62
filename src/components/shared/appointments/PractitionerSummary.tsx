
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PractitionerSummaryProps {
  practitioner: {
    photo?: string;
    name: string;
    rate?: string;
    credentials?: string;
    specializations?: string[];
  };
  className?: string;
}

const PractitionerSummary = ({ practitioner, className }: PractitionerSummaryProps) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center space-x-4">
          {practitioner.photo && (
            <img 
              src={practitioner.photo} 
              alt={practitioner.name} 
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <CardTitle>{practitioner.name}</CardTitle>
            {practitioner.credentials && (
              <p className="text-sm text-muted-foreground">{practitioner.credentials}</p>
            )}
            {practitioner.rate && (
              <CardDescription>Rate: {practitioner.rate}</CardDescription>
            )}
            {practitioner.specializations && practitioner.specializations.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-1">
                {practitioner.specializations.map((specialization, index) => (
                  <span key={index} className="inline-flex items-center px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md">
                    {specialization}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PractitionerSummary;
