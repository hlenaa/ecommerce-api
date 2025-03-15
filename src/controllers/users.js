import Users from "../models/Users.js";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });
    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user || user.password !== password) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
};