"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Paperclip, Mic, Send } from "lucide-react";
import Image from "next/image";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      // Logique pour envoyer le message
      setMessage("");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-gray-200 p-6 rounded-lg h-[calc(100vh-2rem)]">
      <div className="flex flex-col h-full">
        <div className=" p-3 rounded-t-lg flex items-center gap-3">
          <div className="w-16 h-16  rounded-full flex items-center justify-center">
            <Image
              src="/ki.svg"
              alt="Photo de profil de Kleer Infini"
              width={60}
              height={60}
              className="object-cover rounded-full"
            />
          </div>
          <span className="font-medium text-2xl text-[#C80036]">
            KLEER INFINI
          </span>
        </div>

        <div className="flex-1 bg-white p-4 overflow-y-auto">
          {/*les messages envoyés s'affichent dans cette section */}
          <div className="bg-gray-200 p-3 rounded-lg max-w-[80%] mb-4">
            Bonjour, comment puis-je vous aider aujourd'hui?
          </div>

          <div className="bg-gray-100 p-3 rounded-lg max-w-[80%] ml-auto">
            Je voudrais savoir comment fonctionne votre service.
          </div>
        </div>

        <form
          onSubmit={handleSendMessage}
          className="mt-4 flex items-center gap-2"
        >
          <Paperclip className="text-gray-500 h-5 w-5" />
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Envoyer un message"
            className="flex-1 bg-white"
          />
          <Mic className="text-gray-500 h-5 w-5" />
          <Button
            type="submit"
            className="bg-red-600 hover:bg-red-700 rounded-full p-2"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
