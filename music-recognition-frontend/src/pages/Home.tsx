import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Music, History as HistoryIcon } from "lucide-react";

export default function Home() {
  const { user, loggedIn } = useAuth();
  const navigate = useNavigate();

  if (!loggedIn) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-4">
        <h1 className="text-4xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" style={{ letterSpacing: '-0.02em' }}>
          You are not logged in
        </h1>
        <button
          onClick={() => navigate("/login")}
          className="glass-button px-8 py-3 rounded-3xl text-base font-medium"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="max-w-xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <h1 className="text-4xl font-semibold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" style={{ letterSpacing: '-0.02em' }}>
            Welcome ✨
          </h1>
          <p className="text-base text-gray-500">
            Logged in as: <span className="text-purple-600 font-medium">{user?.email}</span>
          </p>
        </motion.div>

        <div className="flex gap-6 justify-center">
          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/recognize")}
            className="glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 group w-44 h-44 border-2 border-pink-100/50"
          >
            <div className="p-3 rounded-[1.5rem] bg-gradient-to-br from-pink-100 to-rose-100 group-hover:from-pink-200 group-hover:to-rose-200 transition-all shadow-sm">
              <Music size={32} className="text-pink-600" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold text-gray-700" style={{ letterSpacing: '-0.01em' }}>Recognize Music</span>
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => navigate("/history")}
            className="glass-panel p-6 rounded-[2rem] flex flex-col items-center justify-center gap-3 group w-44 h-44 border-2 border-blue-100/50"
          >
            <div className="p-3 rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-cyan-100 group-hover:from-blue-200 group-hover:to-cyan-200 transition-all shadow-sm">
              <HistoryIcon size={32} className="text-blue-600" strokeWidth={2.5} />
            </div>
            <span className="text-lg font-semibold text-gray-700" style={{ letterSpacing: '-0.01em' }}>View History</span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}
