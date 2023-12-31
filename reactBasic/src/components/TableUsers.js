import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { fetchAllUsers } from "../services/UserService";
import ReactPaginate from "react-paginate";
import ModalAddUser from "../components/ModalAddUser";
import ModalEditUser from "../components/ModalEditUser";
import "./TableUsers.scss";
import _ from "lodash";
import { debounce } from "lodash";
import { CSVLink } from "react-csv";
import { toast } from "react-toastify";
import Papa from "papaparse";

const TableUsers = (props) => {
	const [listUsers, setListUsers] = useState([]);
	const [totalPages, setTotalPages] = useState(0);

	useEffect(() => {
		getUsers(1);
	}, []);

	const [isShowModalAddNew, setIsShowModalAddNew] = useState(false);
	const [isShowModalEdit, setIsShowModalEdit] = useState(false);

	const [dataUserEdit, setDataUserEdit] = useState([]);

	const [dataExport, setDataExport] = useState([]);

	const handleClose = () => {
		setIsShowModalAddNew(false);
		setIsShowModalEdit(false);
	};

	const handleUpdateTable = (user) => {
		setListUsers([...listUsers, user]);
	};

	const getUsers = async (page) => {
		const result = await fetchAllUsers(page);

		if (result && result.data) {
			setListUsers(result.data);
			setTotalPages(result.total_pages);
		}
	};

	const handlePageClick = (event) => {
		getUsers(+event.selected + 1);
	};

	const handleEditUser = (user) => {
		setIsShowModalEdit(true);
		setDataUserEdit(user);
	};

	const handleEditUserFromModal = (user) => {
		let cloneListUsers = [...listUsers];
		let index = listUsers.findIndex((item) => item.id === user.id);
		cloneListUsers[index].first_name = user.first_name;
		cloneListUsers[index].last_name = user.last_name;
		setListUsers([...cloneListUsers]);
	};

	const handleDeleteUser = (user) => {
		let cloneListUsers = _.cloneDeep(listUsers);
		cloneListUsers = cloneListUsers.filter((item) => item.id !== user.id);
		setListUsers(cloneListUsers);
	};

	const handleSortUser = (sortBy, sortField) => {
		let cloneListUsers = _.cloneDeep(listUsers);
		cloneListUsers = _.orderBy(cloneListUsers, [sortField], [sortBy]);
		setListUsers(cloneListUsers);
	};

	const searchUserByEmail = debounce((event) => {
		let searchText = event.target.value;

		if (searchText) {
			let cloneListUsers = _.cloneDeep(listUsers);
			cloneListUsers = cloneListUsers.filter((item) =>
				item.email.includes(searchText)
			);
			setListUsers(cloneListUsers);
		} else {
			getUsers(1);
		}
	}, 500);

	const getUserExport = (event, done) => {
		let result = [];

		if (listUsers && listUsers.length > 0) {
			result.push(["ID", "Email", "First Name", "Last Name"]);

			listUsers.map((item, index) => {
				let array = [];
				array[0] = item.id;
				array[1] = item.email;
				array[2] = item.first_name;
				array[3] = item.last_name;

				result.push(array);
			});

			setDataExport(result);
			console.log(result);
			done();
		}
	};

	const handleImportFile = (event) => {
		if (event.target && event.target.files && event.target.files[0]) {
			let file = event.target.files[0];

			if (file.type !== "text/csv") {
				toast.error("Only accept CSV file!");
				return;
			}

			// Parse local CSV file
			Papa.parse(file, {
				complete: function (results) {
					let rawCSV = results.data;
					if (rawCSV.length > 0) {
						if (rawCSV[0] && rawCSV[0].length === 4) {
							if (
								rawCSV[0][0] !== "id" ||
								rawCSV[0][1] !== "email" ||
								rawCSV[0][2] !== "first_name" ||
								rawCSV[0][3] !== "last_name"
							) {
								toast.error("Wrong format HEADER CSV file!");
							} else {
								let result = [];

								rawCSV.map((item, index) => {
									if (index > 0 && item.length === 4) {
										let obj = {};
										obj.id = item[0];
										obj.email = item[1];
										obj.first_name = item[2];
										obj.last_name = item[3];
                    result.push(obj);
									}
								});
                setListUsers(result);
							}
						} else {
							toast.error("Wrong format CSV file!");
						}
					} else {
						toast.error("Not found data on CSV file!");
					}
				},
			});
		}
	};

	return (
		<>
			<div className="d-md-flex justify-content-between mb-3">
				<input
					type="text"
					className="col-md-4 col-12 mb-3 mb-md-0"
					onChange={searchUserByEmail}
				/>
				<div>
					<label className="btn btn-warning" htmlFor="import">
						Import
					</label>
					<input
						type="file"
						id="import"
						hidden
						onChange={(event) => handleImportFile(event)}
					/>
					<CSVLink
						filename="users.csv"
						data={dataExport}
						asyncOnClick={true}
						onClick={getUserExport}
						className="btn btn-primary mx-2"
					>
						Export
					</CSVLink>
					<button
						className="btn btn-success"
						onClick={() => setIsShowModalAddNew(true)}
					>
						Add User
					</button>
				</div>
			</div>
			<div className="table-wrapper">
				<Table striped bordered hover>
					<thead>
						<tr>
							<th className="sort-header">
								<span>ID</span>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="16"
										width="12"
										viewBox="0 0 384 512"
										onClick={() => handleSortUser("desc", "id")}
									>
										<path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z" />
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="16"
										width="12"
										viewBox="0 0 384 512"
										onClick={() => handleSortUser("asc", "id")}
									>
										<path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
									</svg>
								</span>
							</th>
							<th>Email</th>
							<th className="sort-header">
								<span>First Name</span>
								<span>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="16"
										width="12"
										viewBox="0 0 384 512"
										onClick={() => handleSortUser("desc", "first_name")}
									>
										<path d="M169.4 502.6c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 402.7 224 32c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 370.7L86.6 329.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128z" />
									</svg>
									<svg
										xmlns="http://www.w3.org/2000/svg"
										height="16"
										width="12"
										viewBox="0 0 384 512"
										onClick={() => handleSortUser("asc", "first_name")}
									>
										<path d="M214.6 9.4c-12.5-12.5-32.8-12.5-45.3 0l-128 128c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 109.3V480c0 17.7 14.3 32 32 32s32-14.3 32-32V109.3l73.4 73.4c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-128-128z" />
									</svg>
								</span>
							</th>
							<th>Last Name</th>
							<th>Actions</th>
						</tr>
					</thead>
					<tbody>
						{listUsers &&
							listUsers.length > 0 &&
							listUsers.map((item, index) => {
								return (
									<tr key={`user-${index}`}>
										<td>{item.id}</td>
										<td>{item.email}</td>
										<td>{item.first_name}</td>
										<td>{item.last_name}</td>
										<td>
											<button
												className="btn btn-primary"
												onClick={() => handleEditUser(item)}
											>
												Edit
											</button>
											<button
												className="btn btn-danger mx-2"
												onClick={() => handleDeleteUser(item)}
											>
												Delete
											</button>
										</td>
									</tr>
								);
							})}
					</tbody>
				</Table>
				<ReactPaginate
					nextLabel="next >"
					onPageChange={handlePageClick}
					pageRangeDisplayed={3}
					marginPagesDisplayed={2}
					pageCount={totalPages}
					previousLabel="< previous"
					pageClassName="page-item"
					pageLinkClassName="page-link"
					previousClassName="page-item"
					previousLinkClassName="page-link"
					nextClassName="page-item"
					nextLinkClassName="page-link"
					breakLabel="..."
					breakClassName="page-item"
					breakLinkClassName="page-link"
					containerClassName="pagination"
					activeClassName="active"
					renderOnZeroPageCount={null}
				/>

				<ModalAddUser
					show={isShowModalAddNew}
					handleClose={handleClose}
					handleUpdateTable={handleUpdateTable}
				/>

				<ModalEditUser
					show={isShowModalEdit}
					dataUserEdit={dataUserEdit}
					handleClose={handleClose}
					handleEditUserFromModal={handleEditUserFromModal}
				/>
			</div>
		</>
	);
};

export default TableUsers;
