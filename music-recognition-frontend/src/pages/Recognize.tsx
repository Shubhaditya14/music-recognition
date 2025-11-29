import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, Music, AlertCircle, CheckCircle2, Loader2 } from "lucide-react";

export default function Recognize() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<Record<string, any> | null>(null);
  const [error, setError] = useState("");

  const handleUpload = async () => {
    if (!file) {
      setError("Please select an audio file first.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://localhost:8000/recognize/audio", {
        method: "POST",
        credentials: "include",
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Recognition failed");
      }

      const data = await res.json();
      setResult(data);
    } catch {
      setError("Error processing audio");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto pt-10">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-400">
          Recognize Music
        </h1>
        <p className="text-white/60">Upload an audio file to identify the song</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="glass-panel p-8 rounded-2xl"
      >
        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <label
              htmlFor="audio-upload"
              className={`
                relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-2xl cursor-pointer transition-all
                ${file
                  ? 'border-purple-500/50 bg-purple-500/10'
                  : 'border-white/20 hover:border-purple-500/50 hover:bg-white/5'
                }
              `}
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {file ? (
                  <>
                    <Music className="w-12 h-12 text-purple-400 mb-4" />
                    <p className="text-sm text-purple-200 font-medium">{file.name}</p>
                    <p className="text-xs text-purple-300/60 mt-1">Click to change file</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-white/40 mb-4" />
                    <p className="text-sm text-white/70 font-medium">Click to upload audio</p>
                    <p className="text-xs text-white/40 mt-1">MP3, WAV, or OGG</p>
                  </>
                )}
              </div>
              <input
                id="audio-upload"
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </label>
          </div>

          <button
            onClick={handleUpload}
            disabled={loading || !file}
            className={`
              w-full py-4 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all
              ${loading || !file
                ? 'bg-white/5 text-white/30 cursor-not-allowed'
                : 'glass-button text-white shadow-lg shadow-purple-500/20 hover:shadow-purple-500/40'
              }
            `}
          >
            {loading ? (
              <>
                <Loader2 className="animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Music size={20} />
                Identify Song
              </>
            )}
          </button>
        </div>

        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 p-4 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center gap-3 text-red-200"
            >
              <AlertCircle size={20} />
              <p className="text-sm">{error}</p>
            </motion.div>
          )}

          {result && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 p-6 rounded-xl bg-green-500/10 border border-green-500/20"
            >
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <CheckCircle2 size={24} />
                <h3 className="text-lg font-semibold">Match Found!</h3>
              </div>
              <pre className="bg-black/30 p-4 rounded-lg overflow-x-auto text-sm text-green-100 font-mono">
                {JSON.stringify(result, null, 2)}
              </pre>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
