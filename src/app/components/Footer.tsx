export default function ChefmateFooter() {
  return (
    <footer className="bg-gray-900 border-t border-gray-700 justify-center">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center text-center">
          {/* Logo and Brand */}
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-3">
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

              <div className="text-lg font-bold">
                <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                  Chef
                </span>
                <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                  mate
                </span>
                <span className="text-gray-300 ml-1 font-medium">AI</span>
              </div>
            </div>

            <p className="text-gray-400 text-sm leading-relaxed">
              Your smart cooking companion powered by AI. Discover recipes, get
              cooking tips, and elevate your culinary journey.
            </p>

            <p className="text-gray-500 text-xs">
              © 2025 ChefmateAI. All rights reserved.
            </p>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Recipe Search
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  AI Chat Assistant
                </a>
              </li>

              <li>
                <a className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Nutrition Analysis
                </a>
              </li>
              <li>
                <a className="text-gray-400 hover:text-white text-sm transition-colors duration-200">
                  Cooking Tips
                </a>
              </li>
            </ul>
          </div>

          {/* Product Features */}
          <div>
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://linkedin.com/in/syscilybrown"
                  target="_blank"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://medium.com/@syscily.brown"
                  target="_blank"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Blog
                </a>
              </li>

              <li>
                <a
                  href="https://syscily.com/"
                  target="_blank"
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  Portfolio
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
