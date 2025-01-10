"use client";

import React, { useEffect, useState } from "react";
import Image from 'next/image';
import Link from 'next/link';
import { ThemeProvider as NextThemesProvider } from "next-themes";
import Supabase from "../../../api/supabase-client";
import { Button } from "@/components/ui/button";
import { Plus, Earth, Book, ChevronsUp, CodeXml } from "lucide-react";

export const View: React.FC = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedGateway, setSelectedGateway] = useState<any | null>(null); // Estado para modal
  const [inputMoney, setInputMoney] = useState<string>(""); // Inicializa como string vazia
  const [calculatedAmount, setCalculatedAmount] = useState<number>(0);

  //sidebar variaveis 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedResources, setSelectedResources] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string | null>(
    null
  );
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const tags = ["Todos", "Mais usada", "Tendência", "Novo", "Recomendado", "Inovador"];
  const resources = ["Todos", "Pix", "Cartão de crédito","Cartão de débito", "Assinatura", "Checkout", "No-Code", "Comunidade", "Low-Code"];
  const difficulties = ["Todos", "Fácil", "Média", "Difícil"];
  const countries = [
    { name: "Todos", emoji: "🌍" }, // Mundo, todos os países
    { name: "Brasil", emoji: "🐆" }, // Onça e bandeira do Brasil
    { name: "Canadá", emoji: "🍁" }, // Folha de bordo e bandeira do Canadá
    { name: "EUA", emoji: "🦅" }, // Águia e bandeira dos EUA
    { name: "Reino Unido", emoji: "🦁" }, // Leão e bandeira do Reino Unido
    { name: "Itália", emoji: "🍕" }, // Pizza e bandeira da Itália
    { name: "Espanha", emoji: "💃" }, // Dançarina flamenca e bandeira da Espanha
    { name: "Alemanha", emoji: "🍺" }, // Caneca de cerveja e bandeira da Alemanha
    { name: "Portugal", emoji: "🍷" }, // Vinho e bandeira de Portugal
    { name: "Argentina", emoji: "🐆" }, // Onça (ou leão) e bandeira da Argentina
  ];

  const toggleSelection = (
    item: string,
    selectedItems: string[],
    setItems: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    if (item === "Todos") {
      setItems([]);
      console.log(`Selecionado: Todos`);
    } else {
      const updatedSelection = selectedItems.includes(item)
        ? selectedItems.filter((i) => i !== item)
        : [...selectedItems, item];
      setItems(updatedSelection);
      console.log(`Selecionado(s): ${updatedSelection.join(", ")}`);
    }
  };

  const handleDropdownChange = (
    value: string,
    setValue: React.Dispatch<React.SetStateAction<string | null>>

  ) => {
    setValue(value === "Todos" ? null : value);
    console.log(`Selecionado: ${value}`);
  };


  useEffect(() => {
    const fetchData = async () => {
      try {
        let query = Supabase.from("gateways").select("nome, logo, doc, site, dificuldade, paises, tag, porcentagem, recursos");

        // Filtro para dificuldade (único valor)
        if (selectedDifficulty && selectedDifficulty !== "Todos") {
          query = query.eq("dificuldade", selectedDifficulty);  // Filtro para dificuldade
        }

        // Filtro para tags (pode ser múltiplo)
        if (selectedTags.length > 0 && !selectedTags.includes("Todos")) {
          query = query.overlaps("tag", selectedTags);  // Filtro para tags usando overlaps
        }

        // Filtro para recursos (pode ser múltiplo)
        if (selectedResources.length > 0 && !selectedResources.includes("Todos")) {
          query = query.overlaps("recursos", selectedResources);  // Filtro para recursos usando overlaps
        }

        // Filtro para país (único valor)
        if (selectedCountry && selectedCountry !== "Todos") {
          query = query.contains("paises", [selectedCountry]);  // Filtro para países usando contains
        }

        const { data, error } = await query;

        if (error) throw error;

        setData(data || []);  // Armazena os dados filtrados
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedTags, selectedResources, selectedDifficulty, selectedCountry]); // Re-executa o efeito quando os filtros mudam




  const handleExpand = (gateway: any) => {
    setSelectedGateway(gateway); // Define o gateway selecionado
    setInputMoney("");
    setCalculatedAmount(0);
  };

  const handleClose = () => {
    setSelectedGateway(null); // Fecha o modal
  };

  const handleInputChange = (value: string) => {
    const numericValue = parseFloat(value) || 0;
    setInputMoney(value); 
    if (selectedGateway?.nome === "AbacatePay 🥑") {
      const calculated = numericValue - 0.80;
      setCalculatedAmount(calculated);
    } else if (selectedGateway) {
      const calculated = numericValue - (numericValue * (selectedGateway.porcentagem / 100));
      setCalculatedAmount(calculated);
    }
  };
  
  
  return (

    <div>
     <NextThemesProvider>
     <aside
          id="logo-sidebar"
          className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
            } sm:translate-x-0 border-r border-gray-300 dark:border-[#292524]`}
          aria-label="Sidebar"
        >
          <div className="h-full px-3 py-4 overflow-y-auto bg-white dark:bg-[#0C0A09]">
            <div>

              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  <Link href="/">
                    PayFor
                  </Link>
                </h2>
                <button
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  className="sm:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-[#292524]"
                >
                  {isSidebarOpen ? "✖️" : "☰"}
                </button>
              </div>

              {/* Tags */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tags
                </h3>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleSelection(tag, selectedTags, setSelectedTags)}
                      className={`px-3 py-1 text-sm font-medium border rounded-[15px] ${selectedTags.includes(tag)
                          ? "bg-[#65BE00] text-white border-[#65BE00]"
                          : "bg-transparent text-gray-700 dark:text-gray-300 border-[#65BE00] dark:border-[#A9C24D]"
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recursos */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Recursos
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resources.map((resource) => (
                    <button
                      key={resource}
                      onClick={() =>
                        toggleSelection(resource, selectedResources, setSelectedResources)
                      }
                      className={`px-3 py-1 text-sm font-medium border rounded-[15px] ${selectedResources.includes(resource)
                          ? "bg-[#65BE00] text-white border-[#65BE00]"
                          : "bg-transparent text-gray-700 dark:text-gray-300 border-[#65BE00] dark:border-[#A9C24D]"
                        }`}
                    >
                      {resource}
                    </button>
                  ))}
                </div>
              </div>

              {/* Dificuldade */}
              <div className="mb-6">
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Dificuldade
                </h3>
                <select
                  value={selectedDifficulty || "Todos"}
                  onChange={(e) =>
                    handleDropdownChange(e.target.value, setSelectedDifficulty)
                  }
                  className="w-full px-3 py-2 bg-white dark:bg-[#161412] border-[2px] border-gray-300 dark:border-[#292524] rounded-lg text-gray-700 dark:text-gray-300 focus:border-[#65BE00] dark:focus:border-[#A9C24D] focus:ring-0 appearance-none"
                >
                  {difficulties.map((difficulty) => (
                    <option
                      key={difficulty}
                      value={difficulty}
                      className="bg-white dark:bg-[#161412] text-gray-700 dark:text-gray-300 hover:bg-[#65BE00] dark:hover:bg-[#A9C24D] hover:text-white"
                    >
                      {difficulty}
                    </option>
                  ))}
                </select>
              </div>

              {/* Países */}
              <div>
                <h3 className="font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Países
                </h3>
                <select
                  value={selectedCountry || "Todos"}
                  onChange={(e) =>
                    handleDropdownChange(e.target.value, setSelectedCountry)
                  }
                  className="emoji w-full px-3 py-2 bg-white dark:bg-[#161412] border-[2px] border-gray-300 dark:border-[#292524] rounded-lg text-gray-700 dark:text-gray-300 focus:border-[#65BE00] dark:focus:border-[#A9C24D] focus:ring-0 appearance-none"
                >
                  {countries.map((country) => (
                    <option
                      key={country.name}
                      value={country.name}
                      className="text-xl"
                    >
                      {country.emoji} {country.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 gap-6 max-w-screen-lg w-full px-4">
            <h1>Gateways</h1>
            {data.map((gateway, index) => (
              <div
                key={index}
                className="border rounded-md p-4 flex flex-col items-center bg-white dark:bg-[#161412] dark:border-[#292524]"
              >
                {/* Nome e Logo */}
                <div className="flex items-center w-full p-4">
                  <Image
                    src={gateway.logo}
                    alt={`${gateway.nome} logo`}
                    width={64}  // Defina o valor adequado
                    height={64} // Defina o valor adequado
                    className="w-16 h-16 rounded-md"
                  />
                  <div className="ml-4 flex flex-col">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                      {gateway.nome}
                    </h2>
                    <div className="flex flex-wrap items-center space-x-2 mt-2">
                      {(typeof gateway.tag === 'string' ? gateway.tag.split(',') : gateway.tag)?.map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="flex items-center px-2 py-1 text-xs font-semibold text-white bg-[#65BD00] rounded-full dark:bg-[#A9C24D]"
                        >
                          <ChevronsUp className="w-4 h-4 mr-1" />
                          {tag.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <hr className="w-full border-t border-gray-300 dark:border-[#292524] my-4" />

                {/* Badges */}
                <div className="flex justify-center space-x-4 mb-4">
                  <a
                    href={gateway.doc}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#FAFAF9] text-[#65BE00] text-sm font-medium py-1 px-3 rounded-[15px] hover:bg-[#EEF7E3] dark:bg-[#2A2921] dark:hover:bg-[#2B2A21] dark:text-[#A9C24D]"
                  >
                    <Book className="size-5 mr-2" /> Documentação
                  </a>
                  <a
                    href={gateway.site}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center bg-[#FAFAF9] text-[#65BE00] text-sm font-medium py-1 px-3 rounded-[15px] hover:bg-[#EEF7E3] dark:bg-[#2A2921] dark:hover:bg-[#2B2A21] dark:text-[#A9C24D]"
                  >
                    <Earth className="size-5 mr-2" /> Site
                  </a>
                </div>
                {/* Botão Expandir */}
                <Button onClick={() => handleExpand(gateway)} className="mt-4 font-bold">
                  Expandir
                  <Plus className="size-5 ml-2" />
                </Button>
              </div>
            ))}
          </div>

          {selectedGateway && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white dark:bg-[#161412] rounded-[12px] p-6 max-w-lg w-full sm:m-4 m-2">

              <div className="flex items-center mb-4">
                <Image
                  src={selectedGateway.logo}
                  alt={`${selectedGateway.nome} logo`}
                  className="w-16 h-16 rounded-md mr-4"
                  width={64}  // Defina o valor adequado
                  height={64}
                />
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">
                  {selectedGateway.nome}
                </h2>
              </div>
              <hr className="mb-4" />
              <div className="mb-4">
                <p className="font-medium">Dificuldade:  ‎
                  <span className="text-[#65BE00] dark:text-[#A9C24E]">
                    {selectedGateway.dificuldade}
                  </span>
                </p>
                <p className="font-medium">Países: ‎
                  <span className="inline-flex items-center space-x-2">
                    {selectedGateway.paises?.map((pais: string, index: number) => (
                      <span
                        key={index}
                        className="bg-[#FAFAF9] text-[#65BE00] text-xs font-medium py-1 px-2 rounded-[15px] hover:bg-[#EEF7E3] dark:bg-[#2A2921] dark:hover:bg-[#2B2A21] dark:text-[#A9C24D]"
                      >
                        {pais}
                      </span>
                    ))}
                  </span>
                </p>
              </div>



              <div className="mb-4">
                <h3 className="font-medium mb-2">Tags</h3>
                <div className="flex flex-wrap space-x-2">
                  {selectedGateway.tag?.map((tag: string, index: number) => (
                    <span
                      key={index}
                      className="flex items-center px-2 py-1 text-xs font-semibold text-white bg-[#65BD00] rounded-full dark:bg-[#A9C24D]"
                    ><ChevronsUp className="w-4 h-4 mr-1" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mb-4">
                <h3 className="font-medium mb-2">Recursos</h3>
                <div className="flex flex-wrap space-x-2">
                  {selectedGateway.recursos?.map((recurso: string, index: number) => (
                    <span
                      key={index}
                      className="flex items-center px-2 py-1 text-xs font-semibold text-white bg-[#65BD00] rounded-full dark:bg-[#A9C24D]"
                    ><CodeXml className="w-4 h-4 mr-1" />
                      {recurso}
                    </span>
                  ))}
                </div>
              </div>

              <hr className="mb-4" />
              <div className="mb-4">
                <h3 className="font-medium mb-2">
                  Simulação{" "}
                  <span className="text-[#65BE00] dark:text-[#A9C24E]">
                    (~
                    {selectedGateway.nome === "AbacatePay 🥑"
                      ? `${selectedGateway.porcentagem}R$`
                      : `${selectedGateway.porcentagem}%`}
                    )
                  </span>
                </h3>

                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    placeholder="Seu dinheiro"
                    value={inputMoney}
                    onChange={(e) => handleInputChange(e.target.value)}
                    className="p-2 border-[2px] rounded-md w-1/2 bg-white border-[#9AB247] focus:outline-none focus:ring-0 focus:border-[#73C417] dark:text-[white] dark:bg-[#313027]"
                  />
                  <input
                    type="number"
                    value={calculatedAmount.toFixed(2)}
                    disabled
                    className="p-2 border-[2px] rounded-md w-1/2 bg-gray-200 border-[#9AB247] focus:outline-none focus:ring-0 dark:bg-[#312F27]"
                  />
                </div>
              </div>

              <hr className="mb-4" />
              <div className="flex justify-center space-x-4 mb-4">
                <a
                  href={selectedGateway.doc}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[#FAFAF9] text-[#65BE00] text-sm font-medium py-1 px-3 rounded-[15px] hover:bg-[#EEF7E3] dark:bg-[#2A2921] dark:hover:bg-[#2B2A21] dark:text-[#A9C24D]"
                >
                  <Book className="size-5 mr-2" /> Documentação
                </a>
                <a
                  href={selectedGateway.site}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center bg-[#FAFAF9] text-[#65BE00] text-sm font-medium py-1 px-3 rounded-[15px] hover:bg-[#EEF7E3] dark:bg-[#2A2921] dark:hover:bg-[#2B2A21] dark:text-[#A9C24D]"
                >
                  <Earth className="size-5 mr-2" /> Site
                </a>
              </div>
              <div className="flex justify-center items-center">
                <Button onClick={handleClose} className="mt-4">
                  Fechar
                </Button>
              </div>

            </div>
          </div>
        )}
        </div>
     </NextThemesProvider>
    </div>
  )
}

export default View;
