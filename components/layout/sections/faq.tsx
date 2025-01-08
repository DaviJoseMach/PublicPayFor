import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface FAQProps {
  question: string;
  answer: string;
  value: string;
}

const FAQList: FAQProps[] = [
  {
    question: "Como posso adicionar meu gateway?",
    answer:
      "No momento, estamos recolhendo sugestões através do nosso Twitter. Fique atento ao nosso perfil em @davvzin para mais detalhes.",
    value: "item-1",
  },
  {
    question: "Como os gateways são avaliados na plataforma?",
    answer:
      "Os gateways são avaliados com base em critérios como taxas, funcionalidades, recomendações, e feedbacks dos usuários. Você pode filtrar facilmente para encontrar o melhor para o seu projeto.",
    value: "item-2",
  },
  {
    question: "Posso testar algum gateway antes de decidir?",
    answer:
      "Alguns gateways oferecem planos de teste gratuitos ou versões demo. Verifique as opções no perfil de cada gateway para mais informações.",
    value: "item-3",
  },
  {
    question: "Quais países estão disponíveis na plataforma?",
    answer:
      "Temos gateways que atendem a diversos países. Use nossos filtros para buscar opções específicas de cada região.",
    value: "item-4",
  },
  {
    question: "Como posso entrar em contato com o suporte?",
    answer:
      "Caso tenha dúvidas, entre em contato conosco diretamente pelo Twitter @davvzin ou em nosso instagram @PayFor_",
    value: "item-5",
  },
];

export const FAQSection = () => {
  return (
    <section id="faq" className="container md:w-[700px] py-24 sm:py-32">
      <div className="text-center mb-8">
        <h2 className="text-lg text-primary text-center mb-2 tracking-wider">
          FAQS
        </h2>

        <h2 className="text-3xl md:text-4xl text-center font-bold">
          Perguntas Frequentes
        </h2>
      </div>

      <Accordion type="single" collapsible className="AccordionRoot">
        {FAQList.map(({ question, answer, value }) => (
          <AccordionItem key={value} value={value}>
            <AccordionTrigger className="text-left">
              {question}
            </AccordionTrigger>

            <AccordionContent>{answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
};
