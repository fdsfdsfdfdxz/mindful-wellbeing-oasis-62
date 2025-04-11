
import { useState } from "react";
import { Save, Download, CheckCircle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";

interface WorksheetField {
  id: string;
  type: "text" | "longText" | "multipleChoice" | "checkbox";
  label: string;
  placeholder?: string;
  required?: boolean;
  options?: string[];
}

interface InteractiveWorksheetProps {
  title: string;
  description: string;
  instructions: string;
  fields: WorksheetField[];
  onSave?: (data: Record<string, any>) => void;
  onComplete?: () => void;
}

const InteractiveWorksheet = ({
  title,
  description,
  instructions,
  fields,
  onSave,
  onComplete
}: InteractiveWorksheetProps) => {
  const [values, setValues] = useState<Record<string, any>>({});
  const [isSaved, setIsSaved] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleChange = (fieldId: string, value: any) => {
    setValues(prev => ({
      ...prev,
      [fieldId]: value
    }));
    setIsSaved(false);
  };

  const handleSave = () => {
    if (onSave) {
      onSave(values);
    }
    
    setIsSaved(true);
    toast({
      title: "Progress Saved",
      description: "Your worksheet progress has been saved.",
    });
  };

  const handleSubmit = () => {
    // Check if all required fields are filled
    const requiredFields = fields.filter(field => field.required);
    const allRequiredFilled = requiredFields.every(field => {
      const value = values[field.id];
      return value !== undefined && value !== "" && value !== null;
    });

    if (!allRequiredFilled) {
      toast({
        title: "Incomplete Worksheet",
        description: "Please fill in all required fields before submitting.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitted(true);
    if (onComplete) {
      onComplete();
    }
    
    toast({
      title: "Worksheet Completed",
      description: "Your worksheet has been submitted successfully.",
    });
  };

  const handleReset = () => {
    if (confirm("Are you sure you want to reset this worksheet? All your entries will be cleared.")) {
      setValues({});
      setIsSaved(false);
      setIsSubmitted(false);
      
      toast({
        title: "Worksheet Reset",
        description: "All entries have been cleared.",
      });
    }
  };

  const handleDownload = () => {
    // In a real app, this would generate a PDF or other document
    toast({
      title: "Worksheet Downloaded",
      description: "Your worksheet has been downloaded with your responses.",
    });
  };

  const renderField = (field: WorksheetField) => {
    switch (field.type) {
      case "text":
        return (
          <Input
            id={field.id}
            placeholder={field.placeholder || ""}
            value={values[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            disabled={isSubmitted}
            required={field.required}
          />
        );
      
      case "longText":
        return (
          <Textarea
            id={field.id}
            placeholder={field.placeholder || ""}
            value={values[field.id] || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className="min-h-[120px]"
            disabled={isSubmitted}
            required={field.required}
          />
        );
      
      case "multipleChoice":
        return (
          <RadioGroup
            value={values[field.id] || ""}
            onValueChange={(value) => handleChange(field.id, value)}
            disabled={isSubmitted}
          >
            {field.options?.map((option, i) => (
              <div key={i} className="flex items-center space-x-2">
                <RadioGroupItem value={option} id={`${field.id}-option-${i}`} />
                <Label htmlFor={`${field.id}-option-${i}`}>{option}</Label>
              </div>
            ))}
          </RadioGroup>
        );
      
      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox 
              id={field.id} 
              checked={values[field.id] || false}
              onCheckedChange={(checked) => handleChange(field.id, checked)}
              disabled={isSubmitted}
            />
            <label
              htmlFor={field.id}
              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {field.label}
            </label>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <p className="text-gray-600">{description}</p>
      </CardHeader>
      <CardContent className="space-y-6">
        {instructions && (
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold mb-2">Instructions:</h3>
            <p className="text-sm">{instructions}</p>
          </div>
        )}
        
        {isSubmitted && (
          <div className="bg-green-50 p-4 rounded-md flex items-center">
            <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
            <span>Worksheet completed. You can download your responses or reset the form.</span>
          </div>
        )}
        
        <div className="space-y-4">
          {fields.map((field) => (
            <div key={field.id} className="space-y-2">
              {field.type !== "checkbox" && (
                <Label htmlFor={field.id} className="font-medium">
                  {field.label}
                  {field.required && <span className="text-red-500 ml-1">*</span>}
                </Label>
              )}
              {renderField(field)}
            </div>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2 pt-4 border-t">
        {!isSubmitted ? (
          <>
            <Button 
              variant="outline" 
              onClick={handleSave}
              disabled={isSubmitted}
              className="flex items-center"
            >
              <Save className="mr-2 h-4 w-4" />
              {isSaved ? "Saved" : "Save Progress"}
            </Button>
            <Button 
              onClick={handleSubmit}
              disabled={isSubmitted}
            >
              Submit Worksheet
            </Button>
          </>
        ) : (
          <>
            <Button 
              variant="outline" 
              onClick={handleDownload}
              className="flex items-center"
            >
              <Download className="mr-2 h-4 w-4" />
              Download Responses
            </Button>
            <Button 
              variant="secondary"
              onClick={handleReset}
              className="flex items-center"
            >
              <RefreshCw className="mr-2 h-4 w-4" />
              Reset Worksheet
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
};

export default InteractiveWorksheet;
