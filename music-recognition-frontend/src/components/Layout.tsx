import type { ReactNode } from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen w-full text-white font-sans selection:bg-purple-500/30">
            {/* Background Elements - BRIGHT & VISIBLE */}
            <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
                {/* Purple blob - top left */}
                <motion.div
                    animate={{
                        x: [0, 60, -30, 0],
                        y: [0, -40, 30, 0],
                        scale: [1, 1.2, 0.9, 1],
                    }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-gradient-to-br from-purple-500 via-violet-500 to-fuchsia-500 opacity-80 blur-[80px]"
                />

                {/* Pink blob - top right */}
                <motion.div
                    animate={{
                        x: [0, -50, 40, 0],
                        y: [0, 50, -20, 0],
                        scale: [1, 1.3, 0.85, 1],
                    }}
                    transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute top-[10%] right-[-5%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-pink-500 via-rose-500 to-red-500 opacity-80 blur-[80px]"
                />

                {/* Blue blob - bottom right */}
                <motion.div
                    animate={{
                        x: [0, 40, -60, 0],
                        y: [0, -60, 40, 0],
                        scale: [1, 1.25, 0.9, 1],
                    }}
                    transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                    className="absolute bottom-[-10%] right-[-10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-blue-500 via-cyan-500 to-sky-400 opacity-80 blur-[80px]"
                />

                {/* Cyan blob - bottom left */}
                <motion.div
                    animate={{
                        x: [0, -40, 50, 0],
                        y: [0, 30, -50, 0],
                        scale: [1, 1.15, 0.95, 1],
                    }}
                    transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", delay: 3 }}
                    className="absolute bottom-[5%] left-[5%] w-[45%] h-[45%] rounded-full bg-gradient-to-br from-cyan-400 via-teal-400 to-emerald-400 opacity-75 blur-[70px]"
                />

                {/* Orange accent blob */}
                <motion.div
                    animate={{
                        x: [0, 50, -40, 0],
                        y: [0, -30, 40, 0],
                        scale: [1, 1.2, 0.85, 1],
                    }}
                    transition={{ duration: 16, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
                    className="absolute top-[50%] left-[50%] w-[40%] h-[40%] rounded-full bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 opacity-70 blur-[75px]"
                />
            </div>

            {/* Navbar */}
            <Navbar />

            {/* Main Content */}
            <motion.main
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-8"
            >
                {children}
            </motion.main>
        </div>
    );
}
