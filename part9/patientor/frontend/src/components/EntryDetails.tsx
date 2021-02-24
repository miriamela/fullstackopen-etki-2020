import React from "react";
import { Entry } from "../types";
import HealthCheckDisplay from "./HealthCheckEntry";
import HospitalDisplay from "./HospitalDisplay";
import OccupationalHealthcare from "./OccupationalHealthcareDisplay";

const EntryDetails: React.FC<{entry: Entry}> = ({entry})=>{
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };
switch (entry.type) {
  case "HealthCheck":
    return (
      <HealthCheckDisplay entry={entry}/>
    );
  case "Hospital":
    return(
      <HospitalDisplay entry={entry}/>
    );
  case "OccupationalHealthcare":
    return(
      <OccupationalHealthcare entry={entry}/>
    )
  default:
    return assertNever(entry)
}

}
export default EntryDetails;

