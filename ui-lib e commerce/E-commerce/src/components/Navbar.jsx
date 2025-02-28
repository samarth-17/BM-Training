"use client";

import * as React from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CategoryContext } from "@/context/CategoryContext";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Navbar() {
  const { categories, loading, error } = useContext(CategoryContext);

  return (
    <nav className="bg-gray-800 shadow-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <Link to='/' className="text-2xl font-bold tracking-wide text-white">
            ShopKart
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              <NavigationMenuItem>
                <Link to="/">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul>
                    {loading ? (
                      <li className="p-2 text-gray-600">Loading...</li>
                    ) : error ? (
                      <li className="p-2 text-red-600">{error}</li>
                    ) : (
                      categories.map((category) => (
                        <li key={category} className="p-2 hover:bg-gray-200">
                          <Link to={`/category/${category}`} className="block">
                            <span>{category}</span>
                          </Link>
                        </li>
                      ))
                    )}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <Link to="/Cart">
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Cart
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
