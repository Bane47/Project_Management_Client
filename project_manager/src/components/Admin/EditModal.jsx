import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditModal = ({ employee, onClose }) => {
  const [editedEmployee, setEditedEmployee] = useState(employee);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEmployee({ ...editedEmployee, [name]: value });
  };

  const handleSave = () => {
    // Send a PUT request to update the employee data
    axios
      .put(
        `http://localhost:3001/updateEmployee/${editedEmployee.EmployeeId}`,
        editedEmployee
      )
      .then((response) => {
        console.log("Employee data updated successfully", response.data);
        onClose(); // Close the modal after successful update
        toast.success("Edited SuccessFully", {
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
        console.error("Error updating employee data", error);
      });
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="employeeName">
            <Form.Label>Employee Name</Form.Label>
            <Form.Control
              type="text"
              name="EmployeeName"
              value={editedEmployee.EmployeeName}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="employeeEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="Email"
              value={editedEmployee.Email}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="employeeDesignation">
            <Form.Label>Designation</Form.Label>
            <Form.Control
              type="text"
              name="Designation"
              value={editedEmployee.Designation}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="employeeDomain">
            <Form.Label>Domain</Form.Label>
            <Form.Control
              type="text"
              name="Domain1" // Change this to "Domain1"
              value={editedEmployee.Domain1} // Change this to "Domain1"
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="SkypeID">
            <Form.Label>SkypeId</Form.Label>
            <Form.Control
              type="text"
              name="SkypeId" // Change this to "Domain1"
              value={editedEmployee.SkypeId} // Change this to "Domain1"
              onChange={handleInputChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditModal;
