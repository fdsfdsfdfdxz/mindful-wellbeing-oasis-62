
import { PractitionerSummary } from "@/components/shared/appointments";
import { Badge } from "@/components/ui/badge";
import { CalendarClock, Star, Video, Phone, Users } from "lucide-react";

interface PractitionerCardProps {
  practitioner: {
    photo: string;
    name: string;
    rate: string;
    specialties?: string[];
    rating?: number;
    availabilityText?: string;
    appointmentTypes?: Array<"video" | "phone" | "inPerson">;
  };
}

const PractitionerCard = ({ practitioner }: PractitionerCardProps) => {
  return (
    <div className="space-y-4 animate-fade-in">
      <PractitionerSummary practitioner={practitioner} className="mb-0" />
      
      {/* Additional details */}
      {practitioner.specialties && practitioner.specialties.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {practitioner.specialties.map((specialty, index) => (
            <Badge key={index} variant="outline" className="bg-secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      )}
      
      {/* Rating */}
      {practitioner.rating && (
        <div className="flex items-center mt-2">
          <Star className="h-4 w-4 text-amber-500 mr-1 fill-amber-500" />
          <span className="font-medium">{practitioner.rating}</span>
          <span className="text-sm text-muted-foreground ml-1">rating</span>
        </div>
      )}
      
      {/* Availability */}
      {practitioner.availabilityText && (
        <div className="flex items-center text-sm text-muted-foreground">
          <CalendarClock className="h-4 w-4 mr-2" />
          {practitioner.availabilityText}
        </div>
      )}
      
      {/* Appointment types */}
      {practitioner.appointmentTypes && practitioner.appointmentTypes.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {practitioner.appointmentTypes.includes("video") && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Video className="h-3 w-3" />
              Video
            </Badge>
          )}
          {practitioner.appointmentTypes.includes("phone") && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Phone className="h-3 w-3" />
              Phone
            </Badge>
          )}
          {practitioner.appointmentTypes.includes("inPerson") && (
            <Badge variant="outline" className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              In-Person
            </Badge>
          )}
        </div>
      )}
    </div>
  );
};

export default PractitionerCard;
