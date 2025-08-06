import React, { createContext, useContext, useEffect, ReactNode } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAuth } from './AuthContext';

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
}

const SocketContext = createContext<SocketContextType | undefined>(undefined);

/**
 * Hook personalizado para usar el contexto de Socket
 */
export const useSocket = () => {
  const context = useContext(SocketContext);
  if (context === undefined) {
    throw new Error('useSocket debe ser usado dentro de un SocketProvider');
  }
  return context;
};

interface SocketProviderProps {
  children: ReactNode;
}

/**
 * Provider del contexto de Socket.io
 * Maneja la conexión WebSocket para notificaciones en tiempo real
 */
export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [socket, setSocket] = React.useState<Socket | null>(null);
  const [isConnected, setIsConnected] = React.useState(false);

  useEffect(() => {
    if (isAuthenticated && user) {
      // Crear conexión Socket.io
      const socketUrl = process.env.REACT_APP_SOCKET_URL || 'ws://localhost:3000';
      const newSocket = io(socketUrl, {
        auth: {
          token: localStorage.getItem('authToken'),
        },
        transports: ['websocket', 'polling'],
      });

      // Eventos de conexión
      newSocket.on('connect', () => {
        console.log('Conectado al servidor WebSocket');
        setIsConnected(true);
      });

      newSocket.on('disconnect', () => {
        console.log('Desconectado del servidor WebSocket');
        setIsConnected(false);
      });

      // Eventos de notificaciones
      newSocket.on('notification', (data) => {
        console.log('Nueva notificación:', data);
        // Aquí se puede mostrar una notificación toast
      });

      newSocket.on('match_update', (data) => {
        console.log('Actualización de partido:', data);
        // Aquí se puede actualizar el estado de los partidos
      });

      newSocket.on('tournament_update', (data) => {
        console.log('Actualización de torneo:', data);
        // Aquí se puede actualizar el estado de los torneos
      });

      setSocket(newSocket);

      // Cleanup al desmontar
      return () => {
        newSocket.close();
      };
    } else {
      // Si no está autenticado, cerrar socket si existe
      if (socket) {
        socket.close();
        setSocket(null);
        setIsConnected(false);
      }
    }
  }, [isAuthenticated, user]);

  const value: SocketContextType = {
    socket,
    isConnected,
  };

  return (
    <SocketContext.Provider value={value}>
      {children}
    </SocketContext.Provider>
  );
}; 