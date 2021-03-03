import React from "react";
import {HealthCheckFormEntries} from "./index";
import {Field, Formik, Form} from "formik";
import {Grid, Button} from "semantic-ui-react";
import {TextField, NumberField, DiagnosisSelection} from "../AddPatientModal/FormField";
import { useStateValue } from "../state";

interface Props{
    onSubmit: (values:HealthCheckFormEntries)=>void;
    closeModal: ()=>void;
}

const AddHealthCheckForm:React.FC<Props>=({onSubmit, closeModal})=>{
    const [{diagnoses}] =useStateValue()
    return(
        <Formik initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            type: "HealthCheck",
            healthCheckRating: 0
        }} 
        onSubmit={onSubmit}
        validate={
            values=>{
                const requiredError= "Field is required";
                const errors: {[field: string]: string}={}
                if(!values.description){
                    errors.name=requiredError;
                }
                if(!values.date){
                    errors.description =requiredError;
                }
                if(!values.specialist){
                    errors.specialist =requiredError;
                }
                return errors;
            }}>
            {
                ({isValid, dirty, setFieldValue, setFieldTouched})=>{
                    return(
                        <Form className="form ui">
                             <Field
                            label="specialist"
                            placeholder="SPECIALIST"
                            name="specialist"
                            component={TextField}
                            />
                            <Field
                            label="date"
                            placeholder="YYYY-MM-DD"
                            name="date"
                            component={TextField}
                            />
                            <Field
                            label="description"
                            placeholder= "DESCRIPTION"
                            name="description"
                            component={TextField}
                            />
                             <Field
                            label="health Check erlinRating"
                            name="healthCheckRating"
                            component={NumberField}
                            min={0}
                            max={3}
                            />
                            <DiagnosisSelection
                            setFieldValue={setFieldValue}
                            setFieldTouched={setFieldTouched}
                            diagnoses={Object.values(diagnoses)}
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
export default AddHealthCheckForm
