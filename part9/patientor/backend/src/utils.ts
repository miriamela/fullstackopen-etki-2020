import {newPatientEntry, Gender, BaseEntry,HealthCheckRating,SickLeave,Discharge,Entry } from "./types";


const isString  =(text :any): text is string=>{
return typeof text === "string" || text instanceof String;
}
const parseName =(name: any): string=>{
    if(!name || !isString(name)){
        throw new Error("Incorrect or missing name:" + name)
    }
    return name
}
const isDate =(date:string): boolean=>{
    return Boolean(Date.parse(date))
}
const parseDateOfBirth =(date: any): string=>{
 if(!date|| !isString(date)|| !isDate(date)){
     throw new Error("Incorrect or missing date"+ date)
 }
 return date
}

const parseOccupation =(occupation : any): string=>{
    if(!occupation || !isString(occupation)){
        throw new Error("Incorrect or missing occupation" + occupation)
    }
    return occupation
}
const isSSN =(param: any): boolean=>{
    return param.length>=10 && param.length<12
}

const parseSSN =(ssn:any): string=>{
    if(!ssn || !isString(ssn) || !isSSN(ssn)){
        throw new Error("Incorrect or missing ssn" + ssn)
    }
    return ssn
}
const isGender =(param: any): param is Gender=>{
    return Object.values(Gender).includes(param)
}
const parseGender = (gender:any): Gender=>{
    if(!gender || !isGender(gender)){
        throw new Error("Incorrect or missing gender" + gender)
    }
    return gender
}
//  const parseEntries =(entries: any):[]=>{
//      if(!entries){
//          throw new Error("Incorrect of missing entries" + entries)
//      }
//      return entries
//  }

const toNewPatientEntry = (object: any):newPatientEntry=>{
    const newEntry: newPatientEntry={
        name: parseName(object.name),
        dateOfBirth: parseDateOfBirth(object.dateOfBirth),
        ssn: parseSSN(object.ssn),
        gender: parseGender(object.gender),
        occupation: parseOccupation(object.occupation),
        // entries: parseEntries(object.entries)
    }
    return newEntry
}
export default toNewPatientEntry;

const parseDescription =(description: string):string=>{
    if(!description || !isString(description)){
        throw new Error("Incorrect or missing description" + description)
    }
    return description
}
const parseDate =(date: any):string=>{
    if(!date || !isDate(date)){
        throw new Error("Incorrect or missing date" + date)
    }
    return date
}
const parseSpecialist=(specialist: string):string=>{
    if(!specialist || !isString(specialist)){
        throw new Error("Incorrect or missing specialist" + specialist)
    }
    return specialist
}

const parseDiagnosisCodes=(diagnosisCodes: any): string[]=>{
    if(!diagnosisCodes){
        throw new Error("incorrect or missing diagnosis code" + diagnosisCodes)
    }
    return diagnosisCodes
}


const isRating =(param: any): param is HealthCheckRating=>{
    return Object.values(HealthCheckRating).includes(param)
}

const parseHealthCheckRating =(healthCheckRating: any):HealthCheckRating=>{
    console.log(healthCheckRating)
    if(!healthCheckRating || !isRating(healthCheckRating)){
        throw new Error("Incorrect or missing health check rating" + healthCheckRating)
    }
    return healthCheckRating
}
const parseEmployerName =(employerName: string):string=>{
    if(!employerName || !isString(employerName)){
        throw new Error("employer name is incorrect or missing" + employerName)
    }
    return employerName
}

// this may change depending on the format the info is received from frontend
const parseSickLeave =(sickLeave: any):SickLeave=>{
    if(!sickLeave || !isDate(sickLeave.startDate) || !isDate(sickLeave.endDate)){
        throw new Error("Incorrect or missing sick leave" + sickLeave)
    }
    return sickLeave
}
const parseDischarge =(discharge: any): Discharge=>{
    if(!discharge || !isDate(discharge.date)|| !isString(discharge.criteria)){
        throw new Error("incorrect or missing discharge" + discharge)
    }
    return discharge
}

export const toNewEntry=(object:any):Entry=>{
    const newEntries : BaseEntry={
        id: String(Math.floor(Math.random()* 100000)),
        description: parseDescription(object.description),
        date: parseDate(object.date),
        specialist: parseSpecialist(object.specialist),
        diagnosisCodes:parseDiagnosisCodes(object.diagnosisCodes)
    }
 if(!object.type || !isString(object.type)){
     throw new Error("Incorrect or missing type" + object.type)
 }
 switch (object.type) {
     case "HealthCheck":
         return {
             ...newEntries,
             type:"HealthCheck",
             healthCheckRating: parseHealthCheckRating(object.healthCheckRating)
         }
    case "OccupationalHealthcare":
          return {
              ...newEntries,
              type: "OccupationalHealthcare",
              employerName: parseEmployerName(object.employerName),
              sickLeave: parseSickLeave(object.sickLeave)
          }
    case "Hospital":
        return {
            ...newEntries,
            type: "Hospital",
            discharge: parseDischarge(object.discharge)
        }
     default:
         throw new Error("incorrect or missing entry type")
 }
 
}