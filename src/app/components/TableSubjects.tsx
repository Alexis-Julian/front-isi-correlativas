import { SubjectDTO } from "@/types/subject.dto";
import TableRowSubject from "./TableRowSubject";

type Props = {
  subjects: SubjectDTO[];
};

export default function TableSubjects({ subjects }: Props) {
  return (
    <div className="relative overflow-x-auto">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Codigo
            </th>
            <th scope="col" className="px-6 py-3">
              Nombre de la materia
            </th>

            <th scope="col" className="px-6 py-3">
              Año
            </th>
            <th scope="col" className="px-6 py-3">
              Regulares
            </th>
            <th scope="col" className="px-6 py-3">
              Aprobadas
            </th>
          </tr>
        </thead>
        <tbody>
          {subjects.map((subject) => {
            return <TableRowSubject key={subject.id} {...subject} />;
          })}
        </tbody>
      </table>
    </div>
  );
}
