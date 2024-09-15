import "./Table.css";
import { deleteUser, fetchUsers, setSelectedUser, setShowModal } from "../features/usersSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../app/store";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { confirmationDelete, showSuccessErrorToast } from "../PopupModal/Modals";

// interface Table2Props {
//     updateEmployee: (item: any) => void; // Adjust `any` to the correct type if known
//     handleClickSnackbar: () => void;
// }

// export default function Table2({ updateEmployee, handleClickSnackbar }: Table2Props) {
export default function Table2() {
    const dispatch = useDispatch<AppDispatch>();
    const { users, isLoading, error } = useSelector((state: RootState) => state.users);

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);
    
    // const handleDeleteUser = (id: number) => {
    //     dispatch(deleteUser(id));
    //     handleClickSnackbar();
    //   };

    if (isLoading) {
        return <p>Loading...</p>;
    }

    const handleDelete = async (userId: number) => {
        const confirmDeletePopup = await confirmationDelete()
        if (confirmDeletePopup) {
            dispatch(deleteUser(userId));
            showSuccessErrorToast('success', 'User deleted successfully')
        } else {
            console.log("User not deleted")
        }
    };

    const handleUpdateForm = (user: any) => {
        // showModal(true)
        dispatch(setSelectedUser(user));  // Set the selected user in Redux
        dispatch(setShowModal(true));     // Open the modal
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
                            <th scope="col" className="px-6 py-3 text-black">Edit</th>
                        </tr>
                    </thead>
                    {/* {error && <p>Error</p>} */}
                    {users.length === 0 ? (<p>Your user list is empty. Create a new user now.</p>) : (
                        <tbody>
                                {(users.map((user) => (
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
                            }
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
}
