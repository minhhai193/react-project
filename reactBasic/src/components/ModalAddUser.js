import { Modal, Button, Form } from 'react-bootstrap';
import { useState } from 'react';

const ModalAddUser = (props) => {
  const { show, handleClose } = props;
  const [ name, setName ] = useState("");
  const [ job, setJob ] = useState("");

  const handleCreateUser = () => {
    handleClose();
    console.log(name,job)
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <form>
        <div className="form-group mb-3">
          <label>Name:</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(event) => {setName(event.target.value)}}
          />
        </div>
        <div className="form-group mb-3">
          <label>Job:</label>
          <input
            type="text"
            className="form-control"
            value={job}
            onChange={(event) => {setJob(event.target.value)}}
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