import Navbar from "./components/layout/Navbar"
import Hero from "./sections/Hero"
import About from "./sections/About"
import Projects from "./sections/Projects"
import Experience from "./sections/Experience"
import Testimonials from "./sections/Testimonials"
import Games from "./sections/Games"
import Contact from "./sections/Contact"
import Footer from "./components/layout/Footer"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Testimonials />
        <Games />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
