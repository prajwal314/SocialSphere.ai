// Mock DateRequest entity for demo purposes
export class DateRequest {
  static async create(data) {
    console.log("Creating date request:", data)
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
        age_min: 22,
        age_max: 30,
        preferred_gender: "any",
        relationship_type: "dating",
        interests: ["music", "art", "coffee"],
        location_preference: "Manhattan",
        date_activity: "coffee",
        personality_preference: "balanced",
        status: "active",
        created_date: "2024-01-14T11:30:00Z"
      }
    ]
  }
}
