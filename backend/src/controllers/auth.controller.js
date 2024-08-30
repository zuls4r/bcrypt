import { readJson, saveJson } from "../utils/index.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const users = await readJson("users.json");

    if (!users) {
      return res.status(500).json({ message: "Failed to load users" });
    }

    const user = users.find(
      (user) => user.email === email 
    );

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Error during login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    console.log(req.body);
    const users = await readJson("users.json");

    if (!users) {
      return res.status(500).json({ message: "Failed to load users" });
    }

    const existingUser = users.find((user) => user.email === email);

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = {
      name,
      email,
      password,
    };

    users.push(newUser);

    await saveJson("users.json", users); 

    return res.status(201).json({newUser, message: "success"});
  } catch (error) {
    console.error("Error during registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
