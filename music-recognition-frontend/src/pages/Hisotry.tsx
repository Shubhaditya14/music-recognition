import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { History as HistoryIcon, Music, Calendar } from "lucide-react";

export default function History() {
  const [items, setItems] = useState<Record<string, any>[]>([]);

  const fetchHistory = async () => {
    try {
      const res = await fetch("http://localhost:8000/history", {
        method: "GET",
        credentials: "include",
      });

      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (error) {
      console.error("Failed to fetch history", error);
    }
  };

  useEffect(() => {
    void fetchHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="max-w-4xl mx-auto pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
          History
        </h1>
        <p className="text-white/60">Your past musical discoveries</p>
      </motion.div>

      <div className="space-y-4">
        {items.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-white/40 py-12"
          >
            <HistoryIcon size={48} className="mx-auto mb-4 opacity-50" />
            <p>No history yet.</p>
          </motion.div>
        )}

        {items.map((entry, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="glass-panel p-6 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors"
          >
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-blue-500/20">
                <Music size={24} className="text-blue-400" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white/90">{entry.song_name}</h3>
                <p className="text-white/60">{entry.artist}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-white/40 text-sm">
              <Calendar size={16} />
              <span>{new Date(entry.timestamp).toLocaleString()}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
