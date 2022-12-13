import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStateValue, loadPatient } from "../state";
import { apiBaseUrl } from "../constants";
import EntryDetails from "./EntryDetails";

import { Patient, Entry } from "../types";
import { Box, Typography } from "@material-ui/core";

const PatientInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [{ individualPatients }, dispatch] = useStateValue();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${String(id)}`
        );
        dispatch(loadPatient(patient));
      } catch (e) {
        console.error(e);
      }
    };

    if (!individualPatients[String(id)]) {
      void fetchPatient();
    }
  }, [dispatch]);

  if (!individualPatients[String(id)]) return <div>loading...</div>;

  return (
    <Box marginTop={3}>
      <Typography align="left" variant="h4">
        {individualPatients[String(id)].name}
      </Typography>
      <br />
      <Box component="span" sx={{ display: "block" }}>
        Gender: {individualPatients[String(id)].gender}
        <br />
        SSN: {individualPatients[String(id)].ssn}
        <br />
        Occupation: {individualPatients[String(id)].occupation}
      </Box>
      <br />
      <Typography variant="h5">Entries</Typography>
      <br />
      <Box component="span" sx={{ display: "block" }}>
        {individualPatients[String(id)].entries.map((entry: Entry) => (
          <div key={entry.id} style={{ border: "1px solid black", borderRadius: "5px", padding: "5px", margin: "10px", maxWidth: "500px" }}>
          <EntryDetails entry={entry} />
        </div>
        ))}
      </Box>
    </Box>
  );
};

export default PatientInfo;
