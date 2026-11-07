import { pool } from "../db/connection.js";

export const allPosts = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM posts");
    if (data.rowCount === 0) {
      return res.status(401).json({ message: "Not data found" });
    }
    res.status(200).json({ message: "Data found", posts: data.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const createPost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const id = req.user.id;
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    if (!title || !text) {
      return res.status(401).json({ message: "Provide all the fields please" });
    }
    if (userFound.rowCount === 0) {
      return res.status(401).json({
        message:
          "This user does not exists to create a post. Please register or log In to create a post",
      });
    }
    const addPost = await pool.query(
      "INSERT INTO posts(user_id, title, text) VALUES ($1, $2, $3) RETURNING title, text, created_at",
      [id, title, text],
    );
    res.status(201).json({ message: "The post succesfully uploaded" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const deletePost = async (req, res) => {
  try {
    const id = req.params.id;
    const idUser = req.user.id;
    console.log(idUser);
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      idUser,
    ]);
    const postFound = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    if (userFound.rowCount === 0) {
      return res.status(403).json({
        message: "The user does not exists and can not delete the post",
      });
    }
    if (postFound.rowCount === 0) {
      return res
        .status(404)
        .json({ message: "The post does not exists to delete it" });
    }
    if (postFound.rows[0].user_id !== userFound.rows[0].id) {
      return res.status(403).json({ message: "Not the author of this post" });
    }
    const dataPosts = await pool.query(
      "DELETE FROM posts WHERE id = $1 RETURNING title, text, created_at",
      [id],
    );
    res.status(200).json({ message: "The post succesfully deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const changePost = async (req, res) => {
  try {
    const { title, text } = req.body;
    const idPost = req.params.id;
    const id = req.user.id;
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      id,
    ]);
    const postFound = await pool.query("SELECT * FROM posts WHERE id = $1", [
      idPost,
    ]);
    if (postFound.rowCount === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (userFound.rowCount === 0) {
      return res
        .status(401)
        .json({ message: "The user does not exists to change the post" });
    }
    if (userFound.rows[0].id !== postFound.rows[0].user_id) {
      return res.status(403).json({ message: "Not the author of this post" });
    }
    const dataPost = await pool.query(
      "UPDATE posts SET title = $1, text = $2 WHERE id = $3 RETURNING id, title, text",
      [title, text, idPost],
    );
    res.status(201).json({ message: "The post updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};
