import React, { useContext } from "react";
import { UserContext } from "@/context/UserContext";
import { Link } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function User() {
  const context = useContext(UserContext);

  const { users, isLoading, error } = context;

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
    <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0">
    List of registered users
    </h2>
    <Table>
      <TableCaption>List of registered users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[80px]">ID</TableHead>
          <TableHead className="w-[100px]">Image</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Username</TableHead>
          <TableHead>Role</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user) => (
          <TableRow key={user.id}>
            <TableCell>{user.id} </TableCell>
            <TableCell>
              <img
                src={user.image}
                alt={user.username}
                className="w-10 h-10 rounded-full object-cover border"
              />
            </TableCell>
            <Link to={`/user/${user.id}`} className="text-blue-500 underline">
            <TableCell className="font-medium">
              {user.firstName} {user.lastName}
            </TableCell>
            </Link>
            <TableCell>{user.email}</TableCell>
            <TableCell>{user.username}</TableCell>
            <TableCell>{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </div>
  );
}
