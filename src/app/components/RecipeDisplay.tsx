/* eslint-disable @next/next/no-img-element */
"use client";
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
      </CardHeader>

      <CardContent className="flex-1 pb-2">
        <CardDescription className="text-sm text-muted-foreground line-clamp-3">
          {hit.ingredients}
        </CardDescription>
      </CardContent>

      <CardFooter className="pt-2">
        <div className="flex items-center justify-between w-full">
          <span className="text-lg font-semibold text-green-600">
            Total Time: {hit.total_time}
          </span>
        </div>
      </CardFooter>
    </Card>
  );
}

function Recipes() {
  return (
    <div className="container mx-auto px-4 py-6">
      <InstantSearch
        searchClient={searchClient}
        indexName="recipes"
      >
        <Configure hitsPerPage={12} />

        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-4">Recipe Search</h1>
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
              list: "grid grid-cols-4 gap-6 mb-8 list-none p-0", // Remove bullets and padding
              item: "h-full w-full flex block", // Force block display for grid
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
              disabledItem: "opacity-50 cursor-not-allowed hover:bg-background",
            }}
          />
        </div>
      </InstantSearch>
    </div>
  );
}

export default Recipes;
