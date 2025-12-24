// src/pages/Home.jsx
import Banner from "../components/Banner";
import FeaturedProducts from "../components/FeaturedProducts";
import TrustStrip from "../components/TrustStrip";
import Footer from "../components/Footer";
import CategoryRows from "../components/CategoryRows";

export default function Home() {
  return (
    <>
      <Banner />
          <FeaturedProducts />
          {/* <CategoryRows /> */}
          <TrustStrip />
            <Footer />
      {/* later: featured products, categories, etc */}
    </>
  );
}
