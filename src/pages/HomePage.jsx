import Hero from '../components/home/Hero';
import About from '../components/home/About';
import Experience from '../components/home/Experience';
import Projects from '../components/home/Projects';
import Games from '../components/home/Games';
import Testimonials from '../components/home/Testimonials';
import Contact from '../components/home/Contact';

function HomePage() {
  return (
    <div className="home-page">
      <Hero />
      <About />
      <Experience />
      <Projects />
      <Games />
      <Testimonials />
      <Contact />
    </div>
  );
}

export default HomePage;