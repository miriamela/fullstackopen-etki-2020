// this file is for patients router

import express from "express";
import patientsService from "../services/patientsService";


const patientsRouter= express.Router();

patientsRouter.get("/", (_req, res)=>{
    res.send(patientsService.getNonSensitiveData());
})

patientsRouter.post("/", (_req, res)=>{
    res.send("Saving new patient")
})

export default patientsRouter;