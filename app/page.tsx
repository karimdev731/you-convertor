import Hero from "@/components/hero"
import ConversionForm from "@/components/conversion-form"
import Features from "@/components/features"
import HowItWorks from "@/components/how-it-works"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 text-white">
      <Hero />
      <ConversionForm />
      <Features />
      <HowItWorks />
      <Footer />
    </main>
  )
}

