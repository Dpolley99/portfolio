const experiences = [
  {
    period: "Jul 2025 — present",
    role: "Software Engineer (Frontend)",
    company: "Freelance",
    description:
       "Designed and developed multiple frontend and mobile applications using React and React Native, delivering production-ready user interfaces and reusable component architectures. Implemented authentication, state management, and CI/CD workflows while integrating backend services via Appwrite and external APIs.",
    technologies: [
      "JavaScript",
      "TypeScript",
      "React",
      "React Native",
      "TailwindCSS",
      "CI/CD",
      "Appwrite",
    ],
    current: true,
  },
  {
    period: "Aug 2024 — Sep 2025",
    role: "Investment Consultant",
    company: "P.R. Engineering Works",
    description:
      "Led discovery workshops to capture functional and technical requirements, aligning system capabilities with user journeys and improving productivity by 19%. Collaborated with IT and Operations teams to implement digital dashboards and process automation tools, supporting user testing, increasing adoption, and improving customer feedback KPIs by 24%.",
    technologies: [
      "Process Automation",
      "Digital Dashboards",
      "Requirements Gathering",
      "Stakeholder Management",
      "Data Analysis",
    ],
    current: false,
  },
  {
    period: "Jan 2022 — Aug 2023",
    role: "Investment Analyst",
    company: "P.R. Engineering Works",
    description:
      "Introduced equity and commodity investment strategies that generated a 20% ROI within two quarters. Integrated financial insights into operational planning, resulting in a 9% reduction in operational costs.",
    technologies: [
      "Equity Analysis",
      "Commodity Markets",
      "Financial Modelling",
      "Operational Planning",
      "Cost Optimization",
    ],
    current: false,
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <span className="text-secondary-foreground text-sm font-medium tracking-wider uppercase animate-fade-in">
            Career Journey
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mt-4 mb-6 animate-fade-in animation-delay-100 text-secondary-foreground">
            My Experience{" "}
            <span className="font-serif italic font-normal text-white">
              {" "}
              across diverse fields.
            </span>
          </h2>

          <p  className="text-xs lg:text-sm text-muted-foreground animate-fade-in animation-delay-200" >
            A timeline of my professional growth, from investment analyst to software engineer building products at scale.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          <div className="timeline-glow absolute left-0 lg:left-1/2 top-0 bottom-0 w-0.5 bg-linear-to-b from-primary/70 via-primary/30 to-transparent lg:-translate-x-1/2 shadow-[0_0_25px_rgba(32,178,166,0.8)]" />

          {/* Experience Items */}
          <div className="space-y-12">
            {experiences.map((exp, idx) => (
              <div key={idx} className="relative grid lg:grid-cols-2 gap-8 animate-fade-in" style={{ animationDelay: `${(idx + 1) * 150}ms` }}>
                {/* Timeline Dot */}
                <div className="absolute left-0 lg:left-1/2 top-0 w-3 h-3 bg-primary rounded-full -translate-x-1/2 ring-4 ring-background z-10">
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75" />
                  )}
                </div>

                {/* Content */}
                <div className={`pl-8 lg:pl-0 ${ idx % 2 === 0? "lg:pr-16" : "lg:col-start-2 lg:pl-16"}`}>
                  <div
                    className={`glass p-6 rounded-2xl border border-primary/30 hover:border-primary/50 transition-all duration-500`}>
                    <span className="text-sm text-primary font-medium">
                      {exp.period}
                    </span>
                    <h3 className="text-xl font-semibold mt-2">{exp.role}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mt-4">
                      {exp.description}
                    </p>
                    <div className={`flex flex-wrap gap-2 mt-4 ${idx % 2 === 0 ? "lg:justify-end" : ""}`}>
                      {exp.technologies.map((tech, techIdx) => (
                        <span key={techIdx} className="px-3 py-1 bg-surface text-xs rounded-full text-muted-foreground">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Experience
