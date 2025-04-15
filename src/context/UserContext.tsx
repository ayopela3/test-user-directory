"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  FC,
} from "react";
import { fetchUsers } from "@/app/actions";

interface UserContextType {
  users: User[] | null;
  loading: boolean;
  error: string | null;
  filteredUsers: User[];
  search: string;
  setSearch: (search: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    setLoading(true);
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredUsers = React.useMemo(() => {
    if (!users) return [];
    const lower = search.trim().toLowerCase();
    if (!lower) return users;
    return users.filter((u) => u.name.toLowerCase().includes(lower));
  }, [users, search]);

  const value = {
    users,
    loading,
    error,
    filteredUsers,
    search,
    setSearch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUsers = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUsers must be used within a UserProvider");
  }
  return context;
};
