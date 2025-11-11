// Mock TravelRequest entity for demo purposes
// In a real app, this would connect to your backend API

export class TravelRequest {
  static async create(data) {
    // Mock create - in real app, this would make API call
    console.log("Creating travel request:", data)
    return { 
      id: Date.now(), 
      ...data, 
      status: "active",
      created_date: new Date().toISOString()
    }
  }

  static async list(orderBy = "-created_date") {
    // Mock data - in real app, this would fetch from API
    return [
      {
        id: 1,
        destination: "Tokyo, Japan",
        start_date: "2024-03-15",
        end_date: "2024-03-22",
        budget_min: 1500,
        budget_max: 2500,
        preferred_gender: "any",
        travel_style: "comfortable",
        interests: ["culture", "food", "temples"],
        group_size: 2,
        status: "active",
        created_date: "2024-01-15T10:30:00Z"
      },
      {
        id: 2,
        destination: "Bali, Indonesia",
        start_date: "2024-04-10",
        end_date: "2024-04-17",
        budget_min: 800,
        budget_max: 1200,
        preferred_gender: "any",
        travel_style: "budget",
        interests: ["beaches", "yoga", "nature"],
        group_size: 1,
        status: "active",
        created_date: "2024-01-10T14:20:00Z"
      }
    ]
  }
}
