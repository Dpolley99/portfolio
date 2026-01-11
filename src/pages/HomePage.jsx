import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Projects from '../components/home/Projects';
import Games from '../components/home/Games';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function HomePage() {

  const { hash } = useLocation(); // React Router

  useEffect(() => {
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        // scroll smoothly
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash]); // rerun when hash changes

  return (
    <div className="home-page">
      <Hero />
      <About />
      <Projects />
      <Experience />
      <Testimonials />
      <Games />
      <Contact />
    </div>
  );
}

export default HomePage;