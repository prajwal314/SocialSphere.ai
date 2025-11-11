import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Plane, Home as HomeIcon, Briefcase, Heart, Users, Camera, ShoppingBag, Film, Car, Gamepad2, Coffee, Mountain, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import ConnectionCard from "../Components/home/ConnectionCard.jsx";
import SocialActivityCard from "../components/home/SocialActivityCard";
import TravelForm from "../components/forms/TravelForm";
import RoommateForm from "../components/forms/RoommateForm";
import BusinessForm from "../components/forms/BusinessForm";
import DateForm from "../components/forms/DateForm";
import SocialForm from "../components/forms/SocialForm";

export default function Home() {
  const [user, setUser] = useState(null);
  const [showForm, setShowForm] = useState(null);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
    } catch (error) {
      console.error("User not authenticated");
    }
  };

  const connectionTypes = [
    {
      id: "travel",
      title: "Find Travel Buddy",
      subtitle: "Explore the world together",
      icon: Plane,
      gradient: "from-blue-500 to-cyan-500",
      description: "Find someone to share your next adventure with"
    },
    {
      id: "roommate",
      title: "Find Roommate",
      subtitle: "Share a perfect living space",
      icon: HomeIcon,
      gradient: "from-green-500 to-teal-500",
      description: "Connect with compatible people to share rent and memories"
    },
    {
      id: "business",
      title: "Business Partner",
      subtitle: "Build something amazing",
      icon: Briefcase,
      gradient: "from-orange-500 to-red-500",
      description: "Find a co-founder or business partner who shares your vision"
    },
    {
      id: "date",
      title: "Find a Date",
      subtitle: "Meet someone special",
      icon: Heart,
      gradient: "from-pink-500 to-rose-500",
      description: "Connect with people for meaningful relationships"
    }
  ];

  const socialActivities = [
    { id: "dinner", title: "Go for Dinner", icon: Coffee, color: "text-orange-500" },
    { id: "shopping", title: "Go Shopping", icon: ShoppingBag, color: "text-pink-500" },
    { id: "movie", title: "Watch a Movie", icon: Film, color: "text-purple-500" },
    { id: "sports", title: "Play Sports", icon: Users, color: "text-green-500" },
    { id: "long_drive", title: "Long Drive", icon: Car, color: "text-blue-500" },
    { id: "gaming", title: "Gaming Session", icon: Gamepad2, color: "text-indigo-500" },
    { id: "coffee", title: "Coffee Chat", icon: Coffee, color: "text-amber-500" },
    { id: "hiking", title: "Hiking Trip", icon: Mountain, color: "text-emerald-500" }
  ];

  const handleFormSubmit = async (formType, data) => {
    // Handle form submission for different types
    setShowForm(null);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 via-pink-600 to-indigo-700 text-white px-6 py-12 md:py-16">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
          >
            Connect with Your
            <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
              Perfect Match
            </span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl md:text-2xl mb-8 text-purple-100 max-w-3xl mx-auto"
          >
            Whether you're looking for a travel buddy, roommate, business partner, or date - 
            we help introverts ,Gen Z and Professionals to connect meaningfully.
          </motion.p>
          {user && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg text-purple-200"
            >
              Welcome back 🎉
              {/* {user.full_name}!  */}
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Main Connection Types */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-8 text-center"
          >
            What are you looking for?
          </motion.h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {connectionTypes.map((type, index) => (
              <motion.div
                key={type.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <ConnectionCard
                  {...type}
                  onClick={() => setShowForm(type.id)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Social Activities Section */}
        <section className="mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-bold text-gray-800 mb-2 text-center"
          >
            Social Activities
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-gray-600 text-center mb-8"
          >
            Find people to join you for fun activities
          </motion.p>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {socialActivities.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <SocialActivityCard
                  {...activity}
                  onClick={() => setShowForm(`social_${activity.id}`)}
                />
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <motion.section 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-8 text-center"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            Ready to make meaningful connections?
          </h3>
          <p className="text-gray-600 mb-6">
            Join thousands of Gen Z users who have found their perfect matches through SocialSphere
          </p>
          <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-xl">
            <Plus className="w-5 h-5 mr-2" />
            Complete Your Profile
          </Button>
        </motion.section>
      </div>

      {/* Form Modals */}
      {showForm === 'travel' && (
        <TravelForm onClose={() => setShowForm(null)} onSubmit={(data) => handleFormSubmit('travel', data)} />
      )}
      {showForm === 'roommate' && (
        <RoommateForm onClose={() => setShowForm(null)} onSubmit={(data) => handleFormSubmit('roommate', data)} />
      )}
      {showForm === 'business' && (
        <BusinessForm onClose={() => setShowForm(null)} onSubmit={(data) => handleFormSubmit('business', data)} />
      )}
      {showForm === 'date' && (
        <DateForm onClose={() => setShowForm(null)} onSubmit={(data) => handleFormSubmit('date', data)} />
      )}
      {showForm?.startsWith('social_') && (
        <SocialForm 
          activityType={showForm.replace('social_', '')}
          onClose={() => setShowForm(null)} 
          onSubmit={(data) => handleFormSubmit('social', data)} 
        />
      )}
    </div>
  );
}