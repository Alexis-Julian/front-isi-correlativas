import { API_URL } from "@/const";
import { SubjectDTO } from "@/types/subject.dto";
import MateriasTable from "@/components/ui/materia-table";
import SvgLogoPeople from "@/components/ui/svg-logo-people";

export default async function Home() {
  const res = await fetch(`${API_URL}/api/subjects`, {
    method: "GET",
  });

  if (!res.ok) {
    throw new Error("Error al obtener los datos de las materias");
  }
  const subjects: SubjectDTO[] = await res.json();

  return (
    <main className="grid grid-cols-2 h-full w-[85%] place-items-center ">
      <section className="h-full w-full grid-rows-2 grid-cols-1 grid px-2">
        {/*  */}
        <div className="grid grid-rows-2 bg-white ">
          <div className="bg-[#F5F5F7] h-[80%] w-full flex self-center  rounded-[14px]">
            <span className="grow-1 justify-center pl-8 gap-2 flex flex-col">
              <h1>Hola Alexis!</h1>
              <p>Que bueno que te pases por aca!</p>
            </span>
            <span className="grow-1">
              <SvgLogoPeople />
            </span>
          </div>
          <div className="bg-amber-200 h-full w-full"></div>
        </div>
        {/*  */}
        <div className="h-full w-full flex flex-col gap-4">
          <h2>Materias</h2>
          <ul className="flex gap-4">
            <li>
              <h3>Basicas</h3>
            </li>
            <li className="">
              <h3 className="text-black/30">Electivas</h3>
            </li>
            <li className="">
              <h3 className="text-black/30">ISI</h3>
            </li>
          </ul>
        </div>
      </section>
      <section className="bg-red-300 h-full w-full "></section>
    </main>
  );
}
