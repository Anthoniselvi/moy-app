import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const getDatafromEntry = (eventId) => {
  const data = localStorage.getItem("entries");
  if (data) {
    return JSON.parse(data).filter((entry) => {
      return entry.eventId === eventId;
    });
  } else {
    return [];
  }
};

export default function EntriesList(entry) {
  const navigate = useNavigate();
  const [searchParam] = useSearchParams();
  const eventId = searchParam.get("event");
  const [entries, setEntries] = useState(getDatafromEntry(eventId));

  const totalAmount = entries
    .map((entry) => entry.amount)
    .reduce((acc, value) => acc + +value, 0);
  console.log(totalAmount);

  const totalGift = entries
    .map((entry) => entry.gift)
    .reduce((acc, value) => acc + +value, 0);
  console.log(totalGift);

  useEffect(() => {
    localStorage.setItem("entries", JSON.stringify(entries));
  }, [entries]);

  const navigateToEntryForm = () => {
    navigate("/entry/new");
  };
  return (
    <div>
      <h1> Entry List</h1>
      <div className="entry_content">
        {entries.length > 0 && (
          <>
            <div className="entry-inner-box">
              {/* onClick={moveToEntry} */}
              <div className="entry_head_name">
                <h1 className="entry-title">Entry List</h1>
                <table className="entry-table">
                  <tr>
                    <th>Person Name</th>
                    <th>Amount</th>
                    <th>Gift</th>
                  </tr>
                  {entries.map((entry) => (
                    <tr key={entry}>
                      <td>{entry.personName}</td>
                      <td>{entry.amount}</td>
                      <td>{entry.gift}</td>
                    </tr>
                  ))}
                  <tr className="total-entry">
                    <td>Total</td>
                    <td>{totalAmount}</td>
                    <td>{totalGift}</td>
                  </tr>
                </table>
              </div>
            </div>
          </>
        )}

        {entries.length < 1 && <p>No Entries found</p>}
        <button className="addentry-button" onClick={navigateToEntryForm}>
          Add New Entry
        </button>
      </div>
    </div>
  );
}
