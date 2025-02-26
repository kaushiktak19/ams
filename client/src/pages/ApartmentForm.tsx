import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Apartment {
  address: string;
  floor: number;
  stairsOrElevator: string;
  size: number;
}

const ApartmentForm = () => {
  const [formData, setFormData] = useState<Apartment>({
    address: '',
    floor: 0,
    stairsOrElevator: 'stairs',
    size: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      // Fetch existing apartment details if editing
      const fetchApartment = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/apartments/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error('Error fetching apartment details:', error);
        }
      };

      fetchApartment();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'floor' || name === 'size' ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        // Edit existing apartment
        await axios.put(`http://localhost:5000/api/apartments/${id}`, formData);
      } else {
        // Add new apartment
        await axios.post('http://localhost:5000/api/apartments', formData);
      }
      navigate('/');
    } catch (error) {
      console.error('Error saving apartment:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{id ? 'Edit Apartment' : 'Add Apartment'}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Floor</label>
          <input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Access Method</label>
          <select
            name="stairsOrElevator"
            value={formData.stairsOrElevator}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="stairs">Stairs</option>
            <option value="elevator">Elevator</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">Size (sqm)</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {id ? 'Update Apartment' : 'Add Apartment'}
        </button>
      </form>
    </div>
  );
};

export default ApartmentForm;
