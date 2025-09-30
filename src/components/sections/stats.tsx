// src/components/sections/stats.tsx
"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useState, useEffect } from "react";
import { TrendingUp, Users, Globe, Award } from "lucide-react";

const stats = [
  {
    icon: TrendingUp,
    value: 25,
    suffix: "+",
    label: "Years of Excellence",
    color: "text-brand-600",
    bgColor: "bg-brand-50",
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "Happy Customers",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    icon: Globe,
    value: 30,
    suffix: "+",
    label: "Export Countries",
    color: "text-green-600",
    bgColor: "bg-green-50",
  },
  {
    icon: Award,
    value: 15,
    suffix: "+",
    label: "Quality Certifications",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
];

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepValue = value / steps;
    const stepDuration = duration / steps;
    
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCount(Math.min(Math.floor(stepValue * currentStep), value));
      
      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, stepDuration);
    
    return () => clearInterval(timer);
  }, [value]);
  
  return (
    <span className="text-4xl md:text-5xl font-bold">
      {count}{suffix}
    </span>
  );
}

export function Stats() {
  const { ref, inView } = useInView({
    threshold: 0.3,
    triggerOnce: true,
  });

  return (
    <section className="py-20 bg-white relative overflow-hidden" ref={ref}>
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5" />
      
      <div className="container relative">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-4 py-2 mb-4 text-sm font-semibold text-brand-600 bg-brand-50 rounded-full">
              Our Impact
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-4">
              Numbers That <span className="text-brand-600">Speak</span>
            </h2>
            <p className="text-lg text-zinc-600 max-w-2xl mx-auto">
              Our commitment to quality and excellence has earned us the trust of customers worldwide
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center group"
            >
              <div className="relative">
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-20 h-20 ${stat.bgColor} rounded-2xl mb-4 group-hover:scale-110 transition-transform`}>
                  <stat.icon className={`w-10 h-10 ${stat.color}`} />
                </div>
                
                {/* Value */}
                <div className={`${stat.color} mb-2`}>
                  {inView && <Counter value={stat.value} suffix={stat.suffix} />}
                </div>
                
                {/* Label */}
                <p className="text-zinc-600 font-medium">{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}