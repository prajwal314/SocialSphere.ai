import React, { useState } from "react";
import { DateRequest } from "@/entities/DateRequest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Heart } from "lucide-react";

export default function DateForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    age_min: 18,
    age_max: 35,
    preferred_gender: "any",
    relationship_type: "dating",
    interests: [],
    location_preference: "",
    date_activity: "coffee",
    personality_preference: "no_preference"
  });
  const [newInterest, setNewInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await DateRequest.create(formData);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error creating date request:", error);
    }
    
    setIsSubmitting(false);
  };

  const addInterest = () => {
    if (newInterest.trim() && !formData.interests.includes(newInterest.trim())) {
      setFormData(prev => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()]
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.filter(i => i !== interest)
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Heart className="w-6 h-6 text-pink-500" />
            Find Your Special Someone
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Age Range</Label>
              <div className="flex gap-2">
                <Input
                  type="number"
                  placeholder="Min age"
                  value={formData.age_min}
                  onChange={(e) => setFormData(prev => ({ ...prev, age_min: parseInt(e.target.value) || 18 }))}
                  min="16"
                  max="100"
                />
                <Input
                  type="number"
                  placeholder="Max age"
                  value={formData.age_max}
                  onChange={(e) => setFormData(prev => ({ ...prev, age_max: parseInt(e.target.value) || 35 }))}
                  min="16"
                  max="100"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Gender</Label>
              <Select
                value={formData.preferred_gender}
                onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_gender: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any</SelectItem>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Looking For</Label>
              <Select
                value={formData.relationship_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, relationship_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="casual">Casual Dating</SelectItem>
                  <SelectItem value="dating">Dating</SelectItem>
                  <SelectItem value="serious">Serious Relationship</SelectItem>
                  <SelectItem value="friendship_first">Friendship First</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Preferred First Date</Label>
              <Select
                value={formData.date_activity}
                onValueChange={(value) => setFormData(prev => ({ ...prev, date_activity: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="coffee">Coffee</SelectItem>
                  <SelectItem value="dinner">Dinner</SelectItem>
                  <SelectItem value="movie">Movie</SelectItem>
                  <SelectItem value="outdoor">Outdoor Activity</SelectItem>
                  <SelectItem value="cultural">Museum/Cultural</SelectItem>
                  <SelectItem value="adventure">Adventure</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location_preference">Location Preference</Label>
            <Input
              id="location_preference"
              value={formData.location_preference}
              onChange={(e) => setFormData(prev => ({ ...prev, location_preference: e.target.value }))}
              placeholder="e.g., Manhattan, Downtown, Within 10 miles"
            />
          </div>

          <div className="space-y-2">
            <Label>Personality Preference</Label>
            <Select
              value={formData.personality_preference}
              onValueChange={(value) => setFormData(prev => ({ ...prev, personality_preference: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="no_preference">No Preference</SelectItem>
                <SelectItem value="outgoing">Outgoing</SelectItem>
                <SelectItem value="introverted">Introverted</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-3">
            <Label>Common Interests</Label>
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add interest (e.g., reading, hiking, music)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addInterest())}
              />
              <Button type="button" onClick={addInterest} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.interests.map((interest) => (
                <Badge key={interest} variant="secondary" className="gap-1">
                  {interest}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeInterest(interest)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-pink-600 hover:bg-pink-700"
            >
              {isSubmitting ? "Creating..." : "Find Date"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}