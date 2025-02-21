import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useSearchParams } from "react-router-dom";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchParams({ query: input + " hello" }); 
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter text"
      />
      <button onClick={handleSearch}>Search</button>

      <p>Current URL: ?{searchParams.toString()}</p>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SearchComponent />} />
      </Routes>
    </Router>
  );
};

export default App;
