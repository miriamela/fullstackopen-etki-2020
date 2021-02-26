import {newPatientEntry, Gender} from "./types";


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