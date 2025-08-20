import Recipes from "./components/RecipeDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Navbar />
      <Recipes />
      <Footer />
    </div>
  );
}
