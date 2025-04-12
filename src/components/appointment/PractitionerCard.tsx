
import { PractitionerSummary } from "@/components/shared/appointments";

interface PractitionerCardProps {
  practitioner: {
    photo: string;
    name: string;
    rate: string;
  };
}

const PractitionerCard = ({ practitioner }: PractitionerCardProps) => {
  return (
    <PractitionerSummary practitioner={practitioner} />
  );
};

export default PractitionerCard;
