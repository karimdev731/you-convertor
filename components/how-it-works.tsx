"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link, Cog, Download } from "lucide-react";

const steps = [
  {
    icon: <Link className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400" />,
    title: "Collez l'URL",
    description:
      "Copiez l'URL de la vidéo YouTube que vous souhaitez convertir et collez-la dans le champ prévu.",
  },
  {
    icon: <Cog className="h-6 w-6 sm:h-8 sm:w-8 text-pink-400" />,
    title: "Choisissez le format",
    description:
      "Sélectionnez le format de sortie souhaité (MP3 ou MP4) et la résolution si nécessaire.",
  },
  {
    icon: <Download className="h-6 w-6 sm:h-8 sm:w-8 text-green-400" />,
    title: "Téléchargez",
    description:
      "Après la conversion, téléchargez votre fichier et profitez de votre contenu hors ligne.",
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const stepsRef = useRef<HTMLDivElement>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Title animation
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          toggleActions: "play reverse play reverse",
        },
      }
    );

    // Line drawing animation - only on desktop
    if (stepsRef.current) {
      const line = stepsRef.current.querySelector(".steps-line");
      if (line) {
        gsap.fromTo(
          line,
          { height: 0 },
          {
            height: "100%",
            duration: 1.5,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: stepsRef.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 1,
              toggleActions: "play reverse play reverse",
            },
          }
        );
      }
    }

    // Steps staggered animation
    stepRefs.current.forEach((step, index) => {
      gsap.fromTo(
        step,
        { 
          x: window.innerWidth >= 768 ? (index % 2 === 0 ? -30 : 30) : 0, 
          y: window.innerWidth < 768 ? 30 : 0,
          opacity: 0 
        },
        {
          x: 0,
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: step,
            start: "top 85%",
            toggleActions: "play reverse play reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="py-12 sm:py-20 px-4 bg-gradient-to-b from-slate-900 to-slate-950"
    >
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Comment ça marche ?
        </h2>

        <div ref={stepsRef} className="relative">
          {/* Vertical line connecting steps - visible only on md screens and up */}
          <div className="steps-line absolute left-[28px] md:left-1/2 top-0 w-1 bg-gradient-to-b from-purple-500 to-pink-500 h-full transform -translate-x-1/2 md:block hidden"></div>

          <div className="space-y-8 sm:space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div
                key={index}
                ref={(el) => (stepRefs.current[index] = el)}
                className={`flex ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                } flex-col md:items-center gap-4 sm:gap-6`}
              >
                <div className="flex-1">
                  <div className="bg-slate-800 rounded-xl p-4 sm:p-6 border border-slate-700 hover:border-purple-500/30 transition-all duration-300">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white flex items-center gap-2">
                      <span className="inline-flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-purple-500/20 text-white">
                        {index + 1}
                      </span>
                      {step.title}
                    </h3>
                    <p className="text-sm sm:text-base text-slate-300">{step.description}</p>
                  </div>
                </div>

                <div className="relative flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-slate-800 border-4 border-slate-700 z-10 mx-auto md:mx-0">
                  {step.icon}
                </div>

                <div className="flex-1 md:block hidden"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
