"use client";

import Image from "next/image";
import React, { useRef, useState, useEffect, use } from "react";
import { Search } from "lucide-react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

// Fonction pour formater les dates
function formatDate(date) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));
}

// Composant ArticleCard
function ArticleCard({ article }) {
  const locale = useLocale();
  const t = useTranslations();
  const removeQuotes = (content) => {
    return content.replace(/^"|"$/g, "");
  };
  return (
    <div className="flex flex-col h-full overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md">
      <div className="relative h-48 w-full overflow-hidden">
        {article.images.length > 0 ? (
          <Image
            src={
              article.images[0].path || "/placeholder.svg?height=400&width=600"
            }
            alt={article.titre}
            width={600}
            height={400}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-100">
            <span className="text-gray-400">Aucune image</span>
          </div>
        )}
        <div className="absolute right-2 top-2 rounded-full bg-[#C80036] px-3 py-1 text-xs font-medium text-white">
          {article.categorieArticle}
        </div>
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="mb-2 text-xl font-bold text-[#0C1844] line-clamp-2">
          {article.titre}
        </h3>
        <p
          className="mb-4 flex-1 text-sm text-gray-600 line-clamp-3"
          dangerouslySetInnerHTML={{
            __html: removeQuotes(article.contenu.substring(0, 150)) + "...",
          }}
        />

        <div className="mt-auto flex items-center justify-between">
          <span className="text-xs text-gray-500">
            {formatDate(article.createdAt)}
          </span>
          <Link
            href={`/${locale}/blog/${article.id}`}
            className="rounded-full bg-[#0C1844] px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-[#0C1844]/90"
          >
            {t("read-more")}
          </Link>
        </div>
      </div>
    </div>
  );
}
const Blog = () => {
  const t = useTranslations();
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [activeTab, setActiveTab] = useState(t("all"));
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleArticles, setVisibleArticles] = useState(9);
  const kleerSectionRef = useRef();
  const [isMobile, setIsMobile] = useState(false);

  const handleScrollDown = () => {
    kleerSectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const res = await fetch("/api/blog");
        const data = await res.json();
        setArticles(data);
        setFilteredArticles(data);
      } catch (err) {
        console.error("Erreur de chargement des articles", err);
      }
    };
    fetchArticles();
  }, []);

  useEffect(() => {
    let filtered = [...articles];
    if (activeTab !== t("all")) {
      filtered = filtered.filter((a) => a.categorieArticle === activeTab);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (a) =>
          a.titre.toLowerCase().includes(query) ||
          a.contenu.toLowerCase().includes(query)
      );
    }
    setFilteredArticles(filtered);
    setVisibleArticles(9); // Reset visible count on filter
  }, [activeTab, searchQuery, articles]);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  const categories = [
    t("all"),
    ...new Set(articles.map((a) => a.categorieArticle)),
  ];
  const articlesToShow = filteredArticles.slice(0, visibleArticles);
  const hasMoreArticles = filteredArticles.length > visibleArticles;

  const handleLoadMore = () => setVisibleArticles((prev) => prev + 9);

  return (
    <div className="flex flex-col items-centerjustify-center">
      <section
        className="relative flex flex-col items-center justify-center min-h-[400px] md:min-h-[500px] lg:min-h-[600px] text-center px-4 sm:px-6 md:px-10 bg-cover bg-center w-full py-8 md:py-10 lg:py-12"
        style={{
          backgroundImage: "url('/serviceImage.jfif')",
        }}
      >
        <div className="max-w-7xl mx-auto w-full">
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
            {t("all-articles-title")}
          </h1>

          <div className="w-full flex justify-center pt-3 md:pt-5">
            <button
              onClick={handleScrollDown}
              className="px-4 sm:px-6 md:px-8 py-2 sm:py-2.5 md:py-3 bg-[#C80036] hover:bg-[#A80030] transition-colors duration-200 rounded-lg cursor-pointer text-white text-sm sm:text-base md:text-lg font-medium"
            >
              {t("EN-SAVOIR-PLUS")}
            </button>
          </div>
        </div>
      </section>

      <section
        ref={kleerSectionRef}
        className="w-full my-8 sm:my-12 md:my-16 lg:my-20"
      >
        {/* Barre de recherche */}
        <div className="w-full max-w-[850px] mx-auto mb-6 px-4 sm:px-0">
          <div className="relative">
            <input
              type="text"
              placeholder={t("search-article-placeholder")}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full py-2 sm:py-3 pl-10 sm:pl-14 pr-4 border-2 border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#0C1844] text-base sm:text-lg"
            />
            <Search className="absolute left-3 sm:left-5 top-1/2 transform -translate-y-1/2 text-gray-700 h-5 w-5 sm:h-6 sm:w-6" />
          </div>
        </div>

        {/* Onglets de catégories */}
        {isMobile ? (
          <div className="px-4 mb-6">
            <select
              value={activeTab}
              onChange={(e) => setActiveTab(e.target.value)}
              className="w-full p-3 border-2 rounded-full border-[#0C1844] text-[#0C1844] font-medium focus:outline-none focus:ring-2 focus:ring-[#0C1844]"
            >
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 px-4 sm:px-5 py-2 mb-6 overflow-x-auto">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveTab(category)}
                className={`relative py-2 sm:py-3 px-4 sm:px-8 text-sm sm:text-base font-medium rounded-full border-2 transition-colors ${
                  activeTab === category
                    ? "bg-[#C80036] text-white border-[#C80036]"
                    : "bg-white text-[#0C1844] border-[#0C1844] hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        )}

        {/* Grille d'articles */}
        {articlesToShow.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  p-8  gap-6">
              {filteredArticles.slice(0, visibleArticles).map((article) => (
                <ArticleCard key={article.id} article={article} />
              ))}
            </div>

            {/* Bouton "Voir plus" */}
            {hasMoreArticles && (
              <div className="flex justify-center mt-10 mb-6">
                <button
                  onClick={handleLoadMore}
                  className="px-6 py-3 bg-white border-2 border-[#0C1844] text-[#0C1844] hover:bg-gray-50 transition-colors duration-200 rounded-full font-medium"
                >
                  {t("see-more-articles")} (
                  {filteredArticles.length - visibleArticles} {t("restants")})
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium text-gray-600">
              {t("no-articles-title")}
            </h3>
            <p className="mt-2 text-gray-500">{t("no-articles-description")}</p>
          </div>
        )}
      </section>
    </div>
  );
};

export default Blog;
