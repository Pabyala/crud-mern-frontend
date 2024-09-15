import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface User {
  _id: number;
  name: string;
  email: string;
  phoneNumber: number | null;
}
interface UsersState {
  users: User[];
  isLoading: boolean;
  error: string | null;
  showModal: boolean;
  selectedUser: User | null;
  updateState: boolean,
  response: string,
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
  error: null,
  showModal: false,
  selectedUser: null,
  updateState: false,
  response: "",
};

const baseUrl = process.env.REACT_APP_BASE_API_URL;

// get all USERS
export const fetchUsers = createAsyncThunk<User[]>( 'users/fetchUsers', async () => {
  const response = await axios.get(`${baseUrl}/get`);
  return response.data;
});

// add new USER
export const addUser = createAsyncThunk<User, Omit<User, '_id'>>('users/addUser', async (userData, { rejectWithValue } ) => {
  try {
    const response = await axios.post(`${baseUrl}/save`, userData);
    console.log("Response: ", response.data)
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("Error: ", error.response.data.message )
      if (error.response.status === 400) {
        console.log("Bad req. : ", error.response.data.message )
        return rejectWithValue(error.response.data.message || 'Bad Request');
      }
      return rejectWithValue(error.response.data.message || 'Failed to add user');
    }
    return rejectWithValue('Failed to add user');
  }
});

// delete USER
export const deleteUser = createAsyncThunk<number, number>('users/deleteUser', async (userId) => {
  await axios.delete(`${baseUrl}/delete/${userId}`);
  return userId; // Return the user ID of the deleted user
});

// update USER
export const updateUser = createAsyncThunk<User, User>('users/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await axios.put(`${baseUrl}/update/${userData._id}`, userData);
    console.log("Response data after update: ", response.data);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.log("Error: ", error.response.data.message )
      if (error.response.status === 400) {
        console.log("Bad req. 400 update : ", error.response.data.message )
        return rejectWithValue(error.response.data.message || 'User with the same email already exists.');
      }
      if (error.response.status === 404) {
        console.log("Bad req. 404 update : ", error.response.data.message )
        return rejectWithValue(error.response.data.message || 'User not found');
      }
      return rejectWithValue(error.response.data.message || 'Failed to update user');
    }
    return rejectWithValue('Failed to update user');
  }
});


// create a slice
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setShowModal: (state, action: PayloadAction<boolean>) => {
      state.showModal = action.payload;
    },
    setSelectedUser: (state, action: PayloadAction<User | null>) => {
      state.selectedUser = action.payload;
    },
    changeStateTrue: (state) => {
      state.updateState = true;
    },
    changeStateFalse: (state) => {
      state.updateState = false;
    },
    clearResponse: (state) => {
      state.response = "";
    },
  },
  extraReducers: (builder) => {
    builder
      //fetching the user
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'An error occurred';
      })
      
      //add user
      // .addCase(addUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(addUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload); 
        state.response = "Added successfully"
      })
      .addCase(addUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
        console.log("Errors: ", action.payload)
      })
    //delete the user
    // builder
    .addCase(deleteUser.fulfilled, (state, action) => {
        state.users = state.users.filter(user => user._id !== action.payload);
        state.response = "Deleted successfully"
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.error = action.payload as string || 'Failed to delete user';
      })
      
      //update user
      // .addCase(addUser.pending, (state) => {
      //   state.isLoading = true;
      // })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        const updateUser = action.payload;
        console.log("Updated user: ", updateUser);
        state.users = state.users.map(user =>
          user._id === action.payload._id ? action.payload : user
        );
        state.response = "update";
      })      
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string || 'Failed to update user';
      });
  },
});  

export const { setShowModal, setSelectedUser, changeStateTrue, changeStateFalse, clearResponse } = usersSlice.actions;
export default usersSlice.reducer;