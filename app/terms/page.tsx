import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <div className="max-w-4xl mx-auto py-16 px-4">
        <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white mb-8">
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
            className="mr-2"
          >
            <path d="m15 18-6-6 6-6"></path>
          </svg>
          Retour à l'accueil
        </Link>

        <h1 className="text-4xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          Conditions d'utilisation et Confidentialité
        </h1>

        <div className="space-y-8 text-slate-300">
          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">1. Utilisation du service</h2>
            <p>
              You Convertor est un service permettant de convertir des vidéos YouTube en fichiers MP3 ou MP4. En
              utilisant notre service, vous acceptez de respecter les conditions suivantes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">2. Droits d'auteur</h2>
            <p>
              You Convertor respecte les droits d'auteur et la propriété intellectuelle. Notre service est destiné
              uniquement à la conversion de contenu pour un usage personnel et non commercial. Les utilisateurs sont
              responsables de s'assurer qu'ils ont le droit de télécharger et de convertir le contenu qu'ils soumettent.
            </p>
            <p className="mt-4">
              Nous vous encourageons à respecter les droits d'auteur et à ne télécharger que du contenu que vous êtes
              autorisé à utiliser selon les lois en vigueur dans votre pays.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">3. Confidentialité</h2>
            <p>
              Nous ne stockons pas les vidéos que vous convertissez ni les fichiers générés au-delà du temps nécessaire
              pour effectuer la conversion et vous permettre de les télécharger. Nous ne collectons pas d'informations
              personnelles identifiables, à l'exception des données techniques nécessaires au fonctionnement du service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">4. Limitation de responsabilité</h2>
            <p>
              You Convertor n'est pas responsable de l'utilisation que vous faites des fichiers convertis. Nous ne
              garantissons pas la disponibilité continue du service et nous nous réservons le droit de modifier ou
              d'interrompre le service à tout moment.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4 text-white">5. Modifications des conditions</h2>
            <p>
              Nous nous réservons le droit de modifier ces conditions à tout moment. Les modifications prendront effet
              dès leur publication sur notre site. Il est de votre responsabilité de consulter régulièrement ces
              conditions.
            </p>
          </section>
        </div>

        <div className="mt-12 flex justify-center">
          <Button
            asChild
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full px-8"
          >
            <Link href="/">Retour à l'accueil</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

