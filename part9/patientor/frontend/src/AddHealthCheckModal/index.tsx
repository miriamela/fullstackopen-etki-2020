import React from "react";
import {Modal, Segment} from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import AddHealthCheckForm from "./AddHealthCheckForm";

export type HealthCheckFormEntries=Omit<HealthCheckEntry, "id">

interface Props{
    modalOpen: boolean,
    onSubmit: (values:HealthCheckFormEntries)=>void,
    closeModal:()=>void

}

const AddHealthCheckModal =({modalOpen, onSubmit, closeModal}:Props)=>{
 return(
    <Modal open={modalOpen} onClose={closeModal} centred="false" closeIcon>
        <Modal.Header>Add Health Check Information</Modal.Header>
        <Modal.Content>
            <h1>form here</h1>
            <AddHealthCheckForm onSubmit={onSubmit} closeModal={closeModal}/>
        </Modal.Content>
    </Modal>
    )
   
}

export default AddHealthCheckModal;
