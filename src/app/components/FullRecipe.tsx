/* eslint-disable @next/next/no-img-element */
import React from "react";

interface FullRecipeProps {
  hit: {
    img_src: string;
    recipe_name?: string;
    directions: string;
    total_time: number;
    ingredients: string[] | string;
    nutrition: string | string[];
    servings: number;
  };
}

const FullRecipe = ({ hit }: FullRecipeProps) => {
  return (
    <div className="p-4">
      <img
        src={hit.img_src}
        height={200}
        width={200}
        alt={hit.recipe_name || "Recipe"}
        className="w-full h-48 object-cover rounded mb-4"
      />
      <ul className="space-y-2">
        <li>
          <strong>Name:</strong> {hit.recipe_name || "Unnamed Recipe"}
        </li>
        <li>
          <strong>Total Time:</strong> {hit.total_time}
        </li>
        <li>
          <strong>Ingredients:</strong>
          <div className="ml-4 mt-2">
            {(() => {
              // If it's an array, map it
              if (Array.isArray(hit.ingredients)) {
                return (
                  <ul className="list-disc list-inside space-y-1">
                    {hit.ingredients.map((ingredient, index) => (
                      <li
                        key={index}
                        className="text-sm"
                      >
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                );
              }

              // If it's a string, split by commas
              if (typeof hit.ingredients === "string") {
                return (
                  <ul className="list-disc list-inside space-y-1">
                    {hit.ingredients.split(",").map((ingredient, index) => (
                      <li
                        key={index}
                        className="text-sm"
                      >
                        {ingredient.trim()}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Fallback for other types
              return (
                <p className="text-sm text-gray-500">
                  No ingredients available
                </p>
              );
            })()}
          </div>
        </li>

        <li>
          <strong>Nutrition:</strong>{" "}
          <div className="ml-4 mt-2">
            {(() => {
              // If it's an array, map it
              if (Array.isArray(hit.nutrition)) {
                return (
                  <ul className="list-disc list-inside space-y-1">
                    {hit.nutrition.map((nutrient, index) => (
                      <li
                        key={index}
                        className="text-sm"
                      >
                        {nutrient}
                      </li>
                    ))}
                  </ul>
                );
              }

              // If it's a string, split by commas
              if (typeof hit.nutrition === "string") {
                return (
                  <ul className="list-disc list-inside space-y-1">
                    {hit.nutrition.split(",").map((nutrient, index) => (
                      <li
                        key={index}
                        className="text-sm"
                      >
                        {nutrient.trim()}
                      </li>
                    ))}
                  </ul>
                );
              }

              // Fallback for other types
              return (
                <p className="text-sm text-gray-500">
                  No nutrition information available
                </p>
              );
            })()}
          </div>
        </li>
        <li>
          <strong>Directions:</strong> {hit.directions}
        </li>
      </ul>
    </div>
  );
};

export default FullRecipe;
