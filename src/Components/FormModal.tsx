import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { addUser, changeStateFalse, fetchUsers, setSelectedUser, setShowModal, updateUser } from "../features/usersSlice";
import { confirmationValidInput, showSuccessErrorToast } from "../PopupModal/Modals";

// interface FormModalProps {
//   handleClickSnackbar: () => void;
//   handleClose: () => void;
// }

// export default function FormModal({ handleClickSnackbar, handleClose }: FormModalProps) {
  export default function FormModal() {
  const dispatch = useDispatch<AppDispatch>();
  const selectedUser = useSelector((state: RootState) => state.users.selectedUser);

  const [userName, setUserName] = useState<string>(selectedUser?.name || '');
  const [userEmail, setUserEmail] = useState<string>(selectedUser?.email || '');
  const [userNumber, setUserNumber] = useState<number | null>(selectedUser?.phoneNumber || null);
  console.log("_id :", selectedUser?._id, "name", userName, "email: ", userEmail, "phone :", userNumber)
  const { users, isLoading, error } = useSelector((state: RootState) => state.users);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( userName === '' || userEmail === '' || userNumber === null){
      confirmationValidInput()
      return
    }
     // Dispatch the addUser action
    const resultAction = await dispatch(addUser({ 
      name: userName, 
      email: userEmail, 
      phoneNumber: userNumber 
    }));
  
     // Check if the action was rejected and handle the error
     if (addUser.rejected.match(resultAction)) {
       showSuccessErrorToast('error', resultAction.payload as string); // Display error toast
     } else {
      showSuccessErrorToast('success', 'User added successfully');
      dispatch(setShowModal(false)); 
      dispatch(setSelectedUser(null));
      setUserName('');
      setUserEmail('');
      setUserNumber(null);
     }
   };


    // return a error
    // alert(error)

    // dispatch(addUser({ name: userName, email: userEmail, phoneNumber: userNumber }));
    // if( userName === '' || userEmail === '' || userNumber === null){
    //   confirmationValidInput()
    //   return
    // }
    // if (selectedUser) {
    //   handleUpdate()
    // } else {
    //   handleSave()
    // }
     // If selectedUser exists, we're updating the user
  // if (selectedUser) {
  //   // Dispatch the update action
  //   await dispatch(updateUser({
  //     _id: selectedUser._id,
  //     name: userName,
  //     email: userEmail,
  //     phoneNumber: userNumber,
  //   }));

  //   showSuccessErrorToast('success', 'User updated successfully');
  // } else {
  //   await dispatch(addUser({
  //     name: userName,
  //     email: userEmail,
  //     phoneNumber: userNumber,
  //   }));
    
  //   // Show success toast for adding new user
  //   showSuccessErrorToast('success', 'User added successfully');
  // }

  // dispatch(setShowModal(false)); 
  // dispatch(setSelectedUser(null));
  // setUserName('');
  // setUserEmail('');
  // setUserNumber(null);
  // };

  const handleUpdate = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if( userName === '' || userEmail === '' || userNumber === null){
      confirmationValidInput()
      return
    }

    const resultAction = await dispatch(updateUser({
      _id: selectedUser?._id ?? 0,
      name: userName,
      email: userEmail,
      phoneNumber: userNumber,
    }));

    if (updateUser.rejected.match(resultAction)) {
      console.log("Update failed: ", resultAction.payload as string)
      showSuccessErrorToast('error', resultAction.payload as string); // Display error toast
    } else {
      showSuccessErrorToast('success', 'User updated successfully');
      // dispatch(fetchUsers());
      dispatch(setShowModal(false)); 
      dispatch(setSelectedUser(null));
      setUserName('');
      setUserEmail('');
      setUserNumber(null);
    }
  }

  const handleCloseModal = () => {
    dispatch(setShowModal(false));
    dispatch(setSelectedUser(null));
    setUserName('');
    setUserEmail('');
    setUserNumber(null);
  }

  // --------------------------------

  // const dispatch = useDispatch<AppDispatch>();
  // const { updateState } = useSelector((state: RootState) => state.users);
  // const [userId, setUserId] = useState<number>(0);
  // const [userName, setUserName] = useState<string>('');
  // const [userEmail, setUserEmail] = useState<string>('');
  // const [userNumber, setUserNumber] = useState<number | null>(null);

  // const handleClick = () => {
  //   dispatch(
  //     addUser({
  //       name: userName,
  //       email: userEmail,
  //       phoneNumber: userNumber
  //     })
  //   );
  //   handleClickSnackbar();
  //   setUserName("");
  //   setUserEmail("");
  //   setUserNumber(null);
  // };

  // const updateForm = () => {
  //   dispatch(updateUser({ _id: userId, name: userName, email: userEmail, phoneNumber: userNumber }));
  //   dispatch(changeStateFalse());
  //   handleClickSnackbar();
  //   setUserName("");
  //   setUserEmail("");
  //   setUserNumber(null);
  // };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center z-10">
      <div className="relative bg-white rounded-lg shadow px-16 flex flex-col">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center popup-close"
          onClick={handleCloseModal}
          // onClick={handleClose}
        >
          <svg
            aria-hidden="true"
            className="w-5 h-5"
            fill="#c6c7c7"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            ></path>
          </svg>
          <span className="sr-only">Close popup</span>
        </button>

        <div className="pt-5 pb-7">
          <h3 className="text-2xl mb-0.5 font-medium"></h3>
          <p className="mb-4 text-sm font-normal text-gray-800"></p>

          <div className="text-center mb-4">
            <p className="mb-3 text-2xl font-semibold leading-5 text-slate-900">
              User Registration
            </p>
            <p className="mt-2 text-sm leading-4 text-slate-600">
              Please fill out all the required forms to complete your
              registration.
            </p>
          </div>

          <form className="w-full" onSubmit={selectedUser ? handleUpdate : handleSubmit}>
            <label htmlFor="text" className="sr-only">
              Username
            </label>
            <input
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              name="text"
              type="text"
              autoComplete="text"
              className="block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Username"
            />

            <label htmlFor="email" className="sr-only">
              Email address
            </label>
            <input
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              name="email"
              type="email"
              autoComplete="email"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Email Address"
            />

            <label htmlFor="number" className="sr-only">
              Number
            </label>
            <input
              value={userNumber || ''}
              onChange={(e) =>
                setUserNumber(e.target.value !== "" ? +e.target.value : null)
              }
              name="number"
              type="number"
              autoComplete="number"
              className="mt-2 block w-full rounded-lg border border-gray-300 px-3 py-2 shadow-sm outline-none placeholder:text-gray-400 focus:border-black"
              placeholder="Number"
            />

            <button
              type="submit"
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none disabled:bg-gray-400"
            >
              {selectedUser ? 'Save update' : 'Register'}
            </button>

            {/* {updateState ? (
              <button
              onClick={updateForm}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none disabled:bg-gray-400"
            >
              Save
            </button>
            ) : (
              <button
              onClick={handleClick}
              className="mt-4 inline-flex w-full items-center justify-center rounded-lg bg-black p-2 py-3 text-sm font-medium text-white outline-none disabled:bg-gray-400"
            >
              Register
            </button>
            )} */}
          </form>
        </div>
      </div>
    </div>
  );
}
