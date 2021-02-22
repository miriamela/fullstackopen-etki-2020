
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export enum Gender {
    Male = "male",
    Female="female",
    Other ="other"
}

export interface PatientEntry {
    id: string,
    name: string,
    dateOfBirth:string,
    ssn:string,
    gender: string,
    entries: Entry[], 
    occupation: string,
}


export type NonSensitiveData = Omit<PatientEntry, "ssn"| "entries">

export type newPatientEntry= Omit<PatientEntry, "id">

export interface DiagnoseEntry{
    code: string,
    name: string,
    latin?:string,
}
