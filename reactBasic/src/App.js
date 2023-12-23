import Header from './components/Header';
import TableUsers from './components/TableUsers';
import Container from 'react-bootstrap/Container';
import { useState } from 'react';
import './App.scss';
import ModalAddUser from './components/ModalAddUser';

function App() {

  const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);

  const handleClose = () => {
    setIsShowModalAddNew(false)
  }

  return (
    <div className='app-container'>
      <Header />
      <Container>
        <div className="d-flex justify-content-end mb-3">
          <button
            className="btn btn-success"
            onClick={() => setIsShowModalAddNew(true)} >Add User</button>
        </div>
        <TableUsers />
      </Container>

      <ModalAddUser
        show={isShowModalAddNew}
        handleClose={ handleClose }
      />
    </div>
  );
}

export default App;
