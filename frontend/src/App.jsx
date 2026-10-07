import { useState } from "react";

export default function App() {
  const [degree, setDegree] = useState("B.Tech CSE");
  const [cgpa, setCgpa] = useState(8.1);
  const [skills, setSkills] = useState("Java, Python, SQL");
  const [interest, setInterest] = useState("AI/ML");
  const [result, setResult] = useState(null);

  async function handleSubmit() {
    const response = await fetch("http://localhost:8000/profiles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        degree,
        cgpa: Number(cgpa),
        skills: skills.split(",").map((s) => s.trim()),
        interest,
      }),
    });
    setResult(await response.json());
  }

  return (
    <div style={{ maxWidth: 480, margin: "40px auto", fontFamily: "sans-serif" }}>
      <h1>Career Profile</h1>
      <input value={degree} onChange={(e) => setDegree(e.target.value)} placeholder="Degree" /><br />
      <input value={cgpa} onChange={(e) => setCgpa(e.target.value)} placeholder="CGPA" /><br />
      <input value={skills} onChange={(e) => setSkills(e.target.value)} placeholder="Skills, comma separated" /><br />
      <input value={interest} onChange={(e) => setInterest(e.target.value)} placeholder="Interest" /><br />
      <button onClick={handleSubmit}>Save profile</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
