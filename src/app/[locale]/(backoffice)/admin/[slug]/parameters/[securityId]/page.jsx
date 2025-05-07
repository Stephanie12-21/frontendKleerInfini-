"use client";
import React, { useState } from "react";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "next-auth/react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

const PasswordChangeForm = () => {
  const t = useTranslations();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState(false);
  const { data: session } = useSession();
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleCancel = () => {
    setFormData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setStep(1);
    setError("");
    setSuccess(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session || !session.user || !session.user.id) {
      setError("Impossible de récupérer l'ID de l'utilisateur.");
      return;
    }

    const adminId = session.user.id;
    console.log("ID de l'utilisateur de la session actuelle :", adminId);

    if (step === 1) {
      if (!formData.currentPassword) {
        setError("Le mot de passe actuel est requis");
        return;
      }

      try {
        const response = await fetch("/api/compte/verifyPswrd", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            adminId: adminId,
            currentPassword: formData.currentPassword,
          }),
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Mot de passe correspondant");
          setStep(2);
          setError("");
        } else {
          setError(data.error || "Le mot de passe actuel est incorrect");
        }
      } catch (error) {
        setError(
          "Une erreur est survenue lors de la vérification du mot de passe"
        );
        console.error(
          "Erreur lors de la vérification du mot de passe :",
          error
        );
      }
    } else if (step === 2) {
      if (!formData.newPassword || !formData.confirmPassword) {
        setError("Tous les champs sont obligatoires");
        return;
      }

      if (formData.newPassword.length < 8) {
        setError("Le nouveau mot de passe doit contenir au moins 8 caractères");
        return;
      }

      if (formData.newPassword !== formData.confirmPassword) {
        setError("Les nouveaux mots de passe ne correspondent pas");
        return;
      }

      try {
        const response = await fetch(`/api/compte/modifyPswrd/${adminId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            newPassword: formData.newPassword,
          }),
        });

        if (response.ok) {
          setSuccess(true);
          setFormData({
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          });
        } else {
          setError("Erreur lors de la modification du mot de passe");
        }
      } catch (e) {
        setError(
          "Une erreur est survenue lors de la modification du mot de passe"
        );
      }
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6">
      <Card className="w-full  mx-auto">
        <CardHeader>
          <CardTitle>
            <h1 className="text-3xl font-bold mb-8 text-center">
              {t("change-password-title")}
            </h1>
          </CardTitle>
          <CardDescription>
            {error && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>{t("error")}</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mb-4 bg-green-50 text-green-700 border-green-200">
                <CheckCircle2 className="h-4 w-4" />
                <AlertTitle>
                  {t("successModal-congratulationsMessage")}
                </AlertTitle>
                <AlertDescription>
                  {t("password-changed-success")}
                </AlertDescription>
              </Alert>
            )}
            {step === 1
              ? t("current-password-placeholder")
              : t("new-password-placeholder")}
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-lg font-medium">
                {t("etape")} {step} {t("sur")} 2
              </span>

              <div className="flex">
                <div
                  className={`h-2 w-4 rounded-full ${
                    step === 1 ? "bg-[#0C1844]" : "bg-gray-200"
                  } mr-1`}
                ></div>
                <div
                  className={`h-2 w-4 rounded-full ${
                    step === 2 ? "bg-[#0C1844]" : "bg-gray-200"
                  }`}
                ></div>
              </div>
            </div>

            {step === 1 && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword" className="text-lg">
                  {t("current-password-label")}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="currentPassword"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute right-0 top-0 h-full"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            )}

            {step === 2 && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="newPassword" className="text-lg">
                    {t("new-password-label")}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      value={formData.newPassword}
                      onChange={handleChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="text-lg">
                    {t("confirm-password-label")}
                  </Label>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-full"
                      onClick={togglePasswordVisibility}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </>
            )}
          </CardContent>

          <CardFooter className="flex flex-col space-y-2 mt-5">
            <button
              type="submit"
              className="bg-[#0C1844] text-white w-full text-lg py-2  px-4 rounded "
            >
              {step === 1
                ? t("check-password-text")
                : t("change-password-text")}
            </button>

            {step === 2 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleCancel}
                className="w-full"
              >
                {t("cancel-operation")}
              </Button>
            )}
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default PasswordChangeForm;
