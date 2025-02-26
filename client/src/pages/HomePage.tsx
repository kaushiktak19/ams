import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface Apartment {
  _id: string;
  address: string;
  floor: number;
  stairsOrElevator: string;
  size: number;
}

const HomePage = () => {
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/apartments');
        setApartments(response.data);
      } catch (error) {
        console.error('Error fetching apartments:', error);
      }
    };

    fetchApartments();
  }, []);

  const handleAddApartment = () => {
    navigate('/apartment/add');
  };

  const handleEditApartment = (id: string) => {
    navigate(`/apartment/edit/${id}`);
  };

  const handleViewDetails = (id: string) => {
    navigate(`/apartment/${id}/inventory`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Apartments</h1>
      <button
        onClick={handleAddApartment}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
      >
        Add Apartment
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {apartments.map((apartment) => (
          <div
            key={apartment._id}
            className="border p-4 rounded shadow hover:shadow-md transition"
          >
            <h2 className="text-xl font-semibold">{apartment.address}</h2>
            <p>Floor: {apartment.floor}</p>
            <p>Access: {apartment.stairsOrElevator}</p>
            <p>Size: {apartment.size} sqm</p>
            <div className="mt-4 space-x-2">
              <button
                onClick={() => handleEditApartment(apartment._id)}
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-1 px-3 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleViewDetails(apartment._id)}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-3 rounded"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
