"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [subjects, setSubjects] = useState([]);

  const getSubjects = async () => {
    const res = await axios.get(`http://localhost:3000/api/subjects`);
    setSubjects(res.data);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <div>
      <h1>Plan 2023 - Ingeniería en Sistemas</h1>
      <table style={{ borderCollapse: "collapse", width: "100%", marginTop: "20px" }}>
        <thead>
        <tr>
          <th style={thStyle}>AÑO</th>
          <th style={thStyle}>CODIGO</th>
          <th style={thStyle}>Materia</th>
          <th style={thStyle}>HS</th>
          <th style={thStyle}>REGULAR</th>
          <th style={thStyle}>APROBADA</th>
          <th style={thStyle}>Para cursar</th>
          <th style={thStyle}>Para rendir</th>
        </tr>
        </thead>
        <tbody>
        {subjects.map((subject: any, index: number) => (
          <tr key={subject.id}>
            <td style={tdStyle}>{subject.courseYear}</td>
            <td style={tdStyle}>{subject.code}</td>
            <td style={tdStyle}>{subject.name}</td>
            <td style={tdStyle}>{subject.totalHours ?? "-"}</td>
            <td style={tdStyle}>{/* condición REG */}</td>
            <td style={tdStyle}>{/* condición APR */}</td>
            <td style={tdStyle}>
              {subject.requiredSubjectsToEnroll.length > 0
                ? subject.requiredSubjectsToEnroll.join(" - ")
                : "-"}
            </td>
            <td style={tdStyle}>
              {subject.requiredSubjectsToPass.length > 0
                ? subject.requiredSubjectsToPass.join(" - ")
                : "-"}
            </td>
          </tr>
        ))}
        </tbody>
      </table>
    </div>
  );
}

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "grey",
  textAlign: "center" as const,
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  textAlign: "center" as const,
};
