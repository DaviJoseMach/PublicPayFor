import React from "react";
import {CardWithForm} from "@/components/layout/sections/solicity";
import { Navbar } from "@/components/layout/navbar";

import Script from "next/script";

export const metadata = {
  title: "Solicitar",
  description: "Solicite um gateway de pagamento para adicionarmos",
};

const GatewaysPage: React.FC = () => {
  return (
    <>
      <div className="mainDivGateways">
        
          < CardWithForm />
        </div>
    </>
  );
};

export default GatewaysPage;