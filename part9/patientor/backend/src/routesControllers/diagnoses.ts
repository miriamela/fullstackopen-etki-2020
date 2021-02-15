// this file is for diagnoses router

import express from "express";
import diagnosesService from "../services/diagnosesService"

const diagnosesRouter=express.Router();

diagnosesRouter.get("/", (_req, res)=>{
    res.send(diagnosesService.getAll())
})

diagnosesRouter.post("/", (_req, res)=>{
    res.send("Saving new diagnose")
})

export default diagnosesRouter;