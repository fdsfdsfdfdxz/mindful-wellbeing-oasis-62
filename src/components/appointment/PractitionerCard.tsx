
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

interface PractitionerCardProps {
  practitioner: {
    photo: string;
    name: string;
    rate: string;
  };
}

const PractitionerCard = ({ practitioner }: PractitionerCardProps) => {
  return (
    <Card className="mb-8">
      <CardHeader>
        <div className="flex items-center space-x-4">
          <img 
            src={practitioner.photo} 
            alt={practitioner.name} 
            className="w-16 h-16 rounded-full object-cover"
          />
          <div>
            <CardTitle>{practitioner.name}</CardTitle>
            <CardDescription>Rate: {practitioner.rate}</CardDescription>
          </div>
        </div>
      </CardHeader>
    </Card>
  );
};

export default PractitionerCard;
