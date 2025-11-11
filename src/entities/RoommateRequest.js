// Mock RoommateRequest entity for demo purposes
export class RoommateRequest {
  static async create(data) {
    console.log("Creating roommate request:", data)
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
        budget_min: 1200,
        budget_max: 1800,
        preferred_locations: ["katraj", "swargate"],
        preferred_gender: "any",
        work_schedule: "9-5",
        cleanliness_level: "clean",
        lifestyle: "quiet",
        move_in_date: "2024-02-01",
        lease_duration: "1_year",
        pets: false,
        smoking: false,
        status: "active",
        created_date: "2024-01-12T09:15:00Z"
      }
    ]
  }
}
