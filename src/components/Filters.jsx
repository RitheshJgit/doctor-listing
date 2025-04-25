import React from 'react';

const Filters = ({
  specialties,
  selectedSpecialties,
  setSelectedSpecialties,
  consultationMode,
  setConsultationMode,
  sortBy,
  setSortBy
}) => {
  const handleSpecialtyChange = (specialty) => {
    setSelectedSpecialties(prev => 
      prev.includes(specialty)
        ? prev.filter(s => s !== specialty)
        : [...prev, specialty]
    );
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 border border-gray-100">
      <div className="mb-6">
        <h3 className="font-bold mb-3 text-blue-800" data-testid="filter-header-speciality">Specialities</h3>
        <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
          {specialties.map(specialty => (
            <div key={specialty} className="flex items-center">
              <input
                type="checkbox"
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onChange={() => handleSpecialtyChange(specialty)}
                className="mr-2 h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                data-testid={`filter-specialty-${specialty.replace(/\s+/g, '-').replace(/\//g, '-')}`}
              />
              <label htmlFor={`specialty-${specialty}`} className="text-gray-700">{specialty}</label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="font-bold mb-3 text-blue-800" data-testid="filter-header-moc">Mode of Consultation</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="video-consult"
              name="consultation"
              checked={consultationMode === 'video'}
              onChange={() => setConsultationMode('video')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              data-testid="filter-video-consult"
            />
            <label htmlFor="video-consult" className="text-gray-700">Video Consultation</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="in-clinic"
              name="consultation"
              checked={consultationMode === 'clinic'}
              onChange={() => setConsultationMode('clinic')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              data-testid="filter-in-clinic"
            />
            <label htmlFor="in-clinic" className="text-gray-700">In Clinic Consultation</label>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-bold mb-3 text-blue-800" data-testid="filter-header-sort">Sort by</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-fees"
              name="sort"
              checked={sortBy === 'fees'}
              onChange={() => setSortBy('fees')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              data-testid="sort-fees"
            />
            <label htmlFor="sort-fees" className="text-gray-700">Fees (Low to High)</label>
          </div>
          <div className="flex items-center">
            <input
              type="radio"
              id="sort-experience"
              name="sort"
              checked={sortBy === 'experience'}
              onChange={() => setSortBy('experience')}
              className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500"
              data-testid="sort-experience"
            />
            <label htmlFor="sort-experience" className="text-gray-700">Experience (High to Low)</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;