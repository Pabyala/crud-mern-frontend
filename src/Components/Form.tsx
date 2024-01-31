import React from "react";
import { Button, Dialog, DialogContent, DialogTitle, IconButton, Stack, TextField } from "@mui/material";
import { IoClose } from "react-icons/io5";
import './Form.css'

interface FormProps {
    open: boolean;
    closePopup: () => void;
    updateID: number | null;
    updateUser: () => Promise<void>;
    addUser: () => Promise<void>;
    userName: string;
    userEmail: string;
    userNumber: number | null;
    setUserName: (value: string) => void;
    setUserEmail: (value: string) => void;
    setUserNumber: (value: number | null) => void;
}
export default function Form({
    open,
    closePopup,
    updateID,
    updateUser,
    addUser,
    userName,
    userEmail,
    userNumber,
    setUserName,
    setUserEmail,
    setUserNumber,
}: FormProps) {

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (updateID) {
            await updateUser();
        } else {
            await addUser();
        }
    };

    return (
        <Dialog open={open} onClose={closePopup} fullWidth maxWidth="sm">
            <DialogTitle>
                {updateID ? "User update" : "User Registration"}
                <IconButton onClick={closePopup} style={{ float: "right" }}>
                <IoClose color="primary" />
                </IconButton>
            </DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={2} margin={2}>
                        <TextField
                            variant="outlined"
                            type="text"
                            label="Username"
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            type="email"
                            label="Email"
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                        />
                        <TextField
                            variant="outlined"
                            type="number"
                            label="Number"
                            value={userNumber || ''}
                            onChange={(e) =>
                                setUserNumber(e.target.value !== "" ? +e.target.value : null)
                            }
                        />
                        <Button
                            className="btnSubmit"
                            type="submit"
                            color="primary"
                            variant="contained"
                        >
                            {updateID ? "Update" : "Submit"}
                        </Button>
                    </Stack>
                </form>
            </DialogContent>
        </Dialog>
    );
}
