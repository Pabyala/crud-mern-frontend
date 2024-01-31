import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { confirmationErrorEmail, confirmationValidInput, showConfirmationDialog, showSuccessErrorToast } from './PopupModal/Modals'
import Form from './Components/Form';
import HeroSpace from './Components/HeroSpace';
import UserTable from './Components/UserTable';

interface UserData {
  _id: number,
  name: string,
  email: string,
  phoneNumber: number,
}

function App() {
  const [open, openChange] = useState(false)
  const [userName, setUserName] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userNumber, setUserNumber] = useState<number | null>(null)
  const [users, setUsers] = useState<UserData[]>([])
  const [updateUI, setUpdateUI] = useState(false)
  const [updateID, setUpdateID] = useState<number | null>(null)

  const baseUrl = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    const getUser = async() => {
      try {
        const response = await axios.get(`${baseUrl}/get`)
        setUsers(response.data)
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    }
    getUser()
  }, [updateUI])

  const openPopup = () => {
    openChange(true)
  }

  const closePopup = () => {
    openChange(false)
    setUpdateID(null)
    setUserName('')
    setUserEmail('')
    setUserNumber(null)
  }

  const addUser = async () => {
    if( userName === '' || userEmail === '' || userNumber === null){
      confirmationValidInput()
      return
    }

    try {
      const response = await axios.post(`${baseUrl}/save`, {
        name: userName, 
        email: userEmail, 
        phoneNumber: userNumber !== null ? +userNumber : null
      });
      setUsers([...users, response.data]);
      setUpdateUI((prevState) => !prevState)
      setUserName('')
      setUserEmail('')
      setUserNumber(null)

      closePopup()
      showSuccessErrorToast('success', 'User added successfully')

    } catch (error: any) {
      if (
        error.response && error.response.status === 400 && 
        error.response.data.message === "User with the same email already exists."
      ) {
        confirmationErrorEmail(error.response.data.message)
      } else {
        confirmationErrorEmail("Something went wrong. Please try again later.")
      }
      console.log(error)
    }
  }

  const updateMode = (id: number, name: string, email: string, phoneNumber: number) => {
    openPopup();
    setUserName(name)
    setUserEmail(email)
    setUserNumber(phoneNumber)
    setUpdateID(id)
  }

  const updateUser = async () => {
    if( userName === '' || userEmail === '' || userNumber === null){
      confirmationValidInput()
      return
    }
    const isUpdate = await showConfirmationDialog()
    if (isUpdate) {
      try {
        const response = await axios.put(`${baseUrl}/update/${updateID}`, {
          name: userName, 
          email: userEmail, 
          phoneNumber: userNumber !== null ? +userNumber : null
        })
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user._id === updateID ? { ...user, ...response.data } : user
          )
        );
        setUpdateUI((prevState) => !prevState)
        setUpdateID(null)
        setUserName('')
        setUserEmail('')
        setUserNumber(null)
        closePopup()
        showSuccessErrorToast('success', 'Updated successfully')
      } catch (error: any) {
        if (
          error.response && error.response.status === 400 && 
          error.response.data.message === "User with the same email already exists."
        ) {
          confirmationErrorEmail(error.response.data.message)
        } else {
          confirmationErrorEmail("Something went wrong. Please try again later.")
        }
        console.log(error)
      }
    }
  }


  return (
    <main>
      <div className="app container">
        <HeroSpace/>
        <div className='title-btn-header'>
          <h4>User Data</h4>
          <Button onClick={openPopup} color='primary' variant='contained'>Add</Button>
          <Form
            open={open}
            closePopup={closePopup}
            updateID={updateID}
            updateUser={updateUser}
            addUser={addUser}
            userName={userName}
            userEmail={userEmail}
            userNumber={userNumber}
            setUserName={setUserName}
            setUserEmail={setUserEmail}
            setUserNumber={setUserNumber}
          />
        </div>
        <UserTable
          users={users}
          setUsers={setUsers}
          updateMode={updateMode}
          setUpdateUI={setUpdateUI}
        />
      </div>
    </main>
  );
}

export default App;
