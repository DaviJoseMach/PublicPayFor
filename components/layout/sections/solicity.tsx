"use client";

import * as React from "react";
import { ChevronLeft } from "lucide-react"
import Link from "next/link";

import { Button } from "@/components/ui/button";
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

  function reset() {
    window.location.reload();
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Card className="w-[350px]">
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
                <Input id="nome" placeholder="Nome do gateway" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="tipo">Tipo</Label>
                <Select
                  onValueChange={(value) => setTipo(value)} // Atualiza o estado com o valor selecionado
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

              {/* Renderiza inputs adicionais se o tipo for "dono" */}
              {tipo === "dono" && (
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" placeholder="E-mail para contato" />
                  <Label htmlFor="telefone">Telefone</Label>
                  <Input id="telefone" placeholder="Telefone para contato" />
                  <Label htmlFor="documento">Documentação</Label>
                  <Input id="documento" placeholder="Link da documentação do gateway" />
                  <Label htmlFor="site">Site</Label>
                  <Input id="site" placeholder="Site do gateway" />
                </div>
              )}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button  variant="outline" size="icon"> <Link href="/" passHref>
            <ChevronLeft/>
            </Link>
          </Button>
          <Button onClick={reset} variant="outline">
            Resetar
          </Button>
          <Button>Enviar</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
