import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil, Plus } from "lucide-react";
import api from "@/api/axios";

interface Item {
  name: string;
  length: number;
  width: number;
  height: number;
}

interface Room {
  _id?: string;
  name: string;
  items: Item[];
}

const InventoryReview = () => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch existing rooms for review
  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await api.get(`/api/apartments/${id}/rooms`);
        console.log("Rooms API Response:", response.data);

        // Ensure items is always an array and map it correctly
        const roomsWithItems = response.data.map((room: Room) => ({
          ...room,
          items: room.items || [],
        }));
        setRooms(roomsWithItems);
      } catch (error) {
        console.error("Error fetching rooms:", error);
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

  // Validation to ensure at least one room is added
  const isValidForProceed = rooms.length > 0;

  return (
    <div className="flex justify-center items-center h-screen">
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate(-1)} className="space-x-2">
              <span>← BACK</span>
            </Button>
            <Button variant="outline" onClick={addRoom} className="space-x-2">
              <Plus className="h-4 w-4" />
              <span>ADD MORE ROOMS</span>
            </Button>
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="text-2xl font-bold">Inventory Details</CardTitle>
            <CardDescription>Please review your Inventory and add/edit if required.</CardDescription>
          </div>
          <div className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm w-fit mx-auto">STEP 2/3</div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Scrollable section for rooms */}
          <div className="max-h-[60vh] overflow-y-auto">
            {rooms.length > 0 ? (
              rooms.map((room, index) => (
                <div key={index} className="bg-[#E8F8F8] rounded-lg p-4 m-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-3">
                      <h3 className="font-medium text-lg">{room.name}</h3>
                      {room.items.length > 0 ? (
                        room.items.map((item, itemIndex) => (
                          <div key={itemIndex} className="space-y-0.5">
                            <div className="font-medium">{item.name}</div>
                            <div className="text-sm text-muted-foreground">
                              Width: {item.width} × Height: {item.height} × Length: {item.length}
                            </div>
                          </div>
                        ))
                      ) : (
                        <p className="text-gray-500">No furniture added yet.</p>
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-gray-500 hover:text-gray-700"
                      onClick={() => editRoom(room._id!)}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No rooms added yet.</p>
            )}
          </div>

          {/* Proceed Button */}
          <div className="flex justify-between space-x-2">
            <Button
              className="w-full"
              onClick={() => navigate(`/`)}
              disabled={!isValidForProceed}
            >
              Proceed
            </Button>
          </div>

          {/* Error message */}
          {!isValidForProceed && (
            <p className="text-red-500 text-center mt-4">
              Please add at least one room before proceeding.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryReview;
