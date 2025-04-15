"use client";
import Image from "next/image";
import React, { useState } from "react";
import { Input } from "../ui/input";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setphone] = useState("");

  return (
    <div className="text-white bg-[#0C1844] mt-20 mb-16 p-6 w-full flex items-center justify-center">
      <div className="flex flex-col md:flex-row items-stretch justify-center w-full max-w-7xl gap-8">
        {/* IMAGE */}
        <div className="w-full md:w-1/2 h-full">
          <div className="relative w-full h-full min-h-[500px]">
            <Image
              src="/contactimage.svg"
              alt="Contact"
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>

        {/* FORMULAIRE */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          <h2 className="text-4xl font-extrabold mb-8">
            ENVOIE-NOUS UN MESSAGE
          </h2>
          <form className="space-y-6 w-full">
            <div className="flex flex-col md:flex-row gap-4">
              <Input
                id="nom"
                placeholder="Nom"
                value={nom}
                required
                onChange={(e) => setNom(e.target.value)}
                className="bg-[#edf2f7]  font-medium w-full"
              />
              <Input
                id="prenom"
                placeholder="Prénom"
                value={prenom}
                required
                onChange={(e) => setPrenom(e.target.value)}
                className="bg-[#edf2f7]  font-medium w-full"
              />
            </div>
            <Input
              id="email"
              placeholder="Email"
              type="email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#edf2f7]  font-medium w-full"
            />
            <Input
              id="phone"
              placeholder="Téléphone"
              value={phone}
              required
              onChange={(e) => setphone(e.target.value)}
              className="bg-[#edf2f7] font-medium w-full"
            />
            <div className="relative w-full">
              <textarea
                placeholder="Message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={5}
                required
                className="w-full h-[250px] rounded-md bg-[#edf2f7] text-[#0C1844D9]/85 font-medium p-3 pr-12"
              ></textarea>

              <button
                type="submit"
                className="absolute bottom-3 cursor-pointer right-3 bg-[#C80036] hover:bg-[#C80036] text-white font-extrabold rounded-md w-9 h-9 p-2 flex items-center justify-center"
              >
                <Image src="/envoi.png" alt="play" width={20} height={20} />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
