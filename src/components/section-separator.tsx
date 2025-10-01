// src/components/section-separator.tsx - ENHANCED VERSION
interface SectionSeparatorProps {
  variant?: "wave" | "diagonal" | "curve" | "zigzag" | "dots" | "organic" | "geometric";
  color?: "gray" | "green" | "blue" | "gradient" | "brand" | "emerald";
  direction?: "left" | "right";
  height?: "sm" | "md" | "lg" | "xl";
  intensity?: "subtle" | "medium" | "bold";
  animated?: boolean;
}

export function SectionSeparator({ 
  variant = "zigzag", 
  color = "green", 
  direction = "left",
  height = "md",
  intensity = "medium",
  animated = false
}: SectionSeparatorProps) {
  
  const getHeightClass = () => {
    switch (height) {
      case "sm": return "h-6";
      case "md": return "h-12";
      case "lg": return "h-20";
      case "xl": return "h-32";
      default: return "h-12";
    }
  };

  const getColorClasses = () => {
    switch (color) {
      case "gray": return "text-gray-200";
      case "green": return "text-green-100";
      case "blue": return "text-blue-100";
      case "brand": return "text-green-200";
      case "emerald": return "text-emerald-100";
      case "gradient": return "text-gray-200";
      default: return "text-green-100";
    }
  };

  const getGradientStyles = () => {
    if (color !== "gradient") return {};
    
    return {
      background: `linear-gradient(135deg, 
        rgba(34, 197, 94, 0.1) 0%,
        rgba(59, 130, 246, 0.1) 25%, 
        rgba(147, 51, 234, 0.1) 50%,
        rgba(236, 72, 153, 0.1) 75%,
        rgba(251, 146, 60, 0.1) 100%)`
    };
  };

  // Enhanced Zigzag with multiple patterns
  const renderZigzag = () => {
    const patterns = {
      subtle: {
        points: "M0,40L80,10L160,40L240,10L320,40L400,10L480,40L560,10L640,40L720,10L800,40L880,10L960,40L1040,10L1120,40L1200,10L1200,60L0,60Z",
        amplitude: 0.6
      },
      medium: {
        points: "M0,50L100,5L200,50L300,5L400,50L500,5L600,50L700,5L800,50L900,5L1000,50L1100,5L1200,50L1200,80L0,80Z",
        amplitude: 1
      },
      bold: {
        points: "M0,60L120,0L240,60L360,0L480,60L600,0L720,60L840,0L960,60L1080,0L1200,60L1200,120L0,120Z",
        amplitude: 1.5
      }
    };

    const pattern = patterns[intensity];
    
    return (
      <div className={`w-full ${getHeightClass()} relative overflow-hidden`} style={getGradientStyles()}>
        <svg
          className={`absolute inset-0 w-full h-full ${getColorClasses()} ${
            animated ? 'animate-pulse' : ''
          }`}
          preserveAspectRatio="none"
          viewBox="0 0 1200 120"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main zigzag pattern */}
          <path
            d={pattern.points}
            fill="currentColor"
            opacity={intensity === 'subtle' ? 0.3 : intensity === 'medium' ? 0.5 : 0.7}
          />
          
          {/* Secondary pattern for depth */}
          <path
            d={pattern.points}
            fill="currentColor"
            opacity={0.2}
            transform={`translate(${direction === 'left' ? '20' : '-20'}, -10) scale(${0.8 * pattern.amplitude})`}
          />
          
          {/* Accent dots for TUNAS ESTA branding */}
          {intensity !== 'subtle' && (
            <>
              <circle cx="150" cy="30" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="450" cy="30" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="750" cy="30" r="3" fill="currentColor" opacity="0.6" />
              <circle cx="1050" cy="30" r="3" fill="currentColor" opacity="0.6" />
            </>
          )}
        </svg>
        
        {/* Gradient overlay for brand colors */}
        {color === "brand" && (
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 via-emerald-500/10 to-green-600/10" />
        )}
      </div>
    );
  };

  // Organic wave pattern
  const renderOrganic = () => (
    <div className={`w-full ${getHeightClass()} relative overflow-hidden`} style={getGradientStyles()}>
      <svg
        className={`absolute inset-0 w-full h-full ${getColorClasses()}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0Q300,80,600,40T1200,20L1200,120L0,120Z"
          fill="currentColor"
          opacity="0.4"
        />
        <path
          d="M0,20Q300,100,600,60T1200,40L1200,120L0,120Z"
          fill="currentColor"
          opacity="0.3"
        />
      </svg>
    </div>
  );

  // Geometric pattern
  const renderGeometric = () => (
    <div className={`w-full ${getHeightClass()} relative overflow-hidden`} style={getGradientStyles()}>
      <svg
        className={`absolute inset-0 w-full h-full ${getColorClasses()}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon
          points="0,0 200,120 400,0 600,120 800,0 1000,120 1200,0 1200,120 0,120"
          fill="currentColor"
          opacity="0.5"
        />
        {/* Added triangular accents */}
        <polygon points="100,60 150,30 200,60" fill="currentColor" opacity="0.3" />
        <polygon points="500,60 550,30 600,60" fill="currentColor" opacity="0.3" />
        <polygon points="900,60 950,30 1000,60" fill="currentColor" opacity="0.3" />
      </svg>
    </div>
  );

  // Enhanced wave
  const renderWave = () => (
    <div className={`w-full ${getHeightClass()} relative overflow-hidden`}>
      <svg
        className={`absolute inset-0 w-full h-full ${getColorClasses()}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V120H0Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    </div>
  );

  // Enhanced diagonal
  const renderDiagonal = () => (
    <div className={`w-full ${getHeightClass()} relative overflow-hidden`}>
      <svg
        className={`absolute inset-0 w-full h-full ${getColorClasses()}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d={direction === "left" 
            ? "M0,0L1200,120L1200,120L0,120Z" 
            : "M0,120L1200,0L1200,120L0,120Z"
          }
          fill="currentColor"
          opacity="0.5"
        />
      </svg>
    </div>
  );

  // Enhanced curve
  const renderCurve = () => (
    <div className={`w-full ${getHeightClass()} relative overflow-hidden`}>
      <svg
        className={`absolute inset-0 w-full h-full ${getColorClasses()}`}
        preserveAspectRatio="none"
        viewBox="0 0 1200 120"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0,0Q600,120,1200,0L1200,120L0,120Z"
          fill="currentColor"
          opacity="0.4"
        />
      </svg>
    </div>
  );

  // Animated dots
  const renderDots = () => (
    <div className={`w-full ${getHeightClass()} flex items-center justify-center`}>
      <div className="flex space-x-4">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full ${
              color === "gradient" 
                ? "bg-gradient-to-r from-green-400 to-blue-400" 
                : `bg-${color}-300`
            } ${animated ? 'animate-pulse' : ''}`}
            style={{ animationDelay: `${i * 200}ms` }}
          />
        ))}
      </div>
    </div>
  );

  const renderSeparator = () => {
    switch (variant) {
      case "wave": return renderWave();
      case "diagonal": return renderDiagonal();
      case "curve": return renderCurve();
      case "zigzag": return renderZigzag();
      case "organic": return renderOrganic();
      case "geometric": return renderGeometric();
      case "dots": return renderDots();
      default: return renderZigzag();
    }
  };

  return (
    <div className="relative">
      {renderSeparator()}
    </div>
  );
}