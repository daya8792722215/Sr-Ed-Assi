const express = require('express')
const mongoose= require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todu')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/ToDo')

app.post('/add', (req, resp) =>{
    const task = req.body.task;
    TodoModel.create({
        task: task
    }).then(result => res.json(result))
    .catch(err  =>  resp.json(err))

})

app.put('/update/:id', (req, resp) => {
    const { id } = req.params;
    TodoModel.findByIdAndUpdate({_id: id}, {done: true})
    .then(result => resp.json(result))
    .catch(err => resp.json(err))
});

app.delete('/delete/:id',(req, resp)=>{
    const { id } = req.params;
    TodoModel.findByIdAndDelete({_id: id})
    .then(result => resp.json(result))
    .catch(err => resp.json(err))

})
app.get('/get',(req, resp) => {
    TodoModel.find()
    .then(result => resp.json(result))
    .catch(err => resp.json(err))
})


// app.put('/update/:id', (req, resp) => {
//     const {id} = req.params;
//     console.log(id);
// });




app.listen(3001, ()=>{
    console.log("Server is Running")
})