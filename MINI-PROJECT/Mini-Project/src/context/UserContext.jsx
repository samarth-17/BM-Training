import React, { createContext } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "@/api/UserApi";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  return (
    <UserContext.Provider value={{ users: data, isLoading, error }}>
      {children}
    </UserContext.Provider>
  );
};
// import React, { createContext, useState } from "react";
// import { useQuery } from "@tanstack/react-query";
// import { fetchUsers } from "@/api/UserApi";
// import useAuthStore from "../store/useAuthStore";

// export const UserContext = createContext();

// export const UserProvider = ({ children }) => {
//   const [user, setUser] = useState(null);
//   const { users, isLoading, error } = useQuery({
//     queryKey: ["users"],
//     queryFn: fetchUsers,
//   });

//   const { user: authUser } = useAuthStore(); 

//   return (
//     <UserContext.Provider value={{ user: authUser, setUser, users, isLoading, error }}>
//       {children}
//     </UserContext.Provider>
//   );
// };
