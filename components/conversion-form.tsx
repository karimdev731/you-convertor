"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Download, AlertCircle } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ConversionForm() {
  const [url, setUrl] = useState("");
  const [format, setFormat] = useState("mp3");
  const [resolution, setResolution] = useState("720p");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const [downloadFilename, setDownloadFilename] = useState("");

  const formRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    // Make animations work on all screen sizes
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: formRef.current,
        start: "top 80%",
        end: "center center",
        scrub: false,
        once: true,
      },
    });

    tl.fromTo(
      formRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    );

    // Text animation for the title
    gsap.fromTo(
      titleRef.current,
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%",
          once: true,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Reset states
    setError("");
    setDownloadLink("");

    // Validate URL
    if (!url) {
      setError("Veuillez entrer une URL YouTube valide");
      return;
    }

    if (!url.includes("youtube.com/") && !url.includes("youtu.be/")) {
      setError("L'URL doit être une URL YouTube valide");
      return;
    }

    // Start real conversion process
    setIsLoading(true);

    try {
      // Extract video ID from URL
      const videoId = url.includes("v=")
        ? url.split("v=")[1].split("&")[0]
        : url.split("youtu.be/")[1]?.split("?")[0];

      if (!videoId) {
        setError("Impossible d'extraire l'ID de la vidéo YouTube");
        return;
      }

      // Create the download link that points to our API
      const apiUrl = `/api/download?id=${videoId}&format=${format}${
        format === "mp4" ? `&resolution=${resolution}` : ""
      }`;

      // Set the download link and filename
      const filename = `youtube-${videoId}.${format}`;
      setDownloadLink(apiUrl);
      setDownloadFilename(filename);
    } catch (err) {
      console.error("Error during conversion:", err);
      setError(
        "Une erreur est survenue lors de la conversion. Veuillez réessayer."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div id="conversion-form" className="py-12 sm:py-20 px-4 bg-slate-900">
      <div className="max-w-4xl mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6 sm:mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
        >
          Convertissez vos vidéos en quelques clics
        </h2>

        <div
          ref={formRef}
          className="bg-slate-800 rounded-2xl p-4 sm:p-6 md:p-10 shadow-xl border border-slate-700"
        >
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
            <div>
              <Label
                htmlFor="youtube-url"
                className="text-slate-300 mb-2 block"
              >
                URL de la vidéo YouTube
              </Label>
              <Input
                id="youtube-url"
                type="text"
                placeholder="https://www.youtube.com/watch?v=..."
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="bg-slate-950 border-slate-700 text-white placeholder:text-slate-500"
              />
            </div>

            <div>
              <Label className="text-slate-300 mb-2 block">
                Format de sortie
              </Label>
              <RadioGroup
                value={format}
                onValueChange={setFormat}
                className="flex space-x-6"
              >
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 rounded-full border relative ${
                      format === "mp3" ? "border-purple-400" : "border-gray-500"
                    }`}
                    onClick={() => setFormat("mp3")}
                  >
                    {format === "mp3" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-purple-400"></div>
                      </div>
                    )}
                    <input
                      type="radio"
                      id="mp3"
                      value="mp3"
                      className="sr-only"
                      checked={format === "mp3"}
                      onChange={() => setFormat("mp3")}
                    />
                  </div>
                  <Label
                    htmlFor="mp3"
                    className="text-white cursor-pointer"
                    onClick={() => setFormat("mp3")}
                  >
                    MP3 (Audio)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <div
                    className={`h-4 w-4 rounded-full border relative ${
                      format === "mp4" ? "border-pink-400" : "border-gray-500"
                    }`}
                    onClick={() => setFormat("mp4")}
                  >
                    {format === "mp4" && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="h-2 w-2 rounded-full bg-pink-400"></div>
                      </div>
                    )}
                    <input
                      type="radio"
                      id="mp4"
                      value="mp4"
                      className="sr-only"
                      checked={format === "mp4"}
                      onChange={() => setFormat("mp4")}
                    />
                  </div>
                  <Label
                    htmlFor="mp4"
                    className="text-white cursor-pointer"
                    onClick={() => setFormat("mp4")}
                  >
                    MP4 (Vidéo)
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {format === "mp4" && (
              <div>
                <Label
                  htmlFor="resolution"
                  className="text-slate-300 mb-2 block"
                >
                  Résolution
                </Label>
                <Select value={resolution} onValueChange={setResolution}>
                  <SelectTrigger className="bg-slate-950 border-slate-700 text-white">
                    <SelectValue placeholder="Sélectionnez une résolution" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-white">
                    <SelectItem value="360p">360p</SelectItem>
                    <SelectItem value="480p">480p</SelectItem>
                    <SelectItem value="720p">720p (HD)</SelectItem>
                    <SelectItem value="1080p">1080p (Full HD)</SelectItem>
                    <SelectItem value="1440p">1440p (2K)</SelectItem>
                    <SelectItem value="2160p">2160p (4K)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="pt-2 sm:pt-4">
              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium py-4 sm:py-6 rounded-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Conversion en cours...
                  </>
                ) : (
                  "Convertir"
                )}
              </Button>
            </div>
          </form>

          {downloadLink && (
            <div className="mt-6 sm:mt-8 p-4 bg-slate-700/50 rounded-xl border border-purple-500/30">
              <h3 className="text-lg font-medium text-white mb-2">
                Conversion réussie !
              </h3>
              <p className="text-slate-300 mb-4">
                Votre fichier est prêt à être téléchargé.
              </p>
              <Button
                asChild
                className="w-full bg-green-600 hover:bg-green-700 text-white font-medium rounded-xl"
              >
                <a href={downloadLink} download={downloadFilename}>
                  <Download className="mr-2 h-4 w-4" />
                  Télécharger {format.toUpperCase()}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
