import React, { useEffect } from "react";
import { CheckIcon, XIcon, AlertTriangleIcon, InfoIcon } from "./Icons";

const ICONS = {
    success: <CheckIcon size={16} />,
    error: <XIcon size={16} />,
    warning: <AlertTriangleIcon size={16} />,
    info: <InfoIcon size={16} />,
};
