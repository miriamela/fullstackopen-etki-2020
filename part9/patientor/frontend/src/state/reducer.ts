import { State } from "./state";
import { Patient } from "../types";
import {Diagnoses} from "../types";

export type Action =
    {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type:"SET_DIAGNOSIS_LIST";
      payload: Diagnoses[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "UPDATE_PATIENT":
      return{
        ...state,
        patients:{
        ...state.patients,
        [action.payload.id]: action.payload
        }
      }
    case "SET_DIAGNOSIS_LIST":
      return{
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnoses) => ({ ...memo, [diagnoses.code]: diagnoses }),
            {}
          ),
          ...state.diagnoses
        }
      }
    default:
      return state;
  }
};

export const importAllPatients =(patientListFromApi: Patient[]):Action=>{
  return{
    type: "SET_PATIENT_LIST",
    payload: patientListFromApi
  }

}

export const setOnePatientInfo = (patient: Patient):Action=>{
  return{
    type: "UPDATE_PATIENT",
    payload: patient
  }
}

export const addPatientToList =(newPatient:Patient):Action=>{
  return{
    type: "ADD_PATIENT",
    payload: newPatient
  }
}

export const importAllDiagnosis =(diagnosisListFromApi: Diagnoses[]): Action=>{
  return{
    type:"SET_DIAGNOSIS_LIST",
    payload: diagnosisListFromApi
  }
}
export const updatePatientInfo=(updatedPatient:Patient):Action=>{
  return{
    type:"UPDATE_PATIENT",
    payload: updatedPatient
  }
}
