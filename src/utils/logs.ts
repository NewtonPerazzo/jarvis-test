import { getStorageItem, setStorageItem } from "../local-storage";
import type { ILog } from "../types/Logs";

export const addLog = (action: string, details?: string) => {
  const logs = getStorageItem<ILog[]>("logs") || [];

  const newLog: ILog = {
    timestamp: new Date().toISOString(),
    action,
    details,
  };

  logs.push(newLog);
  setStorageItem("logs", logs);
};
