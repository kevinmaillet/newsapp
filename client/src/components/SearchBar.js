import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Search } from "react-feather";



const SearchBar = (props) => {
  const [input, setInput] = useState("");
  const history = useHistory();

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (input) {
      history.push(`/${input}`);
    }
    setInput("");
    props.handleLinkClicks();
  };

  return (
    <div className="searchbar">
      <form onSubmit={onFormSubmit}>
        <input
          onChange={(event) => setInput(event.target.value)}
          className="searchbar-input"
          value={input}
          type="text"
        />
        <Search onClick={onFormSubmit} className="searchbutton"/>
      </form>
    </div>
  );
};

export default SearchBar;
