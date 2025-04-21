import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  return (
    <div className="max-w-3xl mx-auto p-6 rounded-lg">
      <div className="flex justify-end mb-4">
        <span className="text-[#C80036F2] font-medium">
          Faire tout comme Lu
        </span>
      </div>

      <div className="border-t-2 border-b-2 border-[#0C1844] py-4">
        <div className="flex justify-between items-center">
          <span className="text-[#0C1844]">vos documents sont prêts</span>
          <Button className="bg-[#C80036F2]/90 hover:bg-[#C80036F2] text-white rounded-md px-4 py-1">
            Lu
          </Button>
        </div>
      </div>
    </div>
  );
}
