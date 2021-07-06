const likeModel = require("../models/Likes");

class LikeDao {
  constructor() {}

  addNew(obj) {
    return new Promise((resolve, reject) => {
      let like = new likeModel(obj);
      like.save((err, savedLike) => {
        if (err) {
          reject(err);
        }
        resolve(savedLike);
      });
    });
  }

  getAll() {
    return new Promise((resolve, reject) => {
      likeModel.find({}, (err, allLikes) => {
        if (err) {
          reject(err);
        }
        resolve(allLikes);
      });
    });
  }

  del(id) {
    return new Promise((resolve, reject) => {
      likeModel.findByIdAndRemove(id, (err, result) => {
        if (err) {
          reject(err);
        }
        resolve("Like Deleted Successfully!");
      });
    });
  }
}

module.exports = new LikeDao();
