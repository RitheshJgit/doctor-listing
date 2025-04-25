import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import DoctorCard from './components/DoctorCard';
import Filters from './components/Filters';
import SearchBar from './components/SearchBar';

const App = () => {
  const [doctors, setDoctors] = useState([]);
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialties, setSelectedSpecialties] = useState([]);
  const [consultationMode, setConsultationMode] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [searchParams, setSearchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('https://srijandubey.github.io/campus-api-mock/SRM-C1-25.json');
        const data = await response.json();
        setDoctors(data);
        setFilteredDoctors(data);

        const allSpecialties = new Set();
        data.forEach(doctor => {
          doctor.specialities.forEach(spec => allSpecialties.add(spec.name));
        });
        setSpecialties(Array.from(allSpecialties).sort());

        const urlSpecialties = searchParams.get('specialties');
        const urlMode = searchParams.get('mode');
        const urlSort = searchParams.get('sort');

        if (urlSpecialties) setSelectedSpecialties(urlSpecialties.split(','));
        if (urlMode) setConsultationMode(urlMode);
        if (urlSort) setSortBy(urlSort);

        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  useEffect(() => {
    if (!doctors.length) return;

    let result = [...doctors];

    if (searchTerm) {
      result = result.filter(doctor =>
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedSpecialties.length > 0) {
      result = result.filter(doctor => {
        const doctorSpecialties = doctor.specialities.map(s => s.name);
        return selectedSpecialties.some(spec => doctorSpecialties.includes(spec));
      });
    }

    if (consultationMode === 'video') {
      result = result.filter(doctor => doctor.video_consult);
    } else if (consultationMode === 'clinic') {
      result = result.filter(doctor => doctor.in_clinic);
    }

    if (sortBy === 'fees') {
      result.sort((a, b) => {
        const feeA = parseInt(a.fees.replace(/[^\d]/g, ''));
        const feeB = parseInt(b.fees.replace(/[^\d]/g, ''));
        return feeA - feeB;
      });
    } else if (sortBy === 'experience') {
      result.sort((a, b) => parseInt(b.experience) - parseInt(a.experience));
    }

    setFilteredDoctors(result);

    const params = {};
    if (searchTerm) params.search = searchTerm;
    if (selectedSpecialties.length) params.specialties = selectedSpecialties.join(',');
    if (consultationMode) params.mode = consultationMode;
    if (sortBy) params.sort = sortBy;

    setSearchParams(params);
  }, [searchTerm, selectedSpecialties, consultationMode, sortBy, doctors]);

  const clearAllFilters = () => {
    setSearchTerm('');
    setSelectedSpecialties([]);
    setConsultationMode('');
    setSortBy('');
  };

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="min-h-screen bg-blue-50">
      {/* Navbar with Search Bar */}
      <nav className="bg-blue-900 shadow-md">
        <div className="container mx-auto px-1">
          <div className="flex flex-col py-1">
            <SearchBar 
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              doctors={doctors}
            />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters Section */}
          <div className="w-full md:w-1/4">
            <Filters
              specialties={specialties}
              selectedSpecialties={selectedSpecialties}
              setSelectedSpecialties={setSelectedSpecialties}
              consultationMode={consultationMode}
              setConsultationMode={setConsultationMode}
              sortBy={sortBy}
              setSortBy={setSortBy}
            />
            <button 
              onClick={clearAllFilters}
              className="mt-4 w-full px-4 py-2 bg-white border border-blue-200 text-blue-600 rounded-lg hover:bg-blue-50 shadow-sm"
            >
              Clear All Filters
            </button>
          </div>

          {/* Doctors List Section */}
          <div className="w-full md:w-3/4">
            {filteredDoctors.length === 0 ? (
              <div className="text-center py-10 bg-white rounded-lg shadow-sm">
                <p className="text-gray-600">No doctors found matching your criteria.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {filteredDoctors.map(doctor => (
                  <DoctorCard key={doctor.id} doctor={doctor} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;