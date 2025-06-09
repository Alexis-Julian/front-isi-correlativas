"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Materia } from "@/types/materia";

interface MateriaFormProps {
  materia?: Materia;
  onSave: (materia: Materia) => void;
  onCancel: () => void;
  materias: Materia[];
}

export function MateriaForm({
  materia,
  onSave,
  onCancel,
  materias,
}: MateriaFormProps) {
  const [formData, setFormData] = useState<Materia>(
    materia || {
      codigo: 0,
      nombre: "",
      año: 1,
      regulares: [],
      aprobadas: [],
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleArrayInput = (
    field: "regulares" | "aprobadas",
    value: string
  ) => {
    const codes = value
      .split(",")
      .map((code) => Number.parseInt(code.trim()))
      .filter((code) => !isNaN(code));

    setFormData({ ...formData, [field]: codes });
  };

  const getMateriaName = (codigo: number) => {
    const mat = materias.find((m) => m.codigo === codigo);
    return mat ? mat.nombre : "";
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>{materia ? "Editar Materia" : "Nueva Materia"}</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="codigo">Código</Label>
              <Input
                id="codigo"
                type="number"
                value={formData.codigo}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    codigo: Number.parseInt(e.target.value) || 0,
                  })
                }
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="año">Año</Label>
              <Input
                id="año"
                type="number"
                min="1"
                max="6"
                value={formData.año}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    año: Number.parseInt(e.target.value) || 1,
                  })
                }
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="nombre">Nombre de la Materia</Label>
            <Input
              id="nombre"
              value={formData.nombre}
              onChange={(e) =>
                setFormData({ ...formData, nombre: e.target.value })
              }
              placeholder="Ej: Física II"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="regulares">
              Materias Regulares (códigos separados por coma)
            </Label>
            <Input
              id="regulares"
              value={formData.regulares.join(", ")}
              onChange={(e) => handleArrayInput("regulares", e.target.value)}
              placeholder="Ej: 1, 2, 3"
            />
            {formData.regulares.length > 0 && (
              <div className="text-sm text-gray-600">
                Requiere regulares:{" "}
                {formData.regulares
                  .map((code) => `${code} (${getMateriaName(code)})`)
                  .join(", ")}
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="aprobadas">
              Materias Aprobadas (códigos separados por coma)
            </Label>
            <Input
              id="aprobadas"
              value={formData.aprobadas.join(", ")}
              onChange={(e) => handleArrayInput("aprobadas", e.target.value)}
              placeholder="Ej: 1, 2"
            />
            {formData.aprobadas.length > 0 && (
              <div className="text-sm text-gray-600">
                Requiere aprobadas:{" "}
                {formData.aprobadas
                  .map((code) => `${code} (${getMateriaName(code)})`)
                  .join(", ")}
              </div>
            )}
          </div>

          <div className="flex gap-2 pt-4">
            <Button type="submit" className="flex-1">
              {materia ? "Actualizar" : "Guardar"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex-1"
            >
              Cancelar
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
