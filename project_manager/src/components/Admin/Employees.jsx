import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  useTable,
  useSortBy,
  useGlobalFilter,
  usePagination,
} from "react-table";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./Employee.css";
import { Link } from "react-router-dom";
import EditModal from "./EditModal";
import Deletemodal from "./DeleteModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Employees = () => {
  const [empData, setEmpData] = useState([]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  useEffect(() => {
    fetchEmployeeData();
  }, []);

  const fetchEmployeeData = () => {
    axios.get("http://localhost:3001/getEmp-data").then((res) => {
      const filteredData = res.data.filter(
        (employee) => employee.EmployeeName !== "Admin"
      );
      setEmpData(filteredData);
    });
  };

  const columns = React.useMemo(
    () => [
      {
        Header: "Employee Name",
        accessor: "EmployeeName",
      },
      {
        Header: "Employee ID",
        accessor: "EmployeeId",
      },
      {
        Header: "Gender",
        accessor: "Gender",
      },
      {
        Header: "Email",
        accessor: "Email",
      },
      {
        Header: "Domain",
        accessor: "Domain1",
      },
      {
        Header: "Designation",
        accessor: "Designation",
      },
      {
        Header: "Actions",
        accessor: "actions",
        Cell: ({ row }) => (
          <div className="btn-group" role="group">
            <button
              onClick={() => handleEdit(row.original)}
              className="btn add-employeebtn text-white"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button
              onClick={() => handleDelete(row.original)}
              className="btn btn-danger"
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    state: { pageIndex, globalFilter },
    pageCount,
    canPreviousPage,
    canNextPage,
    nextPage,
    previousPage,
    setPageSize,
    setGlobalFilter,
  } = useTable(
    {
      columns,
      data: empData,
      initialState: {
        pageSize: 5,
      },
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  const handleEdit = (employee) => {
    setEditEmployee(employee);
    setIsEditModalOpen(true);
  };

  const handleDelete = (employee) => {
    setEmployeeToDelete(employee);
    setIsDeleteModalOpen(true);
  };

  const closeEditModal = () => {
    setEditEmployee(null);
    setIsEditModalOpen(false);
    fetchEmployeeData();
  };

  const closeDeleteModal = () => {
    setEmployeeToDelete(null);
    setIsDeleteModalOpen(false);
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="row mt-4">
        <div className="col-12 d-flex align-items-center">
          <div>
            <div className="search">
              <input
                type="text"
                placeholder="Search"
                className="py-1 mt-1"
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
              />
            </div>
          </div>

          <div className="add ms-auto">
            <Link
              to="/addemployee"
              className="btn add-employeebtn text-white mb-3 me-md-2"
            >
              Add Employee
            </Link>
          </div>
        </div>
      </div>
      <div className="table-container">
        <table {...getTableProps()} className="custom-table">
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="pagination fixed-bottom mb-1 mb-md-5 ms-5">
        <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
          {"<<"}
        </button>{" "}
        <button onClick={() => previousPage()} disabled={!canPreviousPage}>
          {"<"}
        </button>{" "}
        <button onClick={() => nextPage()} disabled={!canNextPage}>
          {">"}
        </button>{" "}
        <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
          {">>"}
        </button>{" "}
        <span>
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>{" "}
        </span>
      </div>
      {isEditModalOpen && (
        <EditModal employee={editEmployee} onClose={closeEditModal} />
      )}
      {isDeleteModalOpen && (
        <Deletemodal
          show={isDeleteModalOpen}
          onClose={closeDeleteModal}
          onDelete={() => {
            axios
              .post("http://localhost:3001/deleteEmployee", {
                employee: employeeToDelete,
              })
              .then((response) => {
                toast.success("Deleted Successfully!", {
                  position: "top-right",
                  autoClose: 2000,
                  hideProgressBar: true,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                  theme: "dark",
                });
              })
              .catch((error) => {
                console.error("Error deleting employee:", error);
              })
              .finally(() => {
                closeDeleteModal();
                fetchEmployeeData();
              });
          }}
        />
      )}
    </div>
  );
};

export default Employees;
