import React, { useState } from "react";
import { Container, Grid, useMediaQuery } from "@mui/material";
import { RecordForm } from "../components/DashboardSection/RecordForm";
import { RecordTable } from "../components/DashboardSection/RecordTable";
import { Record } from "../interfaces/Record";
import { useRecords } from "../context/RecordContext";

const Dashboard: React.FC = () => {
  const [editRecord, setEditRecord] = useState<Record | null>(null);
  const { dispatch } = useRecords();
  const matches = useMediaQuery("(min-width:600px)");

  const handleEditInit = (record: Record) => {
    setEditRecord(record);
  };

  const handleRecordSubmit = (record: Record) => {
    if (editRecord) {
      dispatch({ type: "EDIT_RECORD", payload: record });
    } else {
      dispatch({ type: "ADD_RECORD", payload: record });
    }
    setEditRecord(null);
  };

  const handleCancelEdit = () => {
    setEditRecord(null);
  };

  return (
    <Container>
      <Grid container spacing={10} mt={2}>
        <Grid item xs={12} md={5} mt={matches ? 15 : 5}>
          <RecordForm
            onSubmit={handleRecordSubmit}
            onCancel={handleCancelEdit}
            editRecord={editRecord}
          />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecordTable onEditInit={handleEditInit} />
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
