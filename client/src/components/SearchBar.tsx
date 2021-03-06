import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Search } from 'react-feather';

interface SearchBarProps {
  handleLinkClicks: () => void;
  menuCollapse: boolean;
}

const SearchBar: React.FC<SearchBarProps> = (props) => {
  const [input, setInput] = useState('');
  const history = useHistory();

  const onFormSubmit = (e: React.SyntheticEvent): void => {
    e.preventDefault();
    if (input) {
      history.push(`/${input}`);
    }
    setInput('');
    props.handleLinkClicks();
  };

  return (
    <div className="searchbar">
      <form onSubmit={onFormSubmit} className="searchbar__form">
        <input
          onChange={(event) => setInput(event.target.value)}
          className="searchbar__input"
          value={input}
          type="text"
        />
        <Search onClick={onFormSubmit} className="searchbar__searchbutton" />
      </form>
    </div>
  );
};

export default SearchBar;
