import React, { useState, useEffect } from "react";
import { TextField, Box, Typography } from "@mui/material";
import dayjs, { Dayjs } from "dayjs";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Record } from "../../interfaces/Record";

interface Props {
  onSubmit: (record: Record) => void;
  onCancel: () => void;
  editRecord: Record | null;
}

const cardStyles = {
  boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
  borderRadius: "10px",
};

export const RecordForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
  editRecord,
}) => {
  // Consolidate state into a single object
  const [formData, setFormData] = useState({
    title: "",
    upvotes: "",
    date: dayjs(),
  });
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(
      formData.title !== "" && formData.upvotes !== "" && formData.date !== null
    );
  }, [formData]);

  useEffect(() => {
    if (editRecord) {
      setFormData({
        title: editRecord.title,
        upvotes: editRecord.upvotes.toString(),
        date: dayjs(editRecord.date),
      });
    }
  }, [editRecord]);

  // Handle form submission
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit({
      id: editRecord ? editRecord.id : Math.random().toString(36),
      title: formData.title,
      upvotes: parseInt(formData.upvotes, 10),
      date: formData.date.toISOString().split("T")[0],
    });
    // Reset form after submission
    setFormData({
      title: "",
      upvotes: "",
      date: dayjs(),
    });
  };

  const handleCancel = () => {
    onCancel();
    // Reset form on cancel
    setFormData({
      title: "",
      upvotes: "",
      date: dayjs(),
    });
  };

  const handleInputChange = (field: keyof typeof formData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  return (
    <Card sx={{ px: 3, ...cardStyles }}>
      <CardContent>
        <Typography sx={{ mb: 1 }} variant="body2" fontWeight={"600"}>
          {editRecord ? "Edit Record" : "Add Record"}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ "& > :not(style)": { mt: 1.5 } }}>
            <TextField
              label="Enter title"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
              fullWidth
            />
            <TextField
              label="Enter upvotes"
              value={formData.upvotes}
              type="number"
              onChange={(e) => handleInputChange("upvotes", e.target.value)}
              fullWidth
            />
            <DatePicker
              sx={{ width: "100%", borderRadius: "10px" }}
              label="Date"
              value={formData.date}
              onChange={(newValue) => handleInputChange("date", newValue)}
            />
            <button
              type="submit"
              className="btn w-full rounded-lg"
              disabled={!isValid}
            >
              {editRecord ? "Save Edit" : "Add Data"}
            </button>
            {editRecord && (
              <button
                onClick={handleCancel}
                className="btn w-full rounded-lg mt-2"
              >
                Cancel Edit
              </button>
            )}
          </Box>
        </form>
      </CardContent>
    </Card>
  );
};
