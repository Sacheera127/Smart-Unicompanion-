import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  getPendingPosts,
  getActivePosts,
  updatePostStatus,
  deletePost,
} from "../api/api";
import {
  Button,
  PageHeader,
  Card,
  StatusBadge,
  LoadingScreen,
  EmptyState,
  ErrorBox,
  ConfirmModal,
} from "../components/ui";
import { useToast } from "../components/Toast";
import {
  ShieldCheckIcon,
  HouseIcon,
  FoodIcon,
  BusIcon,
  MapPinIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
} from "../components/Icons";

const CATEGORY_META = {
  BOARDING: {
    Icon: HouseIcon,
    color: "#2563EB",
    bg: "#EFF6FF",
    label: "Boarding",
  },
  FOOD: { Icon: FoodIcon, color: "#EA580C", bg: "#FFF7ED", label: "Food Spot" },
  TRANSPORT: {
    Icon: BusIcon,
    color: "#16A34A",
    bg: "#F0FDF4",
    label: "Transport",
  },
};

