import React from 'react';
import PropTypes from 'prop-types';

const DoctorCard = ({ doctor }) => {
  return (
    <div 
      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow bg-white mb-4"
      data-testid="doctor-card"
    >
      <div className="flex items-start">
        {doctor.photo && (
          <img 
            src={doctor.photo} 
            alt={doctor.name}
            className="w-16 h-16 rounded-full object-cover mr-4 border-2 border-blue-100"
          />
        )}
        <div className="flex-1">
          <h3 
            className="font-bold text-lg mb-1 text-blue-800"
            data-testid="doctor-name"
          >
            {doctor.name}
          </h3>
          
          <div 
            className="text-gray-600 mb-1"
            data-testid="doctor-specialty"
          >
            {doctor.specialities.map(s => s.name).join(', ')}
          </div>
          
          {doctor.clinic?.name && (
            <p className="text-sm text-gray-500 mb-1">
              {doctor.clinic.name}
            </p>
          )}
          
          <p 
            className="text-sm mb-1 text-gray-700"
            data-testid="doctor-experience"
          >
            {doctor.experience}
          </p>
          
          <p 
            className="text-sm font-semibold text-blue-600 mb-2"
            data-testid="doctor-fee"
          >
            {doctor.fees}
          </p>
          
          <div className="flex gap-2">
            {doctor.video_consult && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                Video Consultation
              </span>
            )}
            {doctor.in_clinic && (
              <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                In-Clinic Consultation
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

DoctorCard.propTypes = {
  doctor: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    photo: PropTypes.string,
    specialities: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string.isRequired
      })
    ).isRequired,
    fees: PropTypes.string.isRequired,
    experience: PropTypes.string.isRequired,
    video_consult: PropTypes.bool.isRequired,
    in_clinic: PropTypes.bool.isRequired,
    clinic: PropTypes.shape({
      name: PropTypes.string,
      address: PropTypes.object
    })
  }).isRequired
};

export default DoctorCard;