import { Modal, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEditUser = (props) => {
	const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");

	useEffect(() => {
		if (show) {
			setFirstName(dataUserEdit.first_name);
			setLastName(dataUserEdit.last_name);
		}
	}, [dataUserEdit]);

	const handleEditUser = async () => {
		let res = await putUpdateUser(dataUserEdit.id, firstName, lastName);

    if (res && res.updatedAt) {
      handleClose();
      toast.success('Updated user successfully!');
      handleEditUserFromModal({
        first_name: firstName,
        last_name: lastName,
        id: dataUserEdit.id
      });
    } else {
      toast.error('Edited user failed!');
    }
	};

	return (
		<Modal show={show} onHide={handleClose}>
			<Modal.Header closeButton>
				<Modal.Title>Edit A User</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<form>
					<div className="form-group mb-3">
						<label>First Name:</label>
						<input
							type="text"
							className="form-control"
							value={firstName}
							onChange={(event) => {
								setFirstName(event.target.value);
							}}
						/>
					</div>
					<div className="form-group mb-3">
						<label>Last Name:</label>
						<input
							type="text"
							className="form-control"
							value={lastName}
							onChange={(event) => {
								setLastName(event.target.value);
							}}
						/>
					</div>
				</form>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={handleClose}>
					Close
				</Button>
				<Button variant="primary" onClick={handleEditUser}>
					Confirm
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default ModalEditUser;
