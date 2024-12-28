import { cn } from "@/lib/utils";
import Link from "next/link";
import type { HTMLAttributes } from "react";

export function Navbar(props: HTMLAttributes<HTMLElement>) {
  return (
    <nav
      {...props}
      className={cn(
        "sticky flex flex-row items-center gap-2 top-2 shadow-md py-2 px-4 max-w-[1200px] mx-auto w-full border rounded-xl",
        props.className
      )}
    >
      <Link href="/" className="font-semibold mr-auto">
        Fumadocs
      </Link>
      {props.children}
    </nav>
  );
}
