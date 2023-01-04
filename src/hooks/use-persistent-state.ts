import { useState, useEffect, useCallback } from "react";

type UsePersistentStateResponse<T> = [
  value: T,
  setValue: React.Dispatch<React.SetStateAction<T>>,
  deleteValue: () => void
];

export function usePersistentState<T = undefined>(
  key: string
): UsePersistentStateResponse<T | undefined>;

export function usePersistentState<T>(
  key: string,
  initialValue: T | (() => T),
  storage?: Storage
): UsePersistentStateResponse<T>;

export function usePersistentState<T>(
  key: string,
  initialValue?: T,
  storage = localStorage
): UsePersistentStateResponse<T> {
  const [value, setValue] = useState(getInitialValue);

  function getInitialValue() {
    try {
      const jsonValue = storage.getItem(key);
      if (!jsonValue) return initialValue;

      const parsedValue = JSON.parse(jsonValue);
      return parsedValue;
    } catch {
      return initialValue;
    }
  }

  useEffect(() => {
    if (value != null) {
      const jsonValue = JSON.stringify(value);
      storage.setItem(key, jsonValue);
    } else {
      storage.removeItem(key);
    }
  }, [value]);

  const deleteValue = useCallback(() => {
    storage.removeItem(key);
  }, [key]);

  return [value, setValue, deleteValue];
}
