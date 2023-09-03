
const express = require ('express')
const User = require('../moduels/user')
const auth = require('../middleware/auth')
const router = express.Router()

// const Task = require('../models/task')
// const { findByIdAndDelete } = require('../models/user')

router.post ('/users' , (req , res) => {
    console.log(req.body)

    const user = new User (req.body)

    user.save()
    .then ((user) => {res.status(200).send(user)})
    .catch((e)=>{ res.status(400).send(e)})
})

// get

router.get ('/users',auth , (req , res) => {
     User.find({}).then ((users) =>{
        res.status(200).send(users)

    }).catch((e)=>{
        res.status(500).send(e)
    })
})
////////////////////////////////////////

router.get('/users/:id',auth , (req , res)=>{
    // console.log(req.params.id)
    const _id = req.params.id
    User.findById(_id).then((user)=>{

        if(!user){
          return res.status(404).send("unable to find user")
        }
        res.status(200).send(user)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})
///////////////////////////////////////
router.patch('/users/:id' ,auth, async(req,res)=> {
    try{
        const updates = Object.keys(req.body)  
        const _id = req.params.id


        // const user = await User.findByIdAndUpdate (_id, req.body , {
        // new: true ,//  appear upadate after update
        // runValidators : true
        // })

        const user = await User.findById(_id)

        if(!user){
            return res.status(404).send('No User Founded')
        }
        updates.forEach((ele)=>(user[ele] = req.body[ele]))

        await user.save()

        res.status(200).send(user)
    } catch(error){
        res.status((400).send(error))

    }
})
///////////////////////////////////
router.delete ('/users/:id',auth , async (req , res) => {
    try{
        const _id = req.params.id
        const user = await User.findByIdAndDelete(_id)
        if(!user){
            return res.status(404).send("unable to find user")
        }
        res.status(200).send(user)
        console.log(user)
    } catch(e){
        res.status((400).send(e))

    }
})
/////////////////////////////////////////
// login : 
router.post('/login',async(req,res)=>{
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateToken()
        res.status(200).send({ user , token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})

//////////////////////////////////////
router.post ('/users',async(req , res )=>{

    try{
        const user = new User(req.body)
        const token = await user.generateToken()
        await user.save()
        res.status(200).send({user , token})
    }
    catch(e){
        res.status(400).send(e.message)
    }
})
/////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////
// Profile : 
router.get('/profile',auth,async(req,res)=>{
    res.status(200).send(req.user)
})
//////////////////////////////////////////////////////////////////////////////////////////

// logout :
router.delete('/logout',auth,async(req,res)=>{
    try{
        console.log(req.user)
        req.user.tokens = req.user.tokens.filter((el)=>{
            return el !== req.token
        })
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})
////////////////////////////////////////////////////////////////////////////////////////////
// logoutall :

router.delete('/logoutAll',auth,async(req,res)=>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send(e)
    }
})
////////////////////////////////////////////////////////////////////////////////////////////

module.exports = router 
