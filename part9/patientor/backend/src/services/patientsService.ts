import patientsData from "../../data/patients.json";
import {newPatientEntry, NonSensitiveData, PatientEntry} from "../types";

const patients: Array<PatientEntry> =patientsData as Array<PatientEntry>;

const getAll =(): PatientEntry[]=>{
    return patients;
}
const getNonSensitiveData = (): NonSensitiveData[]=>{
return patients.map(({id, name, dateOfBirth, gender, occupation})=>({
id,
name,
dateOfBirth,
gender,
occupation
}))
}
const findById =(id: string): PatientEntry | undefined=>{
const entry = patients.find(each=> each.id===id)
return entry
}

const addEntry =(entry: newPatientEntry): PatientEntry =>{
  const newPatientEntry = {
      id : String(Math.floor(Math.random()* 100000)),
      ...entry,
  }
patients.push(newPatientEntry)
return newPatientEntry;
}

export default{
    getAll: getAll,
    addEntry: addEntry,
    getNonSensitiveData: getNonSensitiveData,
    findById: findById
}