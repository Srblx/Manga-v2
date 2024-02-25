import { Button, Stack } from "@mui/material";
import { useEffect, useState } from "react";

export function Profile() {
  const [userFirstname, setUserFirstname] = useState("");
  const [userLastname, setUserLastname] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userName = JSON.parse(user);
      const { firstname, lastname, role, email } = userName;
      setUserFirstname(`${firstname}`);
      setUserLastname(`${lastname} `);
      setUserRole(`${role}`);
      setUserEmail(`${email}`);
    }
  }, []);

  return (
    <>
      <h1
        style={{
          background: "white",
          marginTop: "4.5rem",
          textAlign: "center",
        }}
      >
        User profile
      </h1>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <img
          src="src/assets/pfp-manga.jpeg"
          style={{
            margin: "1rem 0",
            borderRadius: "20px",
            border: "solid 2px red",
          }}
        />
      </Stack>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <ul
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            background: "#000000e9",
            width: "100%",
            color: "white",
            fontSize: "1.4rem",
            padding: 0,
            margin: 0,
            border: "solid white 2px",
            borderRadius: "10px",
          }}
        >
          <li style={{ listStyle: "none" }}>Firstname : {userLastname} </li> |
          <li style={{ listStyle: "none" }}>Lastname : {userFirstname} </li> |
          <li style={{ listStyle: "none" }}>Email : {userEmail} </li> |
          <li style={{ listStyle: "none" }}>Role : {userRole}</li>
        </ul>
        <Button
          sx={{
            background: "white",
            padding: ".5rem",
            marginTop: "1rem",
            border: "solid 2px black",
          }}
          // onClick={}
        >
          Change password
        </Button>
      </Stack>
    </>
  );
}
