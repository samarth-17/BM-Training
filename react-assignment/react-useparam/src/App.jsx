import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";

const SearchComponent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState("");

  const handleSearch = () => {
    setSearchParams({ query: input }); 
  };

  return (
    <div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter search text"
      />
      <button onClick={handleSearch}>Search</button>

      <p>Current URL: ?{searchParams.toString()}</p>
    </div>
  );
};

export default SearchComponent;
