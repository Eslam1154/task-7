 
//   const  mongoose = require ('mongoose')

//   mongoose.connect('mongodb://127.0.0.1:27017/lec-10')


//   const Car = mongoose.model('Car' , { type : String })

//   const car1 = new Car ({type : "audi"})

//   car1.save()
//   .then(() => console.log('car added'))

//   ////////////////////////////////////////////////////////////////////
    //  app.get ('/' , (req,res) => {
    //     res.send("islam mohamed")
    //  })


//////////////////////////////////////////////////////////////////////

// const jwt = require("jsonwebtoken")
// const mytoken = ()=>{
//     const token = jwt.sign({_id : "12345678"} , "islam500")
//     console.log(token)

//     const tokenverify= jwt.verify(token , "islam500")
//     console.log(tokenverify)
// }

// mytoken()
/////////////////////////////////////////////////////////////////////

const express = require ('express')

const app = express()

const port = process.env.PORT || 3000


require('./db/mongoose')

// to parse automatically

app.use(express.json())

const userRouter = require("./routers/user")

app.use(userRouter)


app.listen( port , () => {console.log("All Done Successfully")})






