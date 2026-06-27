import React, { useState, useEffect } from "react";
import { getAdminRequests, getPlatformStats } from "../api/api";
import { PageHeader, Card, LoadingScreen, ErrorBox } from "../components/ui";
import { useToast } from "../components/Toast";
import { BuildingIcon, UserIcon, ShieldCheckIcon, TrendingUpIcon } from "../components/Icons";

// ─── All universities on the platform ────────────────────────────────────────
const ALL_UNIVERSITIES = [
  // State
  { name: "University of Moratuwa",                        short: "UOM",    type: "state",   admins: 2, students: 312 },
  { name: "University of Colombo",                         short: "UOC",    type: "state",   admins: 2, students: 287 },
  { name: "University of Kelaniya",                        short: "UOK",    type: "state",   admins: 1, students: 241 },
  { name: "University of Peradeniya",                      short: "UOP",    type: "state",   admins: 2, students: 198 },
  { name: "University of Sri Jayewardenepura",             short: "USJP",   type: "state",   admins: 1, students: 176 },
  { name: "University of Jaffna",                          short: "UOJ",    type: "state",   admins: 1, students: 143 },
  { name: "University of Ruhuna",                          short: "UOR",    type: "state",   admins: 1, students: 119 },
  { name: "Eastern University Sri Lanka",                  short: "EUSL",   type: "state",   admins: 1, students: 88  },
  { name: "South Eastern University of Sri Lanka",         short: "SEUSL",  type: "state",   admins: 1, students: 72  },
  { name: "Rajarata University of Sri Lanka",              short: "RUSL",   type: "state",   admins: 1, students: 65  },
  { name: "Sabaragamuwa University of Sri Lanka",          short: "SUSL",   type: "state",   admins: 1, students: 58  },
  { name: "Wayamba University of Sri Lanka",               short: "WUSL",   type: "state",   admins: 1, students: 54  },
  { name: "Uva Wellassa University",                       short: "UWU",    type: "state",   admins: 0, students: 43  },
  { name: "University of the Visual & Performing Arts",   short: "UVPA",   type: "state",   admins: 0, students: 28  },
  { name: "Open University of Sri Lanka",                  short: "OUSL",   type: "state",   admins: 1, students: 97  },
  { name: "General Sir John Kotelawala Defence University",short: "KDU",    type: "state",   admins: 1, students: 81  },
  { name: "Buddhasravaka Bhikkhu University",              short: "BBU",    type: "state",   admins: 0, students: 12  },
  // Private
  { name: "SLIIT",                                         short: "SLIIT",  type: "private", admins: 2, students: 203 },
  { name: "NSBM Green University",                         short: "NSBM",   type: "private", admins: 1, students: 134 },
  { name: "APIIT Sri Lanka",                               short: "APIIT",  type: "private", admins: 1, students: 89  },
  { name: "Informatics Institute of Technology",           short: "IIT",    type: "private", admins: 1, students: 76  },
  { name: "CINEC Campus",                                  short: "CINEC",  type: "private", admins: 1, students: 61  },
  { name: "Horizon Campus",                                short: "Horizon",type: "private", admins: 0, students: 45  },
  { name: "KAATSU International University",               short: "KAATSU", type: "private", admins: 0, students: 38  },
  { name: "Esoft Metro Campus",                            short: "Esoft",  type: "private", admins: 1, students: 52  },
  { name: "BCI Campus",                                    short: "BCI",    type: "private", admins: 0, students: 29  },
  { name: "IIHE",                                          short: "IIHE",   type: "private", admins: 0, students: 24  },
  { name: "ICBT Campus",                                   short: "ICBT",   type: "private", admins: 1, students: 41  },
  { name: "Cardiff Metropolitan University Sri Lanka",     short: "CardiffMet", type: "private", admins: 0, students: 18 },
  { name: "NIBM",                                          short: "NIBM",   type: "private", admins: 1, students: 63  },
  { name: "SLTC Research University",                      short: "SLTC",   type: "private", admins: 0, students: 21  },
];

