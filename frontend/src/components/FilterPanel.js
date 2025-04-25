import React, { useState } from 'react';
import { FaTimes, FaSearch } from 'react-icons/fa';
import '../styles/FilterPanel.css';

function FilterPanel({ specialties, onFilterChange }) {
  const [consultationType, setConsultationType] = useState('');
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [sortOption, setSortOption] = useState('');
  const [specialtySearch, setSpecialtySearch] = useState('');

  const filteredSpecialties = specialties.filter((specialty) =>
    specialty.toLowerCase().includes(specialtySearch.toLowerCase())
  );

  const handleConsultationChange = (e) => {
    const value = e.target.value;
    setConsultationType(value);
    onFilterChange({ consultationType: value });
  };

  const handleSpecialtyChange = (e) => {
    const value = e.target.value;
    const updatedSpecialties = selectedSpecialties.includes(value)
      ? selectedSpecialties.filter((spec) => spec !== value)
      : [...selectedSpecialties, value];
    setSelectedSpecialties(updatedSpecialties);
    onFilterChange({ selectedSpecialties: updatedSpecialties });
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    onFilterChange({ sortOption: value });
  };

  const handleClearAll = () => {
    setConsultationType('');
    setSelectedSpecialties([]);
    setSortOption('');
    setSpecialtySearch('');
    onFilterChange({
      consultationType: '',
      selectedSpecialties: [],
      sortOption: '',
    });
  };

  return (
    <div className="filter-panel">
      <div className="filter-header">
        <h3>Filters</h3>
        <button onClick={handleClearAll} className="clear-all-btn" aria-label="Clear all filters">
          <FaTimes /> Clear All
        </button>
      </div>

      <h4 data-testid="filter-header-moc">Consultation Mode</h4>
      <label className="filter-option">
        <input
          type="radio"
          name="consultation"
          value="video_consult"
          checked={consultationType === 'video_consult'}
          onChange={handleConsultationChange}
          data-testid="filter-video-consult"
        />
        Video Consult
      </label>
      <label className="filter-option">
        <input
          type="radio"
          name="consultation"
          value="in_clinic"
          checked={consultationType === 'in_clinic'}
          onChange={handleConsultationChange}
          data-testid="filter-in-clinic"
        />
        In Clinic
      </label>

      <h4 data-testid="filter-header-speciality">Specialties</h4>
      <div className="specialty-search-wrapper">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search specialties..."
          value={specialtySearch}
          onChange={(e) => setSpecialtySearch(e.target.value)}
          className="specialty-search"
          aria-label="Search specialties"
        />
        {specialtySearch && (
          <button
            className="clear-search-btn"
            onClick={() => setSpecialtySearch('')}
            aria-label="Clear specialty search"
          >
            <FaTimes />
          </button>
        )}
      </div>
      <div className="specialties-list">
        {filteredSpecialties.map((specialty) => (
          <label key={specialty} className="checkbox-label">
            <input
              type="checkbox"
              value={specialty}
              checked={selectedSpecialties.includes(specialty)}
              onChange={handleSpecialtyChange}
              data-testid={`filter-specialty-${specialty.replace(/[ /]/g, '-')}`}
            />
            {specialty}
          </label>
        ))}
      </div>

      <h4 data-testid="filter-header-sort">Sort By</h4>
      <label className="filter-option">
        <input
          type="radio"
          name="sort"
          value="fees"
          checked={sortOption === 'fees'}
          onChange={handleSortChange}
          data-testid="sort-fees"
        />
        Price: Low-High
      </label>
      <label className="filter-option">
        <input
          type="radio"
          name="sort"
          value="experience"
          checked={sortOption === 'experience'}
          onChange={handleSortChange}
          data-testid="sort-experience"
        />
        Experience: Most experienced first
      </label>
    </div>
  );
}

export default FilterPanel;