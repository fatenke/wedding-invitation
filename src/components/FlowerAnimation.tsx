import { motion, useReducedMotion } from "framer-motion";

interface FlowerAnimationProps {
  open: boolean;
  dissolving: boolean;
}

const outerPetals = Array.from({ length: 9 }, (_, index) => index * 40);
const middlePetals = Array.from({ length: 7 }, (_, index) => 14 + index * (360 / 7));
const innerPetals = Array.from({ length: 5 }, (_, index) => 18 + index * 72);

export default function FlowerAnimation({
  open,
  dissolving,
}: FlowerAnimationProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.svg
      className="blooming-flower"
      viewBox="0 0 400 420"
      role="img"
      aria-label="An ivory flower slowly blooming"
      animate={
        dissolving
          ? { opacity: 0, y: -22, scale: 0.86, rotate: -5 }
          : { opacity: 1, y: 0, scale: 1, rotate: 0 }
      }
      transition={{ duration: reducedMotion ? 0 : 0.85, ease: "easeInOut" }}
    >
      <defs>
        <linearGradient id="outer-petal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFCF7" />
          <stop offset="54%" stopColor="#F2E6D5" />
          <stop offset="100%" stopColor="#D9C4A6" />
        </linearGradient>
        <linearGradient id="middle-petal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFEFA" />
          <stop offset="58%" stopColor="#F3E6D5" />
          <stop offset="100%" stopColor="#DCC6A8" />
        </linearGradient>
        <linearGradient id="inner-petal" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#FFFEFC" />
          <stop offset="100%" stopColor="#E9D7BE" />
        </linearGradient>
        <radialGradient id="flower-heart">
          <stop offset="0%" stopColor="#F6DEAA" />
          <stop offset="72%" stopColor="#D5B276" />
          <stop offset="100%" stopColor="#B7935E" />
        </radialGradient>
        <linearGradient id="stem" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0%" stopColor="#A7A082" />
          <stop offset="100%" stopColor="#777C64" />
        </linearGradient>
        <filter id="petal-shadow" x="-35%" y="-25%" width="170%" height="175%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
          <feOffset dy="3" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.16" />
          </feComponentTransfer>
          <feMerge>
            <feMergeNode />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      <g
        stroke="url(#stem)"
        strokeLinecap="round"
        strokeWidth="3"
        opacity="0.78"
      >
        <path d="M200 202 C198 242 203 282 199 333" fill="none" />
        <path
          d="M199 270 C173 251 154 253 142 258 C158 275 177 283 199 278Z"
          fill="#A7A082"
          fillOpacity="0.24"
        />
        <path
          d="M201 304 C224 284 243 284 256 289 C239 306 221 314 200 311Z"
          fill="#A7A082"
          fillOpacity="0.24"
        />
      </g>

      <g filter="url(#petal-shadow)" stroke="#C6A56B" strokeOpacity="0.18" strokeWidth="0.8">
        {outerPetals.map((angle, index) => (
          <motion.g
            key={`outer-${angle}`}
            style={{ transformOrigin: "200px 205px" }}
            animate={{
              rotate: angle + (open ? 0 : index % 2 === 0 ? -10 : 10),
              scale: open ? 1 : 0.17,
              y: open ? 0 : 17,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.72,
              delay: reducedMotion || !open ? 0 : 0.38 + index * 0.035,
              ease: [0.22, 0.72, 0.2, 1],
            }}
          >
            <path
              d="M200 211 C170 188 147 160 149 132 C150 101 175 74 200 60 C225 74 250 101 251 132 C253 160 230 188 200 211Z"
              fill="url(#outer-petal)"
            />
            <path
              d="M200 200 C184 163 185 119 200 79"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.38"
              strokeWidth="1.1"
            />
          </motion.g>
        ))}
      </g>

      <g stroke="#C6A56B" strokeOpacity="0.2" strokeWidth="0.75">
        {middlePetals.map((angle, index) => (
          <motion.g
            key={`middle-${angle}`}
            style={{ transformOrigin: "200px 205px" }}
            animate={{
              rotate: angle,
              scale: open ? 0.79 : 0.12,
              y: open ? 0 : 12,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.55,
              delay: reducedMotion || !open ? 0 : 0.16 + index * 0.035,
              ease: [0.22, 0.72, 0.2, 1],
            }}
          >
            <path
              d="M200 210 C174 189 160 165 162 140 C164 116 182 94 200 83 C218 94 236 116 238 140 C240 165 226 189 200 210Z"
              fill="url(#middle-petal)"
            />
            <path
              d="M200 200 C188 169 190 135 200 102"
              fill="none"
              stroke="#FFFFFF"
              strokeOpacity="0.42"
              strokeWidth="1"
            />
          </motion.g>
        ))}
      </g>

      <g stroke="#C6A56B" strokeOpacity="0.22" strokeWidth="0.7">
        {innerPetals.map((angle, index) => (
          <motion.g
            key={`inner-${angle}`}
            style={{ transformOrigin: "200px 205px" }}
            animate={{
              rotate: angle,
              scale: open ? 0.52 : 0.1,
              y: open ? 0 : 8,
            }}
            transition={{
              duration: reducedMotion ? 0 : 1.3,
              delay: reducedMotion || !open ? 0 : index * 0.04,
              ease: [0.22, 0.72, 0.2, 1],
            }}
          >
            <path
              d="M200 207 C180 190 173 169 177 148 C180 132 191 119 200 111 C209 119 220 132 223 148 C227 169 220 190 200 207Z"
              fill="url(#inner-petal)"
            />
          </motion.g>
        ))}
      </g>

      <motion.g
        style={{ transformOrigin: "200px 205px" }}
        animate={{ scale: open ? 1 : 0.4 }}
        transition={{ duration: reducedMotion ? 0 : 1.15, delay: open ? 0.2 : 0 }}
      >
        <circle cx="200" cy="155" r="7" fill="url(#flower-heart)" />
        <circle cx="195" cy="152" r="1.5" fill="#F8E9C8" />
        <circle cx="204" cy="153" r="1.7" fill="#E5CA92" />
        <circle cx="200" cy="160" r="1.4" fill="#FFF9E9" />
        <circle cx="207" cy="158" r="1.3" fill="#D8BC7E" />
        <circle cx="192" cy="158" r="1.2" fill="#E5CA92" />
      </motion.g>
    </motion.svg>
  );
}
