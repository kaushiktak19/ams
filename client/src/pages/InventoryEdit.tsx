import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

interface Item {
  name: string;
  length: number;
  width: number;
  height: number;
}

interface Room {
  name: string;
  items: Item[];
}

const InventoryEdit = () => {
  const [room, setRoom] = useState<Room>({ name: '', items: [] });
  const [isEditing, setIsEditing] = useState(false);
  const { id, roomId } = useParams();
  const navigate = useNavigate();

  // Check if we are in edit mode or add mode
  useEffect(() => {
    if (roomId) {
      setIsEditing(true);
      const fetchRoom = async () => {
        try {
          const response = await axios.get(
            `http://localhost:5000/api/apartments/${id}/rooms/${roomId}`
          );
          if (response.data) {
            setRoom(response.data);
          }
        } catch (error) {
          console.error('Error fetching room:', error);
        }
      };
      fetchRoom();
    } else {
      setIsEditing(false);
    }
  }, [id, roomId]);

  // Handle Room Name Change
  const handleRoomNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRoom({ ...room, name: e.target.value });
  };

  // Handle Furniture Item Change
  const handleItemChange = (
    index: number,
    field: keyof Item,
    value: string
  ) => {
    const updatedItems = [...room.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === 'name' ? value : parseInt(value) || 0,
    };
    setRoom({ ...room, items: updatedItems });
  };

  // Add New Furniture Item
  const addFurnitureItem = () => {
    setRoom({
      ...room,
      items: [...room.items, { name: '', length: 0, width: 0, height: 0 }],
    });
  };

  // Remove Furniture Item
  const removeFurnitureItem = (index: number) => {
    const updatedItems = room.items.filter((_, i) => i !== index);
    setRoom({ ...room, items: updatedItems });
  };

  // Handle Form Submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/apartments/${id}/rooms/${roomId}`,
          room
        );
      } else {
        await axios.post(
          `http://localhost:5000/api/apartments/${id}/rooms`,
          room
        );
      }
      navigate(`/apartment/${id}/inventory`);
    } catch (error) {
      console.error('Error saving room:', error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6">
        {isEditing ? 'Edit Room' : 'Add Room'}
      </h1>

      <form onSubmit={handleSubmit}>
        {/* Room Name */}
        <div className="mb-6">
          <label className="block text-lg font-medium mb-2" htmlFor="room-name">
            Room Name
          </label>
          <input
            type="text"
            id="room-name"
            value={room.name}
            onChange={handleRoomNameChange}
            required
            className="border rounded w-full py-2 px-3"
          />
        </div>

        {/* Furniture Items */}
        <h2 className="text-2xl font-semibold mb-4">Furniture Details</h2>
        {room.items.map((item, index) => (
          <div key={index} className="mb-6 p-4 border rounded-lg shadow-sm">
            <div className="mb-4">
              <label className="block text-lg font-medium">Furniture Name:</label>
              <input
                type="text"
                value={item.name}
                onChange={(e) =>
                  handleItemChange(index, 'name', e.target.value)
                }
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>
            <div className="flex gap-4">
              <input
                type="number"
                value={item.length}
                onChange={(e) =>
                  handleItemChange(index, 'length', e.target.value)
                }
                placeholder="Length (cm)"
                required
                className="border rounded w-full py-2 px-3"
              />
              <input
                type="number"
                value={item.width}
                onChange={(e) =>
                  handleItemChange(index, 'width', e.target.value)
                }
                placeholder="Width (cm)"
                required
                className="border rounded w-full py-2 px-3"
              />
              <input
                type="number"
                value={item.height}
                onChange={(e) =>
                  handleItemChange(index, 'height', e.target.value)
                }
                placeholder="Height (cm)"
                required
                className="border rounded w-full py-2 px-3"
              />
            </div>
            <button
              type="button"
              onClick={() => removeFurnitureItem(index)}
              className="mt-2 bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded"
            >
              Remove Item
            </button>
          </div>
        ))}

        <button
          type="button"
          onClick={addFurnitureItem}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        >
          Add Furniture Item
        </button>

        <button
          type="submit"
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
        >
          {isEditing ? 'Update Room' : 'Add Room'}
        </button>
      </form>
    </div>
  );
};

export default InventoryEdit;
