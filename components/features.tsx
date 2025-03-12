"use client"

import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Music, Video, Shield, Zap } from "lucide-react"

const features = [
  {
    icon: <Music className="h-8 w-8 sm:h-10 sm:w-10 text-purple-400" />,
    title: "Conversion MP3",
    description: "Extrayez l'audio de vos vidéos YouTube préférées en format MP3 de haute qualité.",
  },
  {
    icon: <Video className="h-8 w-8 sm:h-10 sm:w-10 text-pink-400" />,
    title: "Conversion MP4",
    description: "Téléchargez vos vidéos YouTube en MP4 avec différentes résolutions disponibles jusqu'à 4K.",
  },
  {
    icon: <Zap className="h-8 w-8 sm:h-10 sm:w-10 text-yellow-400" />,
    title: "Conversion Rapide",
    description: "Notre technologie avancée permet une conversion rapide et efficace de vos vidéos.",
  },
  {
    icon: <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-400" />,
    title: "Sécurité Garantie",
    description: "Nous ne stockons pas vos vidéos et respectons votre vie privée à chaque étape.",
  },
]

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const featureRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

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
          once: true,
        },
      },
    )

    // Features staggered animation
    featureRefs.current.forEach((feature, index) => {
      gsap.fromTo(
        feature,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.2 * index,
          ease: "power3.out",
          scrollTrigger: {
            trigger: feature,
            start: "top 85%",
            once: true,
          },
        },
      )
    })

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
    }
  }, [])

  return (
    <div ref={sectionRef} className="py-12 sm:py-20 px-4 bg-slate-950">
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 sm:mb-16 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Pourquoi choisir You Convertor ?
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 md:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              ref={(el) => (featureRefs.current[index] = el)}
              className="bg-slate-800/50 rounded-xl p-5 sm:p-6 border border-slate-700/50 hover:border-purple-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
            >
              <div className="mb-3 sm:mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 text-white">{feature.title}</h3>
              <p className="text-sm sm:text-base text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

