import React, { useState, useEffect } from "react";
import { User } from "@/entities/User";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Edit, Save, X, Plus, User as UserIcon } from "lucide-react";
import { motion } from "framer-motion";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [newInterest, setNewInterest] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    try {
      const currentUser = await User.me();
      setUser(currentUser);
      setEditData(currentUser);
    } catch (error) {
      console.error("Error loading user:", error);
    }
    setIsLoading(false);
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await User.updateMyUserData(editData);
      setUser(editData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    setIsSaving(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !(editData.interests || []).includes(newInterest.trim())) {
      setEditData(prev => ({
        ...prev,
        interests: [...(prev.interests || []), newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setEditData(prev => ({
      ...prev,
      interests: (prev.interests || []).filter(i => i !== interest)
    }));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Profile</h1>
            <p className="text-gray-600 mt-1">Manage your personal information and preferences</p>
          </div>
          <Button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            disabled={isSaving}
            className={isEditing ? "bg-green-600 hover:bg-green-700" : ""}
          >
            {isEditing ? (
              <>
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Profile"}
              </>
            ) : (
              <>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </>
            )}
          </Button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Picture & Basic Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="relative mb-6">
                  <div className="w-32 h-32 mx-auto bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center">
                    {user?.profile_photo ? (
                      <img 
                        src={user.profile_photo} 
                        alt="Profile" 
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <UserIcon className="w-16 h-16 text-white" />
                    )}
                  </div>
                  {isEditing && (
                    <Button
                      size="icon"
                      className="absolute bottom-0 right-0 rounded-full bg-purple-600 hover:bg-purple-700"
                    >
                      <Camera className="w-4 h-4" />
                    </Button>
                  )}
                </div>
                
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {user?.full_name || 'User'}
                </h2>
                <p className="text-gray-600 mb-4">{user?.email}</p>
                
                {user?.location && (
                  <Badge variant="outline" className="mb-2">
                    📍 {user.location}
                  </Badge>
                )}
                
                {user?.age && (
                  <Badge variant="outline" className="ml-2 mb-2">
                    {user.age} years old
                  </Badge>
                )}
              </CardContent>
            </Card>
          </motion.div>

          {/* Profile Details */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="age">Age</Label>
                      {isEditing ? (
                        <Input
                          id="age"
                          type="number"
                          value={editData.age || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, age: parseInt(e.target.value) || null }))}
                          min="16"
                          max="100"
                        />
                      ) : (
                        <p className="text-gray-800">{user?.age || "Not specified"}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      {isEditing ? (
                        <Input
                          id="location"
                          value={editData.location || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="Your city"
                        />
                      ) : (
                        <p className="text-gray-800">{user?.location || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="occupation">Occupation</Label>
                      {isEditing ? (
                        <Input
                          id="occupation"
                          value={editData.occupation || ""}
                          onChange={(e) => setEditData(prev => ({ ...prev, occupation: e.target.value }))}
                          placeholder="Your job title"
                        />
                      ) : (
                        <p className="text-gray-800">{user?.occupation || "Not specified"}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="personality_type">Personality Type</Label>
                      {isEditing ? (
                        <Select
                          value={editData.personality_type || ""}
                          onValueChange={(value) => setEditData(prev => ({ ...prev, personality_type: value }))}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="introvert">Introvert</SelectItem>
                            <SelectItem value="extrovert">Extrovert</SelectItem>
                            <SelectItem value="ambivert">Ambivert</SelectItem>
                          </SelectContent>
                        </Select>
                      ) : (
                        <p className="text-gray-800 capitalize">{user?.personality_type || "Not specified"}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    {isEditing ? (
                      <Textarea
                        id="bio"
                        value={editData.bio || ""}
                        onChange={(e) => setEditData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        className="h-24"
                        maxLength={500}
                      />
                    ) : (
                      <p className="text-gray-800">{user?.bio || "No bio added yet"}</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Interests & Hobbies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing && (
                    <div className="flex gap-2">
                      <Input
                        value={newInterest}
                        onChange={(e) => setNewInterest(e.target.value)}
                        placeholder="Add an interest"
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
                      />
                      <Button type="button" onClick={addInterest} variant="outline" size="icon">
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2">
                    {((isEditing ? editData.interests : user?.interests) || []).map((interest, index) => (
                      <Badge key={index} variant="secondary" className="gap-1">
                        {interest}
                        {isEditing && (
                          <X 
                            className="w-3 h-3 cursor-pointer hover:text-red-500" 
                            onClick={() => removeInterest(interest)}
                          />
                        )}
                      </Badge>
                    ))}
                    {!(isEditing ? editData.interests : user?.interests)?.length && (
                      <p className="text-gray-500">No interests added yet</p>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {isEditing && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-end gap-3 mt-6"
          >
            <Button 
              variant="outline" 
              onClick={() => {
                setIsEditing(false);
                setEditData(user);
              }}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleSave}
              disabled={isSaving}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}