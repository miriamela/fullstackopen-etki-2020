import allPatients from "../../data/patients";
import {newPatientEntry, NonSensitiveData, PatientEntry, Entry} from "../types";


const getAll =(): PatientEntry[]=>{
    return allPatients;
}
const getNonSensitiveData = (): NonSensitiveData[]=>{
return allPatients.map(({id, name, dateOfBirth, gender, occupation})=>({
id,
name,
dateOfBirth,
gender,
occupation
}))
}
const findById =(id: string): PatientEntry =>{
const entry= allPatients.find(each=> each.id===id) as PatientEntry
return entry
}

const addEntry =(entry: newPatientEntry): PatientEntry =>{
  const newPatientEntry = {
      id : String(Math.floor(Math.random()* 100000)),
      entries:[],
      ...entry,
  }
allPatients.push(newPatientEntry)
return newPatientEntry;
}
const addEntries = (entries: Entry, patient: PatientEntry):PatientEntry=>{
    patient.entries.push(entries)
    return patient
}

export default{
    getAll: getAll,
    addEntry: addEntry,
    getNonSensitiveData: getNonSensitiveData,
    findById: findById,
    addEntries: addEntries
}