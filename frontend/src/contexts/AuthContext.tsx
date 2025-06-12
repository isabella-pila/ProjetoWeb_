"use client";

import {
  createContext,
  useState,
  useEffect,
  type ReactNode,
  useContext,
} from "react";
import type { UserProps } from "../types/UserType";
import { mockUsers } from "../mocks/UserMock";

// Tipagem do contexto
export interface AuthContextType {
  currentUser: UserProps | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  setUserName: (name: string) => void; // ✅ função para alterar o nome
}

// Criação do contexto com valor inicial null
export const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<UserProps | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar o usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Função de login
  const login = async (email: string, password: string) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const user = mockUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (user) {
          const { password: _, ...userWithoutPassword } = user;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword)
          );
          resolve();
        } else {
          reject(new Error("Email ou senha inválidos"));
        }
      }, 500);
    });
  };

  // Função de registro
  const register = async (
    name: string,
    email: string,
    password: string
  ) => {
    return new Promise<void>((resolve, reject) => {
      setTimeout(() => {
        const existingUser = mockUsers.find((u) => u.email === email);

        if (existingUser) {
          reject(new Error("Email já cadastrado"));
        } else {
          const newUser: UserProps = {
            id: `user-${Date.now()}`,
            name,
            email,
            password,
            role: "user",
          };

          mockUsers.push(newUser);

          const { password: _, ...userWithoutPassword } = newUser;
          setCurrentUser(userWithoutPassword);
          localStorage.setItem(
            "currentUser",
            JSON.stringify(userWithoutPassword)
          );
          resolve();
        }
      }, 500);
    });
  };

  // ✅ Função para atualizar o nome do usuário
  const setUserName = (name: string) => {
    setCurrentUser((prev) => {
      if (!prev) return prev;
      const updatedUser = { ...prev, name };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
      return updatedUser;
    });
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        register,
        logout,
        setUserName, // ✅ incluído no contexto
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook personalizado para acessar o contexto
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth deve ser usado com AuthProvider");
  }
  return context;
}
