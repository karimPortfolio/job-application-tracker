export function AIChipSvg({ className }: { className?: string }) {
  return (
    <svg
      width="400"
      height="400"
      viewBox="0 0 400 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle
        cx="200"
        cy="200"
        r="120"
        fill="url(#paint0_radial)"
        fillOpacity="0.4"
      />

      <rect
        x="100"
        y="100"
        width="200"
        height="200"
        rx="24"
        fill="#1A1C20"
        stroke="#2D63ED"
        strokeWidth="2"
        strokeOpacity="0.3"
      />
      <rect x="105" y="105" width="190" height="190" rx="20" fill="#0C0E12" />

      <path
        d="M100 150H80M100 200H70M100 250H80M300 150H320M300 200H330M300 250H320M150 100V80M200 100V70M250 100V80M150 300V320M200 300V330M250 300V320"
        stroke="#2D63ED"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />

      <rect
        x="130"
        y="130"
        width="140"
        height="140"
        rx="16"
        fill="url(#paint1_linear)"
      />
      <rect
        x="131"
        y="131"
        width="138"
        height="138"
        rx="15"
        stroke="white"
        strokeOpacity="0.1"
      />

      <text
        x="50%"
        y="50%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontFamily="Space Grotesk, sans-serif"
        fontSize="56"
        fontWeight="900"
        fill="white"
        style={{ filter: "drop-shadow(0px 0px 8px rgba(45, 99, 237, 0.8))" }}
      >
        AI
      </text>

      <circle cx="150" cy="150" r="3" fill="#2D63ED">
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="2s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="250" cy="150" r="3" fill="#2D63ED">
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="2s"
          begin="0.5s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="250" cy="250" r="3" fill="#2D63ED">
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="2s"
          begin="1s"
          repeatCount="indefinite"
        />
      </circle>
      <circle cx="150" cy="250" r="3" fill="#2D63ED">
        <animate
          attributeName="opacity"
          values="0.2;1;0.2"
          dur="2s"
          begin="1.5s"
          repeatCount="indefinite"
        />
      </circle>

      <defs>
        <radialGradient
          id="paint0_radial"
          cx="0"
          cy="0"
          r="1"
          gradientUnits="userSpaceOnUse"
          gradientTransform="translate(200 200) rotate(90) scale(120)"
        >
          <stop stopColor="#2D63ED" />
          <stop offset="1" stopColor="#2D63ED" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="paint1_linear"
          x1="130"
          y1="130"
          x2="270"
          y2="270"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#2D63ED" stopOpacity="0.8" />
          <stop offset="1" stopColor="#1A1C20" />
        </linearGradient>
      </defs>
    </svg>
  );
}
