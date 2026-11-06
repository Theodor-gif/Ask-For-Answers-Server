import { pool } from "../db/connection.js";

export const allComments = async (req, res) => {
  try {
    const data = await pool.query("SELECT * FROM comments");
    if (data.rowCount === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    res.status(200).json({ message: "Data found", comments: data.rows });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const createComment = async (req, res) => {
  try {
    const id = req.params.id; // post_id
    const { idUser, text } = req.body; // text
    // req.user.id to take the user_id
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      idUser,
    ]);
    const postFound = await pool.query("SELECT * FROM posts WHERE id = $1", [
      id,
    ]);
    if (userFound.rowCount === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (postFound.rowCount === 0) {
      return res.status(404).json({ message: "Post does not exist" });
    }
    if (!text) {
      return res.status(401).json({ message: "Provide the text field please" });
    }
    const addPost = await pool.query(
      "INSERT INTO comments(user_id, post_id, text) VALUES ($1, $2, $3) RETURNING user_id, post_id, text, created_at",
      [idUser, id, text],
    );
    res.status(201).json({ message: "Comment added" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const id = req.params.id; // comment_id
    const { idUser } = req.body;
    // req.user.id to take the user_id
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      idUser,
    ]);
    const commentFound = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [id],
    );
    if (userFound.rowCount === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (commentFound.rowCount === 0) {
      return res.status(404).json({ message: "Comment does not exist" });
    }
    if (commentFound.rows[0].user_id !== userFound.rows[0].id) {
      return res
        .status(409)
        .json({ message: "Not the author of this comment" });
    }
    const commentData = await pool.query("DELETE FROM comments WHERE id = $1", [
      id,
    ]);
    res.status(200).json({ message: "Comment deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};

export const changeComment = async (req, res) => {
  try {
    const id = req.params.id; // comment_id
    const { idUser, text } = req.body;
    // req.user.id to take the user_id
    const userFound = await pool.query("SELECT * FROM users WHERE id = $1", [
      idUser,
    ]);
    const commentFound = await pool.query(
      "SELECT * FROM comments WHERE id = $1",
      [id],
    );
    if (userFound.rowCount === 0) {
      return res.status(404).json({ message: "User does not exist" });
    }
    if (commentFound.rowCount === 0) {
      return res.status(404).json({ message: "Comment does not exist" });
    }
    if (commentFound.rows[0].user_id !== userFound.rows[0].id) {
      return res
        .status(409)
        .json({ message: "Not the author of this comment" });
    }
    if (!text) {
      return res.status(401).json({ message: "Provide the text field please" });
    }
    const commentData = await pool.query(
      "UPDATE comments SET text = $1 WHERE id = $2 RETURNING id, user_id, post_id, text, created_at",
      [text, id],
    );
    res.status(201).json({ message: "Comment updated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Not connected to the server", error });
  }
};
