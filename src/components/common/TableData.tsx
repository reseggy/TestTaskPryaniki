import React, { useState } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import { TableRecord } from "../../types/index";
import {
  createRecord,
  updateRecord,
  deleteRecord,
} from "../../store/slices/dataSlice";
import TableRowItem from "./TableRowItem";
import NewRecordRow from "./NewRecordRow";

interface TableDataProps {
  data: TableRecord[];
}

const TableData: React.FC<TableDataProps> = ({ data }) => {
  const dispatch = useDispatch<AppDispatch>();
  const [isAdding, setIsAdding] = useState(false);

  const onDelete = (id: string) => {
    dispatch(deleteRecord(id));
  };

  const onUpdate = (id: string, updatedRecord: TableRecord) => {
    dispatch(updateRecord({ id, updatedRecord }));
  };

  const onAdd = (newRecord: Omit<TableRecord, "id">) => {
    dispatch(createRecord(newRecord));
    setIsAdding(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => setIsAdding(true)}
        sx={{ mb: 2, width: "100%" }}
      >
        Новая запись
      </Button>
      <TableContainer component={Paper} sx={{ mt: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Дата подписи компании</TableCell>
              <TableCell>Имя подписи компании</TableCell>
              <TableCell>Имя документа</TableCell>
              <TableCell>Статус документа</TableCell>
              <TableCell>Тип документа</TableCell>
              <TableCell>Номер сотрудника</TableCell>
              <TableCell>Дата подписи сотрудника</TableCell>
              <TableCell>Имя подписи сотрудника</TableCell>
              <TableCell>Действия</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {isAdding && (
              <NewRecordRow onAdd={onAdd} onCancel={() => setIsAdding(false)} />
            )}
            {data.map((record) => (
              <TableRowItem
                key={record.id}
                record={record}
                onUpdate={onUpdate}
                onDelete={onDelete}
              />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default TableData;
