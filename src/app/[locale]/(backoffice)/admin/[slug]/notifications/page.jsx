"use client";

import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export default function NotificationsPage() {
  const t = useTranslations();

  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg">
      <div className="flex justify-end mb-4">
        <span className="text-[#C80036F2] font-medium">
          {t("MARK_ALL_AS_READ")}
        </span>
      </div>

      <div className="border-t-2 border-b-2 border-[#0C1844] py-4">
        <div className="flex justify-between items-center">
          <span className="text-[#0C1844]">{t("DOCUMENTS_READY")}</span>
          <Button className="bg-[#C80036F2]/90 hover:bg-[#C80036F2] text-white rounded-md px-4 py-1">
            {t("READ")}
          </Button>
        </div>
      </div>
    </div>
  );
}
