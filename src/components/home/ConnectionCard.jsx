import React from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";

export default function ConnectionCard({ title, subtitle, icon: Icon, gradient, description, onClick }) {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-2xl transition-all duration-300 border-0 overflow-hidden"
      onClick={onClick}
    >
      <CardContent className="p-0">
        <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden`}>
          <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-8 -translate-y-8" />
          <div className="relative z-10">
            <Icon className="w-12 h-12 mb-4 group-hover:scale-110 transition-transform duration-300" />
            <h3 className="text-2xl font-bold mb-2">{title}</h3>
            <p className="text-white/90">{subtitle}</p>
          </div>
        </div>
        <div className="p-6 bg-white">
          <p className="text-gray-600 mb-4">{description}</p>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-500">Click to get started</span>
            <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 group-hover:translate-x-1 transition-all duration-300" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}