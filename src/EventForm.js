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

export default function EventForm() {
  const navigate = useNavigate();
  const [eventsList, setEventsList] = useState(getDatafromEvent());

  const [name, setName] = useState("");
  const [place, setPlace] = useState("");
  const [date, setDate] = useState("");

  const handleSubmitEvent = (e) => {
    e.preventDefault();
    let newEvent = {
      id: eventsList.length + 1,
      name,
      place,
      date,
    };
    setName("");
    setPlace("");
    setDate("");

    localStorage.setItem(
      "eventsList",
      JSON.stringify([...eventsList, newEvent])
    );
    navigate("/eventslist");
  };
  return (
    <div className="event_content">
      <form className="event_form" onSubmit={handleSubmitEvent}>
        <h1 className="event-title">Add New Event</h1>
        <input
          className="event_inputs"
          type="text"
          name="name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Event Name"
        />
        <input
          className="event_inputs"
          type="text"
          required
          name="place"
          onChange={(e) => setPlace(e.target.value)}
          value={place}
          placeholder="Place"
        />
        <input
          className="event_inputs"
          type="date"
          required
          name="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
        />
        <button type="submit" className="event_button">
          Add Event
        </button>
      </form>
    </div>
  );
}
