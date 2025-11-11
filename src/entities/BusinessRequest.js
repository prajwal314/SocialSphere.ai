// Mock BusinessRequest entity for demo purposes
export class BusinessRequest {
  static async create(data) {
    console.log("Creating business request:", data)
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
        business_type: "tech_startup",
        business_idea: "AI-powered fitness app that creates personalized workout plans",
        skills_i_bring: ["Frontend Development", "UI/UX Design"],
        skills_needed: ["Backend Development", "Machine Learning"],
        commitment_level: "full_time",
        business_stage: "idea",
        investment_range: "0-1k",
        timeline: "3_months",
        status: "active",
        created_date: "2024-01-08T16:45:00Z"
      }
    ]
  }
}
