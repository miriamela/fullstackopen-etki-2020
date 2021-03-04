import React from "react";
import {OccupationalHealthcareFormEntries} from "./index";
import {Field, Formik, Form} from "formik";
import {Grid, Button} from "semantic-ui-react";
import {useStateValue} from "../state";
import {TextField,DiagnosisSelection } from "../AddPatientModal/FormField";

interface Props{
    onSubmit:(values:OccupationalHealthcareFormEntries )=>void;
    closeModal:()=>void
}

const AddOccupationalHealthcareForm: React.FC<Props>=({onSubmit, closeModal})=>{
    const [{diagnoses}]=useStateValue()
    return(
        <Formik initialValues={{
            description: "",
            date: "",
            specialist:"",
            diagnosisCodes: [],
            type: "OccupationalHealthcare",
            employerName: "",
            sickLeave:{
                startDate:"",
                endDate:""
            }
        }}
        onSubmit={onSubmit}
        validate={
            values=>{
                const requiredError="Field is required";
                const errors: {[field:string]:string}={}
                if(!values.description){
                    errors.name=requiredError
                }
                if(!values.date){
                    errors.date=requiredError
                }
                if(!values.specialist){
                    errors.specialist=requiredError
                }
                if(!values.employerName){
                    errors.employerName =requiredError
                }
                return errors
            }}>
            {
                ({isValid, dirty, setFieldValue,setFieldTouched})=>{
                    return (
                        <Form className="form ui">
                             <Field
                            label="Specialist"
                            placeholder="SPECIALIST"
                            name="specialist"
                            component={TextField}
                            />
                            <Field
                            label="Date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                            />
                            <Field
                            label="Description"
                            placeholder= "DESCRIPTION"
                            name="description"
                            component={TextField}
                            />
                            <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
                            />
                            <Field
                            label="Employer Name"
                            placeholder= "EMPLOYER NAME"
                            name="employerName"
                            component={TextField}
                            />
                            <Field
                            label="Sick Leave Start Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.startDate"
                            component={TextField}
                            />
                            <Field
                            label="Sick Leave End Date"
                            placeholder="YYYY-MM-DD"
                            name="sickLeave.endDate"
                            component={TextField}
                            />
                            <Grid>
                                <Grid.Column floated="left" width={5}>
                                    <Button type="button" onClick={closeModal} color="red">Cancel</Button>
                                </Grid.Column>
                                <Grid.Column floated="right" width={5}>
                                    <Button type="submit" floated="right" color="green" disabled={!dirty|| !isValid}>
                                        Add
                                    </Button>
                                </Grid.Column>
                            </Grid>
                        </Form>
                    )
                }
            }    

        </Formik>
    )
}

export default AddOccupationalHealthcareForm;
