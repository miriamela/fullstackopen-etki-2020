// this file is for patients router

import express from "express";
import patientsService from "../services/patientsService";
import toNewPatientEntry, {toNewEntry} from "../utils";


const patientsRouter= express.Router();

patientsRouter.get("/", (_req, res)=>{
    res.send(patientsService.getNonSensitiveData());
})

patientsRouter.get("/:id", (req, res)=>{
    const patient= patientsService.findById(req.params.id)
    if(patient){
        res.send(patient)
    }else{
        res.sendStatus(404)
    }
} )

patientsRouter.post("/", (req, res)=>{
    const newPatientEntry = toNewPatientEntry(req.body)
    // const {name, dateOfBirth, ssn, gender, occupation} = req.body;
    // const newEntry = patientsService.addEntry({
    //     name,
    //     dateOfBirth,
    //     ssn,
    //     gender,
    //     occupation
    // })
    const addedPatient = patientsService.addEntry(newPatientEntry)
    res.json(addedPatient)
   
})
patientsRouter.post("/:id/entries", (req, res)=>{
    const patient= patientsService.findById(req.params.id)
    const newEntries = toNewEntry(req.body)
    try{
        const patientWithEntries= patientsService.addEntries(newEntries, patient)
        res.json(patientWithEntries)
    }catch(e){
        res.status(400).send(e.message)
    }   
})

export default patientsRouter;