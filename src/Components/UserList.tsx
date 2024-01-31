import { TableBody } from '@mui/material';
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';
import { confirmationDelete, showSuccessErrorToast } from '../PopupModal/Modals';
import { StyledTableCell, StyledTableRow } from "./CustomStyledTable";

interface UserData {
    _id: number,
    name: string,
    email: string,
    phoneNumber: number,
}

interface UserListProps {
    users: UserData[];
    updateMode: (_id: number, name: string, email: string, phoneNumber: number) => void;
    setUpdateUI: React.Dispatch<React.SetStateAction<boolean>>;
    setUsers: React.Dispatch<React.SetStateAction<UserData[]>>;
}

export default function UserList({ users, updateMode, setUsers, setUpdateUI }: UserListProps) {

    const baseUrl = process.env.REACT_APP_BASE_URL;

    const handleDeleteUser = async (id: number) => {
        const confirmDeletePopup = await confirmationDelete()
        if (confirmDeletePopup) {
            try {
                await axios.delete(`${baseUrl}/delete/${id}`)
                setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
                setUpdateUI((prevState) => !prevState)
                showSuccessErrorToast('success', 'User deleted successfully')
            } catch (error) {
                console.error('Error deleting user:', error);
            }
        }
    }

    return (
        <TableBody>
            {users.map((user) => (
                <StyledTableRow key={user._id}>
                <StyledTableCell component="th" scope="row" className="tblName name">
                    {user.name}
                </StyledTableCell>
                <StyledTableCell align="center" className="tblGmail">
                    {user.email}
                </StyledTableCell>
                <StyledTableCell align="center" className="tblNumber">
                    {user.phoneNumber}
                </StyledTableCell>
                <StyledTableCell className="tblActions" align="right">
                    <FaUserEdit className="action edit" onClick={() => updateMode(user._id, user.name, user.email, user.phoneNumber)}/>
                    <MdDelete className="action delete" onClick={() => handleDeleteUser(user._id)}/>
                </StyledTableCell>
                </StyledTableRow>
            ))}
        </TableBody>
    )
}
