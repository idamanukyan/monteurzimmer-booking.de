// src/AuthContext.js
import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize user state

    const login = (username, role) => {
        setUser({ username, role }); // Set user on login
    };

    const logout = () => {
        setUser(null); // Clear user on logout
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext); // Custom hook to use Auth context
};
