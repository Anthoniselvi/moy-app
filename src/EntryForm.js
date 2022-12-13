import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
const getDatafromEntry = () => {
  const data = localStorage.getItem("entries");
  if (data) {
    return JSON.parse(data);
  } else {
    return [];
  }
};
// const getDatafromEntry = (eventId) => {
//   const data = localStorage.getItem("entries");
//   if (data) {
//     return JSON.parse(data).filter((entry) => {
//       return entry.eventId === eventId;
//     });
//   } else {
//     return [];
//   }
// };

export default function EntryForm() {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");

  const [entries, setEntries] = useState(getDatafromEntry());
  const [personName, setPersonName] = useState("");
  const [city, setCity] = useState("");
  const [amount, setAmount] = useState(0);
  const [gift, setGift] = useState(0);

  const handleSubmitEvent = (e) => {
    console.log(entries);
    e.preventDefault();
    let entry = {
      id: eventId,
      personName,
      city,
      amount,
      gift,
    };

    setPersonName("");
    setCity("");
    setAmount("");
    setGift("");

    localStorage.setItem("entries", JSON.stringify([...entries, entry]));
    navigate("/entrylist");
    // navigate(`/entryList?event=${id}`);
  };

  return (
    <div>
      Add New Entry
      <form className="entry_form" onSubmit={handleSubmitEvent}>
        <h1 className="entry-title">Add New Entry</h1>
        <input
          className="entry_inputs"
          type="text"
          name="name"
          required
          onChange={(e) => setPersonName(e.target.value)}
          value={personName}
          placeholder="Person Name"
        />
        <input
          className="entry_inputs"
          type="text"
          required
          name="city"
          onChange={(e) => setCity(e.target.value)}
          value={city}
          placeholder="City Name"
        />
        <input
          className="entry_inputs"
          type="number"
          required
          name="amount"
          onChange={(e) => setAmount(e.target.value)}
          value={amount}
        />
        <input
          className="entry_inputs"
          type="number"
          required
          name="gift"
          onChange={(e) => setGift(e.target.value)}
          value={gift}
        />
        <button className="entry_button" type="submit">
          Add Entry
        </button>
      </form>
    </div>
  );
}
