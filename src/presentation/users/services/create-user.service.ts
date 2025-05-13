import { User } from "../../../data";

export class CreatorUserService {
  async execute(data: any) {
    const user = new User();
    user.name = data.name;
    user.email = data.email;
    user.password = data.password; // Asegúrate de hashearla si es necesario
    user.role = data.role || "user";

    try {
      await user.save();
      return {
        message: "User created successfully",
      };
    } catch (error) {
      console.error("Error creating user:", error);
      throw new Error("Failed to create user");
    }
  }
}
