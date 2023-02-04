import React from "react";
import { Alert } from "@mui/material";

export default function Info({ message, type }) {
  return (
    <div className="alert">
      <Alert color={type} variant="filled">
        {message}
      </Alert>
    </div>
  );
}
