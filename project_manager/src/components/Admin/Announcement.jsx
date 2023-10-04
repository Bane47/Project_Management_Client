import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
          window.location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      alert("Field Cannot be Empty");
    }
  };

  useEffect(() => {
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
  }, []);
  const deleteMessage = (messageId) => {
    axios
      .delete(`http://localhost:3001/delete-message/${messageId}`)
      .then((response) => {
        const updatedMessages = receivedMessage.filter(
          (item) => item._id !== messageId
        );
        setReceivedMessage(updatedMessages);
        console.log("message deleted of id", messageId);
      });
  };

  return (
    <div className="container mt-4">
      <div className="row d-flex flex-row">
        <div className="col-7">
        <h2>Make an Announcement to Employees</h2>
        </div>
        <div className="col-5">
        <Link
          to="/history"
          className="btn add-employeebtn text-white w-25 float-end me-3"
        >
          History
        </Link>
        </div>
      </div>
      <div className="mb-3">
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
      <button className="btn btn-primary" onClick={sendMessage}>
        Send
      </button>

      {receivedMessage.length > 0 && (
        <div className="mt-4">
          <h3>Announcement:</h3>
          {receivedMessage.map((item) => (
            <div key={item._id} className="alert alert-info" role="alert">
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
