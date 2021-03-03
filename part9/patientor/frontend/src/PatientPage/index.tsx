import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state/state";
import {useState} from "react";
import {Patient} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Icon,Button} from "semantic-ui-react";
import {setOnePatientInfo, updatePatientInfo} from "../state/reducer";
import EntryDetails from "../components/EntryDetails";
import AddHealthCheckModal, {HealthCheckFormEntries}  from "../AddHealthCheckModal";


const PatientPage: React.FC=()=>{
    const id=useParams<{id:string}>();
    const [patient, setPatient]=useState<Patient|undefined>();
    const [, dispatch] = useStateValue();
    const [modalOpen, setModalOpen] =React.useState<boolean>(false)

    console.log(id)

   
   const openModal=(): void=>{
       setModalOpen(true)
   }
   const closeModal=():void=>{
       setModalOpen(false)
   }

   const addingEntries=async(values: HealthCheckFormEntries)=>{
    try{
    const {data: patientWithEntries} = await axios.post(
        `${apiBaseUrl}/patients/${id.id}/entries`,
        values,
            );
    dispatch(updatePatientInfo(patientWithEntries))
    closeModal()
        }catch (e){
    console.log(e)
        }
        try{
            const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`)
                setPatient(patient);
                dispatch(setOnePatientInfo(patient))
        }catch(e){
            console.log(e)
        }
        }

    React.useEffect(() => {
        const fetchPatient = async()=>{
            try{
                const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`)
                setPatient(patient);
                dispatch(setOnePatientInfo(patient))
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
        </div>
        <AddHealthCheckModal modalOpen={modalOpen} closeModal={closeModal} onSubmit={addingEntries}/>
        <Button onClick={()=>openModal()}>Add Health Check Information</Button>
        </>
    )
}
export default PatientPage