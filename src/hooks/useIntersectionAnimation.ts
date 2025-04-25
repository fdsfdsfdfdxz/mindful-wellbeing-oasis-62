
import { useState, useEffect, useRef, RefObject } from 'react';

export const useIntersectionAnimation = (threshold = 0.2): [RefObject<HTMLDivElement>, boolean] => {
  const [animate, setAnimate] = useState<boolean>(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setAnimate(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, [threshold]);

  return [elementRef, animate];
};
