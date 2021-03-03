
// eslint-disable-next-line @typescript-eslint/no-empty-interface



export enum Gender {
    Male = "male",
    Female="female",
    Other ="other"
}
// patient after being created without entries
export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth:string,
    ssn:string,
    gender: string,
    entries: Entry[], 
    occupation: string,
}


export interface BaseEntry{
    id:string,
    description: string,
    date: string,
    specialist: string,
    diagnosisCodes?: string[]
}

export enum HealthCheckRating{
   "Healthy" = 0,
    "LowRisk"= 1,
    "HighRisk"= 2,
    "CriticalRisk"= 3

}

export interface HealthCheckEntry extends BaseEntry{
    type: "HealthCheck";
    healthCheckRating: HealthCheckRating
}

export interface SickLeave{
    startDate: string,
    endDate: string
}

export interface OccupationalHealthcareEntry extends BaseEntry{
    type: "OccupationalHealthcare";
    employerName: string,
    sickLeave?: SickLeave
}

export interface Discharge{
    date: string,
    criteria: string
}
export interface HospitalEntry extends BaseEntry{
    type: "Hospital";
    discharge : Discharge
}

export type Entry = HospitalEntry|OccupationalHealthcareEntry|HealthCheckEntry
export type NonSensitiveData = Omit<PatientEntry, "ssn"| "entries">
export type newPatientEntry= Omit<PatientEntry, "id"| "entries">

export interface DiagnoseEntry{
    code: string,
    name: string,
    latin?:string,
}
