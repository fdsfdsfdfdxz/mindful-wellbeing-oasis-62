
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import PractitionerCard from "@/components/practitioners/PractitionerCard";
import PractitionerSearch from "@/components/practitioners/PractitionerSearch";
import PractitionerFilters from "@/components/practitioners/PractitionerFilters";
import { searchPractitioners } from "@/services/practitionerService";
import { PractitionerFilter } from "@/types/practitioner";
import { Separator } from "@/components/ui/separator";

const PractitionerDirectory: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<PractitionerFilter>({});
  
  // Debounce search query
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchQuery]);
  
  const {
    data: practitioners,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["practitioners", debouncedQuery, filters],
    queryFn: () => searchPractitioners(debouncedQuery, filters),
  });
  
  useEffect(() => {
    if (isError) {
      toast({
        title: "Error",
        description: `Failed to load practitioners: ${(error as Error).message}`,
        variant: "destructive",
      });
    }
  }, [isError, error, toast]);
  
  return (
    <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Find a Mental Health Practitioner</h1>
        <p className="text-muted-foreground">
          Connect with verified mental health professionals specialized in various areas
        </p>
      </div>
      
      <div className="mb-6">
        <PractitionerSearch
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          className="mb-4"
        />
        <PractitionerFilters
          filters={filters}
          onFiltersChange={setFilters}
          className="mb-4"
        />
        <Separator className="my-6" />
      </div>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : practitioners && practitioners.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {practitioners.length} practitioner{practitioners.length !== 1 ? "s" : ""} found
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {practitioners.map((practitioner) => (
              <PractitionerCard
                key={practitioner.id}
                practitioner={practitioner}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-xl font-semibold mb-2">No practitioners found</h3>
          <p className="text-muted-foreground mb-6">
            Try adjusting your search or filters to find mental health professionals
          </p>
          <Button onClick={() => {
            setSearchQuery("");
            setFilters({});
          }}>
            Reset all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default PractitionerDirectory;
