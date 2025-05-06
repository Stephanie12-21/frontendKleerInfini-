{
  /* Premier écran */
}
<div className="w-full flex-grow">
  {/* liste des documents */}
  <section className="w-full my-10 text-[#0C1844] text-center flex flex-col">
    <h2 className="text-4xl font-extrabold mb-3 text-[#C80036]">
      LISTE DES DOCUMENTS
    </h2>
    <p className="text-3xl font-bold text-[#C80036] mb-10">
      Nécessaires pour l&apos;Exportation vers l&apos;Europe/France
    </p>

    <div className="w-full flex flex-col md:flex-row items-stretch justify-center gap-10 px-4">
      {/* Image visible uniquement sur écrans moyens et plus */}
      <div className="hidden md:block w-full md:w-3/6 relative min-h-[400px]">
        <div className="relative w-full h-full">
          <Image
            src="/image.svg"
            alt="Fret Aérien"
            fill
            className="w-full h-full object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Liste de documents */}
      <div className="w-full md:w-4/5 text-left flex flex-col justify-center px-2 md:px-16">
        <ul className="list-decimal list-inside text-lg text-[#0C1844] space-y-6">
          <li>Documents Commerciaux</li>
          <li>Documents d&apos;Origine</li>
          <li>
            Documents Sanitaires et Phytosanitaires (pour les produits
            alimentaires et agricoles)
          </li>
          <li>Documents Spécifiques selon le Produit</li>
          <li>Documents de Transport et Logistique</li>
        </ul>
      </div>
    </div>

    {/* CTA */}
    <div className="flex flex-col items-center justify-center mt-10 px-4">
      <p className="text-3xl font-bold text-[#0C1844] text-center">
        Cliquez ici pour découvrir tous les détails !
      </p>
      <div className="mt-5 p-2 rounded-md border border-[#0C1844]">
        <Image src="/Vector.svg" alt="Dossiers" width={50} height={50} />
      </div>
    </div>
  </section>

  <section className="w-full py-8 sm:py-12 md:py-16 text-[#0C1844] text-center flex flex-col px-4 sm:px-6 lg:px-8">
    <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold mb-2 sm:mb-3 text-[#C80036]">
      LISTE DES DOCUMENTS
    </h2>
    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#C80036] mb-6 sm:mb-8 md:mb-10">
      Nécessaires pour l&apos;Exportation vers l&apos;Europe/France
    </p>

    <div className="w-full flex flex-col lg:flex-row items-center lg:items-stretch justify-center gap-6 lg:gap-10">
      {/* Image - masquée sur mobile, visible sur grands écrans */}
      <div className="hidden lg:block w-full lg:w-2/5 relative min-h-[350px]">
        <div className="relative w-full h-full">
          <Image
            src="/image.svg"
            alt="Fret Aérien"
            fill
            className="object-cover rounded-lg"
          />
        </div>
      </div>

      {/* Image affichée uniquement sur mobile */}
      <div className="hidden md:block w-full relative h-48 sm:h-64 mb-6">
        <Image
          src="/image.svg"
          alt="Fret Aérien"
          fill
          className="object-cover rounded-lg"
        />
      </div>

      {/* Liste de documents */}
      <div className="w-full lg:w-3/5 text-left flex flex-col justify-center bg-white/50 p-4 sm:p-6 rounded-lg">
        <ul className="list-decimal list-inside text-base sm:text-lg text-[#0C1844] space-y-3 sm:space-y-4 md:space-y-6">
          <li className="pl-2">Documents Commerciaux</li>
          <li className="pl-2">Documents d&apos;Origine</li>
          <li className="pl-2">
            Documents Sanitaires et Phytosanitaires (pour les produits
            alimentaires et agricoles)
          </li>
          <li className="pl-2">Documents Spécifiques selon le Produit</li>
          <li className="pl-2">Documents de Transport et Logistique</li>
        </ul>
      </div>
    </div>

    {/* CTA */}
    <div className="flex flex-col items-center justify-center mt-6 sm:mt-8 md:mt-10">
      <p className="text-xl sm:text-2xl md:text-3xl font-bold text-[#0C1844] text-center">
        Cliquez ici pour découvrir tous les détails !
      </p>
      <button
        className="mt-4 p-2 rounded-md border border-[#0C1844] hover:bg-gray-100 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#C80036]"
        aria-label="Afficher plus de détails"
      >
        <Image src="/Vector.svg" alt="Dossiers" width={50} height={50} />
      </button>
    </div>
  </section>
</div>;

{
  /* Second écran */
}
<div className="w-full ">
 


 
</div>;
