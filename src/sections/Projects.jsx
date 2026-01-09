import { ArrowUpRight, Github } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";

const projects = [
  {
    title: "EdgeAI SaaS Landing Page",
    description:
      "A modern SaaS landing page with state management using Zustand, responsive design, and optimized performance. Features smooth animations and a clean user interface.",
    image: "/projects/project-01.jpg",
    tags: ["React", "TypeScript", "Tailwind CSS", "Zustand"],
    link: "https://edgeaisaas.netlify.app/",
    github: "https://github.com/Dpolley99/Saas-landing-page",
  },
  {
    title: "Mobile Movie App",
    description:
      "An android mobile application for browsing and searching movies using TMDB API. Includes user authentication, database integration, and responsive UI with NativeWind styling.",
    image: "/projects/project-02.jpg",
    tags: ["React Native", "TypeScript", "Expo", "Appwrite"],
    link: "https://expo.dev/accounts/not_deba/projects/mobile-movie-app/builds/c5f1326e-9d3e-44e1-936f-42a9cc808192",
    github: "https://github.com/Dpolley99/mobile-movie-app",
  },
  {
    title: "Brainwave AI SaaS",
    description:
      "An AI SaaS landing page showcasing modern web animations and design patterns. Built with React Router for seamless navigation and optimized with Vite for fast performance.",
    image: "/projects/project-03.jpg",
    tags: ["React", "JavaScript", "Tailwind CSS", "Vite"],
    link: "https://jolly-dolphin-cd317f.netlify.app/",
    github: "https://github.com/Dpolley99/Brainwave-AI-SaaS",
  },
  {
    title: "HooBank Landing Page",
    description:
      "A responsive banking landing page with automated testing using Vitest and CI/CD pipeline integration. Demonstrates modern frontend development practices and deployment workflows.",
    image: "/projects/project-04.jpg",
    tags: ["React", "JavaScript", "Tailwind CSS", "Vitest"],
    link: "https://singular-wisp-85b08f.netlify.app/",
    github: "https://github.com/Dpolley99/Hoobank-modern-app",
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-16 md:py-24 relative overflow-hidden">
      {/* Bg glows */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 bg-highlight/5 rounded-full blur-3xl" />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mx-auto max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Featured Work
          </span>
          <h2 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            Projects that
            <span className="font-serif italic font-normal text-white">
              {" "}
              make an impact.
            </span>
          </h2>
          <p className="text-muted-foreground animate-fade-in animation-delay-200">
            A selection of my recent work, from native mobile applications to innovative web applications using the most up-to-date technologies.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8">
          {projects.map((project, idx) => (
            <div
              key={idx}
              className="group glass rounded-2xl overflow-hidden animate-fade-in md:row-span-1"
              style={{ animationDelay: `${(idx + 1) * 100}ms` }}
            >
              {/* Image */}
              <div className="relative overflow-hidden aspect-video">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div
                  className="absolute inset-0 
                bg-linear-to-t from-card via-card/50
                 to-transparent opacity-60"
                />
                {/* Overlay Links */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a
                    href={project.link} target="_blank"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <ArrowUpRight className="w-5 h-5" />
                  </a>
                  <a
                    href={project.github} target="_blank"
                    className="p-3 rounded-full glass hover:bg-primary hover:text-primary-foreground transition-all"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="sm:text-m md:text-xl font-semibold group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <div className="md:hidden flex gap-x-3">
                    <a href={project.link} target="_blank">
                      <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
                    </a>
                    <a href={project.github} target="_blank">
                      <Github className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all"/>
                    </a>
                  </div>
                </div>
                <p className="text-muted-foreground text-sm">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIdx) => (
                    <span
                      key={tagIdx}
                      className="px-4 py-1.5 rounded-full bg-surface text-xs font-medium border border-border/50 text-muted-foreground hover:border-primary/50 hover:text-primary transition-all duration-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All CTA */}
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <a href="https://github.com/Dpolley99?tab=repositories" target="_blank" rel="noopener noreferrer">            
            <AnimatedBorderButton>
              View All Projects
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </a>
        </div>
      </div>
    </section>
  )
}

export default Projects
