"use client";

import { SubjectDTO } from "@/types/subject.dto";

export default function TableRowSubject({
  name,
  requiredSubjectsToPass,
  requiredSubjectsToEnroll,
  code,
  courseYear,
}: SubjectDTO) {
  const formattedNumberToYear = (num: number) => {
    const numbertoyear: Record<number, string> = {
      1: "Primero",
      2: "Segundo",
      3: "Tercero",
      4: "Cuarto",
      5: "Quinto",
    };
    return numbertoyear[num];
  };
  // Check if there are required subjects to enroll
  const exist_requiredSubjectsToEnroll: boolean =
    requiredSubjectsToEnroll.length == 0;

  // Check if there are required subjects to pass
  const exist_requiredSubjectsToPass: boolean =
    requiredSubjectsToPass.length == 0;

  return (
    <tr
      className={`${
        (!exist_requiredSubjectsToPass || !exist_requiredSubjectsToEnroll) &&
        "cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
      } bg-white border-b transition-all dark:bg-gray-800 dark:border-gray-700 border-gray-200`}
    >
      <td className="px-6 py-4 text-center">{code}</td>
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {name}
      </th>
      <td className="px-6 py-4">{formattedNumberToYear(courseYear)}</td>
      <td className="px-6 py-4">
        {exist_requiredSubjectsToEnroll
          ? "Ninguna "
          : requiredSubjectsToEnroll.join(" - ")}
      </td>
      <td className="px-6 py-4">
        {exist_requiredSubjectsToPass
          ? "Ninguna "
          : requiredSubjectsToPass.join(" - ")}
      </td>
    </tr>
  );
}
