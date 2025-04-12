
import { Award } from "lucide-react";

interface Doctor {
  id: number;
  name: string;
  bio?: string;
  education?: string[];
  specializations: string[];
}

interface DoctorAboutProps {
  doctor: Doctor;
}

const DoctorAbout = ({ doctor }: DoctorAboutProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">About {doctor.name}</h2>
      {doctor.bio && <p className="text-gray-700 mb-6">{doctor.bio}</p>}
      
      {doctor.education && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Education & Training</h3>
          <ul className="space-y-2">
            {doctor.education.map((edu, idx) => (
              <li key={idx} className="flex items-start">
                <Award className="h-5 w-5 text-calmBlue-500 mt-0.5 mr-2 flex-shrink-0" />
                <span>{edu}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      <div>
        <h3 className="text-lg font-medium mb-3">Areas of Expertise</h3>
        <div className="grid grid-cols-2 gap-2">
          {doctor.specializations.map((spec, idx) => (
            <div key={idx} className="flex items-center p-2 bg-gray-50 rounded">
              <span className="w-2 h-2 bg-calmBlue-500 rounded-full mr-2"></span>
              <span className="text-gray-700">{spec}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DoctorAbout;
