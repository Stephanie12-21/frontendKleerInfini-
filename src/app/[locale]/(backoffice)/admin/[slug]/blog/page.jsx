"use client";

import React, { use, useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, Edit, Trash2, Search } from "lucide-react";
import ConfirmDeleteModal from "@/app/[locale]/(modal)/delete/page";
import { SuccessModal } from "@/app/[locale]/(modal)/success/page";
import { ErrorModal } from "@/app/[locale]/(modal)/erreurs/page";
import { useLocale, useTranslations } from "next-intl";

const Annonces = () => {
  const t = useTranslations();
  const locale = useLocale();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState(null);
  const { data: status } = useSession();
  const router = useRouter();
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);
  const [searchFilter, setSearchFilter] = useState("");
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);
  const { slug } = useParams();

  if (!slug) {
    return <div>{t("LOADING")}</div>;
  }

  const [nom] = slug.split("-");

  if (!nom) {
    return <div>{t("INVALID_SLUG_ERROR")}</div>;
  }

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push(`${locale}/auth`);
    }
  }, [status, router]);

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/blog");
      const data = await response.json();
      setArticles(data);
    } catch (error) {
      console.error("Erreur lors de la récupération des articles :", error);
      setError("Erreur lors de la récupération des articles.");
    }
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  const handleDeleteClick = (id) => {
    setSelectedArticleId(id);
    setShowDeleteModal(true);
  };

  const handleCloseModal = () => {
    setShowDeleteModal(false);
    setSelectedArticleId(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedArticleId) return;

    try {
      const response = await fetch(`/api/blog/${selectedArticleId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'article");
      }

      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== selectedArticleId)
      );

      console.log("Article supprimé avec succès");

      setIsSuccessModalOpen(true);

      setTimeout(() => {
        router.push(`/${locale}/admin/${slug}/blog/`);
      }, 2000);
    } catch (error) {
      console.error("Erreur lors de la suppression des données :", error);

      setIsErrorModalOpen(true);
    } finally {
      setShowDeleteModal(false);
      setSelectedArticleId(null);
    }
  };

  const filteredArticles = articles.filter((article) => {
    const searchLower = searchFilter.toLowerCase();
    return (
      article.titre.toLowerCase().includes(searchLower) ||
      article.categorieArticle.toLowerCase().includes(searchLower)
    );
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4 justify-between mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 w-full max-w-full mx-auto p-0">
          <div className="relative w-full md:w-2/3">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder={t("search-by-title-or-category")}
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 pr-4 py-2 w-full border-2 border-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        <Link href={`/${locale}/admin/${slug}/blog/addBlog`}>
          <Button className="w-full md:w-auto bg-[#0C1844] hover:bg-[#0C1844] text-white rounded-mb py-2  px-4">
            {t("create-new-article")}
          </Button>
        </Link>
      </div>

      {error && (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6"
          role="alert"
        >
          <strong className="font-bold">{t("error")}</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.length === 0 ? (
          <p className="text-center col-span-full text-gray-500">
            {t("no-article-found")}
          </p>
        ) : (
          filteredArticles.map((article) => (
            <Card
              key={article.id}
              className="overflow-hidden transition-shadow duration-300 ease-in-out hover:shadow-xl flex flex-col"
            >
              <CardContent
                className={`p-0 ${
                  article.images?.length > 0 ? "" : "bg-primary"
                }`}
              >
                {article.images?.length > 0 ? (
                  <div className="relative h-48">
                    <Image
                      src={article.images[0].path}
                      alt={article.titre}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-white font-semibold">
                    {t("no-image")}
                  </div>
                )}
              </CardContent>

              <CardFooter className="flex flex-col p-4 h-full">
                <div className="w-full">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="secondary" className="mb-2">
                      {article.categorieArticle}
                    </Badge>
                  </div>
                  <h3 className="text-xl font-semibold line-clamp-2">
                    {article.titre}
                  </h3>

                  <p className="text-base text-muted-foreground mb-1">
                    {new Date(article.createdAt).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>

                <div className="flex justify-between items-center w-full pt-8 mt-auto">
                  <Link
                    href={`/${locale}/admin/${slug}/blog/${article.id}`}
                    className="text-green-500 hover:text-green-700 transition-colors"
                    title="Voir"
                  >
                    <Eye className="h-6 w-6" />
                  </Link>
                  <Link
                    href={`/${locale}/admin/${slug}/blog/editBlog/${article.id}`}
                    className="text-yellow-500 hover:text-yellow-700 transition-colors"
                    title="Éditer"
                  >
                    <Edit className="h-6 w-6" />
                  </Link>
                  <button
                    onClick={() => handleDeleteClick(article.id)}
                    className="text-red-500 hover:text-red-700 transition-colors"
                    title="Supprimer"
                  >
                    <Trash2 className="h-6 w-6" />
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))
        )}
      </div>

      <ConfirmDeleteModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
      <SuccessModal
        isOpen={isSuccessModalOpen}
        onClose={() => setIsSuccessModalOpen(false)}
      />
      <ErrorModal
        isOpen={isErrorModalOpen}
        onClose={() => setIsErrorModalOpen(false)}
      />
    </div>
  );
};

export default Annonces;
