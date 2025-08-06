import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Tipos para la autenticación
interface User {
  id: string;
  email: string;
  name: string;
  role: 'ADMIN' | 'MANAGER' | 'COACH' | 'PLAYER' | 'USER';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  role?: 'ADMIN' | 'MANAGER' | 'COACH' | 'PLAYER' | 'USER';
}

// Contexto de autenticación
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook personalizado para usar el contexto de autenticación
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth debe ser usado dentro de un AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider del contexto de autenticación
 * Maneja el estado de autenticación y las operaciones relacionadas
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Verificar token al cargar la aplicación
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (token) {
          // Aquí se haría la validación del token con el backend
          // Por ahora simulamos un usuario
          const mockUser: User = {
            id: '1',
            email: 'admin@prosports.com',
            name: 'Administrador',
            role: 'ADMIN',
          };
          setUser(mockUser);
        }
      } catch (error) {
        console.error('Error al verificar autenticación:', error);
        localStorage.removeItem('authToken');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      // Aquí se haría la llamada al backend
      // Por ahora simulamos el login
      const mockUser: User = {
        id: '1',
        email,
        name: 'Usuario Demo',
        role: 'ADMIN',
      };
      
      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-token');
    } catch (error) {
      console.error('Error en login:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    try {
      setIsLoading(true);
      // Aquí se haría la llamada al backend
      // Por ahora simulamos el registro
      const mockUser: User = {
        id: '1',
        email: userData.email,
        name: userData.name,
        role: userData.role || 'USER',
      };
      
      setUser(mockUser);
      localStorage.setItem('authToken', 'mock-token');
    } catch (error) {
      console.error('Error en registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authToken');
  };

  const updateProfile = async (userData: Partial<User>) => {
    try {
      setIsLoading(true);
      // Aquí se haría la llamada al backend
      if (user) {
        setUser({ ...user, ...userData });
      }
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}; 