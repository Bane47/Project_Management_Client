import axios from "axios";
import React, { useEffect, useState } from "react";

const AnnouncementHistory = () => {
  const [announcedMessages, setAnnouncedMessages] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/Get-Message").then((res) => {
      const deletedMessages = res.data.filter(
        (message) => message.deleted === "true"
      );
      setAnnouncedMessages(deletedMessages);
      console.log(deletedMessages);
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  return (
    <div>
      <h2 className="mt-3">Announcement History</h2>
      <table className="table table-bordered table-striped table-report mt-3">
        <thead className="thead-dark">
          <tr>
            <th>Message</th>
            <th>Announcement Date</th>
          </tr>
        </thead>
        <tbody>
          {announcedMessages.map((message) => (
            <tr key={message._id}>
              <td>{message.message}</td>
              <td>{formatDate(message.announcementTime)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AnnouncementHistory;
