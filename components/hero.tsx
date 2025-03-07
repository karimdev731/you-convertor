"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    {
      /*Effet de scramble sur le titre*/
    }

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let interval: NodeJS.Timeout | null = null;
    let loopInterval: NodeJS.Timeout | null = null;

    const startScramble = () => {
      let iteration = 0;
      const originalText = "YOU CONVERTOR";

      clearInterval(interval as NodeJS.Timeout);

      interval = setInterval(() => {
        if (titleRef.current) {
          titleRef.current.innerText = originalText
            .split("")
            .map((letter, index) => {
              if (index < iteration) {
                return originalText[index];
              }
              return letters[Math.floor(Math.random() * 26)];
            })
            .join("");
        }

        if (iteration >= originalText.length) {
          clearInterval(interval as NodeJS.Timeout);
        }

        iteration += 1 / 3;
      }, 30);
    };

    // Start the initial scramble
    startScramble();

    // Create a loop that triggers the scramble effect every 5 seconds
    loopInterval = setInterval(startScramble, 5000);

    // Clean up both intervals when component unmounts
    return () => {
      if (interval) clearInterval(interval);
      if (loopInterval) clearInterval(loopInterval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };

    // Scroll animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    tl.to(subtitleRef.current, {
      y: 100,
      opacity: 0,
      ease: "power2.inOut",
    });

    return () => {
      if (interval) clearInterval(interval);
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-screen flex flex-col items-center justify-center px-4 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-center opacity-10"></div>

      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>

      <h1
        ref={titleRef}
        className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 mb-6 tracking-tight"
      >
        YOU CONVERTOR
      </h1>

      <p
        ref={subtitleRef}
        className="text-xl md:text-2xl text-slate-300 max-w-2xl text-center mb-8"
      >
        Convertissez facilement vos vidéos YouTube en fichiers MP3 ou MP4 avec
        notre outil rapide et intuitif.
      </p>

      <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="text-slate-400"
        >
          <path d="M12 5v14"></path>
          <path d="m19 12-7 7-7-7"></path>
        </svg>
      </div>
    </div>
  );
}
