const mongoose = require("mongoose");
const express = require("express");
const Teacher = require("./models/teacher");
const app = express();
const bodyParser = require("body-parser");
const scheduler = require("./scheduler");

// app.use(express.urlencoded({extended: true}));
// app.use(methodOverride("_method"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

async function main(){
    mongoose.connect("mongodb+srv://sheth-saniya:sheth9970@cluster0.lnp7zp3.mongodb.net/");
}

main().then(()=>{
    console.log("successful connection with db");
}).catch((err)=>{
    console.log(err);
});


app.get("/",(req,res) => {
    res.send("hello!");
});

app.get("/supervision",() => {
    //render dashboard
});

app.get("/teachers",async (req,res) => {
    //render teachers
    const teachers = await Teacher.find();
    // let jsonData = JSON.stringify(teachers);
    res.json(teachers);
});

app.get("/teachers/:id",async (req,res) => {
    console.log(req.params);
    const {id} = req.params;
    const teacher = await Teacher.findById(id);
    res.json(teacher);
});

app.get("/teachers/new",(req,res) => {
    //render form
});

app.post("/teachers/new",async (req,res) => {
    //  form -> get teacher info
    // insert in db

    const {name,designation,joiningDate,teachTo} = req.body;
    let newTeacher = new Teacher({
        name: name,
        designation: designation,
        joiningDate: joiningDate,
        teachTo: teachTo,
    });
    console.log(newTeacher);
    await newTeacher.save();
    res.json(newTeacher);
    // await Teacher.insertOne()
});

app.get("/teachers/edit",(req,res) => {
    //render form

});

app.post("/teachers/edit/:id",async(req,res) => {
    //update in db
    const {id} = req.params;
    const {name,designation,joiningDate,teachTo} = req.body;
    let updatedTeacher = {
        name: name,
        designation: designation,
        joiningDate: joiningDate,
        teachTo: teachTo
    }
    let teacher = await Teacher.findByIdAndUpdate(id,{...updatedTeacher});
    res.json(teacher);
})

app.get("/teachers/delete",() => {
    // render delete info
})

app.delete("/teachers/delete/:id",async(req,res) => {
    //delete from db
    // const {id} = req.params;
    // let deletedTeacher = await Teacher.findByIdAndDelete(id);
    // res.json(deletedTeacher);
    await Teacher.deleteMany({})
});

app.delete("/teachers/delete/",async(req,res) => {
    await Teacher.deleteMany({})
    res.send("done")
});

app.get("/supervision/new",(req,res) => {


})

app.post("/supervision/new",(req,res) => {
    //  form -> get total requirement , exam type
     // call suitable func based on exam type
})

app.get("/schedule",async (req,res) => {
    let sechedule =   await scheduler();
    res.json(sechedule);
});


app.listen(8080,() => {
    console.log("http://localhost:8080");
})