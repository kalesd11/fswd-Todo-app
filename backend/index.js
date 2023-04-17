const express = require('express')
const bodyParser = require('body-parser')
const {MongoClient,ObjectId} = require('mongodb')
const cors = require('cors')
const app = express()
app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

const PORT = 8083
const connection = "mongodb://127.0.0.1:27017/"
const client = new MongoClient(connection,{useNewUrlParser:true,useUnifiedTopology:true})
// let db = client.db("crud")
let db;

app.get("/",async (req,res)=>{
    let data = await db.collection("todos").find().toArray()
    res.send(data)
})
app.get("/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id)
    let data = await db.collection("todos").find({_id:id}).toArray()
    res.send(data)
})

app.post("/addTodo",async (req,res)=>{
    let data = await db.collection("todos").insertOne(req.body)
    res.send(data)
})

app.put("/update/:id",async (req,res)=>{
let id = new ObjectId(req.params.id)
let data = await db.collection("todos").updateOne({_id:id},
    {$set:{
        todo_description: req.body.todo_description,
        todo_responsible: req.body.todo_responsible,
        todo_priority: req.body.todo_priority,
        todo_completed: req.body.todo_completed
    }}
    )
    res.send(data)
})

app.delete("/deleteTodo/:id",async (req,res)=>{
    const id = new ObjectId(req.params.id)
    let data = await db.collection("todos").deleteOne({_id:id})
    res.send(data)
})
const mongoServer = async ()=>{
   const dbClient =  await client.connect()
   db = dbClient.db("crud")
    console.log("Connection Established")
 
 }
mongoServer().then(res=>{
    app.listen(PORT,(req,res)=>{
        console.log("Server Runing")
    })
})



// MongoClient.connect(connection,{useNewUrlParser:true,useUnifiedTopology:true},(err,client)=>{
//     dbClient = client.db("todo")
//     console.log("Connection Established")
//     app.listen(PORT, (req, res) => {
//         console.log(`app is running on port ${PORT}`);
//       });
// })