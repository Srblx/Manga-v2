import { Stack, styled } from "@mui/material";
import { useEffect, useState } from "react";

const StyledUl = styled("ul")({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-around",
  background: "#000000e9",
  width: "100%",
  fontSize: "1.4rem",
  padding: 0,
  margin: 0,
  border: "solid white 2px",
  borderRadius: "10px",
  color: "gray",
});

const StyledLi = styled("li")({
  listStyle: "none",
});

const StyledImg = styled("img")({
  margin: "1rem 0",
  borderRadius: "20px",
  border: "solid 2px red",
});

const StyledH1 = styled("h1")({
  background: "white",
  marginTop: "4.5rem",
  textAlign: "center",
});

export function Profile() {
  const [userFirstname, setUserFirstname] = useState("");
  const [userLastname, setUserLastname] = useState("");
  const [userRole, setUserRole] = useState("");
  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      const userName = JSON.parse(user);
      const { firstname, lastname, role, email } = userName; // userName devient user
      setUserFirstname(`${firstname}`); // un seul state userState suffit et du coup dans les StyledLi, on mettra userState.firstname, userState.lastname, etc...
      setUserLastname(`${lastname} `);
      setUserRole(`${role}`);
      setUserEmail(`${email}`);
    }
  }, []);

  return (
    <>
      <StyledH1 style={{}}>User profile</StyledH1>
      <Stack sx={{ justifyContent: "center", alignItems: "center" }}>
        <StyledImg src="src/assets/pfp-manga.jpeg" />
      </Stack>
      <Stack
        sx={{
          justifyContent: "center",
          alignItems: "center",
          margin: "0 6.5rem",
        }}
      >
        <StyledUl>
          <StyledLi>Firstname : {userLastname} </StyledLi> |
          <StyledLi>Lastname : {userFirstname} </StyledLi> |
          <StyledLi>Email : {userEmail} </StyledLi> |
          <StyledLi>Role : {userRole}</StyledLi>
        </StyledUl>
      </Stack>
    </>
  );
}
