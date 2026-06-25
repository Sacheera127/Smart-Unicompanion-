package com.unicompanion.backend.dto;

import java.util.Map;

public class PlatformStatsResponse {
    private long totalStudents;
    private long totalAdmins;
    private long totalMasterAdmins;
    private long totalUnis;
    private long activeUnis;
    private Map<String, UniversityStat> universityStats;