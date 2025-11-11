// Mock User entity for demo purposes
// In a real app, this would connect to your backend API

export class User {
  static async me() {
    // Mock user data
    return {
      id: 1,
      full_name: "sunil pal",
      email: "user@example.com",
      age: 25,
      location: "Sonpur Mela, Bihar",
      occupation: "Dillusional Comedian",
      personality_type: "extrovert",
      bio: "Passionate comedian who loves to meet and eritate new people.",
      interests: ["samay raina", "standup", "shit talk", "joke"],
      profile_photo: null
    }
  }

  static async updateMyUserData(data) {
    // Mock update - in real app, this would make API call
    console.log("Updating user data:", data)
    return { success: true }
  }
}
