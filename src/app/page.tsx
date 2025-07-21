import Recipes from "./components/RecipeDisplay";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Recipes />

      <Footer />
    </>
  );
}
