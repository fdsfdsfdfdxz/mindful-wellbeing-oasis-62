
import React from "react";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Perform search with current query
    // This is handled by the parent component via onSearchChange already
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search by name, specialty, or keywords..."
        value={searchQuery}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10 border-none shadow-sm"
      />
      <Button type="submit" className="sr-only">
        Search
      </Button>
    </form>
  );
};

export default PractitionerSearch;
