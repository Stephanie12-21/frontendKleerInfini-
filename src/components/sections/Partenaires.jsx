import Image from "next/image";
import React from "react";

const Partenaires = () => {
  return (
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-5xl text-[#C80036] mt-10 font-bold">
        NOS PARTENARIATS
      </h1>
      <div className="flex justify-center items-center gap-32 mt-12">
        <div className="flex flex-col justify-center items-center">
          <Image src="/Group 6.png" alt="partenaire" width={120} height={120} />
          <span className="text-[#0C1844] text-2xl font-bold pt-9">
            ExportHUB
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image src="/Group 7.png" alt="partenaire" width={120} height={120} />
          <span className="text-[#0C1844] text-2xl font-bold pt-9">
            MCS Tech
          </span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/Group 11.svg"
            alt="partenaire"
            width={240}
            height={240}
          />
          <span className="text-[#0C1844] text-2xl font-bold pt-5">ALGEX</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Image
            src="/Group 10.png"
            alt="partenaire"
            width={120}
            height={120}
          />
          <span className="text-[#0C1844] text-2xl font-bold pt-9">
            Alibaba
          </span>
        </div>
      </div>
    </div>
  );
};

export default Partenaires;
