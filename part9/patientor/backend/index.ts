import express from "express";
import cors from 'cors';
import diagnosesRouter from "./src/routesControllers/diagnoses";
import patientsRouter from "./src/routesControllers/patients";
const app =express();
app.use(cors())
app.use(express.json());

const PORT= 3001;

app.get("/ping", (_req,res)=>{
    res.send('pong');
})
app.use("/api/diagnoses", diagnosesRouter);
app.use("/api/patients", patientsRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})
