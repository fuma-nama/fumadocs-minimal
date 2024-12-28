import { Navbar } from "@/components/navbar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col gap-8 px-4 items-center max-w-[1200px] mx-auto pb-24">
      <Navbar className="mb-12" />
      <h1 className="text-xl font-bold">Fumadocs Minimal</h1>
      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            content/index.mdx
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>

      <div className="flex flex-row gap-2 items-center">
        <Link href="/docs" className={cn(buttonVariants())}>
          Read Docs
        </Link>
      </div>
    </main>
  );
}
