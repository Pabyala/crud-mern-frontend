import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmationErrorEmail, confirmationValidInput, showConfirmationDialog, showSuccessErrorToast } from './PopupModal/Modals'
import HeroSpace from './Components/HeroSpace';
import './index.css'
import Table from './Components/Table';
import FormModal from './Components/FormModal';
import Table2 from './Components/Table2';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { changeStateFalse, changeStateTrue, fetchUsers, setShowModal } from './features/usersSlice';

interface UserData {
  _id: number,
  name: string,
  email: string,
  phoneNumber: number,
}

function App() {

  // const dispatch = useDispatch();

  // const [userName, setUserName] = useState('')
  // const [userEmail, setUserEmail] = useState('')
  // const [userNumber, setUserNumber] = useState<number | null>(null)
  // const [users, setUsers] = useState<UserData[]>([])
  // const [updateUI, setUpdateUI] = useState(false)
  // const [updateID, setUpdateID] = useState<number | null>(null)

  // const baseUrl = process.env.REACT_APP_BASE_API_URL;

  // useEffect(() => {
  //   const getUser = async() => {
  //     try {
  //       const response = await axios.get(`${baseUrl}/get`)
  //       setUsers(response.data)
  //     } catch (error) {
  //       console.error('Error fetching user:', error);
  //     }
  //   }
  //   getUser()
  // }, [updateUI, baseUrl])

  // const closePopup = () => {
  //   setUpdateID(null)
  //   setUserName('')
  //   setUserEmail('')
  //   setUserNumber(null)
  // }

  // const addUser = async () => {
  //   if( userName === '' || userEmail === '' || userNumber === null){
  //     confirmationValidInput()
  //     return
  //   }

  //   try {
  //     const response = await axios.post(`${baseUrl}/save`, {
  //       name: userName, 
  //       email: userEmail, 
  //       phoneNumber: userNumber !== null ? +userNumber : null
  //     });
  //     setUsers([...users, response.data]);
  //     setUpdateUI((prevState) => !prevState)
  //     setUserName('')
  //     setUserEmail('')
  //     setUserNumber(null)
  //     closePopup()
  //     showSuccessErrorToast('success', 'User added successfully')
  //     // eslint-disable-next-line
  //   } catch (error: any) {
  //     if (
  //       error.response && error.response.status === 400 && 
  //       error.response.data.message === "User with the same email already exists."
  //     ) {
  //       confirmationErrorEmail(error.response.data.message)
  //     } else {
  //       confirmationErrorEmail("Something went wrong. Please try again later.")
  //     }
  //     console.log(error)
  //   }
  // }

  // const updateMode = (id: number, name: string, email: string, phoneNumber: number) => {
  //   setUserName(name)
  //   setUserEmail(email)
  //   setUserNumber(phoneNumber)
  //   setUpdateID(id)
  // }

  // const updateUser = async () => {
  //   if( userName === '' || userEmail === '' || userNumber === null){
  //     confirmationValidInput()
  //     return
  //   }
  //   const isUpdate = await showConfirmationDialog()
  //   if (isUpdate) {
  //     try {
  //       const response = await axios.put(`${baseUrl}/update/${updateID}`, {
  //         name: userName, 
  //         email: userEmail, 
  //         phoneNumber: userNumber !== null ? +userNumber : null
  //       })
  //       setUsers((prevUsers) =>
  //         prevUsers.map((user) =>
  //           user._id === updateID ? { ...user, ...response.data } : user
  //         )
  //       );
  //       setUpdateUI((prevState) => !prevState)
  //       setUpdateID(null)
  //       setUserName('')
  //       setUserEmail('')
  //       setUserNumber(null)
  //       closePopup()
  //       showSuccessErrorToast('success', 'Updated successfully')
  //     } catch (error: any) {
  //       if (
  //         error.response && error.response.status === 400 && 
  //         error.response.data.message === "User with the same email already exists."
  //       ) {
  //         confirmationErrorEmail(error.response.data.message)
  //       } else {
  //         confirmationErrorEmail("Something went wrong. Please try again later.")
  //       }
  //       console.log(error)
  //     }
  //   }
  // }

  // const [showModal, setShowModal] = useState(false)

  // useEffect(() => {
  //   dispatch(fetchUsers());
  // }, [dispatch]);

  // const [open, setOpen] = useState(false);
  // const [showForm, setShowForm] = useState(false);

  // const handleClickSnackbar = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // const toggleForm = () => {
  //   setShowForm(!showForm);
  // };

  const dispatch = useDispatch<AppDispatch>();
  const showModal = useSelector((state: RootState) => state.users.showModal);

  return (
    <main>
      <div className="app container mx-auto">
        <div className='mb-2 md:mb-2.5 lg:mb-3'>
          <HeroSpace/>
          <div className='flex justify-between items-center'>
            <h4 className='text-sm font-bold'>User data list:</h4>
            <button 
              className="bg-white text-sm hover:bg-gray-100 text-gray-800 font-semibold py-1.5 px-5 border border-gray-400 rounded shadow"
              // onClick={() => setShowModal(true)}
              onClick={() => dispatch(setShowModal(true))}
              // onClick={toggleForm}
            >
              {/* {showForm ? "Hide Form" : "Show Form"} */}
              Add
            </button>
          </div>
        </div>
        {showModal  && (
        <FormModal
          // handleClose={handleClose}
          // handleClickSnackbar={handleClickSnackbar}
        />
      )}
        {/* {showModal && (
        <FormModal 
          onClose={() => setShowModal(false)}
        />
      )} */}
        <div className='user-dataInfo z-0 flex-grow'>
          <Table2
            // updateEmployee={(item) => {
            //   dispatch(changeStateTrue());
            // }}
            // handleClickSnackbar={handleClickSnackbar}
          />
        </div>
      </div>
    </main>
  );
}

export default App;
