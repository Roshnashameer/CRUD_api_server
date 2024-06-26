const users = require("../models/userModel")
const jwt = require('jsonwebtoken');

// user creation
exports.create = async (req, res) => {
    const { userName, email, password } = req.body;

    try {
        // throw new Error("My error")
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(400).json("User alr.");
        } else {
            const newUser = new users({
                userName, email, password
            });

            await newUser.save();
            return res.status(200).json(newUser);
        }
    } catch (err) {
        return res.status(500).json(`Create API failed: ${err}`);
    }
};
// get all users
exports.getAll = async (req, res) => {

    const allUsers = await users.find()
    res.status(200).json(allUsers)

}
// get specified user
exports.getUser = async (req, res) => {
    const { _id } = req.params;
    try {
        const userArray = await users.find({ _id })
        if (userArray && userArray.length > 0) {
            res.status(200).json(userArray);
        } else {
            res.status(404).json("No users ");
        }

    }
    catch (err) {
        return res.status(401).json(`User get API failed: ${err}`);
    }

}
// Edit user
exports.edit = async (req, res) => {
    const { userName, email } = req.body
    const { _id } = req.params

    try {
        const selectedUser = await users.findOne({ _id });

        if (selectedUser) {
            selectedUser.userName = userName;
            selectedUser.email = email;


            await selectedUser.save();
            return res.status(200).json(selectedUser);
        } else {
            return res.status(404).json(`${userName} not found`);
        }
    } catch (err) {
        return res.status(500).json(`Edit  API failed: ${err}`);
    }


}
// delete user
exports.delete = async (req, res) => {
    const { _id } = req.params
    try {
        const response = await users.deleteOne({ _id })
        if (response) {
            res.status(200).json("User deleted")
        }

    }
    catch (err) {
        return res.status(401).json(` Delete API failed: ${err}`);
    }

}

//login
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const existUser = await users.findOne({ email, password });

        if (existUser) {
            const token = jwt.sign({ _id: existUser._id }, "supersecretkey123");
            // console.log(token);

            return res.status(200).json({
                user: existUser,
                token
            });
            // return res.status(200).json("Login sucessfully")
        } else {
            return res.status(404).json("Incorrect email and password");
        }
    } catch (err) {
        return res.status(500).json(`Login API failed: ${err}`);
    }
};

exports.getAuthUser = async (req, res) => {

   
     try {
        
        const id=req.payload
        const user = await users.findById(id);
        res.send(user);
        // console.log(user)

    } catch (error) {
        console.log(error);
        res.send("An error occured");
    }
    
 
};
