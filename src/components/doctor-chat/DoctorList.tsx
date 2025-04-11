
import React from "react";
import { useNavigate } from "react-router-dom";
import { ChevronRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { Doctor } from "@/types/doctor";

interface DoctorListProps {
  doctors: Doctor[];
  selectedDoctor: string | null;
  onSelectDoctor: (doctorId: string) => void;
}

export const DoctorList = ({ doctors, selectedDoctor, onSelectDoctor }: DoctorListProps) => {
  const navigate = useNavigate();
  const { language } = useLanguage();

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>{translate("doctorChat", "yourDoctors", language) || "Your Doctors"}</CardTitle>
          <CardDescription>
            {translate("doctorChat", "selectToConnect", language) || "Select a doctor to connect with"}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {doctors.map((doctor) => (
            <div
              key={doctor.id}
              className={`p-3 rounded-lg cursor-pointer transition-all ${
                selectedDoctor === doctor.id
                  ? "bg-calmBlue-100 border-calmBlue-300 border"
                  : "bg-white border hover:border-calmBlue-200 border-gray-200"
              }`}
              onClick={() => onSelectDoctor(doctor.id)}
            >
              <div className="flex items-center">
                <div className="relative">
                  <img
                    src={doctor.photo}
                    alt={doctor.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <span
                    className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                      doctor.status === "online" ? "bg-green-500" : "bg-gray-400"
                    }`}
                  ></span>
                </div>
                <div className="ml-3">
                  <h3 className="font-medium text-gray-900">{doctor.name}</h3>
                  <p className="text-xs text-gray-500">{doctor.specialty}</p>
                  <p className="text-xs text-gray-500">{doctor.availability}</p>
                </div>
                {selectedDoctor === doctor.id && (
                  <ChevronRight className="ml-auto h-5 w-5 text-calmBlue-500" />
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      {selectedDoctor && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            className="w-full"
            onClick={() => navigate(`/doctor/${selectedDoctor}`)}
          >
            <User className="mr-2 h-4 w-4" />
            {translate("doctorChat", "viewFullProfile", language) || "View Full Profile"}
          </Button>
        </div>
      )}
    </div>
  );
};

