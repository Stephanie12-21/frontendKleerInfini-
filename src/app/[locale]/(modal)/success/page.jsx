import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

export function SuccessModal({ isOpen, onClose }) {
  const t = useTranslations();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#0C1844] bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-[#0C1844]/10 rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-10 h-10 text-[#0C1844]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              ></path>
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-[#0C1844]">
            {t("successModal.congratulationsMessage")}
          </h2>
          <Button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 bg-[#0C1844] hover:bg-[#0C1844] cursor-pointer text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            {t("successModal.closeButton")}
          </Button>
        </div>
      </div>
    </div>
  );
}

