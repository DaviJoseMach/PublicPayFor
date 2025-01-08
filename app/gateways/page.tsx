import React from "react";
import View from "@/components/layout/sections/view";
import Script from "next/script";

export const metadata = {
  title: "Gateways",
  description: "Página de Gateways - Lista de opções de pagamento",
};

const GatewaysPage: React.FC = () => {
  return (
    <>
      <div className="mainDivGateways">
          < View />
        </div>
    </>
  );
};

export default GatewaysPage;