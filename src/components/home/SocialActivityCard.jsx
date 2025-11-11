import React from "react";
import { Card, CardContent } from "@/components/ui/card";

export default function SocialActivityCard({ title, icon: Icon, color, onClick }) {
  return (
    <Card 
      className="group cursor-pointer hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-300"
      onClick={onClick}
    >
      <CardContent className="p-6 text-center">
        <div className="mb-4">
          <Icon className={`w-8 h-8 mx-auto ${color} group-hover:scale-110 transition-transform duration-300`} />
        </div>
        <h4 className="font-medium text-gray-800 group-hover:text-purple-600 transition-colors duration-300">
          {title}
        </h4>
      </CardContent>
    </Card>
  );
}