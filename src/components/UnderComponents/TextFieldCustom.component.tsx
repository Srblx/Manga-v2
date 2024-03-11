import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  IconButton,
  InputAdornment,
  OutlinedInput,
} from "@mui/material";
import TextField, { TextFieldVariants } from "@mui/material/TextField";
import React, { ChangeEventHandler, useState } from "react";

interface CustomProps {
  id?: string; 
  value?: string | undefined;
  name?: string;
  variant?: TextFieldVariants;
  placeholder?: string;
  color?: string;
  fontFamily?: string;
  label?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

export default function TextFieldCustom(props: CustomProps) {
  const { 
    id,
    value,
    name,
    variant,
    placeholder,
    color,
    fontFamily,
    onChange
  } = props
  return (
    <TextField
      id={id}
      size="small"
      value={value}
      name={name}
      onChange={onChange}
      variant={variant}
      placeholder={placeholder}
      sx={{
        width: "100%",
        background: "#F3F3F3",
        "& fieldset": { border: "none" },
        borderRadius: "10px",
      }}
      InputProps={{
        style: {
          color: color || "#222240",
          fontFamily: fontFamily || "Youtube Sans",
        },
      }}
    />
  );
}

export function TextFielCustomPassword(props: CustomProps) {
  const { 
    value,
    name,
    placeholder,
    label,
    onChange
  } = props
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
          label={label}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
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
