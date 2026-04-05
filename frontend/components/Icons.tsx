/* Professional SVG Icons for CarVal AI */

const iconBase = {
  fill: "none",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  xmlns: "http://www.w3.org/2000/svg",
};

export const Icons = {
  // Hero car icon
  CarHero: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 17h14M5 17a2 2 0 01-2-2v-3a1 1 0 011-1h1l2-4h10l2 4h1a1 1 0 011 1v3a2 2 0 01-2 2M5 17a2 2 0 100 4 2 2 0 000-4zm14 0a2 2 0 100 4 2 2 0 000-4z"
      />
    </svg>
  ),

  // AI/Brain icon
  Brain: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a5 5 0 015 5c0 .74-.16 1.43-.45 2.05A5.002 5.002 0 0119 13a5 5 0 01-3 4.58V20a2 2 0 01-2 2h-4a2 2 0 01-2-2v-2.42A5 5 0 015 13a5.002 5.002 0 012.45-3.95A4.98 4.98 0 017 7a5 5 0 015-5zm-1 8v4m2-4v4"
      />
    </svg>
  ),

  // Lightning bolt
  Lightning: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"
      />
    </svg>
  ),

  // Chart/Analytics
  Chart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 3v18h18M7 16l4-6 4 3 5-7"
      />
    </svg>
  ),

  // Target
  Target: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a10 10 0 100 20 10 10 0 000-20zm0 4a6 6 0 100 12 6 6 0 000-12zm0 4a2 2 0 100 4 2 2 0 000-4z"
      />
    </svg>
  ),

  // Chevron down
  ChevronDown: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 9l6 6 6-6"
      />
    </svg>
  ),

  // Arrow right
  ArrowRight: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 12h14m-7-7l7 7-7 7"
      />
    </svg>
  ),

  // Arrow left
  ArrowLeft: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 12H5m7-7l-7 7 7 7"
      />
    </svg>
  ),

  // Car small (for navigation and form)
  CarSmall: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5 16h14M5 16a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm14 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM3 13h18M4 13l1.5-4h13L20 13"
      />
    </svg>
  ),

  // Gear/Settings
  Gear: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
      />
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"
      />
    </svg>
  ),

  // Check/Success
  Check: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 6L9 17l-5-5"
      />
    </svg>
  ),

  // Clipboard
  Clipboard: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"
      />
      <rect
        x="8"
        y="2"
        width="8"
        height="4"
        rx="1"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  ),

  // Tag
  Tag: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
      />
      <circle cx="7" cy="7" r="1" fill="currentColor" />
    </svg>
  ),

  // Calendar
  Calendar: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19 4H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2V6a2 2 0 00-2-2zM16 2v4M8 2v4M3 10h18"
      />
    </svg>
  ),

  // Road/Distance
  Road: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8 2l-4 20M16 2l4 20M12 6v4M12 14v4"
      />
    </svg>
  ),

  // Fuel pump
  Fuel: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17M7 10h4M15 8h2a2 2 0 012 2v4a2 2 0 002 2v0a2 2 0 002-2V9l-3-3"
      />
    </svg>
  ),

  // User
  User: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z"
      />
    </svg>
  ),

  // Star
  Star: (props: React.SVGProps<SVGSVGElement> & { filled?: boolean }) => {
    const { filled, ...rest } = props;
    return (
      <svg {...iconBase} {...rest}>
        <path
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill={filled ? "currentColor" : "none"}
        />
      </svg>
    );
  },

  // Heart
  Heart: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"
      />
    </svg>
  ),

  // Alert/Error
  AlertCircle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 12A10 10 0 1112 2a10 10 0 0110 10zM12 8v4M12 16h.01"
      />
    </svg>
  ),

  // Warning
  AlertTriangle: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0zM12 9v4M12 17h.01"
      />
    </svg>
  ),

  // Search/Magnifying glass
  Search: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
      />
    </svg>
  ),

  // Crystal ball/Predict
  Predict: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 2a10 10 0 0110 10 10 10 0 01-10 10A10 10 0 012 12 10 10 0 0112 2zM12 8v4l3 3"
      />
    </svg>
  ),

  // Thank you/Hands (using a simple check-circle)
  ThankYou: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} {...props}>
      <path
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 11.08V12a10 10 0 11-5.93-9.14"
      />
      <path
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M22 4L12 14.01l-3-3"
      />
    </svg>
  ),

  // Logo - Custom car + AI icon
  Logo: (props: React.SVGProps<SVGSVGElement>) => (
    <svg {...iconBase} viewBox="0 0 32 32" {...props}>
      <path
        d="M8 20h16M8 20a1.5 1.5 0 110 3 1.5 1.5 0 010-3zm16 0a1.5 1.5 0 110 3 1.5 1.5 0 010-3zM4 17h24M5 17l2-5h14l3 5"
        stroke="currentColor"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="16" cy="10" r="2" stroke="currentColor" strokeWidth="1.5" fill="none" />
      <path
        d="M16 6v2M16 12v2M12 8h2M18 8h2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
};

export type IconName = keyof typeof Icons;
