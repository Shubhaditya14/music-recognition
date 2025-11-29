import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Home, Music, History, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { loggedIn, logout } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/recognize", icon: Music, label: "Recognize" },
    { path: "/history", icon: History, label: "History" },
  ];

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-5xl mx-auto">
        <div className="glass-panel rounded-full px-6 py-3 flex items-center justify-between shadow-sm">
          {/* Logo/Brand */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => navigate("/")}
          >
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center shadow-sm">
              <Music className="text-purple-600" size={18} strokeWidth={2.5} />
            </div>
            <span className="text-base font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400" style={{ letterSpacing: '-0.01em' }}>
              MusicID
            </span>
          </motion.div>

          {/* Nav Links */}
          <div className="flex items-center gap-1.5">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <motion.button
                  key={item.path}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate(item.path)}
                  className={`
                    relative px-3.5 py-1.5 rounded-full flex items-center gap-2 transition-all font-medium text-sm
                    ${isActive
                      ? 'bg-gradient-to-r from-pink-100 via-purple-100 to-blue-100 text-purple-700 shadow-sm'
                      : 'text-gray-600 hover:text-purple-600 hover:bg-white/40'
                    }
                  `}
                  style={{ letterSpacing: '0.005em' }}
                >
                  <Icon size={15} strokeWidth={2.5} />
                  <span className="text-xs">{item.label}</span>
                </motion.button>
              );
            })}
          </div>

          {/* Auth Button */}
          <div>
            {loggedIn ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={logout}
                className="px-3.5 py-1.5 rounded-full bg-red-50 hover:bg-red-100 text-red-500 hover:text-red-600 flex items-center gap-1.5 transition-all border border-red-100 font-medium text-xs"
                style={{ letterSpacing: '0.005em' }}
              >
                <LogOut size={14} strokeWidth={2.5} />
                <span>Logout</span>
              </motion.button>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/login")}
                className="glass-button px-3.5 py-1.5 rounded-full flex items-center gap-1.5 text-xs"
              >
                <LogIn size={14} strokeWidth={2.5} />
                <span>Login</span>
              </motion.button>
            )}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
