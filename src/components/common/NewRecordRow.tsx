import React, { useState } from "react";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CancelIcon from "@mui/icons-material/Cancel";
import { TableRecord } from "../../types/index";

interface NewRecordRowProps {
  onAdd: (record: Omit<TableRecord, "id">) => void;
  onCancel: () => void;
}

const NewRecordRow: React.FC<NewRecordRowProps> = ({ onAdd, onCancel }) => {
  const initialState: Omit<TableRecord, "id"> = {
    companySigDate: "",
    companySignatureName: "",
    documentName: "",
    documentStatus: "",
    documentType: "",
    employeeNumber: "",
    employeeSigDate: "",
    employeeSignatureName: "",
  };

  const [newRecord, setNewRecord] = useState(initialState);

  const handleChange =
    (field: keyof Omit<TableRecord, "id">) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewRecord({ ...newRecord, [field]: e.target.value });
    };

  const handleAdd = () => {
    const fields: (keyof Omit<TableRecord, "id">)[] = [
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
      if (!newRecord[field] || newRecord[field].trim() === "") {
        alert(`Поле ${field} не может быть пустым`);
        return;
      }
    }

    // Проверка и преобразование даты компании
    const companyDate = new Date(newRecord.companySigDate.trim());
    if (isNaN(companyDate.getTime())) {
      alert("Поле companySigDate должно содержать дату и время в формате ISO");
      return;
    }

    // Проверка и преобразование даты сотрудника
    const employeeDate = new Date(newRecord.employeeSigDate.trim());
    if (isNaN(employeeDate.getTime())) {
      alert("Поле employeeSigDate должно содержать дату и время в формате ISO");
      return;
    }

    const formattedRecord: Omit<TableRecord, "id"> = {
      ...newRecord,
      companySigDate: companyDate.toISOString().trim(),
      employeeSigDate: employeeDate.toISOString().trim(),
    };

    onAdd(formattedRecord);
  };

  return (
    <TableRow>
      {/* Пустая ячейка для ID */}
      <TableCell />
      <TableCell>
        <TextField
          label=" " // Пробел для выравнивания
          type="datetime-local"
          value={newRecord.companySigDate}
          onChange={handleChange("companySigDate")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Подпись компании"
          value={newRecord.companySignatureName}
          onChange={handleChange("companySignatureName")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Имя документа"
          value={newRecord.documentName}
          onChange={handleChange("documentName")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Статус документа"
          value={newRecord.documentStatus}
          onChange={handleChange("documentStatus")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Тип документа"
          value={newRecord.documentType}
          onChange={handleChange("documentType")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Номер сотрудника"
          value={newRecord.employeeNumber}
          onChange={handleChange("employeeNumber")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label=" " // Пробел для выравнивания
          type="datetime-local"
          value={newRecord.employeeSigDate}
          onChange={handleChange("employeeSigDate")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <TextField
          label="Подпись сотрудника"
          value={newRecord.employeeSignatureName}
          onChange={handleChange("employeeSignatureName")}
          variant="standard"
        />
      </TableCell>
      <TableCell>
        <IconButton onClick={handleAdd} aria-label="add" size="small">
          <AddIcon fontSize="inherit" />
        </IconButton>
        <IconButton onClick={onCancel} aria-label="cancel" size="small">
          <CancelIcon fontSize="inherit" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

export default NewRecordRow;
