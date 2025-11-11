import React, { useState } from "react";
import { RoommateRequest } from "@/entities/RoommateRequest";
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
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Home } from "lucide-react";

export default function RoommateForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    budget_min: "",
    budget_max: "",
    preferred_locations: [],
    preferred_gender: "any",
    work_schedule: "9-5",
    cleanliness_level: "clean",
    lifestyle: "quiet",
    move_in_date: "",
    lease_duration: "1_year",
    pets: false,
    smoking: false
  });
  const [newLocation, setNewLocation] = useState("");
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
      await RoommateRequest.create(data);
      onSubmit(data);
      onClose();
    } catch (error) {
      console.error("Error creating roommate request:", error);
    }
    
    setIsSubmitting(false);
  };

  const addLocation = () => {
    if (newLocation.trim() && !formData.preferred_locations.includes(newLocation.trim())) {
      setFormData(prev => ({
        ...prev,
        preferred_locations: [...prev.preferred_locations, newLocation.trim()]
      }));
      setNewLocation("");
    }
  };

  const removeLocation = (location) => {
    setFormData(prev => ({
      ...prev,
      preferred_locations: prev.preferred_locations.filter(l => l !== location)
    }));
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Home className="w-6 h-6 text-green-500" />
            Find Your Perfect Roommate
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="budget">Budget Range (Monthly Rent)</Label>
              <div className="flex gap-2">
                <Input
                  id="budget_min"
                  type="number"
                  placeholder="Min ($)"
                  value={formData.budget_min}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget_min: e.target.value }))}
                  required
                />
                <Input
                  type="number"
                  placeholder="Max ($)"
                  value={formData.budget_max}
                  onChange={(e) => setFormData(prev => ({ ...prev, budget_max: e.target.value }))}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="move_in_date">Move-in Date</Label>
              <Input
                id="move_in_date"
                type="date"
                value={formData.move_in_date}
                onChange={(e) => setFormData(prev => ({ ...prev, move_in_date: e.target.value }))}
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label>Preferred Locations</Label>
            <div className="flex gap-2">
              <Input
                value={newLocation}
                onChange={(e) => setNewLocation(e.target.value)}
                placeholder="Add location (e.g., Manhattan, Brooklyn)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addLocation())}
              />
              <Button type="button" onClick={addLocation} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.preferred_locations.map((location) => (
                <Badge key={location} variant="secondary" className="gap-1">
                  {location}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => removeLocation(location)}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
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
            
            <div className="space-y-2">
              <Label>Work Schedule</Label>
              <Select
                value={formData.work_schedule}
                onValueChange={(value) => setFormData(prev => ({ ...prev, work_schedule: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="9-5">9-5</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                  <SelectItem value="night_shift">Night Shift</SelectItem>
                  <SelectItem value="student">Student</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Cleanliness Level</Label>
              <Select
                value={formData.cleanliness_level}
                onValueChange={(value) => setFormData(prev => ({ ...prev, cleanliness_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="very_clean">Very Clean</SelectItem>
                  <SelectItem value="clean">Clean</SelectItem>
                  <SelectItem value="relaxed">Relaxed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Lifestyle</Label>
              <Select
                value={formData.lifestyle}
                onValueChange={(value) => setFormData(prev => ({ ...prev, lifestyle: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiet">Quiet</SelectItem>
                  <SelectItem value="social">Social</SelectItem>
                  <SelectItem value="party">Party</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Lease Duration</Label>
              <Select
                value={formData.lease_duration}
                onValueChange={(value) => setFormData(prev => ({ ...prev, lease_duration: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3_months">3 Months</SelectItem>
                  <SelectItem value="6_months">6 Months</SelectItem>
                  <SelectItem value="1_year">1 Year</SelectItem>
                  <SelectItem value="flexible">Flexible</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex gap-6">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="pets"
                checked={formData.pets}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, pets: checked }))}
              />
              <Label htmlFor="pets">Pets allowed</Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="smoking"
                checked={formData.smoking}
                onCheckedChange={(checked) => setFormData(prev => ({ ...prev, smoking: checked }))}
              />
              <Label htmlFor="smoking">Smoking allowed</Label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? "Creating..." : "Find Roommate"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}