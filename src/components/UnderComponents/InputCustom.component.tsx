import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { ChangeEventHandler } from "react";

const StyledTextFieldNews = styled(TextField)({
  background: "white",
  width: "85%",
  borderRadius: "3px",
  margin: "1.5rem",
});

interface AddNews {
  id: string;
  name: string;
  label: string;
  placeholder?: string;
  value: string | undefined;
  numberRow?: number;
  maxRows?: number;
  minRows?: number;
  // rows?: number;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

export function TextFieldUpdateNews({
  id,
  name,
  label,
  placeholder,
  value,
  numberRow,
  onChange,
}: AddNews) {
  return (
    <StyledTextFieldNews
      id={id}
      name={name}
      label={label}
      placeholder={placeholder}
      variant="filled"
      multiline={numberRow ? true : false}
      minRows={3}
      // rows={numberRow || 1}
      value={value}
      maxRows={numberRow}
      onChange={onChange}
    />
  );
}
