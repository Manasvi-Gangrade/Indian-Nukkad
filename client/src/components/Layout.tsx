import { ReactNode } from "react";
import { Home, MessageSquare, User, MapPin } from "lucide-react";
import { Link, useLocation } from "wouter";
import { motion } from "framer-motion";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location] = useLocation();

  const navItems = [
    { icon: Home, label: "Nukkad", path: "/" },
    { icon: MessageSquare, label: "Mohalla", path: "/mohalla" },
    { icon: User, label: "Profile", path: "/profile" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-sans relative overflow-hidden max-w-md mx-auto shadow-2xl border-x border-border/40">
      {/* Background Pattern Overlay */}
      <div className="absolute inset-0 bg-paper-pattern opacity-40 pointer-events-none z-0" />

      {/* Main Content */}
      <main className="relative z-10 pb-20 min-h-screen">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t border-border/50 z-50 max-w-md mx-auto">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <motion.div
                  whileTap={{ scale: 0.9 }}
                  className="flex flex-col items-center justify-center w-full h-full cursor-pointer select-none"
                >
                  <item.icon size={24} strokeWidth={isActive ? 2.5 : 2} className={isActive ? "text-primary" : "text-muted-foreground"} />
                  <span className={`text-xs mt-1 font-bold ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                    {item.label}
                  </span>
                  {isActive && (
                    <motion.div
                      layoutId="nav-dot"
                      className="absolute -bottom-2 w-1 h-1 rounded-full bg-primary"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
