import React from "react";
import {HospitalEntry} from "../types";
import {Modal, Segment} from "semantic-ui-react";
import AddHospitalForm from "./AddHospitalForm";

export type HospitalFormEntries = Omit<HospitalEntry, "id">

interface Props{
    modalOpen: boolean;
    error?:string;
    closeModal: ()=>void;
    onSubmit:(values:HospitalFormEntries)=>void
}

const HospitalModal:React.FC<Props>=({modalOpen, closeModal, error, onSubmit})=>{
    return(
        <Modal open={modalOpen} onClose={closeModal} centred="false" closeIcon>
            <Modal.Header>Add Hospital Information</Modal.Header>
            <Modal.Content>
                {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
                <AddHospitalForm onSubmit={onSubmit} closeModal={closeModal}/>
            </Modal.Content>
        </Modal>
    )
}
export default HospitalModal