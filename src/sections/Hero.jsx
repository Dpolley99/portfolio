import { Button } from "@/components/Button";
import { AnimatedBorderButton } from "../components/AnimatedBorderButton";
import {
  ArrowRight,
  MapPin,
  Github,
  Linkedin,
  Download,
} from "lucide-react";

const skills = [
    "React.js",
    "React Native",
    "JavaScript (ES6+)",
    "TypeScript",
    "Next JS",
    "HTML5",
    "CSS3",
    "Appwrite",
    "TMDB API",
    "REST APIs",
    "Appwrite Database",
    "Appwrite Auth",
    "Git",
    "GitHub",
    "VS Code",
    "npm",
    "Jest",
    "Vitest",
    "GitHub Actions",
    "Netlify"
]

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Bg */}

      <div className="absolute inset-0">
        <img
          src="/hero-bg.jpg"
          alt="Hero image"
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-linear-to-b from-background/20 via-background/80 to-background" />
      </div>

      {/* Green Dots */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            className="absolute w-1.5 h-1.5 rounded-full opacity-60"
            style={{
              backgroundColor: "#20B2A6",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `slow-drift ${
                25 + Math.random() * 20
              }s ease-in-out infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Hero Content */}
      <div className="container mx-auto px-6 pt-32 pb-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left column - text */}
          <div className="space-y-8">
            <div className="animate-fade-in">              
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm text-primary">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                Software Engineer | Frontend
              </span>
            </div>

            {/* Headline */}
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight animate-fade-in animation-delay-100">
                Building <span className="text-primary glow-text">web/mobile</span>
                <br />
                applications with
                <br />
                <span className="font-serif italic font-normal text-white">
                  precision.
                </span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-lg animate-fade-in animation-delay-200">
                Hi, I'm Debarshi Polley — a software engineer specializing in Frontend web and mobile development. I build scalable, performant applications that users love.
              </p>
            </div>
            
            {/* CTA */}
            <div className="flex flex-wrap gap-4 animate-fade-in animation-delay-300">
              <Button size="lg">
                <a href="#contact" className="flex items-center gap-2">
                  Contact Me <ArrowRight className="w-5 h-5" />
                </a>
              </Button>
              <AnimatedBorderButton className="flex flex-1">
                <a href="/Debarshi_Polley_CV.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-primary">
                  <Download className="w-5 h-5" />
                  Download CV
                </a>
              </AnimatedBorderButton>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-4 animate-fade-in animation-delay-400">
              <span className="text-sm text-muted-foreground">
                Follow Me:
              </span>
              {[
                { icon: Github, href: "https://github.com/Dpolley99" },
                { icon: Linkedin, href: "https://linkedin.com/in/debarshipolley" },
              ].map((social, idx) => (
                <a
                  key={idx}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300"
                >
                  {<social.icon className="w-5 h-5" />}
                </a>
              ))}
            </div>
          </div>
          {/* Right column - pfp */}
          <div className="relatice animate-fade-in animation-delay-300">
            {/* img */}
            <div className="relative max-w-md mx-auto">
              <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/30 via-transparent to-primary/10 blur-2xl animate-pulse" />
              <div className="relative glass rounded-3xl p-2 glow-border">
                <img src="/profile-photo.jpg" alt="Debarshi Polley" className="w-full aspect-4/5 rounded-2xl" />

                {/* Floating Badge */}
                <div className="absolute -bottom-4 -left-4 glass rounded-xl px-4 py-3 animate-float">
                  <div className="flex items-center gap-3">
                    <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs font-medium">Available for Work</span>
                  </div>
                </div>

                {/* Stats Badge */}
                <div className="absolute -top-4 -right-4 glass rounded-xl px-4 py-3 animate-float animation-delay-500 flex flex-row items-center justify-center gap-y-2">
                  <div className="text-2xl font-bold text-red-600">
                    <MapPin className="w-5 h-5 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all duration-300" />
                  </div>
                  <div className="text-xs text-muted-foreground pl-2">
                    Bristol, UK
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-20 animate-fade-in animation-delay-600">
          <p className="text-sm text-muted-foreground mb-6 text-center">
            Technologies I work with
          </p>
          <div className="relative overflow-hidden">
            <div
              className="absolute left-0 top-0 bottom-0 w-32
             bg-linear-to-r from-background to-transparent z-10"
            />
            <div
              className="absolute right-0 top-0 bottom-0 w-32
             bg-linear-to-l from-background to-transparent z-10"
            />
            <div className="flex flex-wrap gap-4 justify-center">
              {[...skills].map((skill, idx) => (
                <div key={idx} className="shrink-0 px-8 py-4">
                  <span className="text-xl font-semibold text-muted-foreground hover:text-white transition-colors">
                    {skill}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
