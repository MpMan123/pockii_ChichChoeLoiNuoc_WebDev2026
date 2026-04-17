import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  email: string;
  [key: string]: any;
}

interface AuthContextType {
  user: User | null;
  loginUser: (userData: User) => void;
  logoutUser: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Tải lại user từ localStorage nếu màng hình reload
    const storedUser = localStorage.getItem("user_info");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (err) {
        console.error("Failed to parse user info", err);
      }
    }
  }, []);

  const loginUser = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user_info", JSON.stringify(userData));
  };

  const logoutUser = () => {
    setUser(null);
    localStorage.removeItem("user_info");
  };

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
