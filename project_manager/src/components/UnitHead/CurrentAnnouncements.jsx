import React, { useEffect, useState } from "react";
import axios from "axios";

const CurrentAnnouncements = () => {
  const [receivedMessages, setReceivedMessages] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Get-Message")
      .then((res) => {
        const filteredMessages = res.data.filter(
          (message) => message.deleted === "false"
        );
        setReceivedMessages(filteredMessages);
        console.log(filteredMessages);
      })
      .catch((error) => {
        console.log("Error fetching data:", error);
      });
  }, []);

  return (
    <div>
      <h1 className="mt-4 mb-4 ms-3">Announcements</h1>
      {receivedMessages.length === 0 ?(
        <p className="alert alert-primary w-75 ms-3">No Announcements Made!</p>
      ):(
      <div className="row">
        {receivedMessages.map((message) => (
          <div key={message._id} className="col-md-4 mb-4">
            <div className="alert alert-primary" role="alert">
              <p className="mb-0" style={{ fontSize: "18px" }}>
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
      )}
    </div>
  );
};

export default CurrentAnnouncements;
