import TextField from "@mui/material/TextField";

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
      sx={{width: "100%", background: "#F3F3F3", "& fieldset": { border: "none"}, borderRadius: "10px",}}
      InputProps={{
        style: {
          color: props.color || "#222240",
          fontFamily: props.fontFamily || "Youtube Sans",
        },
      }}
    />
  );
}
