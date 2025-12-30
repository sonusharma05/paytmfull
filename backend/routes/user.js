const express = require("express");
const zod = require("zod");
const { User, Account } = require("../db");
const router = express.Router();
const mongoose = require("mongoose");
const {JWT_SECERT} = require("../config");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware");

const userSchema = zod.object({
    userName:zod.string(),
    firstName :zod.string(),
    lastName :zod.string(),
    password:zod.string() 
})

    
router.post("/signup", async (req, res) => {
    const { success } = userSchema.safeParse(req.body)
    if (!success) {
        return res.status(411).json({
            message: "Email already taken / Incorrect inputs"
        })
    }

    const existingUser = await User.findOne({
        userName: req.body.userName
    })

    if (existingUser) {
        return res.status(411).json({
            message: "Email already taken/Incorrect inputs"
        })
    }

    const user = await User.create({
        userName: req.body.userName,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
    })
    const userId = user._id;

		/// ----- Create new account ------

    await Account.create({
        userId,
        balance: 1 + Math.random() * 10000
    })

		/// -----  ------

    const token = jwt.sign({
        userId
    }, JWT_SECERT);

    res.json({
        message: "User created successfully",
        token: token
    })
})

const signinSchema = zod.object({
    userName: zod.string(),
    password: zod.string(),
});

router.post("/signin", async (req, res) => {
    const body = req.body;
    const { success } = signinSchema.safeParse(body);

    if (!success) {
        return res.status(411).json({
            message: "Error while logging in"
        });
    }

    const user = await User.findOne({
        userName: body.userName,
        password: body.password,
    });

    if (!user) {
        return res.status(411).json({
            message: "Invalid credentials"
        });
    }

    const token = jwt.sign({
        userId: user._id   // ✅ FIXED
    }, JWT_SECERT);

    res.json({ token });
});

const updateBody = zod.object({
    password:zod.string().optional(),
    firstName:zod.string().optional(),
    lastName:zod.string().optional()
})
router.put("/",authMiddleware,async(req,res)=>{
    const body = req.body;
    const {success} = updateBody.safeParse(body);
    if(!success){
        return res.status(411).json({
            message:"password too small"
        })
    }
     await User.updateOne({
        _id:req.userId
    },req.body);

    res.json({
        message:"updated sucessfully"
    })


})
router.get("/bulk", async (req, res) => {
    const filter = req.query.filter || "";

    const users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter
            }
        }, {
            lastName: {
                "$regex": filter
            }
        }]
    })

    res.json({
        user: users.map(user => ({
            userName: user.userName,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})


module.exports=router;