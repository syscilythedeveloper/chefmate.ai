import Recipes from "./components/RecipeDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex gap-4 px-8 py-8">
        <Recipes />
      </div>
      <Footer />
    </>
  );
}
