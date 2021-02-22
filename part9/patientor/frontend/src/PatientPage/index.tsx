import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state/state";
import {useEffect, useState} from "react";
import {Patient} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Icon} from "semantic-ui-react";




const PatientPage: React.FC=()=>{
    const id=useParams<{id: string}>();
    const [patient, setPatient]=useState<Patient|undefined>();
    const [, dispatch] = useStateValue();

    useEffect(() => {
        const fetchPatient = async()=>{
            try{
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`)
                setPatient(patient);
                dispatch({type: "UPDATE_PATIENT", payload: patient})
            }catch(e){
                console.log(e)
            } 
        }
       fetchPatient()
    }, [dispatch, id.id])

    

    console.log(patient);
   if(!patient){
       return null
   }
//    I have still no idea how to use typescript
   const showIcon = (gender: string): "mars"| "venus"|"genderless"=>{
    if (gender==="male"){
        return "mars"
    }
    else if(gender=== "female"){
        return "venus"
    }else{
        return "genderless"
    }
}

    return(
        <div>
           <h2>{patient.name} <Icon className={showIcon(patient.gender)}/></h2>
           <p>ssn: {patient.ssn}</p>
           <p>occupation: {patient.occupation}</p>
        </div>
    )
}
export default PatientPage