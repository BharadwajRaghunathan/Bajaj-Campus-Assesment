import React from 'react';
import { FaCalendarCheck, FaMapMarkerAlt, FaRupeeSign, FaClock } from 'react-icons/fa';
import '../styles/DoctorCard.css';

function DoctorCard({ doctor }) {
  const {
    name,
    photo,
    specialities,
    experience,
    fees,
    clinic,
    video_consult,
    in_clinic,
  } = doctor;
  const locality = clinic?.address?.locality || 'Unknown';

  return (
    <div className="doctor-card" data-testid="doctor-card">
      <img
        src={photo !== 'null' && photo ? photo : 'https://via.placeholder.com/120'}
        alt={name}
        className="doctor-photo"
      />
      <div className="doctor-info">
        <h2 data-testid="doctor-name">{name}</h2>
        <p data-testid="doctor-specialty" className="specialty">
          {specialities.map((spec) => spec.name).join(', ')}
        </p>
        <p className="detail">
          <FaMapMarkerAlt className="icon" /> {locality}
        </p>
        <p className="detail" data-testid="doctor-experience">
          <FaClock className="icon" /> {experience}
        </p>
        <p className="detail" data-testid="doctor-fee">
          <FaRupeeSign className="icon" /> {fees}
        </p>
        <p className="consultation">
          Consultation: {video_consult && 'Video'} {in_clinic && 'In Clinic'}
        </p>
        <button className="book-appointment-btn">
          <FaCalendarCheck className="btn-icon" /> Book Appointment
        </button>
      </div>
    </div>
  );
}

export default DoctorCard;