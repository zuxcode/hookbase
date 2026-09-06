import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useActiveLink } from "../hooks/use-active-link";

describe("useActiveLink", () => {
  const renderActiveLink = (pathname: string) =>
    renderHook(() => useActiveLink({ pathname })).result.current;

  describe("exact matching", () => {
    it("matches the current pathname", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match a different pathname", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/settings")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("matches nested routes by default", () => {
      const { isActive } = renderActiveLink("/dashboard/users");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match similar but unrelated paths", () => {
      const { isActive } = renderActiveLink("/users");

      expect(isActive("/user")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });
  });

  describe("exact option", () => {
    it("only matches the exact pathname when exact is true", () => {
      const { isActive } = renderActiveLink("/dashboard/users");

      expect(isActive("/dashboard", { exact: true })).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("matches an exact pathname when exact is true", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/dashboard", { exact: true })).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("root pathname", () => {
    it("matches the root pathname", () => {
      const { isActive } = renderActiveLink("/");

      expect(isActive("/")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match root against another route", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("does not allow root to match every route", () => {
      const { isActive } = renderActiveLink("/anything");

      expect(isActive("/")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });
  });

  describe("query strings and hashes", () => {
    it("ignores query strings in the current pathname", () => {
      const { isActive } = renderActiveLink("/dashboard?tab=users");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("ignores hashes in the current pathname", () => {
      const { isActive } = renderActiveLink("/dashboard#users");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("ignores query strings and hashes in href", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/dashboard?tab=users#section")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("trailing slashes", () => {
    it("normalizes trailing slashes by default", () => {
      const { isActive } = renderActiveLink("/dashboard/");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("normalizes multiple trailing slashes", () => {
      const { isActive } = renderActiveLink("/dashboard///");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("keeps the root pathname as '/'", () => {
      const { isActive } = renderActiveLink("////");

      expect(isActive("/")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not normalize trailing slashes when trailingSlash is false", () => {
      const { isActive } = renderActiveLink("/dashboard/");

      expect(isActive("/dashboard", { trailingSlash: false })).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("requires the same trailing slash when normalization is disabled", () => {
      const { isActive } = renderActiveLink("/dashboard/");

      expect(isActive("/dashboard/", { trailingSlash: false })).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("path normalization", () => {
    it("adds a leading slash to the href", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("adds a leading slash to the current pathname", () => {
      const { isActive } = renderActiveLink("dashboard");

      expect(isActive("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("aria-current", () => {
    it("returns 'page' when the link is active", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/dashboard")["aria-current"]).toBe("page");
    });

    it("returns undefined when the link is inactive", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/settings")["aria-current"]).toBeUndefined();
    });
  });

  describe("data-active", () => {
    it("returns true when the link is active", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/dashboard")["data-active"]).toBe(true);
    });

    it("returns false when the link is inactive", () => {
      const { isActive } = renderActiveLink("/dashboard");

      expect(isActive("/settings")["data-active"]).toBe(false);
    });
  });

  describe("multiple links", () => {
    it("can evaluate multiple hrefs from the same hook instance", () => {
      const { isActive } = renderActiveLink("/dashboard/users");

      expect(isActive("/dashboard").active).toBe(true);
      expect(isActive("/dashboard/users").active).toBe(true);
      expect(isActive("/settings").active).toBe(false);
      expect(isActive("/user").active).toBe(false);
    });
  });
});
