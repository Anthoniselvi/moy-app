import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import EventsList from "./EventsList";
import EventForm from "./EventForm";
import EntriesList from "./EntriesList";
import EntryForm from "./EntryForm";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<EventsList />} />
            <Route path="eventslist" element={<EventsList />} />
            <Route path="event/new" element={<EventForm />} />
            <Route path="entrylist" element={<EntriesList />} />
            <Route path="entry/new" element={<EntryForm />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
