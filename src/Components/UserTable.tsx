import React from "react";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import './UserList.css'
import UserList from "./UserList";
import TableRowData from "./TableRowData";


interface UserData {
    _id: number,
    name: string,
    email: string,
    phoneNumber: number,
}

interface UserDataProps {
    users: UserData[];
    updateMode: (_id: number, name: string, email: string, phoneNumber: number) => void;
    setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>;
    setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export default function UserTable({ users,  updateMode, setUpdateUI, setUsers }: UserDataProps) {

    return (
        <Paper className="tblePaper" sx={{ overflow: 'hidden' }}>
            <TableContainer className="tblcontainer" sx={{ maxHeight: 650, width: '100%' }}>
                <Table sx={{ minWidth: 500 }} stickyHeader aria-label="sticky table">
                    <TableRowData/>
                    <UserList
                        users={users}
                        setUsers={setUsers}
                        setUpdateUI={setUpdateUI}
                        updateMode={updateMode}
                    />
                </Table>
            </TableContainer>
        </Paper>
  );
}

