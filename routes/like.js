const express = require("express");
const likeDao = require("../Dao/dao.like");

module.exports = () => {
  const api = express.Router();

  api.post("/", async (req, res) => {
    try {
      const Like = await likeDao.addNew(req.body);
      res.status(200).json({
        status: "success",
        payload: Like,
        message: "Like added successfully!",
      });
    } catch (err) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  });

  api.get("/", async (req, res) => {
    try {
      const likes = await likeDao.getAll();
      res.status(200).json({
        status: "success",
        payload: likes,
        message: "All likes fetched successfully",
      });
    } catch (err) {
      res.status(500).json({ status: "failed", payload: null, message: err });
    }
  });

  api.delete("/:id", async (req, res) => {
    const id = req.params.id;
    if (id) {
      try {
        await likeDao.del(id);
        res.status(200).json({
          status: "success",
          payload: null,
          message: "Like Deleted Successfully!",
        });
      } catch (err) {
        res.status(500).json({ status: "failed", payload: null, message: err });
      }
    } else {
      res.status(500).json({
        status: "failure",
        payload: null,
        message: "Invalid Like id to Delete",
      });
    }
  });

  return api;
};
