import User from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

export const registerUser = async (req, res) => {
  let { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields." });
  }

  name = name.trim();
  email = email.trim();

  // Validate name: letters and spaces only
  const nameRegex = /^[A-Za-z\s]+$/;
  if (!nameRegex.test(name)) {
    return res
      .status(400)
      .json({ error: "Name can only contain letters and spaces" });
  }

  // Validate email format
  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  // Password validation (at least 6 characters, contains at least one letter and one number)
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/;
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      error:
        "Password must be at least 6 characters long and contain at least one letter and one number",
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ error: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Registration failed", details: err.message });
  }
};

export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  if (!validator.isEmail(email)) {
    return res.status(400).json({ error: "Invalid email format" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: "Email doesnt exist." });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
        name: user.name,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      path: "/",
    });

    res.json({ message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ error: "Login failed", details: err.message });
  }
};

export const editWeight = async (req, res) => {
  const { userId } = req.params;
  const { weightKg } = req.body;

  if (typeof weightKg !== "number" || weightKg < 0) {
    return res.status(400).json({ message: "Invalid weight value." });
  }

  try {
    const user = await User.findByIdAndUpdate(
      userId,
      { weightKg },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "Weight updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
