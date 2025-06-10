import ChatBox from "./components/ChatBox";
import Recipes from "./components/RecipeDisplay";

export default function Home() {
  return (
    <div className="flex gap-8 px-8 py-8">
      <div className="w-1/3">
        <ChatBox />
      </div>
      <div className="w-2/3">
        <Recipes />
      </div>
    </div>
  );
}
