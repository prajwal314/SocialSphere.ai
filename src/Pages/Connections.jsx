import React, { useState, useEffect } from "react";
import { TravelRequest } from "@/entities/TravelRequest";
import { RoommateRequest } from "@/entities/RoommateRequest";
import { BusinessRequest } from "@/entities/BusinessRequest";
import { DateRequest } from "@/entities/DateRequest";
import { SocialRequest } from "@/entities/SocialRequest";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plane, Home, Briefcase, Heart, Users, MessageCircle, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

export default function Connections() {
  const [travelRequests, setTravelRequests] = useState([]);
  const [roommateRequests, setRoommateRequests] = useState([]);
  const [businessRequests, setBusinessRequests] = useState([]);
  const [dateRequests, setDateRequests] = useState([]);
  const [socialRequests, setSocialRequests] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadAllRequests();
  }, []);

  const loadAllRequests = async () => {
    try {
      const [travel, roommate, business, dating, social] = await Promise.all([
        TravelRequest.list("-created_date"),
        RoommateRequest.list("-created_date"),
        BusinessRequest.list("-created_date"),
        DateRequest.list("-created_date"),
        SocialRequest.list("-created_date")
      ]);
      
      setTravelRequests(travel);
      setRoommateRequests(roommate);
      setBusinessRequests(business);
      setDateRequests(dating);
      setSocialRequests(social);
    } catch (error) {
      console.error("Error loading requests:", error);
    }
    setIsLoading(false);
  };

  const RequestCard = ({ request, type, icon: Icon, color }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="flex items-center gap-2">
            <Icon className={`w-5 h-5 ${color}`} />
            <Badge variant="outline" className={`${color.replace('text-', 'bg-').replace('600', '100')} border-0`}>
              {request.status}
            </Badge>
          </div>
          <span className="text-sm text-gray-500">
            {format(new Date(request.created_date), "MMM d")}
          </span>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {type === 'travel' && (
              <>
                <h3 className="font-semibold">{request.destination}</h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(request.start_date), "MMM d")} - {format(new Date(request.end_date), "MMM d")}
                </p>
                <p className="text-sm text-gray-600">
                  Budget: ${request.budget_min} - ${request.budget_max}
                </p>
              </>
            )}
            
            {type === 'roommate' && (
              <>
                <h3 className="font-semibold">Looking for Roommate</h3>
                <p className="text-sm text-gray-600">
                  Budget: ${request.budget_min} - ${request.budget_max}/month
                </p>
                <p className="text-sm text-gray-600">
                  {request.preferred_locations?.join(", ") || "Location flexible"}
                </p>
              </>
            )}
            
            {type === 'business' && (
              <>
                <h3 className="font-semibold">{request.business_type?.replace(/_/g, ' ')}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">{request.business_idea}</p>
                <p className="text-sm text-gray-600">
                  Stage: {request.business_stage} • {request.commitment_level?.replace(/_/g, ' ')}
                </p>
              </>
            )}
            
            {type === 'date' && (
              <>
                <h3 className="font-semibold">Looking for {request.relationship_type}</h3>
                <p className="text-sm text-gray-600">
                  Age: {request.age_min} - {request.age_max}
                </p>
                <p className="text-sm text-gray-600">
                  Activity: {request.date_activity}
                </p>
              </>
            )}
            
            {type === 'social' && (
              <>
                <h3 className="font-semibold">{request.activity_type?.replace(/_/g, ' ')}</h3>
                <p className="text-sm text-gray-600">
                  {format(new Date(request.preferred_date), "MMM d")} at {request.preferred_time}
                </p>
                <p className="text-sm text-gray-600">{request.location}</p>
              </>
            )}
          </div>
          
          <div className="flex gap-2 mt-4">
            <Button variant="outline" size="sm" className="flex-1">
              <Eye className="w-4 h-4 mr-1" />
              View Details
            </Button>
            <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
              <MessageCircle className="w-4 h-4 mr-1" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Connections</h1>
          <p className="text-gray-600">View and manage your connection requests and matches</p>
        </div>

        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-6 mb-6">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              All
            </TabsTrigger>
            <TabsTrigger value="travel" className="flex items-center gap-2">
              <Plane className="w-4 h-4" />
              Travel
            </TabsTrigger>
            <TabsTrigger value="roommate" className="flex items-center gap-2">
              <Home className="w-4 h-4" />
              Roommate
            </TabsTrigger>
            <TabsTrigger value="business" className="flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Business
            </TabsTrigger>
            <TabsTrigger value="dating" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Dating
            </TabsTrigger>
            <TabsTrigger value="social" className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              Social
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelRequests.slice(0, 2).map(request => (
                <RequestCard key={request.id} request={request} type="travel" icon={Plane} color="text-blue-600" />
              ))}
              {roommateRequests.slice(0, 2).map(request => (
                <RequestCard key={request.id} request={request} type="roommate" icon={Home} color="text-green-600" />
              ))}
              {businessRequests.slice(0, 2).map(request => (
                <RequestCard key={request.id} request={request} type="business" icon={Briefcase} color="text-orange-600" />
              ))}
              {dateRequests.slice(0, 2).map(request => (
                <RequestCard key={request.id} request={request} type="date" icon={Heart} color="text-pink-600" />
              ))}
              {socialRequests.slice(0, 2).map(request => (
                <RequestCard key={request.id} request={request} type="social" icon={Users} color="text-purple-600" />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="travel">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {travelRequests.map(request => (
                <RequestCard key={request.id} request={request} type="travel" icon={Plane} color="text-blue-600" />
              ))}
              {travelRequests.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No travel requests yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="roommate">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {roommateRequests.map(request => (
                <RequestCard key={request.id} request={request} type="roommate" icon={Home} color="text-green-600" />
              ))}
              {roommateRequests.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No roommate requests yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="business">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {businessRequests.map(request => (
                <RequestCard key={request.id} request={request} type="business" icon={Briefcase} color="text-orange-600" />
              ))}
              {businessRequests.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No business requests yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="dating">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {dateRequests.map(request => (
                <RequestCard key={request.id} request={request} type="date" icon={Heart} color="text-pink-600" />
              ))}
              {dateRequests.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No dating requests yet</p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="social">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {socialRequests.map(request => (
                <RequestCard key={request.id} request={request} type="social" icon={Users} color="text-purple-600" />
              ))}
              {socialRequests.length === 0 && (
                <p className="text-gray-500 text-center col-span-full">No social requests yet</p>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}