import { SnackbarWrapper } from "core/components/snackbarWrapper";
import { getUserInformation } from "core/utils/localStorage.utils";
import { createContext, useState, ReactNode } from "react";

type Notification = {
  message: string;
  severity: "success" | "info" | "warning" | "error" | undefined;
};

type AppContextType = {
  openDrawer: boolean;
  setOpenDrawer: React.Dispatch<React.SetStateAction<boolean>>;
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  setNotification: React.Dispatch<React.SetStateAction<Notification | undefined>>;
};
export const AppContext = createContext<AppContextType>(Object({}));

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!getUserInformation());
  const [notification, setNotification] = useState<Notification>();

  return (
    <AppContext.Provider
      value={{ openDrawer, setOpenDrawer, isAuthenticated, setIsAuthenticated, setNotification }}
    >
      {children}
      <SnackbarWrapper
        message={notification?.message}
        handleClose={() => setNotification(undefined)}
        severity={notification?.severity}
      />
    </AppContext.Provider>
  );
};
