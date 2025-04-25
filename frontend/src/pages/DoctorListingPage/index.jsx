import React, { useState, useEffect, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import SearchBar from '../../components/SearchBar';
import FilterPanel from '../../components/FilterPanel';
import DoctorCard from '../../components/DoctorCard';
import '../../styles/DoctorListingPage.css';

function DoctorListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize filters from URL parameters or default to empty
  // eslint-disable-next-line no-unused-vars
  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    consultationType: searchParams.get('consultation') || '',
    selectedSpecialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
    sortOption: searchParams.get('sort') || '',
  });

  // Fetch doctor data on component mount
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true); // Set loading to true when fetching starts
        const response = await axios.get(
          'https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json'
        );
        setDoctors(response.data);
        setFilteredDoctors(response.data);
        const allSpecialties = response.data.flatMap((doctor) =>
          doctor.specialities.map((spec) => spec.name)
        );
        const uniqueSpecialties = [...new Set(allSpecialties)];
        setSpecialties(uniqueSpecialties);
        setLoading(false); // Set loading to false after data is fetched
      } catch (err) {
        setError('Failed to fetch doctor data');
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  // Memoize applyFilters to prevent unnecessary re-renders
  const applyFilters = useCallback((currentFilters) => {
    let filtered = [...doctors];

    // Apply search filter if search term exists
    if (currentFilters.search) {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(currentFilters.search.toLowerCase())
      );
    }

    // Apply consultation type filter
    if (currentFilters.consultationType) {
      filtered = filtered.filter(
        (doctor) => doctor[currentFilters.consultationType]
      );
    }

    // Apply specialties filter
    if (currentFilters.selectedSpecialties.length > 0) {
      filtered = filtered.filter((doctor) =>
        doctor.specialities.some((spec) =>
          currentFilters.selectedSpecialties.includes(spec.name)
        )
      );
    }

    // Apply sorting
    if (currentFilters.sortOption) {
      if (currentFilters.sortOption === 'fees') {
        filtered.sort(
          (a, b) =>
            parseInt(a.fees.replace('₹ ', '')) -
            parseInt(b.fees.replace('₹ ', ''))
        );
      } else if (currentFilters.sortOption === 'experience') {
        filtered.sort(
          (a, b) => parseInt(b.experience) - parseInt(a.experience)
        );
      }
    }

    setFilteredDoctors(filtered);
  }, [doctors]);

  // Sync filters with URL parameters and apply them
  useEffect(() => {
    const currentParams = {
      search: searchParams.get('search') || '',
      consultationType: searchParams.get('consultation') || '',
      selectedSpecialties: searchParams.get('specialties')?.split(',').filter(Boolean) || [],
      sortOption: searchParams.get('sort') || '',
    };
    setFilters(currentParams);
    applyFilters(currentParams);
  }, [searchParams, doctors, applyFilters]);

  // Handle search input changes
  const handleSearch = (searchTerm) => {
    setFilters((prev) => {
      const newFilters = { ...prev, search: searchTerm };
      setSearchParams({
        search: searchTerm,
        consultation: newFilters.consultationType,
        specialties: newFilters.selectedSpecialties.join(','),
        sort: newFilters.sortOption,
      });
      return newFilters;
    });
  };

  // Handle filter changes from the FilterPanel
  const handleFilterChange = (newFilter) => {
    setFilters((prev) => {
      const updatedFilters = {
        ...prev,
        ...newFilter,
        selectedSpecialties: newFilter.selectedSpecialties || prev.selectedSpecialties,
      };
      setSearchParams({
        search: updatedFilters.search,
        consultation: updatedFilters.consultationType,
        specialties: updatedFilters.selectedSpecialties.join(','),
        sort: updatedFilters.sortOption,
      });
      return updatedFilters;
    });
  };

  // Render the component
  return (
    <div className="doctor-listing-page">
      <div className="search-bar-wrapper">
        <SearchBar doctors={doctors} onSearch={handleSearch} />
      </div>
      <div className="main-content">
        <div className="filter-panel-wrapper">
          <FilterPanel specialties={specialties} onFilterChange={handleFilterChange} />
        </div>
        <div className="doctor-list">
          {loading ? (
            <div className="loading">Loading...</div>
          ) : error ? (
            <div className="error">{error}</div>
          ) : filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <p className="no-results">No doctors found matching your criteria.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DoctorListingPage;