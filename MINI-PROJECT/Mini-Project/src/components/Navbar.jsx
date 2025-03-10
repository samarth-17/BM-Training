
import * as React from "react";
import { AppBar, Toolbar, IconButton, Typography, InputBase, Switch } from "@mui/material";
import { Search as SearchIcon, Menu as MenuIcon, AccountCircle } from "@mui/icons-material";
import { styled, alpha } from "@mui/material/styles";
import useSearchStore from "../store/useSearchStore"; 
import { useNavigate } from "react-router-dom";
import useAuthStore from "@/store/useAuthStore";
import { ThemeContext } from "@/context/ThemeContext";
import { useContext } from "react";
import { Button } from "./ui/button";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(3),
  width: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "20ch",
  },
}));

export default function Navbar() {
  const { darkMode, toggleTheme } = useContext(ThemeContext);
  const { searchQuery, setSearchQuery } = useSearchStore(); 
  const { user } = useAuthStore(); 
  const navigate = useNavigate();

  return (
    <AppBar position="static" color="default" elevation={0}>
      <Toolbar>
        <IconButton size="large" edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Typography
          sx={{ flexGrow: 1, fontWeight: "bold", cursor: "pointer" }}
          onClick={() => navigate("/products")}
        >
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
            E-commerce
          </h4>
        </Typography>
        <Switch checked={darkMode} onChange={toggleTheme} />
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </Search>
        <Button onClick={() => navigate("/add-product")}>
          Add Product
        </Button>
        <IconButton color="inherit" onClick={()=>navigate(`/user/${user.id}`)}>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
