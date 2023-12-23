import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { fetchAllUsers } from '../services/UserService';
import ReactPaginate from 'react-paginate';

const TableUsers = (props) => {
  const [ listUsers , setListUsers ] = useState([]);
  const [ totalUsers , setTotalUsers ] = useState(0);
  const [ totalPages , setTotalPages ] = useState(0);

  useEffect(() => {
    getUsers();
  }, [])

  const getUsers = async (page) => {
    const result = await fetchAllUsers(page);

    if (result && result.data) {
      setListUsers(result.data);
      setTotalUsers(result.total);
      setTotalPages(result.total_pages);
    }
  }

  const handlePageClick = (event) => {
    getUsers(+event.selected + 1)
  }

  return (
    <>
      <div className="table-wrapper">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            { listUsers && listUsers.length > 0 &&
              listUsers.map((item, index) => {
                return (
                  <tr key={`user-${index}`}>
                    <td>{item.id}</td>
                    <td>{item.email}</td>
                    <td>{item.first_name}</td>
                    <td>{item.last_name}</td>
                  </tr>
                )
              })
            }
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
      </div>
    </>
  );
}

export default TableUsers;