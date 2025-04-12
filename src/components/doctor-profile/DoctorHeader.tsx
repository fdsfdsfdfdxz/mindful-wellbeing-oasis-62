
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

const DoctorHeader = () => {
  return (
    <Link to="/" className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors">
      <ArrowLeft className="mr-1 h-4 w-4" />
      Back to Home
    </Link>
  );
};

export default DoctorHeader;
