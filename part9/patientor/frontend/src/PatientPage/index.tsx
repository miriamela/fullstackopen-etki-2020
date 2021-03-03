import React from "react";
import {useParams} from "react-router-dom";
import {useStateValue} from "../state/state";
import {useState} from "react";
import {Patient, Entry} from "../types";
import axios from "axios";
import {apiBaseUrl} from "../constants";
import {Icon,Button} from "semantic-ui-react";
import {setOnePatientInfo, updatePatientInfo} from "../state/reducer";
import EntryDetails from "../components/EntryDetails";
import AddHealthCheckModal from "../AddHealthCheckModal";
import AddOccupationalHealthcareModal from "../AddOccupationalHealthcareModal"
import HospitalModal from "../HospitalModal";

type DataFromEntries =Omit<Entry, "id">

const PatientPage: React.FC=()=>{
    const id=useParams<{id:string}>();
    const [patient, setPatient]=useState<Patient|undefined>();
    const [, dispatch] = useStateValue();
    const [modalOpenHealthCheck, setModalOpenHealthCheck] =React.useState<boolean>(false)
    const [modalOpenOccupational, setModalOpenOccupational]=React.useState<boolean>(false)
    const [modalOpenHospital, setModalOpenHospital] =React.useState<boolean>(false)
    const [error, setError] = React.useState<string | undefined>();

    // console.log(id)
   const openModalHealthCheck=(): void=>{
       setModalOpenHealthCheck(true)
   }
   const openModalOccupational=()=>{
       setModalOpenOccupational(true)
   }
   const openModalHospital=(): void=>{
       setModalOpenHospital(true)
   }
   const closeModal=():void=>{
       setModalOpenHealthCheck(false)
       setModalOpenOccupational(false)
       setModalOpenHospital(false)
       setError(undefined)
   }

   const addingEntries=async(values: DataFromEntries)=>{
    try{
    const {data: patientWithEntries} = await axios.post(
        `${apiBaseUrl}/patients/${id.id}/entries`,
        values,
            );
    dispatch(updatePatientInfo(patientWithEntries))
    closeModal()
        }catch (e){
    console.log(e)
    setError(e.response.data.error)
        }
        try{
            const {data: patient} = await axios.get<Patient>(`${apiBaseUrl}/patients/${id.id}`)
                setPatient(patient);
                dispatch(setOnePatientInfo(patient))
        }catch(e){
            console.error(e.response.data)
            setError(e.response.data.error)
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
                setError(e.response.data.error)
            } 
        }
       fetchPatient()
    }, [dispatch, id.id])
  
    // console.log(patient);
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
        <AddHealthCheckModal error={error} modalOpen={modalOpenHealthCheck} closeModal={closeModal} onSubmit={addingEntries}/>
        <AddOccupationalHealthcareModal error={error} modalOpen={modalOpenOccupational} closeModal={closeModal} onSubmit={addingEntries}/>
        <HospitalModal error={error} modalOpen={modalOpenHospital} closeModal={closeModal} onSubmit={addingEntries}/>
        <div className="ui hidden divider"></div>
        <Button className="ui primary button" onClick={()=>openModalHealthCheck()}>Add Health Check Information</Button>
        <div className="ui hidden divider"></div>
        <Button onClick={()=>openModalOccupational()}>Add Occupational Healthcare Information</Button>
        <div className="ui hidden divider"></div>
        <Button onClick={()=>openModalHospital()}>Add Hospital Information</Button>
        </>
    )
}
export default PatientPage