import { Button } from "@/components/ui/button";

export function ErrorModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full shadow-xl">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-red-800 rounded-full mx-auto flex items-center justify-center">
            <svg
              className="w-10 h-10 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">
            {t("error-modal-title")}
          </h2>
          <p className="mt-2 text-gray-600">{t("error-modal-message")}</p>
          <Button
            onClick={onClose}
            className="mt-6 w-full py-2 px-4 bg-gradient-to-r from-red-500 to-red-800 hover:from-red-600 hover:to-red-600 text-white font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-300 ease-in-out"
          >
            {t("error-modal-close")}
          </Button>
        </div>
      </div>
    </div>
  );
}
