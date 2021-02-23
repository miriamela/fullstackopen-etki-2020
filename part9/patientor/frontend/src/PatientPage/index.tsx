import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state/state";
import {useState} from "react";
import {Patient} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Icon} from "semantic-ui-react";
import {setOnePatientInfo} from "../state/reducer";


const PatientPage: React.FC=()=>{
    const id=useParams<{id: string}>();
    const [patient, setPatient]=useState<Patient|undefined>();
    const [, dispatch] = useStateValue();

    React.useEffect(() => {
        const fetchPatient = async()=>{
            try{
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`)
                setPatient(patient);
                dispatch(setOnePatientInfo(patient))
                    // {type: "UPDATE_PATIENT", payload: patient})
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
        <>
        <div>
           <h2>{patient.name} <Icon className={showIcon(patient.gender)}/></h2>
           <p>ssn: {patient.ssn}</p>
           <p>occupation: {patient.occupation}</p>
        </div>
        <div>
            <h2>entries</h2>
            {
                patient.entries.map(each=>(
                    <div key={each.id}>
                    <p>{each.description}</p>
                    <ul>
                        {each.diagnosisCodes?.map(each=>(
                            <li key={each}>{each} </li>
                        ))}
                    </ul>
                    </div>
                ))
            }
        </div>
        </>
    )
}
export default PatientPage