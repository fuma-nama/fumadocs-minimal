"use client";
import {
  SidebarSeparator,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible";
import Link from "fumadocs-core/link";
import type { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";

export function PageTreeItem({ item }: { item: PageTree.Node }) {
  const pathname = usePathname();

  if (item.type === "page") {
    return (
      <SidebarMenuButton isActive={item.url === pathname} asChild>
        <Link href={item.url} external={item.external}>
          {item.name}
        </Link>
      </SidebarMenuButton>
    );
  }

  if (item.type === "separator")
    return <SidebarSeparator>{item.name}</SidebarSeparator>;

  if (item.type === "folder") {
    return (
      <Collapsible className="group/collapsible">
        <CollapsibleTrigger asChild>
          {item.index ? (
            <SidebarMenuButton isActive={item.index.url === pathname} asChild>
              <Link href={item.index.url} external={item.index.external}>
                {item.index.name}
              </Link>
            </SidebarMenuButton>
          ) : (
            <SidebarMenuButton>{item.name}</SidebarMenuButton>
          )}
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {item.children.map((child, i) => (
              <SidebarMenuSubItem key={i}>
                <PageTreeItem item={child} />
              </SidebarMenuSubItem>
            ))}
            <SidebarMenuSubItem />
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    );
  }
}
