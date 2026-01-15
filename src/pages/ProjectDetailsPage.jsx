import { useParams, useNavigate } from 'react-router-dom';
import { ArrowUpRight, Github, ArrowLeft } from 'lucide-react';
import { projects } from '@/data/ProjectsList';
import { useEffect } from 'react';

const ProjectDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Create a slug matcher - slugify both the URL param and project titles
  const slugify = (str) => str.toLowerCase().replace(/\s+/g, '-');
  
  const project = projects.find(p => slugify(p.title) === id);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  if (!project) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-secondary-foreground mb-4">
            Coming Soon
          </h1>
          <p className="text-muted-foreground mb-8">
            We're working on this project details page.
          </p>
          <button
            onClick={() => navigate('/projects')}
            className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Projects
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      <section className="py-16 md:py-24 relative overflow-hidden">
        {/* Bg glows */}
        <div className="absolute top-1/6 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/6 left-1/10 w-64 h-64 bg-highlight/15 rounded-full blur-3xl" />

        <div className="container mx-auto px-6 relative z-10">
          {/* Back Button */}
          <button
            onClick={() => navigate('/projects')}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </button>

          {/* Project Header */}
          <div className="mb-12">
            <h1 className="text-2xl md:text-3xl text-center md:text-left font-bold md:mx-8 mb-4 text-secondary-foreground">
              {project.title}
            </h1>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
            
            {/* Left: Project Image */}
            <div>
              <img
                src={project.image}
                alt={project.title}
                className="w-full rounded-2xl object-cover aspect-video"
              />
            </div>

            {/* Right: Project Meta */}
            <div>
              {/* Description */}
              <p className="text-sm xl:text-base text-muted-foreground mb-6">
                {project.description}
              </p>

              {/* Links */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  <span>View Live</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>

                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-5 py-2 border border-border rounded-lg text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  <span>View GitHub</span>
                  <Github className="w-4 h-4" />
                </a>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4 text-secondary-foreground">
                  Technologies
                </h2>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 rounded-full bg-surface border border-border/50 text-muted-foreground text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Story */}
          <div className="glass rounded-3xl p-6 border border-primary/20 hover:border-primary/50 justify-center md:mx-10 lg:mx-20 mt-8 md:mt-0">
            <h2 className="text-lg font-semibold mb-6 text-secondary-foreground">
              The story behind this project
            </h2>
            <div className="space-y-4">
              {project.story?.split('\n').map((paragraph, idx) => (
                <p key={idx} className="text-muted-foreground leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

        </div>
      </section>
    </main>
  );
};

export default ProjectDetailsPage;
