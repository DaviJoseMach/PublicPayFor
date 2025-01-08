import { BenefitsSection } from "@/components/layout/sections/benefits";
import { CommunitySection } from "@/components/layout/sections/community";
import { FAQSection } from "@/components/layout/sections/faq";
import { FeaturesSection } from "@/components/layout/sections/features";
import { FooterSection } from "@/components/layout/sections/footer";
import { HeroSection } from "@/components/layout/sections/hero";
import { SponsorsSection } from "@/components/layout/sections/sponsors";
import { Navbar } from "@/components/layout/navbar";



export const metadata = {
  title: "PayFor",
  description: "Encontre os melhores gateways do mercado",
  openGraph: {
    type: "website",
    title: "PayFor",
    description: "Encontre os melhores gateways do mercado nacional e global",
    images: [
      {
        url: "https://opengraph.b-cdn.net/production/images/ce96381d-b943-4491-9698-64a47d53d590.png?token=RbLBACZA0P-zpGted8sItEt5CE5VopX9eo-co9jXBlA&height=630&width=1200&expires=33272286239", // Confirme se o arquivo existe no diretório `public`.
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://opengraph.b-cdn.net/production/images/ce96381d-b943-4491-9698-64a47d53d590.png?token=RbLBACZA0P-zpGted8sItEt5CE5VopX9eo-co9jXBlA&height=630&width=1200&expires=33272286239", // Confirme se o arquivo existe no diretório `public`.
    ],
  },
};


export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <SponsorsSection />
      <BenefitsSection />
      <FeaturesSection />
      <CommunitySection />
      <FAQSection />
      <FooterSection />
    </>
  );
}
