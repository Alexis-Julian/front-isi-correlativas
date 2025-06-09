"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { SubjectDTO } from "@/types/subject.dto";

export default function MateriasTable({
  subjects,
}: {
  subjects: SubjectDTO[];
}) {
  const [showForm, setShowForm] = useState(false);

  const getMateriaName = (codigo: number) => {
    const materia = subjects.find((m) => m.code === codigo);
    return materia ? materia.name : `Código ${codigo}`;
  };

  const formatCorrelativas = (codigos: number[]) => {
    if (codigos.length === 0) return "-";

    return codigos.map((codigo) => {
      return <p key={codigo}>{getMateriaName(codigo)}</p>;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 ">
      <Card className="w-full max-w-7xl mx-auto ">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-2xl font-bold">
            Plan de estudio ISI
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="over">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-20">Código</TableHead>
                  <TableHead className="min-w-48">Nombre</TableHead>
                  <TableHead className="w-16">Año</TableHead>
                  <TableHead className="min-w-64">Regulares</TableHead>
                  <TableHead className="min-w-64">Aprobadas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {subjects.map((subject) => {
                  return (
                    <TableRow key={subject.code}>
                      <TableCell className="font-medium">
                        {subject.code}
                      </TableCell>
                      <TableCell>{subject.name}</TableCell>
                      <TableCell>{subject.courseYear}°</TableCell>
                      <TableCell className="text-sm">
                        {formatCorrelativas(subject.requiredSubjectsToEnroll)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatCorrelativas(subject.requiredSubjectsToPass)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

/*  <TableRow key={materia.codigo}>
                      <TableCell className="font-medium">
                        {materia.codigo}
                      </TableCell>
                      <TableCell>{materia.nombre}</TableCell>
                      <TableCell>{materia.año}°</TableCell>
                      <TableCell className="text-sm">
                        {formatCorrelativas(materia.regulares)}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatCorrelativas(materia.aprobadas)}
                      </TableCell>
                    </TableRow> */

{
  /* <TableHead className="w-24">Acciones</TableHead> */
}
{
  /*  <TableCell>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(materia)}
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(materia.codigo)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell> */
}
