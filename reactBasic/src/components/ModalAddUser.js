import { Modal, Button } from 'react-bootstrap';
import { useState } from 'react';
import { postCreateUser } from '../services/UserService';
import { toast } from 'react-toastify';

const ModalAddUser = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [ firstName, setFirstName ] = useState("");
  const [ lastName, setLastName ] = useState("");

  const handleCreateUser = async () => {
    let res = await postCreateUser(firstName, lastName);

    if (res && res.id) {
      handleClose();
      setFirstName('');
      setLastName('');
      toast.success('Added user successfully!');
      handleUpdateTable({first_name: firstName, id: res.id, last_name: lastName});
    } else {
      toast.error('Added user failed!');
    }
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
        <div className="form-group mb-3">
          <label>First Name:</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(event) => {setFirstName(event.target.value)}}
          />
        </div>
        <div className="form-group mb-3">
          <label>Last Name:</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(event) => {setLastName(event.target.value)}}
          />
        </div>
      </form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  )
}

export default ModalAddUser;