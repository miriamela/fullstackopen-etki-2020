import express from "express";
import {calculateBmi} from "./bmiCalculator";

const app=express();

app.get("/hello", (_req, res)=>{
    res.send("Hello Full Stack")
})

const PORT =3003;

app.listen(PORT, ()=>{
    console.log(`server is running on ${PORT}`)
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