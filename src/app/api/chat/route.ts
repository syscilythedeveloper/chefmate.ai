import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: Request) {
  try {
    const data = await req.json();
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
    User questions may be about specific ingredients, cooking methods, nutrition, replacements or any other aspect of the recipe.
    
    Here is the recipe information:

    ${recipeInfo}

    User question: ${userQuestion}

    Please answer in a friendly, concise, and informative way.
    Keep in mind that the user may not be familiar with technical cooking terms, so explain things in simple language.
    If the user asks for a specific ingredient substitution, provide a suitable alternative.
    If the user asks for cooking tips, provide practical advice based on the recipe information.
    If the user asks about nutrition, provide relevant information based on the recipe.
    If the user asks about cooking methods, explain the techniques used in the recipe.
    If the user question about an ingredient not included in the recipe, try to provide a helpful response based on your knowledge as an expert chef.
    If the user asks for a summary of the recipe, provide a brief overview of the key points.
    If the user asks for a step-by-step guide, provide clear and concise instructions based on the recipe information.
    If the user asks for a cooking time, provide the total time from the recipe information.
    If the user asks for serving suggestions, provide ideas based on the recipe.
    If the user asks for pairing suggestions, provide complementary dishes or drinks based on the recipe or your knowledge base as an expert chef.
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
