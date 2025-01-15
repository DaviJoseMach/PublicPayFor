"use client";

import * as React from "react";
import { ChevronLeft, Terminal, Plus } from "lucide-react";
import Supabase from "../../../api/supabase-client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CardWithForm() {
  const [tipo, setTipo] = React.useState(""); // Estado para armazenar o tipo selecionado
  const [formData, setFormData] = React.useState({
    nome: "",
    email: "",
    telefone: "",
    doc: "",
    site: "",
  });
  const [showAlert, setShowAlert] = React.useState(false); // Estado para exibir o alerta

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async () => {
    try {
      const { data, error } = await Supabase.from("solicitações").insert([
        {
          nome: formData.nome,
          email: formData.email,
          telefone: formData.telefone,
          doc: formData.doc,
          site: formData.site,
        },
      ]);

      if (error) {
        console.error("Erro ao inserir dados:", error.message);
        return;
      }

      setShowAlert(true);
      setTimeout(() => {
        setShowAlert(false);
        window.location.reload();
      }, 2000);

    } catch (err) {
      console.error("Erro desconhecido:", err);
    }
  };

  function reset() {
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px] dark:border-[#292524]">
        <CardHeader>
          <CardTitle>Solicite um gateway</CardTitle>
          <CardDescription>
            Solicite um gateway seu ou algum que possa estar em nossa lista
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="nome">Nome</Label>
                <Input
                  id="nome"
                  placeholder="Nome do gateway"
                  onChange={handleChange}
                  value={formData.nome}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  onValueChange={(value) => setTipo(value)}
                >
                  <SelectTrigger id="tipo">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent position="popper">
                    <SelectItem value="dono">Esse Gateway é meu</SelectItem>
                    <SelectItem value="externo">O Gateway não é meu</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {tipo === "dono" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input
                    id="email"
                    placeholder="E-mail para contato"
                    onChange={handleChange}
                    value={formData.email}
                  />
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input
                    id="telefone"
                    placeholder="Telefone para contato"
                    onChange={handleChange}
                    value={formData.telefone}
                  />
                  <Label htmlFor="doc">Documentação</Label>
                  <Input
                    id="doc"
                    placeholder="Link da documentação do gateway"
                    onChange={handleChange}
                    value={formData.doc}
                  />
                  <Label htmlFor="site">Site</Label>
                  <Input
                    id="site"
                    placeholder="Site do gateway"
                    onChange={handleChange}
                    value={formData.site}
                  />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="icon">
            <Link href="/" passHref>
              <ChevronLeft />
            </Link>
          </Button>
          <Button onClick={reset} variant="outline">
            Resetar
          </Button>
          <Button onClick={handleSubmit}>Enviar <Plus /></Button>
        </CardFooter>
      </Card>

      {showAlert && (
        <Alert
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-3/4 max-w-md shadow-lg p-4 rounded-md transition-opacity duration-300 "

        >
          <Terminal className="h-4 w-4 mr-2" />
          <div>
            <AlertTitle>Sucesso!</AlertTitle>
            <AlertDescription>
              Sua solicitação foi enviada. Entraremos em contato em breve.
            </AlertDescription>
          </div>
        </Alert>
      )}
    </div>
  );
}
