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

    expect(result.current.getActiveLinkProps("/dashboard").active).toBe(true);
    expect(result.current.getActiveLinkProps("/users").active).toBe(false);
  });

  it("matches nested routes", () => {
    mockedUsePathname.mockReturnValue("/dashboard/settings");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.getActiveLinkProps("/dashboard").active).toBe(true);
    expect(
      result.current.getActiveLinkProps("/dashboard/settings").active
    ).toBe(true);
    expect(result.current.getActiveLinkProps("/users").active).toBe(false);
  });

  it("supports exact matching", () => {
    mockedUsePathname.mockReturnValue("/dashboard/settings");

    const { result } = renderHook(() => useNextActiveLink());

    expect(
      result.current.getActiveLinkProps("/dashboard", { exact: true }).active
    ).toBe(false);

    expect(
      result.current.getActiveLinkProps("/dashboard/settings", { exact: true })
        .active
    ).toBe(true);
  });

  it("handles the root pathname", () => {
    mockedUsePathname.mockReturnValue("/");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.getActiveLinkProps("/").active).toBe(true);
    expect(result.current.getActiveLinkProps("/dashboard").active).toBe(false);
  });

  it("falls back to '/' when usePathname returns null", () => {
    mockedUsePathname.mockReturnValue(null);

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.getActiveLinkProps("/").active).toBe(true);
    expect(result.current.getActiveLinkProps("/dashboard").active).toBe(false);
  });

  it("returns the expected accessibility attributes", () => {
    mockedUsePathname.mockReturnValue("/dashboard");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.getActiveLinkProps("/dashboard")).toEqual({
      active: true,
      "aria-current": "page",
      "data-active": true,
    });

    expect(result.current.getActiveLinkProps("/users")).toEqual({
      active: false,
      "aria-current": undefined,
      "data-active": undefined,
    });
  });

  it("handles trailing slashes", () => {
    mockedUsePathname.mockReturnValue("/dashboard/");

    const { result } = renderHook(() => useNextActiveLink());

    expect(result.current.getActiveLinkProps("/dashboard").active).toBe(true);
    expect(result.current.getActiveLinkProps("/dashboard/").active).toBe(true);
  });

  it("handles query strings and hash fragments", () => {
    mockedUsePathname.mockReturnValue("/dashboard");

    const { result } = renderHook(() => useNextActiveLink());

    expect(
      result.current.getActiveLinkProps("/dashboard?tab=settings").active
    ).toBe(true);

    expect(
      result.current.getActiveLinkProps("/dashboard#settings").active
    ).toBe(true);
  });
});
