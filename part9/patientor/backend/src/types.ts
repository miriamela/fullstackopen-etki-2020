
export type Gender = "male"|"female";

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth:string,
    ssn:string,
    gender: Gender,
    occupation: string,
}
export type NonSensitiveData = Omit<PatientEntry, "ssn">

export type newPatientEntry= Omit<PatientEntry, "id">

export interface DiagnoseEntry{
    code: string,
    name: string,
    latin?:string,
}
