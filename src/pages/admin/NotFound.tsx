
import { useNavigate } from "react-router-dom";
import { ChevronLeft, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminNotFound() {
  const navigate = useNavigate();
  
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center space-y-6 max-w-md">
        <h1 className="text-6xl font-bold text-calmBlue-600">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800">Page Not Found</h2>
        <p className="text-gray-600">
          The admin page you are looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Button onClick={() => navigate(-1)} variant="outline" className="space-x-2">
            <ChevronLeft className="h-4 w-4" />
            <span>Go Back</span>
          </Button>
          <Button onClick={() => navigate("/admin")} className="space-x-2">
            <Home className="h-4 w-4" />
            <span>Admin Dashboard</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
