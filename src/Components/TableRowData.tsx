import React from 'react'
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { DataColom } from '../Data/Data';
import { StyledTableCell } from './CustomStyledTable';

export default function TableRowData() {
    return (
        <TableHead>
            <TableRow>
                {DataColom.map((col) => (
                    <StyledTableCell
                        key={col.id}
                        className={col.className}
                        align={col.align}
                    >
                        {col.label}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    )
}
