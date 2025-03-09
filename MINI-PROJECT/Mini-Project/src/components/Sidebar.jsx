import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, LayoutDashboard, ShoppingCart, Users, Package, FileText, LogOut } from "lucide-react";
import { Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, IconButton } from "@mui/material";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setIsOpen(true)} style={{ position: "fixed", top: 16, left: 16, zIndex: 1000, color: "white", backgroundColor: "#333" }}>
        <Menu size={24} />
      </IconButton>

      <Drawer anchor="left" open={isOpen} onClose={() => setIsOpen(false)}>
        <div style={{ width: 250, padding: "16px", backgroundColor: "#1E293B", color: "white", height: "100%" }}>
          <h2 style={{ textAlign: "center", marginBottom: "16px", fontWeight: "bold" }}>Admin Panel</h2>
          <List>
            {[
              { text: "Dashboard", icon: <LayoutDashboard size={20} />, link: "/" },
              { text: "Products", icon: <Package size={20} />, link: "/products" },
              { text: "Users", icon: <Users size={20} />, link: "/users" },
              { text: "Cart", icon: <ShoppingCart size={20} />, link: "/cart" },
              { text: "Posts", icon: <FileText size={20} />, link: "/posts" },
              { text: "Logout", icon: <LogOut size={20} />, link: "/login" },
            ].map((item, index) => (
              <ListItem key={index} disablePadding>
                <ListItemButton component={Link} to={item.link}>
                  <ListItemIcon style={{ color: "white" }}>{item.icon}</ListItemIcon>
                  <ListItemText primary={item.text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
