import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { X, Filter } from "lucide-react";
import { PractitionerFilter, SpecialtyArea, TherapyApproach } from "@/types/practitioner";
import {
  getAllSpecialties,
  getAllApproaches,
  getAllLanguages,
  getAllInsurances,
} from "@/services/practitionerService";

interface PractitionerFiltersProps {
  filters: PractitionerFilter;
  onFiltersChange: (filters: PractitionerFilter) => void;
  className?: string;
}

const PractitionerFilters: React.FC<PractitionerFiltersProps> = ({
  filters,
  onFiltersChange,
  className,
}) => {
  const [expanded, setExpanded] = useState(false);
  
  const specialties = getAllSpecialties();
  const approaches = getAllApproaches();
  const languages = getAllLanguages();
  const insurances = getAllInsurances();
  
  const handleSpecialtyToggle = (specialty: SpecialtyArea) => {
    const currentSpecialties = filters.specialties || [];
    const updated = currentSpecialties.includes(specialty)
      ? currentSpecialties.filter((s) => s !== specialty)
      : [...currentSpecialties, specialty];
    
    onFiltersChange({ ...filters, specialties: updated });
  };
  
  const handleApproachToggle = (approach: TherapyApproach) => {
    const currentApproaches = filters.approaches || [];
    const updated = currentApproaches.includes(approach)
      ? currentApproaches.filter((a) => a !== approach)
      : [...currentApproaches, approach];
    
    onFiltersChange({ ...filters, approaches: updated });
  };
  
  const handleLanguageToggle = (language: string) => {
    const currentLanguages = filters.languages || [];
    const updated = currentLanguages.includes(language)
      ? currentLanguages.filter((l) => l !== language)
      : [...currentLanguages, language];
    
    onFiltersChange({ ...filters, languages: updated });
  };
  
  const handleInsuranceToggle = (insurance: string) => {
    const currentInsurances = filters.insuranceAccepted || [];
    const updated = currentInsurances.includes(insurance)
      ? currentInsurances.filter((i) => i !== insurance)
      : [...currentInsurances, insurance];
    
    onFiltersChange({ ...filters, insuranceAccepted: updated });
  };
  
  const handleVerificationChange = (value: string) => {
    onFiltersChange({
      ...filters,
      verificationStatus: value === "all" ? undefined : value as any,
    });
  };
  
  const handleMaxRateChange = (value: number[]) => {
    onFiltersChange({ ...filters, maxRate: value[0] });
  };
  
  const handleMinRatingChange = (value: string) => {
    onFiltersChange({
      ...filters,
      minRating: value === "all" ? undefined : Number(value),
    });
  };
  
  const handleMinExperienceChange = (value: string) => {
    onFiltersChange({
      ...filters,
      minExperience: value === "all" ? undefined : Number(value),
    });
  };
  
  const handleDayChange = (value: string) => {
    onFiltersChange({
      ...filters,
      availableDay: value === "all" ? undefined : value as any,
    });
  };
  
  const handleResetFilters = () => {
    onFiltersChange({});
  };
  
  const getActiveFilterCount = () => {
    let count = 0;
    if (filters.specialties?.length) count += filters.specialties.length;
    if (filters.approaches?.length) count += filters.approaches.length;
    if (filters.languages?.length) count += filters.languages.length;
    if (filters.minRating) count++;
    if (filters.verificationStatus) count++;
    if (filters.minExperience) count++;
    if (filters.maxRate) count++;
    if (filters.availableDay) count++;
    if (filters.insuranceAccepted?.length) count += filters.insuranceAccepted.length;
    return count;
  };

  const activeFilterCount = getActiveFilterCount();

  // Helper functions
  const getSpecialtyLabel = (value: SpecialtyArea): string => {
    const specialty = specialties.find(s => s.value === value);
    return specialty ? specialty.label : value;
  };
  
  const getLanguageLabel = (value: string): string => {
    const language = languages.find(l => l === value);
    return language ? language : value;
  };
  
  const getApproachLabel = (value: TherapyApproach): string => {
    const approach = approaches.find(a => a.value === value);
    return approach ? approach.label : value;
  };
  
  return (
    <div className={`bg-white rounded-lg ${className}`}>
      <div className="flex justify-between items-center p-4">
        <Button
          variant="outline"
          onClick={() => setExpanded(!expanded)}
          className="flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
          {activeFilterCount > 0 && (
            <Badge variant="secondary">{activeFilterCount}</Badge>
          )}
        </Button>
        
        {activeFilterCount > 0 && (
          <Button
            variant="ghost"
            onClick={handleResetFilters}
            size="sm"
            className="text-muted-foreground"
          >
            Reset all
          </Button>
        )}
      </div>
      
      {expanded && (
        <div className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium mb-2">Specialties</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {specialties.map((specialty) => (
                <div key={specialty.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty.value}`}
                    checked={filters.specialties?.includes(specialty.value) || false}
                    onCheckedChange={() => handleSpecialtyToggle(specialty.value)}
                  />
                  <Label
                    htmlFor={`specialty-${specialty.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {specialty.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Approaches</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {approaches.map((approach) => (
                <div key={approach.value} className="flex items-center space-x-2">
                  <Checkbox
                    id={`approach-${approach.value}`}
                    checked={filters.approaches?.includes(approach.value) || false}
                    onCheckedChange={() => handleApproachToggle(approach.value)}
                  />
                  <Label
                    htmlFor={`approach-${approach.value}`}
                    className="text-sm cursor-pointer"
                  >
                    {approach.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Languages</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {languages.map((language) => (
                <div key={language} className="flex items-center space-x-2">
                  <Checkbox
                    id={`language-${language}`}
                    checked={filters.languages?.includes(language) || false}
                    onCheckedChange={() => handleLanguageToggle(language)}
                  />
                  <Label
                    htmlFor={`language-${language}`}
                    className="text-sm cursor-pointer"
                  >
                    {language}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-2">Insurance Accepted</h3>
            <div className="space-y-2 max-h-48 overflow-y-auto">
              {insurances.map((insurance) => (
                <div key={insurance} className="flex items-center space-x-2">
                  <Checkbox
                    id={`insurance-${insurance}`}
                    checked={filters.insuranceAccepted?.includes(insurance) || false}
                    onCheckedChange={() => handleInsuranceToggle(insurance)}
                  />
                  <Label
                    htmlFor={`insurance-${insurance}`}
                    className="text-sm cursor-pointer"
                  >
                    {insurance}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="verification" className="font-medium">Verification Status</Label>
              <Select
                value={filters.verificationStatus || "all"}
                onValueChange={handleVerificationChange}
              >
                <SelectTrigger id="verification">
                  <SelectValue placeholder="Any status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any status</SelectItem>
                  <SelectItem value="verified">Verified only</SelectItem>
                  <SelectItem value="pending">Pending verification</SelectItem>
                  <SelectItem value="unverified">Unverified</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="rating" className="font-medium">Minimum Rating</Label>
              <Select
                value={filters.minRating?.toString() || "all"}
                onValueChange={handleMinRatingChange}
              >
                <SelectTrigger id="rating">
                  <SelectValue placeholder="Any rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any rating</SelectItem>
                  <SelectItem value="4.5">4.5+</SelectItem>
                  <SelectItem value="4">4.0+</SelectItem>
                  <SelectItem value="3.5">3.5+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="experience" className="font-medium">Experience</Label>
              <Select
                value={filters.minExperience?.toString() || "all"}
                onValueChange={handleMinExperienceChange}
              >
                <SelectTrigger id="experience">
                  <SelectValue placeholder="Any experience" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any experience</SelectItem>
                  <SelectItem value="1">1+ years</SelectItem>
                  <SelectItem value="5">5+ years</SelectItem>
                  <SelectItem value="10">10+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="availableDay" className="font-medium">Available Day</Label>
              <Select
                value={filters.availableDay || "all"}
                onValueChange={handleDayChange}
              >
                <SelectTrigger id="availableDay">
                  <SelectValue placeholder="Any day" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any day</SelectItem>
                  <SelectItem value="monday">Monday</SelectItem>
                  <SelectItem value="tuesday">Tuesday</SelectItem>
                  <SelectItem value="wednesday">Wednesday</SelectItem>
                  <SelectItem value="thursday">Thursday</SelectItem>
                  <SelectItem value="friday">Friday</SelectItem>
                  <SelectItem value="saturday">Saturday</SelectItem>
                  <SelectItem value="sunday">Sunday</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <div className="flex justify-between">
                <Label className="font-medium">Maximum Rate</Label>
                {filters.maxRate && (
                  <span className="text-sm">${filters.maxRate}</span>
                )}
              </div>
              <Slider
                defaultValue={[250]}
                max={500}
                step={10}
                value={[filters.maxRate || 250]}
                onValueChange={handleMaxRateChange}
                className="my-2"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>$0</span>
                <span>$500+</span>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {expanded && activeFilterCount > 0 && (
        <div className="px-4 py-2 border-t">
          <div className="flex flex-wrap gap-2">
            {filters.specialties?.map((specialty) => (
              <Badge
                key={specialty}
                variant="secondary"
                className="flex items-center gap-1"
              >
                {getSpecialtyLabel(specialty)}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => handleSpecialtyToggle(specialty)}
                />
              </Badge>
            ))}
            
            {filters.minRating && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filters.minRating}+ stars
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFiltersChange({ ...filters, minRating: undefined })}
                />
              </Badge>
            )}
            
            {filters.verificationStatus && (
              <Badge
                variant="secondary"
                className="flex items-center gap-1"
              >
                {filters.verificationStatus === "verified" ? "Verified" : 
                  filters.verificationStatus === "pending" ? "Pending" : "Unverified"}
                <X
                  className="h-3 w-3 cursor-pointer"
                  onClick={() => onFiltersChange({ ...filters, verificationStatus: undefined })}
                />
              </Badge>
            )}
            
            {/* Add more active filters here as needed */}
          </div>
        </div>
      )}
    </div>
  );
};

export default PractitionerFilters;
