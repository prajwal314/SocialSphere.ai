import React, { useState } from "react";
import { TravelRequest } from "@/entities/TravelRequest";
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
import { X, Plus, Plane } from "lucide-react";

export default function TravelForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    destination: "",
    start_date: "",
    end_date: "",
    budget_min: "",
    budget_max: "",
    preferred_gender: "any",
    travel_style: "comfortable",
    interests: [],
    group_size: 1
  });
  const [newInterest, setNewInterest] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const data = {
        ...formData,
        budget_min: parseFloat(formData.budget_min) || 0,
        budget_max: parseFloat(formData.budget_max) || 0
      };
      await TravelRequest.create(data);
      onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error creating travel request:", error);
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
            <Plane className="w-6 h-6 text-blue-500" />
            Find Your Travel Buddy
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="destination">Where do you want to travel?</Label>
              <Input
                id="destination"
                value={formData.destination}
                onChange={(e) => setFormData(prev => ({ ...prev, destination: e.target.value }))}
                placeholder="e.g., Paris, Tokyo, Bali"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="travel_style">Travel Style</Label>
              <Select
                value={formData.travel_style}
                onValueChange={(value) => setFormData(prev => ({ ...prev, travel_style: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="luxury">Luxury</SelectItem>
                  <SelectItem value="comfortable">Comfortable</SelectItem>
                  <SelectItem value="budget">Budget</SelectItem>
                  <SelectItem value="backpacking">Backpacking</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="start_date">Start Date</Label>
              <Input
                id="start_date"
                type="date"
                value={formData.start_date}
                onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="end_date">End Date</Label>
              <Input
                id="end_date"
                type="date"
                value={formData.end_date}
                onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget_min">Budget Range (USD)</Label>
              <div className="flex gap-2">
                <Input
                  id="budget_min"
                  type="number"
                  placeholder="Min"
                  value={formData.budget_min}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget_min: e.target.value }))}
                />
                <Input
                  type="number"
                  placeholder="Max"
                  value={formData.budget_max}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget_max: e.target.value }))}
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

          <div className="space-y-3">
            <Label>Travel Interests</Label>
            <div className="flex gap-2">
              <Input
                value={newInterest}
                onChange={(e) => setNewInterest(e.target.value)}
                placeholder="Add interest (e.g., photography, food, museums)"
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
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSubmitting ? "Creating..." : "Find Travel Buddy"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}