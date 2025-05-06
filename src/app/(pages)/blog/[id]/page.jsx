"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { X } from "lucide-react";

// Fonction pour formater les dates
function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

export default function ArticlePage() {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isLightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    async function fetchArticle() {
      try {
        const response = await fetch(`/api/blog/${id}`);
        if (!response.ok) throw new Error("Erreur lors du chargement");
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error(error);
        setArticle(null);
      } finally {
        setLoading(false);
      }
    }

    if (id) fetchArticle();
  }, [id]);

  const removeQuotes = (content) => {
    return content.replace(/^"|"$/g, "");
  };
  const openLightbox = (index) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (!article || !article.images || article.images.length === 0) return;

      if (event.key === "Escape") {
        setLightboxOpen(false);
      } else if (event.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % article.images.length);
      } else if (event.key === "ArrowLeft") {
        setCurrentIndex((prevIndex) =>
          prevIndex === 0 ? article.images.length - 1 : prevIndex - 1
        );
      }
    };

    if (isLightboxOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isLightboxOpen, article]);

  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-1/4" />
          <div className="h-96 bg-gray-200 rounded" />
          <div className="space-y-2">
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="container mx-auto py-12 px-4 text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Article non trouvé
        </h1>
        <p className="text-gray-600 mb-8">
          L'article que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full bg-[#0C1844] px-6 py-3 text-white hover:bg-[#0C1844]/90 transition-colors"
        >
          <ArrowLeft size={16} />
          Retour à l'accueil
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto py-8 px-4">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-[#0C1844] hover:underline mb-8"
        >
          <ArrowLeft size={16} />
          Retour aux articles
        </Link>

        <article>
          <header className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-[#0C1844] mb-4">
              {article.titre}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
              <span>Publié le {formatDate(article.createdAt)}</span>
              <span className="inline-block rounded-full bg-[#C80036] px-3 py-1 text-xs font-medium text-white">
                {article.categorieArticle}
              </span>
            </div>
          </header>

          {article.images?.length > 0 && (
            <div className="mb-8">
              <Image
                src={
                  article.images[0].path ||
                  "/placeholder.svg?height=600&width=1200"
                }
                alt={article.titre}
                width={1200}
                height={600}
                className="w-full h-auto max-h-[500px] object-cover rounded-lg"
              />
            </div>
          )}

          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{
              __html: removeQuotes(article.contenu),
            }}
          ></div>

          {article.images?.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold text-[#0C1844] mb-4">
                Galerie d'images
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {article.images[1]?.path && (
                  <div className="flex justify-center items-center">
                    <Image
                      src={article.images[0].path}
                      alt="Image principale"
                      width={800}
                      height={600}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "300px",
                        objectFit: "cover",
                        cursor: "pointer",
                        borderRadius: "10px",
                      }}
                      onClick={() => openLightbox(0)}
                    />
                  </div>
                )}
                {isLightboxOpen && (
                  <div
                    className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50"
                    style={{
                      backdropFilter: "blur(10px)",
                    }}
                  >
                    <Swiper
                      spaceBetween={20}
                      slidesPerView={1}
                      className="w-full max-w-3xl"
                      initialSlide={currentIndex}
                      onSlideChange={(swiper) =>
                        setCurrentIndex(swiper.activeIndex)
                      }
                    >
                      {article.images.map((image, index) => (
                        <SwiperSlide key={index}>
                          <Image
                            src={image.path}
                            alt={`Image ${index + 1}`}
                            width={1200}
                            height={900}
                            style={{
                              maxWidth: "90%",
                              maxHeight: "90vh",
                              objectFit: "contain",
                              borderRadius: "10px",
                              margin: "auto",
                            }}
                          />
                        </SwiperSlide>
                      ))}
                    </Swiper>

                    <button
                      className="absolute top-4 right-4 hover:bg-[#9B9B9B] text-white p-2 rounded-full"
                      onClick={() => setLightboxOpen(false)}
                    >
                      <X />
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}
