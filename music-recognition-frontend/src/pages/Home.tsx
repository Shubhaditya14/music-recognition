import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const { user, loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  if (!loggedIn) {
    return (
      <div style={{ padding: 40 }}>
        <h1>You are not logged in</h1>
        <button onClick={() => navigate("/login")}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Welcome ✨</h1>
      <h2>Logged in as: {user?.email}</h2>

      <div style={{ marginTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
        <button
          style={{
            padding: 16,
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => navigate("/recognize")}
        >
          🎧 Recognize Music
        </button>

        <button
          style={{
            padding: 16,
            fontSize: 18,
            cursor: "pointer",
          }}
          onClick={() => navigate("/history")}
        >
          📜 View History
        </button>

        <button
          style={{
            padding: 12,
            marginTop: 24,
            background: "crimson",
            color: "white",
            cursor: "pointer",
          }}
          onClick={logout}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
