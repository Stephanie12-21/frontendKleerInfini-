"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Loader2, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import RichTextEditor from "@/components/TextEditor/RichEditor";
import { SuccessModal } from "@/app/[locale]/(modal)/success/page";
import { ErrorModal } from "@/app/[locale]/(modal)/erreurs/page";
import { useTranslations } from "next-intl";

const ArticleDetailPageModif = ({ params }) => {
  const t = useTranslations();
  const { id } = use(params);
  const [article, setArticle] = useState(null);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    titre: "",
    contenu: "",
    categorieArticle: "",
    files: [],
  });
  const [contenu, setContenu] = useState({});
  const router = useRouter();

  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);
  const [isErrorModalOpen, setIsErrorModalOpen] = useState(false);

  const fetchArticle = async (id) => {
    try {
      const response = await fetch(`/api/blog/${id}`);
      if (!response.ok) {
        throw new Error("Article non trouvé");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Erreur lors de la récupération de l'article:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (id) {
      fetchArticle(id)
        .then((data) => {
          setArticle(data);
          setFormData({
            titre: data.titre,
            contenu: data.contenu,
            categorieArticle: data.categorieArticle,
            files: [],
          });
          setContenu(data.contenu ? JSON.parse(data.contenu) : {});
        })
        .catch((err) => setError(err.message));
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({
        ...prev,
        files: [...prev.files, ...Array.from(files)],
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      files: prev.files.filter((_, i) => i !== index),
    }));
  };

  const resetForm = () => {
    setFormData({
      titre: "",
      contenu: "",
      categorieArticle: "",
      files: [],
    });
    setContenu({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("titre", formData.titre);
    formDataToSend.append("contenu", JSON.stringify(contenu));
    formDataToSend.append("categorieArticle", formData.categorieArticle);
    formData.files.forEach((file) => {
      formDataToSend.append("files", file);
    });

    try {
      const response = await fetch(`/api/blog/${id}`, {
        method: "PUT",
        body: formDataToSend,
      });
      if (!response.ok) {
        throw new Error("Erreur lors de la mise à jour de l'article");
      }
      setIsSuccessModalOpen(true);

      resetForm();

      setTimeout(() => {
        router.refresh();
      }, 5000);
    } catch (error) {
      setIsErrorModalOpen(true);
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!article) {
    return (
      <Card className="w-full max-w-md mx-auto mt-8">
        <CardContent className="flex flex-col items-center justify-center p-6">
          <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
          <p className="text-lg font-medium text-center">
            {t("loading-article")}
          </p>
          <p className="text-sm text-muted-foreground text-center mt-2">
            {t("please-wait")}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="max-w-6xl container  mx-auto px-4 py-8 bg-white shadow-md my-5 rounded-lg">
      <h1 className="text-4xl font-bold mb-8 text-center">
        {t("edit-article")}
      </h1>
      <div className="flex-col space-y-3">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="titre"
                className="block text-lg font-medium text-gray-700"
              >
                {t("label-titre")}
              </label>
              <input
                type="text"
                id="titre"
                name="titre"
                value={formData.titre}
                onChange={handleChange}
                className="mt-1 p-2 w-full border border-gray-300 rounded-md"
              />
            </div>

            <div>
              <label
                htmlFor="categorieArticle"
                className="block text-lg font-medium text-gray-700"
              >
                {t("label-categorie")}
              </label>

              <select
                id="categorieArticle"
                value={formData.categorieArticle}
                onChange={handleChange}
                required
                className="mt-1 block w-full h-10 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              >
                <option value="">{t("selectionner-categorie")}</option>
                <option value="technologie">
                  {t("categorie-technologie")}
                </option>
                <option value="exportation">
                  {t("categorie-exportation")}
                </option>
                <option value="commerce-internationale">
                  {t("categorie-commerce")}
                </option>
              </select>
            </div>

            <div>
              <label
                htmlFor="contenu"
                className="block text-sm font-medium text-gray-700"
              >
                {t("label-contenu")}
              </label>
              <RichTextEditor
                content={contenu}
                onChange={(json) => setContenu(json)}
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label
                htmlFor="files"
                className="block text-lg font-medium text-gray-700"
              >
                {t("label-images")}
              </label>
              <Input
                type="file"
                id="files"
                accept="image/*"
                multiple
                onChange={handleChange}
                className="mt-1"
              />
            </div>
            {formData.files.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  {t("images-selectionnees")}:
                </h3>
                <div className="grid grid-cols-4 gap-4">
                  {formData.files.map((file, index) => {
                    const fileURL = URL.createObjectURL(file);

                    return (
                      <div key={index} className="relative group">
                        <Image
                          src={fileURL}
                          alt={`Image ${index + 1}`}
                          width={100}
                          height={70}
                          className="w-28 h-20 object-cover rounded"
                        />
                        <button
                          type="button"
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                          onClick={() => handleRemoveImage(index)}
                        >
                          <X size={16} />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between w-full space-x-9">
            <Button
              className=" text-white p-2 rounded w-full"
              onClick={handleSubmit}
            >
              {t("edit-article")}
            </Button>
          </div>
        </div>
      </div>

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

export default ArticleDetailPageModif;
