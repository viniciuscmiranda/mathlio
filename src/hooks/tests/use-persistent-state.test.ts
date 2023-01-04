import { describe, it, expect } from "vitest";
import { act, renderHook } from "@testing-library/react";
import { usePersistentState } from "hooks/use-persistent-state";

describe("use persistent state", () => {
  it("should initialize the state", () => {
    const initial = 0;

    const { result } = renderHook(() => usePersistentState(getKey(), initial));

    expect(result.current[0]).toBe(initial);
  });

  it("should initialize as undefined if no initial value is provided", () => {
    const { result } = renderHook(() => usePersistentState(getKey()));

    expect(result.current[0]).toBeUndefined();
  });

  it("should update and clear the state", () => {
    const initial = 1;

    const { result } = renderHook(() =>
      usePersistentState<number>(getKey(), initial)
    );

    const next = 2;

    act(() => result.current[1](next));

    expect(result.current[0]).toBe(next);
  });

  it("should interacts with the store", () => {
    const key = getKey();
    const initial = 1;
    const storage = new MockStorage();

    const { result } = renderHook(() =>
      usePersistentState(key, initial, storage)
    );

    expect(storage.getItem(key)).toBe(JSON.stringify(initial));

    const next1 = initial + 1;
    const next2 = initial + 2;

    act(() => result.current[1](next1));
    act(() => result.current[1](next2));

    expect(storage.getItem(key)).toBe(JSON.stringify(next2));
  });

  it("should use the storage value as the initial state", () => {
    const key = getKey();
    const storage = new MockStorage();

    const initial1 = 1;
    const initial2 = 2;

    storage.setItem(key, JSON.stringify(initial1));

    const { result } = renderHook(() =>
      usePersistentState(key, initial2, storage)
    );

    expect(result.current[0]).toBe(initial1);
  });

  it("should use the initial value if the storage value is invalid", () => {
    const key = getKey();
    const initial = 1;
    const storage = new MockStorage();

    storage.setItem(key, "{");

    const { result } = renderHook(() =>
      usePersistentState(key, initial, storage)
    );

    expect(result.current[0]).toBe(initial);
  });

  it("should stringify the state before saving it", () => {
    const key = getKey();
    const storage = new MockStorage();

    const initial = { test: 1 };

    const { result } = renderHook(() =>
      usePersistentState(key, initial, storage)
    );

    expect(storage.getItem(key)).toBe(JSON.stringify(result.current[0]));
    expect(storage.getItem(key)).not.toEqual(result.current[0]);
  });
});

export function getKey(): string {
  return Math.random().toString().replace(".", "");
}

export class MockStorage implements Storage {
  private data: Record<string, string> = {};

  get length(): number {
    return Object.values(this.data).length;
  }

  setItem(key: string, value: string) {
    this.data[key] = value;
  }

  getItem(key: string): string | null {
    return this.data[key] ?? null;
  }

  removeItem(key: string): void {
    if (key in this.data) delete this.data[key];
  }

  key(index: number): string | null {
    return Object.keys(this.data)[index] ?? null;
  }

  clear(): void {
    Object.keys(this.data).forEach((key) => this.removeItem(key));
  }
}
