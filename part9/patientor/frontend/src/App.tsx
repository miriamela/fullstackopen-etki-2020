import React from "react";
import axios from "axios";
import PatientPage from "./PatientPage/index";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";
import { apiBaseUrl } from "./constants";
import { useStateValue } from "./state";
import { Patient, Diagnoses } from "./types";
import PatientListPage from "./PatientListPage";
import {importAllPatients, importAllDiagnosis} from "./state/reducer";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(importAllPatients(patientListFromApi))
          // { type: "SET_PATIENT_LIST", payload: patientListFromApi });
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnosis =async ()=>{
        try{
            const {data: diagnosesListFromApi} = await axios.get<Diagnoses[]>( `${apiBaseUrl}/diagnoses`)
            dispatch(importAllDiagnosis(diagnosesListFromApi))
            console.log(diagnosesListFromApi)
        }catch(e){
          console.log(e)
        }
    }
    fetchDiagnosis();
}, [dispatch])

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch>
            <Route path="/patients/:id" render={()=><PatientPage/>}/>
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
