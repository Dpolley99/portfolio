import { Code2, Lightbulb, Rocket, Users } from "lucide-react";

const highlights = [
  {
    icon: Code2,
    title: "Clean Code",
    description:
      "Writing maintainable, scalable code that stands the test of time.",
  },
  {
    icon: Rocket,
    title: "Performance",
    description:
      "Optimizing for speed and delivering lightning-fast user experiences.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description: "Working closely with teams to bring ideas to life.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "Staying ahead with the latest technologies and best practices.",
  },
];

const About = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-8">
            <div className="animate-fade-in">
              <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase">
                About Me
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl font-bold leading-tight animate-fade-in animation-delay-100 text-secondary-foreground">
              From Machines and Finance,
              <span className="font-serif italic font-normal text-white">
                {" "}to Building Software
              </span>
            </h2>

            <div className="space-y-4 text-muted-foreground animate-fade-in text-sm animation-delay-200">
              <p>
                Relatively new to tech, my academic background is in Mechanical Engineering, and I’m a named inventor on a granted patent for Barodont, a wearable dental device designed to prevent barodontalgia. After engineering, I worked as an investment consultant, where I spent time analysing markets, capital allocation, and risk. Over time, I realised I wanted to move closer to building systems myself, which led me to software development.
              </p>
              <p>
               At present, I work mainly with JavaScript and React, building frontend-focused applications that integrate APIs and backend services like Appwrite. My recent projects include API-driven web apps, user-authenticated platforms, and interactive browser-based games. I’ve also started incorporating automated testing with Jest and Vitest, along with basic CI/CD workflows using GitHub Actions, as I move toward more production-ready development.
              </p>
              <p>
                Outside of work, I enjoy travelling, riding motorbikes, cooking, and unwinding with anime and psycological thrillers. These interests keep me grounded and often influence how I think about design, flow, and user experience.
              </p>
            </div>

            <div className="glass rounded-2xl p-6 glow-border animate-fade-in animation-delay-300">
              <p className="font-medium italic text-foreground">
                "My ultimate pursuit is to build a reliable software that solves real-world problems and removes unnecessary friction from everyday processes. I’m particularly interested in systems that combine technology, finance, and strong user experience to create a solution everybody can rely on."
              </p>
            </div>
          </div>

          {/* Right column */}
          <div className="grid sm:grid-cols-2 gap-6">
            {highlights.map((item, idx) => (
              <div
                key={idx}
                className="glass p-6 rounded-2xl animate-fade-in"
                style={{ animationDelay: `${(idx + 1) * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4 hover:bg-primary/20">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
