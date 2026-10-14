import { TaskAltRounded, WarningRounded } from "@mui/icons-material";
import { Alert, type AlertColor } from "@mui/material";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface Notification {
  type: AlertColor;
  message: string;
}

type Notify = (notification: Notification) => void;

const AlertContext = createContext<Notify | null>(null);

const DISPLAY_DURATION_MS = 3000;

export function AlertProvider({ children }: { children: ReactNode }) {
  const [current, setCurrent] = useState<Notification | null>(null);

  useEffect(() => {
    if (!current) return;
    const timeout = setTimeout(() => setCurrent(null), DISPLAY_DURATION_MS);
    return () => clearTimeout(timeout);
  }, [current]);

  const notify = useCallback<Notify>((n) => setCurrent({ ...n }), []);

  return (
    <AlertContext.Provider value={notify}>
      {children}
      {current && (
        <div
          role="status"
          className="fixed inset-x-4 top-20 z-[2000] mx-auto max-w-md animate-[toast-in_200ms_ease-out]"
        >
          <Alert
            sx={{ borderRadius: 3, boxShadow: 6, alignItems: "center" }}
            color={current.type}
            variant="filled"
            icon={
              current.type === "success" ? (
                <TaskAltRounded />
              ) : (
                <WarningRounded />
              )
            }
          >
            {current.message}
          </Alert>
        </div>
      )}
    </AlertContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNotify(): Notify {
  const notify = useContext(AlertContext);
  if (!notify)
    throw new Error("useNotify doit être utilisé dans <AlertProvider>");
  return notify;
}
