import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

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
        const response = await axios.get('/api/apartments/');
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
      <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-8">Apartments</h1>
      <Button onClick={handleAddApartment} className="mb-8">
        + Add Apartment
      </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {apartments.map((apartment) => (
          <Card key={apartment._id} className="hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle>{apartment.address}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Floor:</span> {apartment.floor}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                <span className="font-medium">Access:</span> {apartment.stairsOrElevator}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                <span className="font-medium">Size:</span> {apartment.size} sqm
              </p>
              <div className="flex space-x-3">
                <Button variant="outline" onClick={() => handleEditApartment(apartment._id)}>
                  Edit
                </Button>
                <Button variant="default" onClick={() => handleViewDetails(apartment._id)}>
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default HomePage;