"use client";

const labels = [
  { name: "Recipes", emoji: "🍲" },
  { name: "AI Chat", emoji: "🤖" },
  { name: "Tips", emoji: "🍋" }, // anchor to a section on home
];

export default function ChefmateNavbarDesktop() {
  return (
    <nav
      className="
  sticky top-0 z-40
  backdrop-blur-xl
  bg-gradient-to-r from-gray-900/80 via-gray-800/70 to-gray-900/80
  supports-[backdrop-filter]:bg-gray-900/60
  border-b border-white/10
  shadow-[0_8px_30px_rgba(0,0,0,0.25)]
"
    >
      <div className="flex h-16 items-center justify-between gap-5 pl-10 pr-10">
        {/* Brand */}
        <div
          role="img"
          aria-label="Chefmate.ai home"
          className="flex items-center gap-3 "
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 120 120"
            className="flex-shrink-0"
            role="img"
            aria-hidden="true"
          >
            <path
              d="M20 80 Q20 70 30 65 L90 65 Q100 70 100 80 L100 90 Q100 95 95 95 L25 95 Q20 95 20 90 Z"
              fill="#ff6b6b"
            />
            <ellipse
              cx="60"
              cy="45"
              rx="35"
              ry="25"
              fill="#4ecdc4"
            />
            <g
              stroke="#ffffff"
              strokeWidth="2"
              fill="none"
            >
              <path d="M35 35 L50 35 L50 45 L65 45" />
              <path d="M75 35 L85 35 L85 50" />
            </g>
            <g fill="#ffffff">
              <circle
                cx="35"
                cy="35"
                r="2"
              />
              <circle
                cx="65"
                cy="45"
                r="2"
              />
              <circle
                cx="85"
                cy="50"
                r="2"
              />
            </g>
          </svg>

          <div className="leading-5">
            <div className="text-xl font-bold">
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                Chef
              </span>
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                mate
              </span>
              <span className="text-gray-300 ml-1 text-lg font-medium">
                .ai
              </span>
            </div>
            <div className="text-[11px] text-gray-400 font-medium tracking-wide">
              What’s for dinner tonight?
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="rounded-full bg-white/5 p-1 ring-1 ring-white/10 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
            <ul className="flex items-center gap-1.5">
              {labels.map(({ name, emoji }) => (
                <li key={name}>
                  <div
                    className="
              group select-none
              inline-flex items-center gap-1.5
              rounded-full px-3.5 py-1.5
              text-sm text-gray-200
              bg-white/5 ring-1 ring-white/10
              hover:bg-white/10 hover:ring-white/20
              transition-all duration-200
              hover:-translate-y-[1px]
              shadow-[0_0_0_0_rgba(0,0,0,0)]
              hover:shadow-[0_6px_20px_-6px_rgba(0,0,0,0.35)]
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50
            "
                    role="status"
                    aria-label={`${name} feature`}
                  >
                    <span
                      className="text-base"
                      aria-hidden="true"
                    >
                      {emoji}
                    </span>
                    <span className="tracking-wide">{name}</span>
                    {name === "AI Chat" && (
                      <span
                        className="
                  ml-1 rounded-full px-1.5 py-0.5 text-[10px] font-semibold
                  bg-gradient-to-r from-orange-400/90 to-pink-500/90 text-white
                  shadow-[0_1px_6px_rgba(255,99,71,0.35)]
                "
                      >
                        New
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
