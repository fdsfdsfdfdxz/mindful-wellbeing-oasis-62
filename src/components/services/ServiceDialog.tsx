
import { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { translate } from "@/utils/translations";
import { ServiceAccessMethod } from "@/services/paymentService";

interface ServiceDialogProps {
  isOpen: boolean;
  onClose: () => void;
  selectedMethod: ServiceAccessMethod | null;
  isProcessing: boolean;
  onProceed: () => void;
  referralCode: string;
  setReferralCode: React.Dispatch<React.SetStateAction<string>>;
  userEmail: string;
  setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

const ServiceDialog = ({
  isOpen,
  onClose,
  selectedMethod,
  isProcessing,
  onProceed,
  referralCode,
  setReferralCode,
  userEmail,
  setUserEmail
}: ServiceDialogProps) => {
  const { language } = useLanguage();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {selectedMethod === 'referral' 
              ? translate('gainService', 'referralInformation', language) || "Enter Referral Code" 
              : translate('gainService', 'additionalInformation', language) || "Additional Information"}
          </DialogTitle>
          <DialogDescription>
            {selectedMethod === 'referral' 
              ? translate('gainService', 'referralDesc', language)
              : translate('gainService', 'completeInformation', language) || "Please complete the required information"}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {selectedMethod === 'referral' && (
            <div className="space-y-2">
              <Label htmlFor="referralCode">
                {translate('gainService', 'referralCode', language) || "Referral Code"}
              </Label>
              <Input 
                id="referralCode"
                value={referralCode}
                onChange={(e) => setReferralCode(e.target.value)}
                placeholder={translate('gainService', 'enterReferralCode', language) || "Enter referral code"}
                disabled={isProcessing}
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="email">
              {translate('gainService', 'email', language) || "Email"}
            </Label>
            <Input 
              id="email"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              placeholder={translate('gainService', 'enterEmail', language) || "Enter your email"}
              disabled={isProcessing}
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isProcessing}>
            {translate('gainService', 'cancel', language) || "Cancel"}
          </Button>
          <Button onClick={onProceed} disabled={isProcessing}>
            {isProcessing && <Loader2 className="h-4 w-4 animate-spin mr-2" />}
            {translate('gainService', 'proceed', language) || "Proceed"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ServiceDialog;
