import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { StepBackIcon as Stairs, CableCarIcon as Elevator, Home, Info } from "lucide-react";

interface Apartment {
  address: string;
  floor: number;
  stairsOrElevator: string;
  size: number;
}

const ApartmentForm = () => {
  const [formData, setFormData] = useState<Apartment>({
    address: "",
    floor: 0,
    stairsOrElevator: "stairs",
    size: 0,
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await axios.get(`http://localhost:5000/api/apartments/${id}`);
          setFormData(response.data);
        } catch (error) {
          console.error("Error fetching apartment details:", error);
        }
      };

      fetchApartment();
    }
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "floor" || name === "size" ? Number(value) : value,
    }));
  };

  const handleAccessTypeChange = (accessType: string) => {
    setFormData((prev) => ({
      ...prev,
      stairsOrElevator: accessType,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(`http://localhost:5000/api/apartments/${id}`, formData);
      } else {
        await axios.post("http://localhost:5000/api/apartments", formData);
      }
      navigate("/");
    } catch (error) {
      console.error("Error saving apartment:", error);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-10">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold">{id ? "Edit Apartment" : "Add Apartment"}</CardTitle>
        <CardDescription>Fill in all info correctly</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="text-sm font-medium">What address are you moving from?</label>
          <Input
            placeholder="Enter address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Stairs or an Elevator needed? <span className="text-muted-foreground">(choose one)</span>
          </label>
          <div className="grid grid-cols-3 gap-4">
            <Button
              variant={formData.stairsOrElevator === "stairs" ? "default" : "outline"}
              className="h-24 flex-col space-y-2"
              onClick={() => handleAccessTypeChange("stairs")}
            >
              <Stairs className="h-8 w-8" />
              <span>STAIRS</span>
            </Button>
            <Button
              variant={formData.stairsOrElevator === "elevator" ? "default" : "outline"}
              className="h-24 flex-col space-y-2"
              onClick={() => handleAccessTypeChange("elevator")}
            >
              <Elevator className="h-8 w-8" />
              <span>ELEVATOR</span>
            </Button>
            <Button
              variant={formData.stairsOrElevator === "none" ? "default" : "outline"}
              className="h-24 flex-col space-y-2"
              onClick={() => handleAccessTypeChange("none")}
            >
              <Home className="h-8 w-8" />
              <span>NOT APPLICABLE</span>
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">What floor are you on?</label>
          <Input
            type="number"
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">
            Apartment size <span className="text-muted-foreground">(Optional)</span>
          </label>
          <div className="flex space-x-2">
            <Input
              type="number"
              name="size"
              placeholder="Enter apartment size"
              value={formData.size}
              onChange={handleChange}
            />
            <Button variant="secondary" className="whitespace-nowrap" disabled>
              Sq Meter
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Info className="h-4 w-4" />
          <p>Your info is safe with us! We need details to create the perfect plan for you.</p>
        </div>

        <div className="flex justify-between pt-4">
          <Button variant="outline" onClick={() => navigate("/")}>
            Back
          </Button>
          <Button onClick={handleSubmit}>{id ? "Update Apartment" : "Add Apartment"}</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ApartmentForm;
