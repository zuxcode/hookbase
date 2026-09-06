import { renderHook } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { useNextActiveLink } from "../hooks";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

const mockedUsePathname = vi.mocked(usePathname);

describe("useNextActiveLink", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns active for the current pathname", () => {
    mockedUsePathname.mockReturnValue("/dashboard");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard").active).toBe(true);
    expect(result.current.isActive("/users").active).toBe(false);
  });

  it("matches nested routes", () => {
    mockedUsePathname.mockReturnValue("/dashboard/settings");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard").active).toBe(true);
    expect(result.current.isActive("/dashboard/settings").active).toBe(true);
    expect(result.current.isActive("/users").active).toBe(false);
  });

  it("supports exact matching", () => {
    mockedUsePathname.mockReturnValue("/dashboard/settings");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard", { exact: true }).active).toBe(
      false
    );

    expect(
      result.current.isActive("/dashboard/settings", { exact: true }).active
    ).toBe(true);
  });

  it("handles the root pathname", () => {
    mockedUsePathname.mockReturnValue("/");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/").active).toBe(true);
    expect(result.current.isActive("/dashboard").active).toBe(false);
  });

  it("falls back to '/' when usePathname returns null", () => {
    mockedUsePathname.mockReturnValue(null);

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/").active).toBe(true);
    expect(result.current.isActive("/dashboard").active).toBe(false);
  });

  it("returns the expected accessibility attributes", () => {
    mockedUsePathname.mockReturnValue("/dashboard");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard")).toEqual({
      active: true,
      "aria-current": "page",
      "data-active": true,
    });

    expect(result.current.isActive("/users")).toEqual({
      active: false,
      "aria-current": undefined,
      "data-active": undefined,
    });
  });

  it("handles trailing slashes", () => {
    mockedUsePathname.mockReturnValue("/dashboard/");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard").active).toBe(true);
    expect(result.current.isActive("/dashboard/").active).toBe(true);
  });

  it("handles query strings and hash fragments", () => {
    mockedUsePathname.mockReturnValue("/dashboard");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.isActive("/dashboard?tab=settings").active).toBe(
      true
    );

    expect(result.current.isActive("/dashboard#settings").active).toBe(true);
  });
});
