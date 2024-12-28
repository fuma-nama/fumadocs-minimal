import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { source } from "@/lib/source";
import { PageTreeItem } from "./layout.client";
import { ModeToggle } from "@/components/mode-toggle";
import Link from "next/link";
import { SearchDialog } from "@/components/search";

export default function Layout({ children }: { children: React.ReactNode }) {
  const tree = source.pageTree;

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href="/" className="font-semibold py-1.5 border-b">
            Fumadocs
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu className="p-2">
            {tree.children.map((item, i) => (
              <SidebarMenuItem key={i}>
                <PageTreeItem item={item} />
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <ModeToggle />
        </SidebarFooter>
      </Sidebar>
      <main className="px-4 w-full flex flex-col gap-8 pb-4">
        <nav className="sticky -mx-4 px-2.5 py-2 top-0 bg-secondary/50 rounded flex flex-row gap-2 items-center">
          <Link href="/" className="font-semibold mr-auto md:hidden">
            Fumadocs
          </Link>
          <SearchDialog />
          <SidebarTrigger />
        </nav>
        {children}
      </main>
    </SidebarProvider>
  );
}
