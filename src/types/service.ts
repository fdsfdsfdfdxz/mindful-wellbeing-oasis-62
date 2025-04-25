
import { ServiceAccessMethod } from "@/services/paymentService";
import { ReactNode } from "react";

export interface ServiceItem {
  id: ServiceAccessMethod;
  title: string;
  description: string;
  icon: ReactNode;
  iconBg: string;
  link: string;
  badges: string[];
  benefits: string[];
  isNew?: boolean;
}

export interface ServiceCategoryData {
  title: string;
  description: string;
  services: ServiceItem[];
}
