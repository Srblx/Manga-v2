import styled from "@emotion/styled";
import { TextField } from "@mui/material";

const StyledTextFieldNews = styled(TextField)({
  background: "white",
  width: "75%",
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
  onChange: React.ChangeEventHandler<HTMLInputElement>;
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
      value={value}
      maxRows={numberRow}
      onChange={onChange}
    />
  );
}
