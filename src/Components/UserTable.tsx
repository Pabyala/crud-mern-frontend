import "./Table.css";
import { deleteUser, fetchUsers, setSelectedUser, setShowModal } from "../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../app/store";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { confirmationDelete, showSuccessErrorToast } from "../alertModal/Modals";

export default function UserTable() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, isLoading } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    if(isLoading) {
        return <p className="text-center">Loading...</p>;
    }

    const handleDelete = async (userId: number) => {
        const confirmDeletePopup = await confirmationDelete()
        if (confirmDeletePopup) {
            dispatch(deleteUser(userId));
            showSuccessErrorToast('success', 'User deleted successfully')
        } 
        return;
    };

    const handleUpdateForm = (user: any) => {
        dispatch(setSelectedUser(user));
        dispatch(setShowModal(true)); 
    }

    return (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="tablUsers overflow-y-scroll max-h-[calc(100vh-200px)]">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="sticky top-0 text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-black">Username</th>
                            <th scope="col" className="px-6 py-3 text-black">Email</th>
                            <th scope="col" className="px-6 py-3 text-black">Phone Number</th>
                            <th scope="col" className="px-6 py-3 text-black">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length === 0 ? (
                            <tr>
                                <td colSpan={4} className="text-center py-4">Your user list is empty. Create a new user now.</td>
                            </tr>
                        ) : (
                            (users.map((user) => (
                                <tr key={user._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 ">{user.name}</td>
                                    <td className="px-6 py-4 ">{user.email}</td>
                                    <td className="px-6 py-4 ">{user.phoneNumber}</td>
                                    <td className="px-6 py-4  flex">
                                    <span className="pr-2 text-lg cursor-pointer"><FaUserEdit onClick={() => handleUpdateForm(user)}/></span>
                                    <span className="pl-2 text-lg cursor-pointer"><MdDelete onClick={() => handleDelete(user._id)}/></span>
                                    </td>
                                </tr>
                            )))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
