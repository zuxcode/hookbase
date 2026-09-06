import { renderHook } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { useActiveLink } from "../hooks/use-active-link";

describe("useActiveLink", () => {
  const renderActiveLink = (pathname: string) =>
    renderHook(() => useActiveLink({ pathname })).result.current;

  describe("exact matching", () => {
    it("matches the current pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match a different pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/settings")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("matches nested routes by default", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/users");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match similar but unrelated paths", () => {
      const { getActiveLinkProps } = renderActiveLink("/users");

      expect(getActiveLinkProps("/user")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });
  });

  describe("exact option", () => {
    it("only matches the exact pathname when exact is true", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/users");

      expect(getActiveLinkProps("/dashboard", { exact: true })).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("matches an exact pathname when exact is true", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/dashboard", { exact: true })).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("root pathname", () => {
    it("matches the root pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("/");

      expect(getActiveLinkProps("/")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not match root against another route", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("does not allow root to match every route", () => {
      const { getActiveLinkProps } = renderActiveLink("/anything");

      expect(getActiveLinkProps("/")).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });
  });

  describe("query strings and hashes", () => {
    it("ignores query strings in the current pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard?tab=users");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("ignores hashes in the current pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard#users");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("ignores query strings and hashes in href", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/dashboard?tab=users#section")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("trailing slashes", () => {
    it("normalizes trailing slashes by default", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("normalizes multiple trailing slashes", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard///");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("keeps the root pathname as '/'", () => {
      const { getActiveLinkProps } = renderActiveLink("////");

      expect(getActiveLinkProps("/")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("does not normalize trailing slashes when trailingSlash is false", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/");

      expect(
        getActiveLinkProps("/dashboard", { trailingSlash: false })
      ).toEqual({
        active: false,
        "aria-current": undefined,
        "data-active": false,
      });
    });

    it("requires the same trailing slash when normalization is disabled", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/");

      expect(
        getActiveLinkProps("/dashboard/", { trailingSlash: false })
      ).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("path normalization", () => {
    it("adds a leading slash to the href", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });

    it("adds a leading slash to the current pathname", () => {
      const { getActiveLinkProps } = renderActiveLink("dashboard");

      expect(getActiveLinkProps("/dashboard")).toEqual({
        active: true,
        "aria-current": "page",
        "data-active": true,
      });
    });
  });

  describe("aria-current", () => {
    it("returns 'page' when the link is active", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/dashboard")["aria-current"]).toBe("page");
    });

    it("returns undefined when the link is inactive", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/settings")["aria-current"]).toBeUndefined();
    });
  });

  describe("data-active", () => {
    it("returns true when the link is active", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/dashboard")["data-active"]).toBe(true);
    });

    it("returns false when the link is inactive", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard");

      expect(getActiveLinkProps("/settings")["data-active"]).toBe(false);
    });
  });

  describe("multiple links", () => {
    it("can evaluate multiple hrefs from the same hook instance", () => {
      const { getActiveLinkProps } = renderActiveLink("/dashboard/users");

      expect(getActiveLinkProps("/dashboard").active).toBe(true);
      expect(getActiveLinkProps("/dashboard/users").active).toBe(true);
      expect(getActiveLinkProps("/settings").active).toBe(false);
      expect(getActiveLinkProps("/user").active).toBe(false);
    });
  });
});
