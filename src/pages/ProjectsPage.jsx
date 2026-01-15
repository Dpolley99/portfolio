import { ArrowUpRight } from "lucide-react";
import { AnimatedBorderButton } from "@/components/AnimatedBorderButton";
import ProjectCard from "@/components/ProjectCard";
import { projects } from "@/data/ProjectsList";
import {  useEffect } from "react";

const ProjectsPage = () => {

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  return (
    <main className="min-h-screen">
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-1/6 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/6 left-1/10 w-64 h-64 bg-highlight/15 rounded-full blur-3xl" />
        <div className="container mx-auto px-6 relative z-10">
          {/* Page Header */}
          <div className="text-center mx-auto max-w-3xl mb-16">
            <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
              My Work
            </span>
            <h1 className="text-4xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
              All Projects
              <span className="font-serif italic font-normal text-white">
                {" "}
                I've built.
              </span>
            </h1>
            <p className="text-muted-foreground animate-fade-in animation-delay-200">
              A comprehensive collection of all my projects, from native mobile applications to innovative web applications using the most up-to-date technologies.
            </p>
          </div>

          {/* Projects Grid */}
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, idx) => (
              <ProjectCard key={idx} project={project} idx={idx} />
            ))}
          </div>
        </div>
        <div className="text-center mt-12 animate-fade-in animation-delay-500">
          <a href="https://github.com/Dpolley99?tab=repositories" target="_blank" rel="noopener noreferrer">            
            <AnimatedBorderButton>
              View in GitHub
              <ArrowUpRight className="w-5 h-5" />
            </AnimatedBorderButton>
          </a>
        </div>
      </section>
    </main>
  );
};

export default ProjectsPage;
