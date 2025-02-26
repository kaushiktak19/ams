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
  _id?: string;
  name: string;
  items: Item[]; // Using items with dimensions
}

const InventoryReview = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing rooms for review
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/apartments/${id}/rooms`);
        console.log('Rooms API Response:', response.data);

        // Ensure items is always an array and map it correctly
        const roomsWithItems = response.data.map((room: Room) => ({
          ...room,
          items: room.items || [],
        }));
        setRooms(roomsWithItems);
      } catch (error) {
        console.error('Error fetching rooms:', error);
      }
    };

    fetchRooms();
  }, [id]);

  // Navigate to InventoryEdit form to add a new room
  const addRoom = () => {
    navigate(`/apartment/${id}/inventory/new`);
  };

  // Navigate to InventoryEdit form to edit an existing room
  const editRoom = (roomId: string) => {
    navigate(`/apartment/${id}/inventory/${roomId}/edit`);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Inventory Details</h1>

      {/* Room List */}
      {rooms.map((room, roomIndex) => (
        <div key={roomIndex} className="mb-4 border-b pb-4">
          <h2 className="text-xl font-semibold mb-2">{room.name}</h2>
          
          <h3 className="font-semibold mb-2">Furniture:</h3>
          {room.items.length > 0 ? (
            room.items.map((item, itemIndex) => (
              <div key={itemIndex} className="ml-4 mb-2">
                <p>
                  <span className="font-semibold">{item.name}</span>
                  <br />
                  <span className="text-sm text-gray-600">
                    Dimensions: {item.length}cm x {item.width}cm x {item.height}cm
                  </span>
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-500 ml-4">No furniture added yet.</p>
          )}

          {/* Edit Room Button */}
          <button
            onClick={() => editRoom(room._id!)}
            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-3 rounded"
          >
            Edit Room
          </button>
        </div>
      ))}

      {/* Add New Room */}
      <button
        onClick={addRoom}
        className="mt-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Room
      </button>
    </div>
  );
};

export default InventoryReview;
