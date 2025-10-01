"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollAnimationWrapperProps {
  children: React.ReactNode;
  animationType?: "fadeIn" | "slideUp" | "slideLeft" | "slideRight" | "scale" | "rotateIn";
  duration?: number;
  delay?: number;
  threshold?: number;
}

export function ScrollAnimationWrapper({
  children,
  animationType = "fadeIn",
  duration = 1000,
  delay = 0,
  threshold = 0.1
}: ScrollAnimationWrapperProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold]);

  const getAnimationClasses = () => {
    const baseClasses = "transition-all ease-out";
    const durationClass = `duration-[${duration}ms]`;
    const delayClass = delay > 0 ? `delay-[${delay}ms]` : "";

    switch (animationType) {
      case "fadeIn":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`;
      
      case "slideUp":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`;
      
      case "slideLeft":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
        }`;
      
      case "slideRight":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
        }`;
      
      case "scale":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`;
      
      case "rotateIn":
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100 rotate-0" : "opacity-0 rotate-3"
        }`;
      
      default:
        return `${baseClasses} ${durationClass} ${delayClass} ${
          isVisible ? "opacity-100" : "opacity-0"
        }`;
    }
  };

  return (
    <div ref={ref} className={getAnimationClasses()}>
      {children}
    </div>
  );
}