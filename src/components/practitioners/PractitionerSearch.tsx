
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface PractitionerSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  className?: string;
}

const PractitionerSearch: React.FC<PractitionerSearchProps> = ({
  searchQuery,
  onSearchChange,
  className,
}) => {
  return (
    <div className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, specialty, or keywords..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 border-none shadow-sm"
      />
    </div>
  );
};

export default PractitionerSearch;
