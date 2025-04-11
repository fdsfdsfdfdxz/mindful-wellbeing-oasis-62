
import React from "react";
import { Video, Calendar, FileText, Check, X, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Appointment } from "@/types/appointment";
import { useLanguage } from "@/contexts/LanguageContext";

interface AppointmentListProps {
  appointments: Appointment[];
  onJoinCall: (appointmentId: number) => void;
  onScheduleAppointment: () => void;
}

export const AppointmentList = ({ appointments, onJoinCall, onScheduleAppointment }: AppointmentListProps) => {
  const { language } = useLanguage();
  
  const formatAppointmentDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat(language === 'ar' ? 'ar-SA' : 'en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true
    }).format(date);
  };
  
  const isUpcoming = (dateString: string) => {
    const now = new Date();
    const appointmentDate = new Date(dateString);
    return appointmentDate > now;
  };
  
  const getStatusBadge = (status: string) => {
    const getStatusText = (status: string) => {
      if (language !== 'ar') {
        return status.charAt(0).toUpperCase() + status.slice(1);
      }
      
      switch (status) {
        case "confirmed":
          return "مؤكد";
        case "pending":
          return "قيد الانتظار";
        case "completed":
          return "مكتمل";
        case "cancelled":
          return "ملغى";
        default:
          return status;
      }
    };
    
    switch (status) {
      case "confirmed":
        return (
          <Badge className="bg-green-100 text-green-800 border-green-300">
            <Check className="h-3 w-3 mr-1" />
            {getStatusText("confirmed")}
          </Badge>
        );
      case "pending":
        return (
          <Badge className="bg-yellow-100 text-yellow-800 border-yellow-300">
            <Clock className="h-3 w-3 mr-1" />
            {getStatusText("pending")}
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-blue-100 text-blue-800 border-blue-300">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            {getStatusText("completed")}
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-100 text-red-800 border-red-300">
            <X className="h-3 w-3 mr-1" />
            {getStatusText("cancelled")}
          </Badge>
        );
      default:
        return (
          <Badge>
            {getStatusText(status)}
          </Badge>
        );
    }
  };
  
  const getAppointmentTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-calmBlue-500" />;
      case "phone":
        return <Phone className="h-4 w-4 text-calmBlue-500" />;
      case "inPerson":
        return <MapPin className="h-4 w-4 text-calmBlue-500" />;
      default:
        return null;
    }
  };
  
  const getAppointmentTypeText = (type: string) => {
    if (language !== 'ar') {
      return type === "inPerson" ? "In Person" : `${type} Call`;
    }
    
    switch (type) {
      case "video":
        return "مكالمة فيديو";
      case "phone":
        return "مكالمة هاتفية";
      case "inPerson":
        return "حضور شخصي";
      default:
        return type;
    }
  };
  
  // CheckCircleIcon component
  const CheckCircleIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
  
  const Clock = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );

  const upcomingAppointments = appointments.filter(app => isUpcoming(app.date));
  const pastAppointments = appointments.filter(app => !isUpcoming(app.date));

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-4">
          {language === 'ar' ? "المواعيد القادمة" : "Upcoming Appointments"}
        </h3>
        {upcomingAppointments.length > 0 ? (
          <div className="space-y-4">
            {upcomingAppointments.map(appointment => (
              <Card key={appointment.id} className="overflow-hidden">
                <div className="border-l-4 border-calmBlue-500 pl-4 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{formatAppointmentDate(appointment.date)}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="ml-1 capitalize">
                          {getAppointmentTypeText(appointment.type)}
                        </span>
                      </div>
                      <p className="text-sm mt-2">{appointment.notes}</p>
                    </div>
                    <div className="flex flex-col items-end">
                      {getStatusBadge(appointment.status)}
                      {appointment.status === "confirmed" && appointment.type === "video" && (
                        <Button 
                          size="sm" 
                          className="mt-3"
                          onClick={() => onJoinCall(appointment.id)}
                        >
                          <Video className="h-4 w-4 mr-1" />
                          {language === 'ar' ? "انضمام للمكالمة" : "Join Call"}
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <Calendar className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">
              {language === 'ar' ? "لا توجد مواعيد قادمة" : "No upcoming appointments"}
            </p>
            <Button
              variant="link"
              className="mt-2"
              onClick={onScheduleAppointment}
            >
              {language === 'ar' ? "جدولة موعد" : "Schedule an appointment"}
            </Button>
          </div>
        )}
      </div>
      
      <div>
        <h3 className="text-lg font-medium mb-4">
          {language === 'ar' ? "المواعيد السابقة" : "Past Appointments"}
        </h3>
        {pastAppointments.length > 0 ? (
          <div className="space-y-4">
            {pastAppointments.map(appointment => (
              <Card key={appointment.id} className="overflow-hidden border-gray-200">
                <div className="border-l-4 border-gray-300 pl-4 p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-gray-700">{formatAppointmentDate(appointment.date)}</h4>
                      <div className="flex items-center mt-1 text-sm text-gray-500">
                        {getAppointmentTypeIcon(appointment.type)}
                        <span className="ml-1 capitalize">
                          {getAppointmentTypeText(appointment.type)}
                        </span>
                      </div>
                      <p className="text-sm mt-2 text-gray-600">{appointment.notes}</p>
                    </div>
                    <div>
                      {getStatusBadge(appointment.status)}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border rounded-lg bg-gray-50">
            <FileText className="h-10 w-10 text-gray-300 mx-auto mb-2" />
            <p className="text-gray-500">
              {language === 'ar' ? "لا توجد مواعيد سابقة" : "No past appointments"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
