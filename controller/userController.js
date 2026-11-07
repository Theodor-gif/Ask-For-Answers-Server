import { pool } from "../db/connection.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const allUsers = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM users");
    console.log(data);
    if (data.rowCount === 0) {
      return res.status(404).json({ message: "Not data found" });
    }
    res.status(200).json({ message: "Data found", users: data.rows });
  } catch (error) {
    res.status(500).json({ message: "Failed server", error });
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    const data = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!first_name || !last_name || !age || !email || !password) {
      return res.status(401).json({ message: "Provide all the fields please" });
    }
    if (data.rowCount > 0 && data.rows[0].email === email) {
      return res.status(409).json({ message: "The user already exists" });
    }
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Provide a valid email please" });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(400)
        .json({ message: "Provide a valid password please" });
    }
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const userAdd = await pool.query(
      "INSERT INTO users(first_name, last_name, age, email, password) VALUES ($1, $2, $3, $4, $5) RETURNING first_name, last_name, age, email, password",
      [first_name.trim(), last_name.trim(), age, email.trim(), hashPassword],
    );
    res.status(201).json({ message: "User created" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const changeUser = async (req, res) => {
  try {
    const { first_name, last_name, age, email, password } = req.body;
    const id = req.user.id;
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (userFound.rowCount === 0) {
      return res.status(400).json({ message: "The user does not exists" });
    }
    if (!first_name || !last_name || !age || !email || !password) {
      return res.status(401).json({ message: "Provide all the fields please" });
    }
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    const passwordRegex =
      /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/;
    if (!emailRegex.test(email)) {
      return res.status(401).json({ message: "Provide a valid email please" });
    }
    if (!passwordRegex.test(password)) {
      return res
        .status(401)
        .json({ message: "Provide a valid password please" });
    }
    let passwordHash = null;
    const passwordCheck = await bcrypt.compare(
      password,
      userFound.rows[0].password,
    );
    passwordHash = passwordCheck ? null : await bcrypt.hash(password, 10);
    const data = await pool.query(
      "UPDATE users SET first_name = $1, last_name = $2, age = $3, email = $4, password = COALESCE($5 , password) WHERE id = $6 RETURNING first_name, last_name, age, email",
      [
        first_name.trim(),
        last_name.trim(),
        age,
        email.trim(),
        passwordHash,
        id,
      ],
    );
    res.status(201).json({ message: "User updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.user.id;
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (userFound.rowCount === 0) {
      return res.status(409).json({ message: "The user does not exists" });
    }
    const userDelete = await pool.query(
      "DELETE FROM users WHERE id = $1 RETURNING first_name, last_name, age, email",
      [id],
    );
    res.status(200).json({ message: "The user does not exists any more" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const logUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(409).json({ message: "Provide all the fields please" });
    }
    const userFound = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userFound.rowCount === 0) {
      return res.status(401).json({ message: "User does not exists" });
    }
    const passwordCheck = await bcrypt.compare(
      password,
      userFound.rows[0].password,
    );
    if (!passwordCheck) {
      return res.status(409).json({ message: "Password incorrect" });
    }
    const token = jwt.sign(
      {
        first_name: userFound.rows[0].first_name.trim(),
        last_name: userFound.rows[0].last_name.trim(),
        age: userFound.rows[0].age,
        email: userFound.rows[0].email.trim(),
        id: userFound.rows[0].id,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { algorithm: "HS256", expiresIn: "1h" },
    );
    res.status(200).json({
      message: "Logged in succesfully",
      token,
      user: [
        userFound.rows[0].first_name,
        userFound.rows[0].last_name,
        userFound.rows[0].age,
        userFound.rows[0].email,
      ],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};
