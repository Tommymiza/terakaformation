import React from "react";
import { Alert } from "@mui/material";
import { TaskAltRounded, WarningRounded } from "@mui/icons-material";

export default function Info({ message, type }) {
  return (
    <div id="alert">
      <Alert color={type} variant="filled" icon={type === "success" ? <TaskAltRounded /> : <WarningRounded />}>
        {message}
      </Alert>
    </div>
  );
}
