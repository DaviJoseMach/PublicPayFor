import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface FeaturesProps {
  icon: string;
  title: string;
  description: string;
}

const featureList: FeaturesProps[] = [
  {
    icon: "TabletSmartphone",
    title: "Mobile",
    description:
      "Encontre gateways de pagamento com design responsivo, prontos para dispositivos móveis.",
  },
  {
    icon: "BadgeCheck",
    title: "Feedbacks",
    description:
      "Veja as avaliações de outros desenvolvedores e escolha o gateway com base na experiência da comunidade.",
  },
  {
    icon: "Goal",
    title: "Conteúdo Direcionado",
    description:
      "Filtre gateways com base nas suas necessidades específicas, como país, funcionalidades e tags.",
  },
  {
    icon: "PictureInPicture",
    title: "Visuais Impactantes",
    description:
      "Acesse informações detalhadas sobre cada gateway com uma interface clara e intuitiva.",
  },
  {
    icon: "MousePointerClick",
    title: "Ação Direta",
    description:
      "Escolha o gateway ideal para sua aplicação e tenha acesso direto à documentação e integração.",
  },
  {
    icon: "Newspaper",
    title: "Informações Claras",
    description:
      "Obtenha descrições concisas e objetivas de cada gateway, facilitando sua decisão.",
  },
  
];

export const FeaturesSection = () => {
  return (
    <section id="features" className="container py-24 sm:py-32">
      <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
        Recursos
      </h2>

      <h2 className="text-3xl md:text-4xl text-center font-bold mb-4">
        Simplicidade na sua escolha
      </h2>

      <h3 className="md:w-1/2 mx-auto text-xl text-center text-muted-foreground mb-8">
  Encontre o gateway de pagamento ideal para o seu projeto de forma fácil e rápida. Compare funcionalidades, taxas e muito mais para tomar a melhor decisão.
      </h3>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {featureList.map(({ icon, title, description }) => (
          <div key={title}>
            <Card className="h-full bg-background border-0 shadow-none">
              <CardHeader className="flex justify-center items-center">
                <div className="bg-primary/20 p-2 rounded-full ring-8 ring-primary/10 mb-4">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={24}
                    color="hsl(var(--primary))"
                    className="text-primary"
                  />
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground text-center">
                {description}
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
