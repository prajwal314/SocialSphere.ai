import React, { useState } from "react";
import { SocialRequest } from "@/entities/SocialRequest";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Users } from "lucide-react";

export default function SocialForm({ activityType, onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    activity_type: activityType,
    preferred_date: "",
    preferred_time: "evening",
    location: "",
    group_size: 1,
    budget_range: "moderate",
    companion_preference: "similar_age",
    gender_preference: "any",
    activity_details: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const activityNames = {
    dinner: "Dinner",
    shopping: "Shopping",
    movie: "Movie",
    sports: "Sports",
    long_drive: "Long Drive",
    gaming: "Gaming",
    coffee: "Coffee",
    hiking: "Hiking"
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await SocialRequest.create(formData);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error creating social request:", error);
    }
    
    setIsSubmitting(false);
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Users className="w-6 h-6 text-purple-500" />
            Find Someone for {activityNames[activityType]}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="preferred_date">Preferred Date</Label>
              <Input
                id="preferred_date"
                type="date"
                value={formData.preferred_date}
                onChange={(e) => setFormData(prev => ({ ...prev, preferred_date: e.target.value }))}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label>Preferred Time</Label>
              <Select
                value={formData.preferred_time}
                onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_time: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="morning">Morning</SelectItem>
                  <SelectItem value="afternoon">Afternoon</SelectItem>
                  <SelectItem value="evening">Evening</SelectItem>
                  <SelectItem value="night">Night</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="Where would you like to meet?"
            />
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Group Size</Label>
              <Select
                value={formData.group_size.toString()}
                onValueChange={(value) => setFormData(prev => ({ ...prev, group_size: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4, 5].map(size => (
                    <SelectItem key={size} value={size.toString()}>
                      {size} {size === 1 ? 'person' : 'people'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Budget Range</Label>
              <Select
                value={formData.budget_range}
                onValueChange={(value) => setFormData(prev => ({ ...prev, budget_range: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="budget">Budget-friendly</SelectItem>
                  <SelectItem value="moderate">Moderate</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Gender Preference</Label>
              <Select
                value={formData.gender_preference}
                onValueChange={(value) => setFormData(prev => ({ ...prev, gender_preference: value }))}
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

          <div className="space-y-2">
            <Label>Age Preference</Label>
            <Select
              value={formData.companion_preference}
              onValueChange={(value) => setFormData(prev => ({ ...prev, companion_preference: value }))}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="similar_age">Similar Age</SelectItem>
                <SelectItem value="any_age">Any Age</SelectItem>
                <SelectItem value="older">Older</SelectItem>
                <SelectItem value="younger">Younger</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="activity_details">Additional Details</Label>
            <Textarea
              id="activity_details"
              value={formData.activity_details}
              onChange={(e) => setFormData(prev => ({ ...prev, activity_details: e.target.value }))}
              placeholder="Any specific preferences or details about the activity?"
              className="h-20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isSubmitting ? "Creating..." : `Find ${activityNames[activityType]} Partner`}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}