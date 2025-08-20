/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useState } from "react";
import { liteClient as algoliasearch } from "algoliasearch/lite";
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Configure,
} from "react-instantsearch";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ChatBox from "./ChatBox";
import FullRecipe from "./FullRecipe";

const appId = process.env.NEXT_PUBLIC_ALGOLIA_APP_ID;
const apiKey = process.env.NEXT_PUBLIC_ALGOLIA_API_KEY;

if (!appId || !apiKey) {
  throw new Error(
    "Algolia App ID and API Key must be defined in environment variables."
  );
}

const searchClient = algoliasearch(appId, apiKey);

interface HitProps {
  hit: {
    img_src: string;
    recipe_name?: string;
    directions: string;
    total_time: number;
    ingredients: string[];
    nutrition: string;
    url: string;
    servings: number;
  };
}

function Recipes() {
  const [activeRecipe, setActiveRecipe] = useState<HitProps["hit"] | null>(
    null
  );

  const handleRecipeClick = (hit: any) => {
    setActiveRecipe(hit);
    console.log("Recipe clicked:", hit.recipe_name, "activeRecipe", hit);

    // Scroll the clicked card into view if it's not visible
    setTimeout(() => {
      const activeCard = document.querySelector(
        `[data-recipe-name="${hit.recipe_name}"]`
      );
      if (activeCard) {
        activeCard.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
    }, 300); // Small delay to allow layout changes
  };

  const closePanels = () => {
    setActiveRecipe(null);
  };

  function Hit({ hit }: HitProps) {
    const isActive =
      activeRecipe && hit.recipe_name === activeRecipe.recipe_name;

    return (
      <Card
        data-recipe-name={hit.recipe_name}
        className={`h-full w-full flex flex-col overflow-hidden hover:shadow-lg transition-all duration-200 ${
          isActive
            ? "bg-blue-50 border-2 border-blue-400 shadow-lg ring-2 ring-blue-200"
            : "bg-red-50 hover:bg-red-100"
        }`}
      >
        <div className="relative h-48 overflow-hidden">
          <img
            src={hit.img_src}
            height={192}
            width={192}
            alt={hit.recipe_name || "Recipe"}
            className="w-full h-full object-cover"
          />
          {isActive && (
            <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Selected
            </div>
          )}
        </div>

        <CardHeader className="pb-2">
          <CardTitle className="text-lg line-clamp-2">
            {hit.recipe_name || "Unnamed Recipe"}
          </CardTitle>
          <span className="text-lg font-semibold text-green-600">
            Total Time: {hit.total_time}
          </span>
        </CardHeader>

        <CardContent className="flex-1 pb-2">
          <CardDescription className="text-sm text-muted-foreground line-clamp-3">
            {hit.ingredients}
          </CardDescription>
        </CardContent>

        <CardFooter className="pt-2">
          <div className="flex gap-2 w-full">
            <button
              className={`flex-1 px-4 py-2 text-white text-base font-semibold rounded-lg shadow transition-all duration-300 flex items-center justify-center gap-2 border border-transparent ${
                isActive
                  ? "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  : "bg-gradient-to-r from-[#fa8072] to-[#e9967a] hover:from-[#e9967a] hover:to-[#fa8072]"
              }`}
              onClick={() => handleRecipeClick(hit)}
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              {isActive ? "Currently Viewing" : "Explore Recipe"}
            </button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-gray-50 dark:bg-gray-900 p-10">
      <div className="flex h-full">
        {/* Left Panel - Recipe Details */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeRecipe
              ? "w-1/3 opacity-100 translate-x-0"
              : "w-0 opacity-0 -translate-x-full"
          } overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg flex flex-col`}
        >
          {activeRecipe && (
            <>
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <h2 className="text-lg font-bold truncate">
                  {activeRecipe.recipe_name || "Recipe Details"}
                </h2>
                <button
                  onClick={closePanels}
                  className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition-colors"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>

              {/* Recipe Details */}
              <div className="flex-1 overflow-y-auto">
                <div className="p-4">
                  <FullRecipe
                    hit={{
                      img_src: activeRecipe.img_src,
                      recipe_name: activeRecipe.recipe_name,
                      directions: activeRecipe.directions,
                      total_time: activeRecipe.total_time,
                      ingredients: activeRecipe.ingredients,
                      nutrition: activeRecipe.nutrition,
                      servings: activeRecipe.servings,
                    }}
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Center Panel - Recipe Search and Grid */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeRecipe ? "w-1/3" : "w-full"
          } h-full overflow-y-auto border-r border-gray-200 dark:border-gray-700`}
        >
          <div className="px-4 py-6">
            <InstantSearch
              searchClient={searchClient}
              indexName="recipes"
            >
              <Configure hitsPerPage={12} />

              <div className="mb-6">
                <div className="flex items-center justify-between mb-4">
                  {activeRecipe && (
                    <button
                      onClick={closePanels}
                      className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg transition-colors"
                    >
                      Close Details
                    </button>
                  )}
                </div>
                <SearchBox
                  placeholder="Search for recipes... (e.g., 'chicken pasta', 'vegetarian', 'quick dinner')"
                  classNames={{
                    root: "mb-4",
                    form: "relative",
                    input:
                      "w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                    submit:
                      "absolute right-3 top-1/2 transform -translate-y-1/2",
                    reset:
                      "absolute right-12 top-1/2 transform -translate-y-1/2",
                  }}
                />
              </div>

              <div className="mb-8">
                <Hits
                  hitComponent={Hit}
                  classNames={{
                    list: `grid gap-4 mb-8 list-none p-0 ${
                      activeRecipe
                        ? "grid-cols-1 xl:grid-cols-2"
                        : "grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    }`,
                    item: "h-full w-full flex block",
                  }}
                />
              </div>

              <div className="flex justify-center">
                <Pagination
                  classNames={{
                    root: "flex items-center space-x-2",
                    list: "flex items-center space-x-1",
                    item: "inline-flex items-center justify-center w-10 h-10 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground",
                    link: "w-full h-full flex items-center justify-center text-sm font-medium",
                    selectedItem:
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                    disabledItem:
                      "opacity-50 cursor-not-allowed hover:bg-background",
                  }}
                />
              </div>
            </InstantSearch>
          </div>
        </div>

        {/* Right Panel - AI Chat */}
        <div
          className={`transition-all duration-300 ease-in-out ${
            activeRecipe
              ? "w-1/3 opacity-100 translate-x-0"
              : "w-0 opacity-0 translate-x-full"
          } overflow-hidden bg-blue-50/50 dark:bg-blue-900/20 shadow-lg flex flex-col`}
        >
          {activeRecipe && (
            <>
              {/* Chat Header */}
              <div className="sticky top-0 bg-blue-100 dark:bg-blue-900/40 border-b border-blue-200 dark:border-blue-700 p-4">
                <div className="flex items-center gap-3">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <h3 className="text-lg font-bold text-gray-800 dark:text-gray-200">
                    Chat with AI
                  </h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  Ask questions about this recipe
                </p>
              </div>

              {/* Chat Content */}
              <div className="flex-1 overflow-hidden">
                <ChatBox
                  hit={{
                    recipe_name: activeRecipe.recipe_name,
                    directions: activeRecipe.directions,
                    total_time: activeRecipe.total_time,
                    ingredients: activeRecipe.ingredients,
                    nutrition: activeRecipe.nutrition,
                    servings: activeRecipe.servings,
                  }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Recipes;
