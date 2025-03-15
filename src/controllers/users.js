import User from "../models/User.js";
import ExtendedError from "../utils/ExtendedError.js";

export const registerUser = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;

		const existingUser = await User.findOne({ where: { email } });
		if (existingUser) {
			throw new ExtendedError(400, "User with this email already exists");
		}

		const user = await User.create({ name, email, password });

		res.status(201).json({ message: "User registered successfully", user });
	} catch (error) {
		next(error);
	}
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user || user.password !== password) {
      throw new ExtendedError(401, "Invalid email or password");
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    next(error); 
  }
};

export const getAllUsers = async (req, res, next) => {
    try {
      const users = await User.findAll();
  
      res.json({ message: "Users retrieved successfully", users });
    } catch (error) {
      next(error);
    }
  };

