import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { TableRecord } from "../../types/index";

interface TableRowItemProps {
  record: TableRecord;
  onDelete: (id: string) => void;
  onUpdate: (id: string, updatedRecord: TableRecord) => void;
}

const TableRowItem: React.FC<TableRowItemProps> = ({
  record,
  onDelete,
  onUpdate,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRecord, setEditedRecord] = useState(record);

  const handleChange =
    (field: keyof TableRecord) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setEditedRecord({ ...editedRecord, [field]: e.target.value });
    };

  const handleSave = () => {
    const fields: (keyof TableRecord)[] = [
      "companySigDate",
      "companySignatureName",
      "documentName",
      "documentStatus",
      "documentType",
      "employeeNumber",
      "employeeSigDate",
      "employeeSignatureName",
    ];

    for (const field of fields) {
      if (
        typeof editedRecord[field] !== "string" ||
        editedRecord[field].trim() === ""
      ) {
        alert(`Поле ${field} не может быть пустым`);
        return;
      }
    }

    const companyDate = new Date(editedRecord.companySigDate);
    if (isNaN(companyDate.getTime())) {
      alert("Поле companySigDate должно содержать дату и время в формате ISO");
      return;
    }

    const employeeDate = new Date(editedRecord.employeeSigDate);
    if (isNaN(employeeDate.getTime())) {
      alert("Поле employeeSigDate должно содержать дату и время в формате ISO");
      return;
    }

    onUpdate(record.id, editedRecord);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedRecord(record);
    setIsEditing(false);
  };

  return (
    <TableRow key={record.id}>
      <TableCell>{record.id}</TableCell>
      <TableCell sx={{ maxWidth: 200, width: 200 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.companySigDate}
            onChange={handleChange("companySigDate")}
            variant="standard"
            type="datetime-local"
            sx={{ maxWidth: 200, width: "100%" }}
          />
        ) : (
          record.companySigDate
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 160, width: 160 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.companySignatureName}
            onChange={handleChange("companySignatureName")}
            variant="standard"
          />
        ) : (
          record.companySignatureName
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 160, width: 160 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.documentName}
            onChange={handleChange("documentName")}
            variant="standard"
          />
        ) : (
          record.documentName
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 160, width: 160 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.documentStatus}
            onChange={handleChange("documentStatus")}
            variant="standard"
          />
        ) : (
          record.documentStatus
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 160, width: 160 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.documentType}
            onChange={handleChange("documentType")}
            variant="standard"
          />
        ) : (
          record.documentType
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 160, width: 160 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.employeeNumber}
            onChange={handleChange("employeeNumber")}
            variant="standard"
          />
        ) : (
          record.employeeNumber
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 200, width: 200 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.employeeSigDate}
            onChange={handleChange("employeeSigDate")}
            variant="standard"
            type="datetime-local"
            sx={{ maxWidth: 200, width: "100%" }}
          />
        ) : (
          record.employeeSigDate
        )}
      </TableCell>
      <TableCell sx={{ maxWidth: 170, width: 170 }}>
        {isEditing ? (
          <TextField
            value={editedRecord.employeeSignatureName}
            onChange={handleChange("employeeSignatureName")}
            variant="standard"
          />
        ) : (
          record.employeeSignatureName
        )}
      </TableCell>
      <TableCell>
        {isEditing ? (
          <>
            <IconButton onClick={handleSave} aria-label="save" size="small">
              <SaveIcon fontSize="inherit" />
            </IconButton>
            <IconButton onClick={handleCancel} aria-label="cancel" size="small">
              <CancelIcon fontSize="inherit" />
            </IconButton>
          </>
        ) : (
          <>
            <IconButton
              onClick={() => setIsEditing(true)}
              aria-label="edit"
              size="small"
            >
              <EditIcon fontSize="inherit" />
            </IconButton>
            <IconButton
              onClick={() => onDelete(record.id)}
              aria-label="delete"
              size="small"
            >
              <DeleteIcon fontSize="inherit" />
            </IconButton>
          </>
        )}
      </TableCell>
    </TableRow>
  );
};

export default TableRowItem;
