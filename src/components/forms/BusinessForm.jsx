import React, { useState } from "react";
import { BusinessRequest } from "@/entities/BusinessRequest";
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
import { Badge } from "@/components/ui/badge";
import { X, Plus, Briefcase } from "lucide-react";

export default function BusinessForm({ onClose, onSubmit }) {
  const [formData, setFormData] = useState({
    business_type: "tech_startup",
    business_idea: "",
    skills_i_bring: [],
    skills_needed: [],
    commitment_level: "full_time",
    business_stage: "idea",
    investment_range: "0-1k",
    timeline: "3_months"
  });
  const [newSkillBring, setNewSkillBring] = useState("");
  const [newSkillNeed, setNewSkillNeed] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await BusinessRequest.create(formData);
      onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Error creating business request:", error);
    }
    
    setIsSubmitting(false);
  };

  const addSkillBring = () => {
    if (newSkillBring.trim() && !formData.skills_i_bring.includes(newSkillBring.trim())) {
      setFormData(prev => ({
        ...prev,
        skills_i_bring: [...prev.skills_i_bring, newSkillBring.trim()]
      }));
      setNewSkillBring("");
    }
  };

  const addSkillNeed = () => {
    if (newSkillNeed.trim() && !formData.skills_needed.includes(newSkillNeed.trim())) {
      setFormData(prev => ({
        ...prev,
        skills_needed: [...prev.skills_needed, newSkillNeed.trim()]
      }));
      setNewSkillNeed("");
    }
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Briefcase className="w-6 h-6 text-orange-500" />
            Find Your Business Partner
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Business Type</Label>
              <Select
                value={formData.business_type}
                onValueChange={(value) => setFormData(prev => ({ ...prev, business_type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tech_startup">Tech Startup</SelectItem>
                  <SelectItem value="ecommerce">E-commerce</SelectItem>
                  <SelectItem value="service_business">Service Business</SelectItem>
                  <SelectItem value="creative">Creative</SelectItem>
                  <SelectItem value="consulting">Consulting</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Business Stage</Label>
              <Select
                value={formData.business_stage}
                onValueChange={(value) => setFormData(prev => ({ ...prev, business_stage: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="idea">Idea</SelectItem>
                  <SelectItem value="prototype">Prototype</SelectItem>
                  <SelectItem value="mvp">MVP</SelectItem>
                  <SelectItem value="early_revenue">Early Revenue</SelectItem>
                  <SelectItem value="scaling">Scaling</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="business_idea">Business Idea</Label>
            <Textarea
              id="business_idea"
              value={formData.business_idea}
              onChange={(e) => setFormData(prev => ({ ...prev, business_idea: e.target.value }))}
              placeholder="Describe your business idea, vision, and goals..."
              className="h-24"
              required
            />
          </div>

          <div className="space-y-3">
            <Label>Skills I Bring</Label>
            <div className="flex gap-2">
              <Input
                value={newSkillBring}
                onChange={(e) => setNewSkillBring(e.target.value)}
                placeholder="Add skill (e.g., Development, Marketing, Design)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillBring())}
              />
              <Button type="button" onClick={addSkillBring} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills_i_bring.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 bg-green-100 text-green-800">
                  {skill}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      skills_i_bring: prev.skills_i_bring.filter(s => s !== skill) 
                    }))}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <Label>Skills I Need</Label>
            <div className="flex gap-2">
              <Input
                value={newSkillNeed}
                onChange={(e) => setNewSkillNeed(e.target.value)}
                placeholder="Add needed skill (e.g., Sales, Finance, Operations)"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkillNeed())}
              />
              <Button type="button" onClick={addSkillNeed} variant="outline" size="icon">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.skills_needed.map((skill) => (
                <Badge key={skill} variant="secondary" className="gap-1 bg-blue-100 text-blue-800">
                  {skill}
                  <X 
                    className="w-3 h-3 cursor-pointer hover:text-red-500" 
                    onClick={() => setFormData(prev => ({ 
                      ...prev, 
                      skills_needed: prev.skills_needed.filter(s => s !== skill) 
                    }))}
                  />
                </Badge>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Commitment Level</Label>
              <Select
                value={formData.commitment_level}
                onValueChange={(value) => setFormData(prev => ({ ...prev, commitment_level: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="part_time">Part Time</SelectItem>
                  <SelectItem value="full_time">Full Time</SelectItem>
                  <SelectItem value="weekends_only">Weekends Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Investment Range</Label>
              <Select
                value={formData.investment_range}
                onValueChange={(value) => setFormData(prev => ({ ...prev, investment_range: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0-1k">$0 - $1K</SelectItem>
                  <SelectItem value="1k-10k">$1K - $10K</SelectItem>
                  <SelectItem value="10k-50k">$10K - $50K</SelectItem>
                  <SelectItem value="50k+">$50K+</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label>Timeline</Label>
              <Select
                value={formData.timeline}
                onValueChange={(value) => setFormData(prev => ({ ...prev, timeline: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="immediate">Immediate</SelectItem>
                  <SelectItem value="1_month">1 Month</SelectItem>
                  <SelectItem value="3_months">3 Months</SelectItem>
                  <SelectItem value="6_months">6 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="bg-orange-600 hover:bg-orange-700"
            >
              {isSubmitting ? "Creating..." : "Find Business Partner"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}