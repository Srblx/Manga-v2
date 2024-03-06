import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function TextFieldCustom(props: any) {
  return (
    <TextField
      id={props.id}
      size="small"
      value={props.value}
      name={props.name}
      onChange={props.onChange}
      variant={props.variant}
      placeholder={props.placeholder}
      sx={{
        width: "100%",
        background: "#F3F3F3",
        "& fieldset": { border: "none" },
        borderRadius: "10px",
      }}
      InputProps={{
        style: {
          color: props.color || "#222240",
          fontFamily: props.fontFamily || "Youtube Sans",
        },
      }}
    />
  );
}

export function TextFielCustomPassword(props: any) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <>
      <FormControl sx={{ width: "100%" }} variant="outlined" size="small">
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? "text" : "password"}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
          label={props.label}
          placeholder={props.placeholder}
          value={props.value}
          onChange={props.onChange}
          name={props.name}
          sx={{
            background: "#F3F3F3",
            "& fieldset": { border: "none" },
            borderRadius: "10px",
          }}
        />
      </FormControl>
    </>
  );
}
