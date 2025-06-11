import type { UserProps } from "../types/UserType"

export const mockUsers: UserProps[] = [
  {
    id: "user-1",
    name: "Admin User",
    email: "admin@example.com",
    password: "admin123",
    role: "admin",
  },
  {
    id: "user-2",
    name: "Regular User",
    email: "user@example.com",
    password: "user123",
    role: "user",
  },
]
