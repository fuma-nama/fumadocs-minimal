"use client";
import {
  SidebarSeparator,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent } from "@/components/ui/collapsible";
import Link from "fumadocs-core/link";
import type { PageTree } from "fumadocs-core/server";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function PageTreeItem({ item }: { item: PageTree.Node }) {
  const [open, setOpen] = useState(false);
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
    const onClick = () => {
      if (!item.index || item.index.url === pathname) {
        setOpen((prev) => !prev);
      } else if (item.index && item.index.url !== pathname) {
        setOpen(true);
      }
    };

    return (
      <Collapsible
        open={open}
        onOpenChange={setOpen}
        className="group/collapsible"
      >
        {item.index ? (
          <SidebarMenuButton
            onClick={onClick}
            isActive={item.index.url === pathname}
            asChild
          >
            <Link href={item.index.url} external={item.index.external}>
              {item.index.name}
            </Link>
          </SidebarMenuButton>
        ) : (
          <SidebarMenuButton onClick={onClick}>{item.name}</SidebarMenuButton>
        )}
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
