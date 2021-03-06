const express = require("express");
const cors = require("cors");
const res = require("express/lib/response");

const app = express();

const users = []; 

const goals = []; 
let globalID = 0; 

app.use(cors());

app.use(express.json()); // When we want to be able to accept JSON.

app.get("/api/compliment", (req, res) => {
  const compliments = ["Gee, you're a smart cookie!",
    "Cool shirt!",
    "Your Javascript skills are stellar.",
  ];

  // choose random compliment
  let randomIndex = Math.floor(Math.random() * compliments.length);
  let randomCompliment = compliments[randomIndex];

  res.status(200).send(randomCompliment);
});

app.get("/api/fortune", (req, res) => {
  const fortunes = [
    "A beautiful, smart, and loving person will be coming into your life.",
    "A dubious friend may be an enemy in camouflage.",
    "A faithful friend is a strong defense.",
    "A feather in the hand is better than a bird in the air.",
    "A fresh start will put you on your way.", 
    "A friend asks only for your time not your money.", 
    "A good time to finish up old tasks.",
    "A lifetime friend shall soon be made.",
];
  // choose random compliment
  let randomIndexFortune = Math.floor(Math.random() * fortunes.length);
  let randomFortune = fortunes[randomIndexFortune];

  res.status(200).send(randomFortune);
});

app.post("/api/name", (req, res) => {
    console.log(req.body);
    console.log(req.params);
    console.log(req.query); 

    const {newName} = req.body; 

    users.push(newName); 
    res.status(200).send(users); 


});

app.delete("/api/delete/:index", (req, res) => {
  console.log(req.params); 

  if(+req.params.index) {
    users.splice(req.params.index, 1); 
    res.status(200).send(users); 
  } else {
    res.status(400).send("Dont have number. ")
    //console.log("Dont have a number.")
  }
});

app.put("/api/edit/:id", (req, res) => {
  console.log(req.params);
  console.log(req.body);

  const {nameChange} = req.body; 
  const editIndex = +req.params.id; 

  users[editIndex] = nameChange; 

  res.status(200).send(users); 
});


let id = 0
app.post("/api/goals", (req, res) => {
  let newGoal = {...req.body, id}
  newGoal.id = globalID; 
  goals.push(newGoal); 
  res.status(200).send(goals);
  globalID++;  
})

app.delete("/api/goals/:id", (req, res) => {
  let index = goals.findIndex(goal => goal.id === +req.params.id); 
  goals.splice(index, 1); 
  res.status(200).send(goals); 
});

app.put("/api/goals/:id", (req, res) => {
  let {id} = req.params; 
  let body= req.body; 
  let index = goals.findIndex(goal => +goal.id === +id); 
console.log(id,body,index)
  goals[index].goalDescription = body.goalDescription;
  goals[index].goals = body.goal;
  res.status(200).send(goals);
})

app.listen(4000, () => console.log("Server running on 4000"));
