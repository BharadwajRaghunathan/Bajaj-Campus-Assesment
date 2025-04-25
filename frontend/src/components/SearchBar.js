import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaSearch } from 'react-icons/fa';
import '../styles/SearchBar.css';

function SearchBar({ doctors, onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value); // Update search filter on every input change
    if (value) {
      const filteredSuggestions = doctors
        .filter((doctor) =>
          doctor.name.toLowerCase().includes(value.toLowerCase())
        )
        .map((doctor) => doctor.name)
        .slice(0, 3);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSearchTerm(suggestion);
    setSuggestions([]);
    onSearch(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      setSuggestions([]);
      onSearch(searchTerm);
    }
  };

  return (
    <div className="search-bar-container">
      <motion.div
        className="search-bar"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaSearch className="search-icon" />
        <input
          type="text"
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          data-testid="autocomplete-input"
          placeholder="Search doctors by name..."
          className="search-input"
        />
      </motion.div>
      <AnimatePresence>
        {suggestions.length > 0 && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="suggestions-list"
          >
            {suggestions.map((suggestion, index) => (
              <motion.li
                key={index}
                data-testid="suggestion-item"
                onClick={() => handleSuggestionClick(suggestion)}
                whileHover={{ backgroundColor: '#f0f0f0', scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="suggestion-item"
              >
                {suggestion}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default SearchBar;