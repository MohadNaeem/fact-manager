import React, { useState, useEffect, useMemo } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { tableCellClasses } from "@mui/material/TableCell";
import { Record } from "../../interfaces/Record";
import { useRecords } from "../../context/RecordContext";
import BtnDelete from "../../components/ListItems/DeleteButton";
import BtnView from "../../components/ListItems/ViewButton";
import RecordFilter from "../Filters/RecordFilter";

interface Props {
  onEditInit: (record: Record) => void;
}

const cardStyles = {
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "10px",
};

export const RecordTable: React.FC<Props> = ({ onEditInit }) => {
  const { state: records, dispatch } = useRecords();
  const [filterTerm, setFilterTerm] = useState("");
  const [sortType, setSortType] = useState<"upvotes" | "date" | "">("");

  const filteredAndSortedRecords = useMemo(() => {
    let filteredRecords = filterTerm
      ? records.filter((record) =>
          record.title.toLowerCase().includes(filterTerm.toLowerCase())
        )
      : records;

    switch (sortType) {
      case "upvotes":
        return filteredRecords.sort((a, b) => b.upvotes - a.upvotes);
      case "date":
        return filteredRecords.sort(
          (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
        );
      default:
        return filteredRecords;
    }
  }, [records, filterTerm, sortType]);
  return (
    <>
      <RecordFilter onFilter={setFilterTerm} onSort={setSortType} />
      <TableContainer component={Paper} sx={{ mt: 3 , ...cardStyles}}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <StyledTableCell width={"30%"}>Title</StyledTableCell>
              <StyledTableCell>Upvotes</StyledTableCell>
              <StyledTableCell width={"40%"}>Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredAndSortedRecords.map((record) => (
              <TableRow key={record.id}>
                <StyledTableCell width={"30%"} component="th" scope="row">
                  {record.title}
                </StyledTableCell>
                <StyledTableCell>{record.upvotes}</StyledTableCell>
                <TableCell
                  width={"40%"}
                  sx={{ gap: 1, display: "flex", alignItems: "center" }}
                >
                  <Typography sx={{ minWidth: "100px" }} fontWeight={600} fontSize={14}>
                    {" "}
                    {record.date}
                  </Typography>
                  <BtnView record={record} />
                  <button
                    className="py-3 px-4 text-slate-50 rounded-lg  transition dark:bg-blue-400 dark:hover:bg-blue-300"
                    onClick={() => onEditInit(record)}
                  >
                    Edit
                  </button>
                  <BtnDelete id={record.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    fontWeight: 600,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
    fontWeight: 600,

  },
}));
