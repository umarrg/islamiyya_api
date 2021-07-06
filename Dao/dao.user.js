const UserModel = require('../models/User');

class UserDao {
    constructor() { }

    addNew(obj) {
        return new Promise((resolve, reject) => {
            let newUser = new UserModel(obj);
            newUser.save((err, savedUser) => {
                if (err) {
                    reject(err);
                }
                savedUser.password = '************';// masked password field
                resolve(savedUser);
            });
        });
    }

    getOne(id) {
        return new Promise((resolve, reject) => {
            UserModel.findById(id, { password: 0 }, (err, singleUser) => { //exclude password
                if (err) {
                    reject(err);
                }
                resolve(singleUser);
            });
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            UserModel.find({}, { password: 0 }, (err, usersArray) => { //exclude password
                if (err) {
                    reject(err);
                }
                resolve(usersArray);
            });
        });
    }

    getOneByEmail(email) {
        return new Promise((resolve, reject) => {
            UserModel.findOne({ email }, (err, singleUser) => { //password included here
                if (err) {
                    reject(err);
                }
                resolve(singleUser);
            });
        });
    }

    update(password, username, email, name, db,) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndUpdate(id, { $set: { password, username, email, name, db} }, { new: true }, (err, result) => {
                if (err) {
                    reject(err);
                }
                result.password = '***********'; //masked password field
                resolve(result);
            });
        });
    }

    del(id) {
        return new Promise((resolve, reject) => {
            UserModel.findByIdAndDelete(id, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve('User Deleted Successfully!');
            });
        });
    }
    delAll() {
        return new Promise((resolve, reject) => {
            UserModel.deleteMany({}, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve('Users Deleted Successfully!');
            });
        });
    }
}

module.exports = new UserDao();