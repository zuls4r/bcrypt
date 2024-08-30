import { readJson } from "../utils/index.js";

export const getUsers = async (req, res) => {
    try {
      const users = await readJson("users.json");
    
      if (!users || users.length === 0) {
        return res.status(404).json({ message: "No users found" });
      }
    
      return res.status(200).json(users);
    } catch (error) {
      console.error("Error reading users.json:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  };