import axios from 'axios';
import { confirmationDelete, showSuccessErrorToast } from '../PopupModal/Modals';
import './Table.css'

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

export default function Table({ users, updateMode, setUsers, setUpdateUI }: UserListProps) {
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
        <div className="flex flex-col">
            <div className="-m-1.5 overflow-x-auto">
                <div className="p-1.5 min-w-full inline-block align-middle">
                    <div className="border rounded-lg border-gray-400 overflow-hidden">
                        <div className="relative">
                            {/* Table Header */}
                            <div className="bg-gray-50 border-b">
                                <table className="min-w-full bg-white">
                                    <thead>
                                        <tr>
                                            <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium text-black uppercase">Name</th>
                                            <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium text-black uppercase">Email</th>
                                            <th scope="col" className="px-4 py-2.5 text-start text-xs font-medium text-black uppercase">Number</th>
                                            <th scope="col" className="px-4 py-2.5 text-end text-xs font-medium text-black uppercase">Action</th>
                                        </tr>
                                    </thead>
                                </table>
                            </div>

                            {/* Table Body */}
                            <div className="tablUsers overflow-y-scroll max-h-[calc(100vh-200px)]">
                            {/* <div className="tablUsers overflow-y-scroll flex-1"> */}
                                <table className="min-w-full divide-y divide-gray-200">
                                    <tbody className="divide-y divide-gray-200">
                                        {users.map((user) => (
                                            <tr key={user._id} className='hover:bg-gray-100 dark:hover:bg-neutral-700'>
                                                <td className="px-4 py-2.5 whitespace-nowrap text-sm font-medium text-gray-800">{user.name}</td>
                                                <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-800">{user.email}</td>
                                                <td className="px-4 py-2.5 whitespace-nowrap text-sm text-gray-800">{user.phoneNumber}</td>
                                                <td className="px-4 py-2.5 whitespace-nowrap text-end text-sm font-medium">
                                                    <button
                                                        type="button"
                                                        onClick={() => handleDeleteUser(user._id)}
                                                        className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none"
                                                    >
                                                        Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
