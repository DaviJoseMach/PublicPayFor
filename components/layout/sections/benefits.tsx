import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Icon } from "@/components/ui/icon";
import { icons } from "lucide-react";

interface BenefitsProps {
  icon: string;
  title: string;
  description: string;
}

const benefitList: BenefitsProps[] = [
  {
    icon: "Blocks",
    title: "Escolha com Flexibilidade Total",
    description:
      "Explore uma ampla variedade de gateways e encontre a solução perfeita para suas necessidades.",
  },
  {
    icon: "LineChart",
    title: "Maximize Seus Resultados.",
    description:
      "Monitore e melhore o desempenho das suas transações em tempo real com os melhores gatways.",
  },
  {
    icon: "Wallet",
    title: "Escolha a Melhor Taxa para o Seu Negócio",
    description:
      "Compare taxas e encontre a opção mais vantajosa para suas transações.",
  },
  {
    icon: "Sparkle",
    title: "Documentação Simplificada",
    description:
      "Filtre por dificuldade e encontre o gateway com as funcionalidades ideais para seu negócio.",
  },
];

export const BenefitsSection = () => {
  return (
    <section id="benefits" className="container py-24 sm:py-32">
      <div className="grid lg:grid-cols-2 place-items-center lg:gap-24">
        <div>
          <h2 className="text-lg text-primary mb-2 tracking-wider">Benefícios</h2>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Encontre o Gateway Ideal
          </h2>
          <p className="text-xl text-muted-foreground mb-8">
            Descubra e compare os melhores gateways de pagamento.
            Encontre opções ideais para Pix, assinaturas e muito mais.
            Simplifique suas escolhas com informações claras e completas.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 w-full">
          {benefitList.map(({ icon, title, description }, index) => (
            <Card
              key={title}
              className="bg-muted/50 dark:bg-card hover:bg-background transition-all delay-75 group/number dark:border-[#292524]"
            >
              <CardHeader>
                <div className="flex justify-between">
                  <Icon
                    name={icon as keyof typeof icons}
                    size={32}
                    color="hsl(var(--primary))"
                    className="mb-6 text-primary"
                  />
                  <span className="text-5xl text-muted-foreground/15 font-medium transition-all delay-75 group-hover/number:text-muted-foreground/30">
                    0{index + 1}
                  </span>
                </div>

                <CardTitle>{title}</CardTitle>
              </CardHeader>

              <CardContent className="text-muted-foreground">
                {description}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
