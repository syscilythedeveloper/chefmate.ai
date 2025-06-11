import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    //console.log("Received data:", data);
    console.log("Recievid hit data:", data[2]);
    //const hit = data[2];
    const hit = data[2].hit;
    //console.log("Hit data:", hit2);
    const recipe_name = hit.recipe_name || "Recipe";
    const directions = hit.directions || "No directions provided.";
    const total_time = hit.total_time || "Unknown";
    const ingredients = hit.ingredients || "No ingredients provided.";
    const nutrition = hit.nutrition || "No nutrition information provided.";
    const servings = hit.servings || "Unknown";

    const userQuestion = data[1].content;
    const recipeInfo = `
    Recipe Name: ${recipe_name}
    Total Time: ${total_time}
    Servings: ${servings}
    Ingredients: ${
      Array.isArray(ingredients) ? ingredients.join(", ") : ingredients
    }
    Directions: ${directions}
    Nutrition: ${
      typeof nutrition === "string"
        ? nutrition
        : (nutrition as string[]).join(", ")
    }
    User Question: ${userQuestion}
    `;

    const prompt = `
    You are an expert AI chef assistant. You job is to answer user questions about recipes in a friendly and informative way.
    You have access to the following recipe information. Use this information to answer the user's question about the recipe.
    User questions may be about specific ingredients, cooking methods, nutrition, replacement or any other aspect of the recipe.
    
    Here is the recipe information:

    ${recipeInfo}

    User question: ${userQuestion}

    Please answer in a friendly, concise, and informative way.
    `;
    console.log("Full prompt:", prompt);

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContent([prompt]);
    const aiResponse = result.response.text();
    console.log("AI response:", aiResponse);

    return new Response(aiResponse, {
      headers: { "Content-Type": "text/plain" },
    });
  } catch (error) {
    console.error("Error processing request:", error);
    return new Response(
      "Our AI agent is overloaded at the moment. Please try again later",
      {
        headers: { "Content-Type": "text/plain" },
      }
    );
  }
}
