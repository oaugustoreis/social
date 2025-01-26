"use client"
import { createContext, useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../api/api";
import { useRouter } from "next/navigation";
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const get_authenticated = async () => {
        try {
            await isAuthenticated()
            setIsAuthenticated(true)
        } catch {
            setIsAuthenticated(false)
        } finally {
            setLoading(false)
        }
        useEffect(() => {
            get_authenticated()
        }, window.location.pathname)
        return (
            <AuthContext.Provider>
                {children}
            </AuthContext.Provider>
        )

    }
}

export const useAuth = () => useContext(AuthContext)