const express=require('express')
const UserModel=require('../models/Users')
const router=express.Router();

router.get('/',async(req,res)=>{
    try{
        const users=await UserModel.find();
        res.send(users);
    }
    catch{
        console.log("Error while getting values from db")
    }
})

router.get('/getUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const requiredUser = await UserModel.findById(id);
        console.log("The required User is: ", requiredUser);
        if (!requiredUser) {
            return res.status(404).json({ error: "User not found" });
        }
        res.json(requiredUser); // Send the fetched user back to the client
    } catch (error) {
        console.log("Error while getting user with id:", req.params.id);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.put('/updateUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body; // Update data from request body
        const updatedUser = await UserModel.findByIdAndUpdate(id, updateData, { new: true }); // { new: true } option returns the updated document
        
        if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
        }
        
        console.log("user updated to: ",updatedUser)
        res.json(updatedUser); // Send the updated user back to the client
    } catch (error) {
        console.error("Error while updating user:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});


router.post('/createUser',async(req,res)=>{
    // UserModel.create(req.body)
    // .then(users=>res.json(users))
    // .catch(err=>res.json(err))

    try{
        const user=new UserModel({
            name: req.body.name,
            email: req.body.email,
            age:req.body.age
        })

        await user.save();
        console.log("Saved a new user : ",user);
        res.send(user)
    }
    catch{
        console.log("Error while adding a new user");
    }
})

router.delete('/deleteUser/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const requiredUser = await UserModel.findByIdAndDelete(id);
    
        if (!requiredUser) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("user deleted to: ",requiredUser)
        res.json(requiredUser); // Send the fetched user back to the client
    } catch (error) {
        console.log("Error while getting user with id:", req.params.id);
        res.status(500).json({ error: "Internal server error" });
    }
});

module.exports=router