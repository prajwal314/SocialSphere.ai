import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, User, Users, Heart, MessageCircle, Settings } from "lucide-react";

export default function Layout({ children, currentPageName }) {
  const location = useLocation();
  const [user, setUser] = useState(null);
  
  useEffect(() => {
    // Load user data if needed
  }, []);

  const navigation = [
    { name: "Home", href: createPageUrl("Home"), icon: Home },
    { name: "Profile", href: createPageUrl("Profile"), icon: User },
    { name: "Connections", href: createPageUrl("Connections"), icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50">
      {/* Mobile Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-t border-purple-200 md:hidden z-50">
        <div className="flex justify-around py-2">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "text-purple-600 bg-purple-100"
                    : "text-gray-600 hover:text-purple-600 hover:bg-purple-50"
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span className="text-xs mt-1 font-medium">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Desktop Side Navigation */}
      <div className="hidden md:flex">
        <div className="fixed left-0 top-0 h-full w-72 bg-white/80 backdrop-blur-lg border-r border-purple-200 p-6 z-40">
          <div className="mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  SocialSphere
                </h1>
                <p className="text-sm text-gray-500">Smart Networking</p>
              </div>
            </div>
          </div>

          <nav className="space-y-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-700 hover:bg-purple-100 hover:text-purple-700"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-72">
        <main className="pb-20 md:pb-6">
          {children}
        </main>
      </div>
    </div>
  );
}