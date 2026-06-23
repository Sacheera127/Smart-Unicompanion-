import React, { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { getPendingPosts, getActivePosts, getAdminReports } from "../api/api";
import { PageHeader, Card, LoadingScreen, ErrorBox } from "../components/ui";
import { HouseIcon, FoodIcon, BusIcon, ShieldCheckIcon, FlagIcon } from "../components/Icons";

// Helper component for the circular meter
function CircularMeter({ value, max, label, color, Icon }) {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = max === 0 ? circumference : circumference - (value / max) * circumference;

  return (
    <Card style={{ padding: "24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 90, height: 90, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <svg width="90" height="90" style={{ transform: "rotate(-90deg)", position: "absolute", top: 0, left: 0 }}>
          {/* Background Ring */}
          <circle
            cx="45" cy="45" r={radius}
            stroke="#F1F5F9"
            strokeWidth="8"
            fill="transparent"
          />
          {/* Progress Ring */}
          <circle
            cx="45" cy="45" r={radius}
            stroke={color}
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 1s ease-in-out" }}
          />
        </svg>
        <div style={{ color: color }}>
          <Icon size={24} />
        </div>
      </div>
      <div style={{ textAlign: "center" }}>
        <div style={{ fontSize: 24, fontWeight: 800, color: "#0F172A", lineHeight: 1 }}>{value}</div>
        <div style={{ fontSize: 13, fontWeight: 600, color: "#64748B", marginTop: 4 }}>{label}</div>
      </div>
    </Card>
  );
}

