import React from "react";
import {Modal, Segment} from "semantic-ui-react";
import {OccupationalHealthcareEntry} from "../types";

export type OccupationalHealthcareFormEntries = Omit<OccupationalHealthcareEntry, "id">
interface Props {
    modalOpen:boolean;
    error?:string;
    onSubmit: (values: OccupationalHealthcareEntry)=> void;
    closeModal : ()=> void;
}

const AddOccupationalHealthcareModal: React.FC<Props>=({modalOpen, error,onSubmit,closeModal})=>{
return(
    <Modal open={modalOpen} onClose={closeModal} centred="false" closeIcon>
        <Modal.Header>Add Occupational Healthcare Information</Modal.Header>
        <Modal.Content>
            {error && <Segment inverted color="red">{`Error: ${error}`}</Segment>}
            <h1>here the form</h1>
        </Modal.Content>
    </Modal>
)
}
export default AddOccupationalHealthcareModal;