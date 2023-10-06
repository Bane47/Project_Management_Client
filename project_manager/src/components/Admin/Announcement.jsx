import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Announcement = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);

  const sendMessage = (e) => {
    e.preventDefault();

    if (message) {
      const data = { message };

      axios
        .post("http://localhost:3001/Emp-Message", data)
        .then((res) => {
          setMessage("");
          toast("Announcement Successful!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
          handleGetAnnouncementData();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Field Cannot be Empty");
    }
  };

  const handleGetAnnouncementData = () => {
    axios
      .get("http://localhost:3001/Get-Message")
      .then((res) => {
        const filteredMessages = res.data.filter(
          (message) => message.deleted === "false"
        );
        setReceivedMessage(filteredMessages);
        console.log(filteredMessages);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    handleGetAnnouncementData();
  }, []);

  const deleteMessage = (messageId) => {
    axios
      .delete(`http://localhost:3001/delete-message/${messageId}`)
      .then((response) => {
        const updatedMessages = receivedMessage.filter(
          (item) => item._id !== messageId
        );
        setReceivedMessage(updatedMessages);
      })
      .catch((err)=>{
        console.log(err);
      })
  };

  return (
    <div className="container mt-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <div className="row d-flex flex-row me-4 ms-3 ">
        <div className="col-md-7">
          <h2>Make an Announcement to Employees</h2>
        </div>
        <div className="col-md-5">
          <Link
            to="/history"
            className="btn add-employeebtn text-white float-end me-3"
          >
            History
          </Link>
        </div>
      </div>
      <div className="mb-3 mt-4 ms-3">
        <label htmlFor="message" className="form-label">
          Message
        </label>
        <textarea
          className="form-control w-75 "
          id="message"
          rows="4"
          placeholder="Enter your message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button
        className="btn add-employeebtn text-white ms-3"
        onClick={sendMessage}
      >
        Send
      </button>

      {receivedMessage.length > 0 && (
        <div className="mt-4 ms-3 me-3">
          <h3>Current Announcements:</h3>
          {receivedMessage.map((item) => (
            <div
              key={item._id}
              className="alert alert-info w-100 "
              role="alert"
            >
              {item.message}
              <button
                className="btn btn-danger btn-sm float-end"
                onClick={() => deleteMessage(item._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Announcement;
