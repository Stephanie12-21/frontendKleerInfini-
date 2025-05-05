<div
  className={`flex transition-transform duration-700 ease-in-out min-h-screen ${
    showSecondDiv ? "-translate-x-1/2" : "translate-x-0"
  }`}
  style={{ width: "200%" }}
>


  {/* Second écran */}
  <div className="w-full">
    <section
      className="relative flex flex-col items-center justify-center h-[600px] mb-10 text-center px-10 bg-cover bg-center space-y-10 w-full"
      style={{
        backgroundImage: "url('/image6.jfif')",
      }}
    >
      <div className="max-w-7xl">
        <h1 className="text-white text-5xl font-bold">
          EXPORTATION DE TECHNOLOGIES & SERVICES NUMERIQUES
        </h1>
        <div className="w-full flex justify-start pt-5">
          <Button
            onClick={handleBack}
            className="bg-[#C80036] hover:bg-[#A0002B] text-white font-extrabold rounded-md w-16 h-16 p-0"
          >
            <Image src="/chevron.png" alt="retour" width={30} height={30} />
          </Button>
        </div>
        <div className="w-full flex justify-end pt-5">
          <Button
            onClick={handleScrollDevDown}
            className="h-12 px-8 py-4 bg-[#C80036BF]/80 hover:bg-[#C80036BF] rounded-lg cursor-pointer"
          >
            EN SAVOIR PLUS
          </Button>
        </div>
      </div>
    </section>

    
  </div>
</div>;
