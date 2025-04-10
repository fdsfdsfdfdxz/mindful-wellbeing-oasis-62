
import { useState } from "react";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { useService } from "@/contexts/ServiceContext";
import { processServiceAccess, saveAccessToken } from "@/services/paymentService";

interface PromoFormProps {
  isProcessing: boolean;
  setIsProcessing: React.Dispatch<React.SetStateAction<boolean>>;
}

const PromoForm = ({ isProcessing, setIsProcessing }: PromoFormProps) => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const { setAccessResult } = useService();

  const promoForm = useForm({
    defaultValues: {
      promoCode: ""
    }
  });

  const onSubmitPromo = async (data: { promoCode: string }) => {
    if (!data.promoCode.trim()) {
      toast({
        title: translate('gainService', 'promoRequired', language) || "Promo code required",
        description: translate('gainService', 'enterValidPromo', language) || "Please enter a valid promo code",
        variant: "destructive",
        duration: 3000
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await processServiceAccess({
        method: 'promoCode',
        promoCode: data.promoCode
      });
      
      if (result.success) {
        saveAccessToken(result);
        setAccessResult(result, 'promoCode');
        
        toast({
          title: translate('gainService', 'promoApplied', language),
          description: result.message,
          duration: 3000
        });
      } else {
        toast({
          title: translate('gainService', 'promoError', language) || "Error",
          description: result.message,
          variant: "destructive",
          duration: 3000
        });
      }
    } catch (error) {
      toast({
        title: translate('gainService', 'error', language) || "Error",
        description: (error instanceof Error) ? error.message : String(error),
        variant: "destructive",
        duration: 3000
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return (
    <Form {...promoForm}>
      <form onSubmit={promoForm.handleSubmit(onSubmitPromo)} className="w-full space-y-2">
        <FormField
          control={promoForm.control}
          name="promoCode"
          render={({ field }) => (
            <FormItem>
              <div className="flex space-x-2">
                <FormControl>
                  <input 
                    placeholder={translate('gainService', 'enterPromoCode', language)} 
                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                    {...field} 
                    disabled={isProcessing}
                  />
                </FormControl>
                <Button type="submit" size="sm" disabled={isProcessing}>
                  {isProcessing ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    translate('gainService', 'apply', language)
                  )}
                </Button>
              </div>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

export default PromoForm;
