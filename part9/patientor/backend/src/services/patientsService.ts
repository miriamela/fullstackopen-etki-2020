import patientsData from "../../data/patients.json";
import {newPatientEntry, NonSensitiveData, PatientEntry} from "../types";
import toNewPatientEntry from "../utils";

const patients: Array<PatientEntry> = patientsData.map(obj=>{
    const object = toNewPatientEntry(obj) as PatientEntry
    object.id=obj.id
    return object
})

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
const entry= patients.find(each=> each.id===id) as PatientEntry
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