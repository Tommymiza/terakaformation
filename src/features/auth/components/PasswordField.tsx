import { VisibilityOffRounded, VisibilityRounded } from "@mui/icons-material";
import {
  IconButton,
  InputAdornment,
  TextField,
  type TextFieldProps,
} from "@mui/material";
import { useState } from "react";

/** Champ mot de passe avec bouton afficher / masquer. */
export default function PasswordField(props: TextFieldProps) {
  const [visible, setVisible] = useState(false);
  return (
    <TextField
      {...props}
      type={visible ? "text" : "password"}
      slotProps={{
        ...props.slotProps,
        input: {
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                edge="end"
                aria-label={
                  visible
                    ? "Masquer le mot de passe"
                    : "Afficher le mot de passe"
                }
                onClick={() => setVisible((v) => !v)}
              >
                {visible ? <VisibilityOffRounded /> : <VisibilityRounded />}
              </IconButton>
            </InputAdornment>
          ),
        },
      }}
    />
  );
}
