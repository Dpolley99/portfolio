import { ChevronLeft, ChevronRight, Quote, CircleUser } from "lucide-react";
import { useState } from "react";

const testimonials = [
  {
    quote:
      "Debarshi’s biggest strength is how he approaches complex problems. He breaks them down into small, manageable pieces and works through them one by one. He helped me solve something I barely understood when I needed it most.",
    author: "Amit Verma",
    role: "Client",
    avatar: CircleUser,
  },
  {
    quote:
      "Working with Debarshi felt easy and reassuring. He was clear about what was possible, suggested better approaches when needed, and consistently delivered clean, reliable work.",
    author: "Laura Bennett",
    role: "Client",
    avatar: CircleUser,
  },
  {
    quote:
      "Debarshi took a vague idea and turned it into a fully working product. He asked the right questions early on and stayed involved until everything worked exactly as expected.",
    author: "Kunal Rao",
    role: "Client",
    avatar: CircleUser,
  },
  {
    quote:
      "What stood out was his patience and problem-solving mindset. Even when things became messy, he stayed calm, explained the options clearly, and pushed the project forward.",
    author: "Rachel Moore",
    role: "Client",
    avatar: CircleUser,
  },
];

const Testimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => {
    setActiveIdx((prev) => (prev + 1) % testimonials.length);
  };

  const previous = () => {
    setActiveIdx(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };
  
  const AvatarIcon = testimonials[activeIdx].avatar;

  return (
    <section id="testimonials" className="py-32 relative">
      <div
        className="absolute top-1/2 left-3/10 w-200 h-200 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 overflow-visible"
      />
      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div
          className="text-center max-w-3xl 
        mx-auto mb-16"
        >
          <span
            className="text-secondary-foreground 
          text-sm font-medium tracking-wider 
          uppercase animate-fade-in"
          >
            What People Say
          </span>
          <h2
            className="text-4xl md:text-5xl 
          font-bold mt-4 mb-6 animate-fade-in 
          animation-delay-100 text-secondary-foreground"
          >
            Kind words from{" "}
            <span
              className="font-serif italic 
            font-normal text-white"
            >
              amazing people.
            </span>
          </h2>
        </div>

        {/* Testimonial Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Main Testimonial */}
            <div className="glass p-8 rounded-3xl md:p-12 glow-border animate-fade-in animation-delay-200">
              <div className="absolute -top-7.5 left-8 w-15 h-15 rounded-full bg-primary flex items-center justify-center">
                <Quote className="w-6 h-6 text-primary-foreground" />
              </div>

              <blockquote className="text-sm md:text-2xl font-light md:font-medium leading-relaxed mb-8 pt-4">
                "{testimonials[activeIdx].quote}"
              </blockquote>

              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full flex items-center justify-center ring-2 ring-primary/20 bg-transparent">
                  <AvatarIcon className="w-full h-full text-primary" />
                </div>
                <div>
                  <div className="font-semibold">
                    {testimonials[activeIdx].author}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[activeIdx].role}
                  </div>
                </div>
              </div>
            </div>

            {/* Testimonials Navigation */}
            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
                onClick={previous}
              >
                <ChevronLeft />
              </button>

              <div className="flex gap-2">
                {testimonials.map((_, idx) => (
                  <button
                    onClick={() => setActiveIdx(idx)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      idx === activeIdx
                        ? "w-8 bg-primary"
                        : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="p-3 rounded-full glass hover:bg-primary/10 hover:text-primary transition-all"
              >
                <ChevronRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;