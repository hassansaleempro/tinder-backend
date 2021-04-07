import express from 'express'
import mongoose from 'mongoose'
import cards from './cards.js'
import cors from 'cors'

//Hello World
// const cardSchema =  mongoose.Schema({
//     name: String,
//     imgUrl: String
// })

// var cardss =  mongoose.model("cards", cardSchema)

//App Config
const app = express()
const port = process.env.port || 8001
const connection_url = 'mongodb+srv://admin:W5NjfO7Dr4niuWE5@cluster0.1u5vj.mongodb.net/tinderdb?retryWrites=true&w=majority'


//Middlewares
app.use(express.json())
app.use(cors())

//DB Config 
mongoose.connect(connection_url,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

console.log(mongoose.connection.readyState);

//Api End Point 
app.get('/',(req,res) => res.status(200).send('Hello Clever Programmers!!!! '+mongoose.connection.readyState))

app.post('/tinder/cards',(req,res) => {
    const dbCard =  req.body  
    
    cards.create(dbCard,(err,data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            console.log("data; "+data)
            res.status(201).send(data)
        }
    })
})

app.get('/tinder/cards',(req,res) => {
    
    cards.find((err,data) =>{
        if(err){
            res.status(500).send(err)
        }else{
            res.status(200).send(data)
        }
    })
})


//Listener
app.listen(port, () => console.log(`listening on local host: ${port}`))
