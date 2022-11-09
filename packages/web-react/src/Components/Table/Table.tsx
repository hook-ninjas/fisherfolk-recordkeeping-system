import React from 'react';
import {
  Table,
  TableBody,
  TableContainer,
  TableHead,
  Paper,
} from '@mui/material';

interface TableProps {
  headers: JSX.Element;
  rows: JSX.Element;
}

function RecordsTable(props: TableProps) {
  const { headers, rows } = props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>{headers}</TableHead>
        <TableBody>{rows}</TableBody>
      </Table>
    </TableContainer>
  );
}

export default RecordsTable;
