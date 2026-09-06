import { useCallback } from "react";

const queryStringRegex = /[?#]/;
const trailingSlashRegex = /\/+$/;

export interface ActiveLinkOptions {
  /**
   * Match only the exact pathname.
   *
   * @default false
   */
  exact?: boolean;

  /**
   * Normalize trailing slashes.
   *
   * @default true
   */
  trailingSlash?: boolean;
}

export interface UseActiveLinkOptions {
  pathname: string;
}

export interface ActiveLink {
  getActiveLinkProps: (
    href: string,
    options?: ActiveLinkOptions
  ) => {
    active: boolean;
    "aria-current": React.AriaAttributes["aria-current"];
    "data-active": boolean | undefined;
  };
}

function normalizePath(path: string, trailingSlash = true): string {
  // Remove query string and hash
  const pathname = path.split(queryStringRegex, 1)[0] || "/";

  // Ensure path starts with /
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;

  if (!trailingSlash) {
    return normalized;
  }

  // "/" should remain "/"
  if (normalized === "/") {
    return normalized;
  }

  return normalized.replace(trailingSlashRegex, "");
}

function matchPath(
  pathname: string,
  href: string,
  options: ActiveLinkOptions = {}
): boolean {
  const { exact = false, trailingSlash = true } = options;

  const currentPath = normalizePath(pathname, trailingSlash);

  const targetPath = normalizePath(href, trailingSlash);

  // Root should never match every route.
  if (targetPath === "/") {
    return currentPath === "/";
  }

  // Exact matching.
  if (exact) {
    // Strict mode: ONLY exact matches.
    return currentPath === targetPath;
  }

  // Exact match.
  if (currentPath === targetPath) {
    // Normal mode: exact match is active.
    return true;
  }

  // Nested route matching.
  //
  // /dashboard       -> /dashboard/users ✓
  // /dashboard       -> /dashboard/settings ✓
  // /user            -> /users            ✗
  return currentPath.startsWith(`${targetPath}/`);
}

/**
 * Router-agnostic active-link hook.
 */
export function useActiveLink({ pathname }: UseActiveLinkOptions): ActiveLink {
  const getActiveLinkProps = useCallback(
    (href: string, options?: ActiveLinkOptions) => {
      const active = matchPath(pathname, href, options);

      return {
        active,
        "aria-current": active ? "page" : undefined,
        "data-active": active,
      };
    },
    [pathname]
  );

  return {
    getActiveLinkProps,
  };
}
