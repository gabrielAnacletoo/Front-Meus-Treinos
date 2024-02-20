import React, { createContext, useState, useContext } from 'react';

interface AuthContextType {
  saveToken: (newToken: string) => void;
  getToken: () => string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);

  const saveToken = (newToken: string) => {
    setToken(newToken);
  };

  const getToken = () => {
    return token;
  };

  return (
    <AuthContext.Provider value={{ saveToken, getToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
