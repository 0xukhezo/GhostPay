// React
import React, { createContext, useContext, useState } from "react";
// Components
import Notification from "../../components/Cards/NotificationCard";
// Types
import {
  NotificationContextType,
  NotificationType,
  ProviderProps,
} from "./types";
// Utils
import { getColorForType } from "../../utils/utils";

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export function NotificationContextProvider({ children }: ProviderProps) {
  const [notification, setNotification] = useState<NotificationType | null>(
    null
  );

  const showNotification = (notification: NotificationType) => {
    setNotification(notification);
    setTimeout(() => {
      setNotification(null);
    }, 5000);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      {notification && (
        <Notification
          message={notification.message}
          color={getColorForType(notification.type)}
        />
      )}
    </NotificationContext.Provider>
  );
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);
