import React from "react";
import {HospitalFormEntries} from "./index";
import {Field, Formik, Form} from "formik";
import {Grid, Button} from "semantic-ui-react";
import {TextField, DiagnosisSelection} from "../AddPatientModal/FormField";
import {useStateValue} from "../state";

interface Props{
    onSubmit: (values:HospitalFormEntries )=>void;
    closeModal:()=>void
}

const AddHospitalForm:React.FC<Props>=({onSubmit, closeModal})=>{
    const [{diagnoses}] =useStateValue()
    return(
        <Formik initialValues={{
            description: "",
            date: "",
            specialist: "",
            diagnosisCodes: [],
            type: "Hospital",
            discharge:{
                date: "",
                criteria: ""
            }
        }}
        onSubmit={onSubmit}
        validate={
            values=>{
                const requiredErrors ="Field is required";
                const errors :{[field:string]:string}={}
                if(!values.description){
                    errors.description = requiredErrors
                }
                if(!values.date){
                    errors.date = requiredErrors
                }
                if(!values.specialist){
                    errors.specialist =requiredErrors
                }
                if(!values.discharge.date){
                    errors.discharge= requiredErrors
                }
                if(!values.discharge.criteria){
                    errors.discharge =requiredErrors
                }
                return errors
            }}>
            {
                ({isValid, dirty, setFieldValue, setFieldTouched})=>{
                    return(
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
                            label="Discharge Date"
                            placeholder= "YYYY-MM-DD"
                            name="discharge.date"
                            component={TextField}
                            />
                             <Field
                            label="Criteria"
                            placeholder= "CRITERIA"
                            name="discharge.criteria"
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

export default AddHospitalForm;
