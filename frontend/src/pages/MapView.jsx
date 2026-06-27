import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getActivePosts } from "../api/api";
import { PageHeader, Card, Button, Badge, LoadingScreen, ErrorBox } from "../components/ui";
import MapPicker from "../components/MapPicker";
import { MapIcon, ListIcon, MapPinIcon, HouseIcon, FoodIcon, BusIcon, ShieldCheckIcon, SearchIcon, XIcon, FilterIcon } from "../components/Icons";

// ─── University centre coordinates ───────────────────────────────────────────
const UNI_CENTERS = {
  "University of Moratuwa":                        [6.7955, 79.9012],
  "University of Colombo":                         [6.9022, 79.8607],
  "University of Kelaniya":                        [7.0013, 79.9207],
  "University of Peradeniya":                      [7.2545, 80.5954],
  "University of Sri Jayewardenepura":             [6.8719, 79.8989],
  "University of Jaffna":                          [9.6615, 80.0255],
  "University of Ruhuna":                          [5.9485, 80.5376],
  "Eastern University Sri Lanka":                  [7.7102, 81.6924],
  "South Eastern University of Sri Lanka":         [7.3002, 81.6774],
  "Rajarata University of Sri Lanka":              [8.3467, 80.5135],
  "Sabaragamuwa University of Sri Lanka":          [6.7341, 80.3615],
  "Wayamba University of Sri Lanka":               [7.4748, 80.0437],
  "Uva Wellassa University":                       [6.9938, 81.0532],
  "Open University of Sri Lanka":                  [6.8720, 79.8988],
  "General Sir John Kotelawala Defence University":[6.8216, 79.9760],
  "SLIIT":                                         [6.9147, 79.9729],
  "NSBM Green University":                         [6.8290, 80.0370],
  "APIIT Sri Lanka":                               [6.9108, 79.8477],
  "Informatics Institute of Technology":           [6.8869, 79.8615],
  "CINEC Campus":                                  [6.9147, 79.9729],
  "Horizon Campus":                                [6.9147, 79.9729],
  "ICBT Campus":                                   [6.9147, 79.8477],
  "NIBM":                                          [6.9147, 79.8477],
  default:                                         [6.7955, 79.9012],
};



const TYPE_COLORS = { BOARDING: "#2563EB", FOOD: "#EA580C", TRANSPORT: "#16A34A" };
const TYPE_LABELS = { BOARDING: "Boarding", FOOD: "Food Spot", TRANSPORT: "Transport" };
const TYPE_ICONS  = { BOARDING: HouseIcon,  FOOD: FoodIcon,   TRANSPORT: BusIcon };

export default function MapView() {
  const { user } = useAuth();
  const [view, setView]               = useState("map");
  const [activeType, setActiveType]   = useState("");
  const [search, setSearch]           = useState("");
  const [posts, setPosts]             = useState([]);
  const [loading, setLoading]         = useState(true);
  const [error, setError]             = useState("");
  const [selectedPin, setSelectedPin] = useState(null);

  // Get map centre from user's university
  const mapCenter = UNI_CENTERS[user?.university] || UNI_CENTERS.default;

  // Load real posts, fall back to demo
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const res = await getActivePosts(user?.university);
      setLoading(false);
      if (res.success && res.data?.length > 0) {
        // Transform API posts to marker format (they need lat/lng from location field)
        const mapped = res.data
          .filter((p) => p.location?.latitude && p.location?.longitude)
          .map((p) => ({
            id: p._id,
            type: p.category,
            label: p.title,
            price: p.price ? `Rs. ${Number(p.price).toLocaleString()}/mo` : p.priceRange || null,
            lat: p.location.latitude,
            lng: p.location.longitude,
            verified: p.status === "APPROVED",
            distance: null,
          }));
        setPosts(mapped);
      } else {
        setPosts([]);
      }
    };
    load();
  }, [user?.university]);

  // Filter markers
  const filtered = posts.filter((p) => {
    if (activeType && p.type !== activeType) return false;
    if (search && !p.label.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const counts = {
    BOARDING:  posts.filter((p) => p.type === "BOARDING").length,
    FOOD:      posts.filter((p) => p.type === "FOOD").length,
    TRANSPORT: posts.filter((p) => p.type === "TRANSPORT").length,
  };