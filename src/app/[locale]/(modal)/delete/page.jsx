import React from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useTranslations } from "next-intl";

const ConfirmDeleteModal = ({ isOpen, onClose, onConfirm }) => {
  const t = useTranslations();
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader className="flex flex-col items-center gap-4">
          <AlertTriangle className="h-16 w-16 text-yellow-500" />
          <DialogTitle className="text-2xl font-bold text-center">
            {t("confirm-delete-title")}
          </DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-center text-lg text-primary py-4">
          {t("confirm-delete-description")}
        </DialogDescription>
        <DialogFooter className="flex flex-col w-full sm:flex-col gap-2 sm:gap-4 mt-4">
          <Button
            variant="destructive"
            className="w-full h-8 sm:w-auto"
            onClick={onConfirm}
          >
            {t("confirm-delete-yes")}
          </Button>
          <Button
            variant="outline"
            className="w-full h-8 sm:w-auto"
            onClick={onClose}
          >
            {t("confirm-delete-cancel")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ConfirmDeleteModal;
