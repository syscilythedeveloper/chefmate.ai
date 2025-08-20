# Chefmate AI

**Your smart cooking companion powered by AI. Discover recipes, get cooking tips, and elevate your culinary journey.**

---

## 🚀 Overview

Chefmate AI lets you search for recipes and chat with an AI assistant to customize recipes based on your needs. Whether you want ingredient substitutions, nutrition info, or step-by-step guidance, Chefmate AI is here to help.

---

## ✨ Features

- 🔍 **Recipe Search:** Find recipes quickly using Algolia-powered search.
- 🤖 **AI Chat Assistant:** Chat with an AI to get customizations, substitutions, and cooking tips.
- 🥗 **Nutrition Analysis:** View nutrition info for each recipe.
- 🍳 **Cooking Tips:** Get step-by-step help and culinary advice.

---

## 🛠️ Tech Stack

- **Framework:** [Next.js](https://nextjs.org/) (v15)
- **UI:** [React](https://react.dev/) (v19), [MUI](https://mui.com/), [Tailwind CSS](https://tailwindcss.com/)
- **AI:** [@google/generative-ai](https://www.npmjs.com/package/@google/generative-ai)
- **Search:** [Algolia](https://www.algolia.com/)
- **Other:** Headless UI, Heroicons, Lucide, React InstantSearch, Zod

---

## Environment Variables

NEXT_PUBLIC_ALGOLIA_APP_ID=your_algolia_app_id
NEXT_PUBLIC_ALGOLIA_API_KEY=your_algolia_api_key
GEMINI_API_KEY=your_gemini_api_key

### Prerequisites

- Node.js (v18+ recommended)
- npm or yarn

### Installation

```bash
git clone https://github.com/yourusername/chefmate-ai.git
cd chefmate-ai
npm install
# or
yarn install
```

### Live Demo

https://chefmate-ai.vercel.app/
