// Mock SocialRequest entity for demo purposes
export class SocialRequest {
  static async create(data) {
    console.log("Creating social request:", data)
    return { 
      id: Date.now(), 
      ...data, 
      status: "active",
      created_date: new Date().toISOString()
    }
  }

  static async list(orderBy = "-created_date") {
    return [
      {
        id: 1,
        activity_type: "coffee",
        preferred_date: "2024-01-20",
        preferred_time: "afternoon",
        location: "Central Park Coffee",
        group_size: 2,
        budget_range: "moderate",
        companion_preference: "similar_age",
        gender_preference: "any",
        activity_details: "Looking for someone to chat about books and life",
        status: "active",
        created_date: "2024-01-16T13:20:00Z"
      }
    ]
  }
}
