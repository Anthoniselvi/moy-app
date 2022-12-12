import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const getDatafromEvent = () => {
  const data = localStorage.getItem("eventsList");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
const getEntryData = () => {
  const data = localStorage.getItem("entries");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};

export default function EventsList() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState(getDatafromEvent());
  const [entries, setEntries] = useState(getEntryData());

  const getTotalAmount = (eventId) => {
    console.log("Getting total amount for event id :" + eventId);
    console.log(entries);
    const totalAmount = entries
      .filter((entry) => parseInt(entry.eventId) === eventId)
      .map((entry) => parseInt(entry.amount))
      .reduce((acc, value) => acc + +value, 0);
    console.log(totalAmount);
    return totalAmount;
  };

  const getTotalGift = (eventId) => {
    console.log("Getting total gift for event id :" + eventId);
    const totalGift = entries
      .filter((entry) => parseInt(entry.eventId) === eventId)
      .map((entry) => parseInt(entry.gift))
      .reduce((acc, value) => acc + +value, 0);
    console.log(totalGift);
    return totalGift;
  };

  const navigateToAddNewEvent = () => {
    navigate("/event/new");
  };

  const navigateToEntryList = (id) => {
    navigate(`/entryList?event=${id}`);
  };

  return (
    <div className="event_content">
      <div className="event-list-container">
        {eventsList.length > 0 && (
          <>
            {eventsList.map((event) => (
              <div
                className="event-inner-box"
                onClick={() => navigateToEntryList(event.id)}
              >
                <div className="event_head_name">
                  <h4>{event.name}</h4>
                </div>
                <table className="event-table">
                  <tr>
                    <td>Amount</td>
                    <td>{getTotalAmount(event.id)}</td>
                  </tr>
                  <tr>
                    <td>Things</td>
                    <td>{getTotalGift(event.id)}</td>
                  </tr>
                </table>
              </div>
            ))}
          </>
        )}

        {eventsList.length < 1 && <p>No Events found</p>}

        <button className="addevent-button" onClick={navigateToAddNewEvent}>
          Add New Event
        </button>
      </div>
    </div>
  );
}
