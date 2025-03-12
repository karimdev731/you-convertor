# You Convertor - Frontend

## Description
You Convertor est une plateforme web moderne et élégante permettant la conversion d'URL YouTube en fichiers MP3 ou MP4. Cette partie du projet concerne uniquement le **frontend**. Le **backend n'est pas encore implémenté**. L'interface est conçue pour offrir une expérience utilisateur fluide et intuitive avec des animations modernes et un design responsive.

## Fonctionnalités (Frontend uniquement)
### Conversion et Téléchargement
- Champ de saisie pour entrer une URL YouTube.
- Boutons pour choisir le format de sortie : **MP3 ou MP4**.
- Affichage des résolutions disponibles si MP4 est sélectionné.
- Bouton "Convertir" (sans fonction backend pour le moment).
- Gestion des erreurs pour les URLs invalides (visuellement).

### Interface Utilisateur (UI/UX)
- **Design moderne et responsive** (desktop, tablette, mobile).
- **Effets de scrolling fluides** pour une navigation immersive.
- **Effets de déplacement de texte** pour mettre en valeur les informations clés.
- **Effets de scrambling de texte** pour un rendu futuriste.
- **Animation de chargement** lors du processus de conversion (simulée pour l'instant).

## Technologies utilisées
- **Framework Frontend** : React.js
- **Styling** : Tailwind CSS
- **Animations** : GSAP (GreenSock) ou Framer Motion

## Installation et Utilisation
### Prérequis
- Node.js installé
- Un gestionnaire de paquets (npm,yarn ou pnpm)

### Installation
1. **Cloner le projet** :
   ```bash
   git clone https://github.com/karimdev731/you-convertor.git
    ```
 ```bash
cd YouConvertor
   ```
2. **Installer les dépendances** :
   ```bash
   npm install
   ```

### Lancer le projet
```bash
npm start
```

## Évolutions futures
- Connexion au backend (Node.js + Express.js).
- Intégration d'une API pour la conversion (youtube-dl ou yt-dlp).

## Statut du projet
🚧 **En développement - Seule la partie frontend est disponible pour l’instant.**

## Démo app
https://you-convertor.vercel.app/


