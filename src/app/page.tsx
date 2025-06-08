import { API_URL } from "@/const";
import TableSubjects from "./components/TableSubjects";
import { SubjectDTO } from "@/types/subject.dto";

export default async function Home() {
  const res = await fetch(`${API_URL}/api/subjects`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos de las materias");
  }
  const subjects: SubjectDTO[] = await res.json();

  return (
    <main className="">
      <section className="h-full w-[80%] mx-auto">
        <TableSubjects subjects={subjects} />
      </section>
    </main>
  );
}
