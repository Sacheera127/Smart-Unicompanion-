import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import PublicNavbar from "../components/PublicNavbar";
import {
    BuildingIcon,
    ShieldCheckIcon,
    MapPinIcon,
    HouseIcon,
    FoodIcon,
    BusIcon
} from "../components/Icons";
