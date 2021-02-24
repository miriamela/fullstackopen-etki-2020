import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state/state";
import {useState} from "react";
import {Patient} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Icon} from "semantic-ui-react";
import {setOnePatientInfo} from "../state/reducer";
import EntryDetails from "../components/EntryDetails";



const PatientPage: React.FC=()=>{
    const id=useParams<{id: string}>();
    const [patient, setPatient]=useState<Patient|undefined>();
    const [, dispatch] = useStateValue();
    const [{diagnoses}] = useStateValue();
    
console.log(diagnoses)
   
    // console.log(diagnoses["F43.2"].name) 

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
    
    if(!patient){
        return null
    }
    return(
        <>
        <div>
           <h2>{patient.name} <Icon className={showIcon(patient.gender)}/></h2>
           <p>ssn: {patient.ssn}</p>
           <p>occupation: {patient.occupation}</p>
        </div>
        <br/>
        <div>
            <h2>Entries</h2>
            {
                patient.entries.map(each=><EntryDetails key={each.id} entry={each}/>)
            }         
            {/* {
                patient.entries.length>0? 
                patient.entries.map(each=>(
                    <div key={each.id}>
                    <p>{each.description}</p>
                    <ul> 
                        {
                        each.diagnosisCodes? each.diagnosisCodes.map(each=>(
                        <li key={each}>{each}, {diagnoses[each].name}
                        </li>)) : null
                        }
                    </ul>
                    </div>
                )): null
            } */}
        </div>
        </>
    )
}
export default PatientPage