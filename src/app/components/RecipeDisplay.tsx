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
  };

  const closePanels = () => {
    setActiveRecipe(null);
  };

  function Hit({ hit }: HitProps) {
    return (
      <Card className="h-full w-full flex flex-col overflow-hidden hover:shadow-lg transition-shadow duration-200">
        <div className="relative h-48 overflow-hidden">
          <img
            src={hit.img_src}
            height={192}
            width={192}
            alt={hit.recipe_name || "Recipe"}
            className="w-full h-full object-cover"
          />
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
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold rounded-lg shadow transition-colors duration-200 flex items-center justify-center gap-2 border border-blue-700"
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
              Explore Recipe
            </button>
          </div>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Left Panel - FullRecipe */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          activeRecipe
            ? "w-1/3 opacity-100 translate-x-0"
            : "w-0 opacity-0 -translate-x-full"
        } overflow-hidden bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 shadow-lg`}
      >
        {activeRecipe && (
          <div className="h-full overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Full Recipe</h2>
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
        )}
      </div>

      {/* Center Panel - Main Content */}
      <div className="flex-1 transition-all duration-300 ease-in-out">
        <div className="container mx-auto px-4 py-6 max-w-none">
          <InstantSearch
            searchClient={searchClient}
            indexName="recipes"
          >
            <Configure hitsPerPage={12} />

            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Recipe Search</h1>
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
                classNames={{
                  root: "mb-4",
                  form: "relative",
                  input:
                    "w-full px-4 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
                  submit: "absolute right-3 top-1/2 transform -translate-y-1/2",
                  reset: "absolute right-12 top-1/2 transform -translate-y-1/2",
                }}
              />
            </div>

            <div className="mb-8">
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: `grid gap-6 mb-8 list-none p-0 ${
                    activeRecipe
                      ? "grid-cols-2 lg:grid-cols-2"
                      : "grid-cols-2 lg:grid-cols-4"
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

      {/* Right Panel - ChatBox */}
      <div
        className={`transition-all duration-300 ease-in-out ${
          activeRecipe
            ? "w-1/3 opacity-100 translate-x-0"
            : "w-0 opacity-0 translate-x-full"
        } overflow-hidden bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 shadow-lg`}
      >
        {activeRecipe && (
          <div className="h-full overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
              <h2 className="text-lg font-bold">Recipe Chat</h2>
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
            <div className="p-4">
              <ChatBox />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recipes;
