import { Disclosure } from "@headlessui/react";

export default function ChefmateNavbar() {
  return (
    <Disclosure
      as="nav"
      className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 shadow-lg border-b border-gray-700"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          {/* Logo and brand */}
          <div className="flex items-center space-x-4">
            <svg
              width="32"
              height="32"
              viewBox="0 0 120 120"
              className="flex-shrink-0"
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

            <div className="flex flex-col">
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
              <div className="text-xs text-gray-400 font-medium tracking-wide">
                Your Smart Cooking Companion
              </div>
            </div>
          </div>
        </div>
      </div>
    </Disclosure>
  );
}
