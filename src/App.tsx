import './App.css';
import HeroSpace from './Components/HeroHeader';
import './index.css'
import FormModal from './Components/UserForm';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './app/store';
import { setShowModal } from './features/usersSlice';
import UserTable from './Components/UserTable';

function App() {
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
              onClick={() => dispatch(setShowModal(true))}
            >
              Add
            </button>
          </div>
        </div>
        {showModal  && ( <FormModal /> )}
        <div className='user-dataInfo z-0 flex-grow'>
          <UserTable />
        </div>
      </div>
    </main>
  );
}

export default App;
