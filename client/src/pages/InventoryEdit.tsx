import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Trash2, Plus } from "lucide-react";
import api from "@/api/axios";

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
  const [room, setRoom] = useState<Room>({ name: "", items: [] });
  const [isEditing, setIsEditing] = useState(false);
  const { id, roomId } = useParams();
  const navigate = useNavigate();

  // Check if we are in edit mode or add mode
  useEffect(() => {
    if (roomId) {
      setIsEditing(true);
      const fetchRoom = async () => {
        try {
          const response = await api.get(
            `/api/apartments/${id}/rooms/${roomId}`
          );
          if (response.data) {
            setRoom(response.data);
          }
        } catch (error) {
          console.error("Error fetching room:", error);
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
  const handleItemChange = (index: number, field: keyof Item, value: string) => {
    const updatedItems = [...room.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: field === "name" ? value : parseInt(value) || 0,
    };
    setRoom({ ...room, items: updatedItems });
  };

  // Add New Furniture Item
  const addFurnitureItem = () => {
    setRoom({
      ...room,
      items: [...room.items, { name: "", length: 0, width: 0, height: 0 }],
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
        await api.put(
          `/api/apartments/${id}/rooms/${roomId}`,
          room
        );
      } else {
        await api.post(
          `/api/apartments/${id}/rooms`,
          room
        );
      }
      navigate(`/apartment/${id}/inventory`);
    } catch (error) {
      console.error("Error saving room:", error);
    }
  };

  // Validation for the form
  const isValidItem = (item: Item) => item.name.trim() !== "";

  const isValidForm = room.name.trim() !== "" && room.items.every(isValidItem);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <Card className="w-full max-w-3xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center justify-between">
            <Button variant="outline" onClick={() => navigate(-1)}>
              ← BACK
            </Button>
          </div>
          <div className="text-center space-y-1.5">
            <CardTitle className="text-2xl font-bold">
              {isEditing ? "Edit Room" : "Add Room"}
            </CardTitle>
            <CardDescription>
              Please review your Inventory and add/edit if required.
            </CardDescription>
          </div>
          <div className="bg-primary/10 text-primary rounded-md px-3 py-1 text-sm w-fit mx-auto">
            STEP 3/3
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <Input
            placeholder="Enter Room Name"
            value={room.name}
            onChange={handleRoomNameChange}
            className="text-lg"
            required
          />

          <h2 className="text-xl font-semibold">Furniture Details</h2>

          <div className="space-y-4">
            {/* Scrollable section for furniture items */}
            <div className="max-h-[300px] overflow-y-auto">
              {room.items.map((item, index) => (
                <div
                  key={index}
                  className="bg-[#E8F8F8] rounded-lg p-4 m-3 flex justify-between items-start"
                >
                  <div className="space-y-1 w-full">
                    <Input
                      placeholder="Furniture Name"
                      value={item.name}
                      onChange={(e) =>
                        handleItemChange(index, "name", e.target.value)
                      }
                      required
                      className="bg-white"
                    />
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <Input
                        type="number"
                        placeholder="Length (cm)"
                        value={item.length || ""}
                        onChange={(e) =>
                          handleItemChange(index, "length", e.target.value)
                        }
                        className="bg-white"
                      />
                      <Input
                        type="number"
                        placeholder="Width (cm)"
                        value={item.width || ""}
                        onChange={(e) =>
                          handleItemChange(index, "width", e.target.value)
                        }
                        className="bg-white"
                      />
                      <Input
                        type="number"
                        placeholder="Height (cm)"
                        value={item.height || ""}
                        onChange={(e) =>
                          handleItemChange(index, "height", e.target.value)
                        }
                        className="bg-white"
                      />
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeFurnitureItem(index)}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>

          {/* Add Item button remains fixed at the bottom */}
          <Button
            type="button"
            onClick={addFurnitureItem}
            className="w-full bg-[#E8F8F8] text-primary hover:bg-[#d8f1f1] mb-4"
            variant="ghost"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Item
          </Button>

          <Button
            type="submit"
            onClick={handleSubmit}
            className="w-full"
            disabled={!isValidForm}
          >
            {isEditing ? "Update Room" : "Add Room"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default InventoryEdit;
