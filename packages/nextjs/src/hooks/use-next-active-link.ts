"use client";

import { type ActiveLink, useActiveLink } from "hookforge-core";
import { usePathname } from "next/navigation";

/**
 * A hook that determines if a link is active based on the current pathname.
 *
 * @example
 * ```tsx
 * "use client";
 *
 * import Link from "next/link";
 * import { useNextActiveLink } from "hookforge/next";
 *
 * export function Navigation() {
 *   const { isActive } = useNextActiveLink();
 *
 *   return (
 *     <nav>
 *       <Link
 *         href="/dashboard"
 *         className={
 *           isActive("/dashboard")
 *             ? "text-primary"
 *             : "text-muted-foreground"
 *         }
 *       >
 *         Dashboard
 *       </Link>
 *
 *       <Link
 *         href="/users"
 *         className={
 *           isActive("/users")
 *             ? "text-primary"
 *             : "text-muted-foreground"
 *         }
 *       >
 *         Users
 *       </Link>
 *     </nav>
 *   );
 * }
 * ```
 *
 * @returns An active-link utility for matching links against the current pathname.
 */
export function useNextActiveLink(): ActiveLink {
  const pathname = usePathname();

  return useActiveLink({
    pathname: pathname || "/",
  });
}
