import express from "express";
import {calculateBmi} from "./bmiCalculator";
import {calculateExercise} from "./exerciseCalculator";

const app=express();

app.get("/hello", (_req, res)=>{
    res.send("Hello Full Stack")
})



app.get("/bmi", (req, res)=>{
    if (!req.query.height || !req.query.weight){
        res.json({
            error: "missing parameters, please enter height and weight"
        })
    } else if(!isNaN(Number(req.query.height)) && !isNaN(Number(req.query.weight))){
        let result =calculateBmi(Number(req.query.height), Number(req.query.weight))
        console.log(result)
        res.json({
            weight: Number(req.query.weight),
            height: Number(req.query.height),
            bmi: result
        })
    }
})

app.use(express.json())

app.post("/exercises", (req, res)=>{
    const body= req.body;
    if(!body.daily_exercises || !body.target){
        res.json({
            error: "parameters are missing"
        })
    }
    if(!Array.isArray(body.daily_exercises) || isNaN(body.target)){
        res.json({
            error: "malformatted parameters"
        })
    }
    res.json(calculateExercise(body.daily_exercises, body.target));

})
const PORT =3003;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
})