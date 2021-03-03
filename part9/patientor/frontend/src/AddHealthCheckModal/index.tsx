import React from "react";
import {Modal, Segment} from "semantic-ui-react";
import { HealthCheckEntry } from "../types";
import AddHealthCheckForm from "./AddHealthCheckForm";

export type HealthCheckFormEntries=Omit<HealthCheckEntry, "id">

interface Props{
    modalOpen: boolean,
    onSubmit: (values:HealthCheckFormEntries)=>void,
    closeModal:()=>void;
    error?: string;
}

const AddHealthCheckModal =({modalOpen, onSubmit, closeModal, error}:Props)=>{
 return(
    <Modal open={modalOpen} onClose={closeModal} centred="false" closeIcon>
        <Modal.Header>Add Health Check Information</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <AddHealthCheckForm onSubmit={onSubmit} closeModal={closeModal}/>
        </Modal.Content>
    </Modal>
    )
   
}

export default AddHealthCheckModal;
