
import React from 'react';
import { ServiceCategoryData } from '@/types/service';
import ServiceCategory from './ServiceCategory';
import ServiceCard from './ServiceCard';

interface ServiceListProps {
  categories: ServiceCategoryData[];
  activeCardIndex: number | null;
  onServiceClick: (link: string, index: number) => void;
}

const ServiceList = ({ categories, activeCardIndex, onServiceClick }: ServiceListProps) => {
  let globalIndex = 0;

  return (
    <div className="space-y-20">
      {categories.map((category) => (
        <ServiceCategory 
          key={category.title}
          title={category.title}
          description={category.description}
        >
          {category.services.map((service) => {
            const currentIndex = globalIndex++;
            return (
              <ServiceCard
                key={service.id}
                {...service}
                isSelected={activeCardIndex === currentIndex}
                isProcessing={false}
                isActive={false}
                hasAccess={false}
                onSelect={() => onServiceClick(service.link, currentIndex)}
              />
            );
          })}
        </ServiceCategory>
      ))}
    </div>
  );
};

export default ServiceList;
