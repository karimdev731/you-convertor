import Link from "next/link"

export default function Footer() {
  return (
    <footer className="py-8 px-4 bg-slate-950 border-t border-slate-800">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-slate-400 text-sm mb-4 md:mb-0">
          © {new Date().getFullYear()} HNC.dev. Tous droits réservés.
        </div>

        <div className="flex gap-6">
          <Link href="/terms" className="text-slate-400 hover:text-white text-sm transition-colors">
            Conditions d'utilisation et Confidentialité
          </Link>
        </div>
      </div>
    </footer>
  )
}

