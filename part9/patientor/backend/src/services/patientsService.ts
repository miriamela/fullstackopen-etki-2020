import patientsData from "../../data/patients.json";
import {NonSensitiveData, PatientEntry} from "../types";

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

const addEntry =()=>{
    return null
}

export default{
    getAll: getAll,
    addEntry: addEntry,
    getNonSensitiveData: getNonSensitiveData
}