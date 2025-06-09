import { API_URL } from "@/const";
import { SubjectDTO } from "@/types/subject.dto";
import MateriasTable from "@/components/ui/materia-table";

export default async function Home() {
  const res = await fetch(`${API_URL}/api/subjects`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos de las materias");
  }
  const subjects: SubjectDTO[] = await res.json();

  return (
    <main className="overflow-hidden">
      <section className="h-full overflow-hidden">
        <MateriasTable subjects={subjects} />
      </section>
    </main>
  );
}
