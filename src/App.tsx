import React from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import { Button, Divider, Container } from "@material-ui/core";

import { apiBaseUrl } from "./constants";
import { useStateValue, setPatientList, loadDiagnoses } from "./state";
import { Patient, Diagnosis } from "./types";

import PatientListPage from "./PatientListPage";
import { Typography } from "@material-ui/core";
import PatientInfo from "./PatientInfo";

const App = () => {
  const [, dispatch] = useStateValue();
  React.useEffect(() => {
    void axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    const fetchDiagnosesList = async () => {
      try {
        const { data: diagnosesListFromApi } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(loadDiagnoses(diagnosesListFromApi));
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatientList();
    void fetchDiagnosesList();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
            Patientor
          </Typography>
          <Button component={Link} to="/" variant="contained" color="primary">
            Home
          </Button>
          <Divider hidden />
          <Routes>
            <Route path="/" element={<PatientListPage />} />
            <Route path="/patients" element={<Navigate to="/" />} />
            <Route path="/patients/:id" element={<PatientInfo />} />
          </Routes>
        </Container>
      </Router>
    </div>
  );
};

export default App;
