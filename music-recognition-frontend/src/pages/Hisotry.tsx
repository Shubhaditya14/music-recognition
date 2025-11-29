import { useEffect, useState } from "react";

export default function History() {
  const [items, setItems] = useState<any[]>([]);

  const fetchHistory = async () => {
    const res = await fetch("http://localhost:8000/history", {
      method: "GET",
      credentials: "include",
    });

    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ padding: 40 }}>
      <h1>📜 History</h1>

      {items.length === 0 && <p>No history yet.</p>}

      {items.map((entry, idx) => (
        <div
          key={idx}
          style={{
            padding: 12,
            borderBottom: "1px solid #ccc",
            marginBottom: 8,
          }}
        >
          <p>
            <strong>Song:</strong> {entry.song_name} — {entry.artist}
          </p>
          <p>
            <strong>When:</strong> {new Date(entry.timestamp).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}
