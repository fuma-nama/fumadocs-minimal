"use client";
import React from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useDocsSearch } from "fumadocs-core/search/client";
import { useRouter } from "next/navigation";
import { SearchIcon } from "lucide-react";

export function SearchDialog() {
  const client = useDocsSearch({
    type: "fetch",
  });
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const data = client.query.data;
  return (
    <>
      <button
        className="flex flex-row gap-2 items-center rounded-lg border bg-secondary text-sm py-1.5 px-2 w-full max-w-[240px] hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen(true)}
      >
        <SearchIcon className="size-4" />
        Search
      </button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput
          value={client.search}
          onValueChange={client.setSearch}
          placeholder="Type a command or search..."
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {data && data !== "empty" && data.length > 0 ? (
            <CommandGroup heading="Suggestions">
              {data
                .filter((item) => item.type === "page")
                .map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.id}
                    onSelect={() => {
                      router.push(item.url);
                      setOpen(false);
                    }}
                  >
                    {item.content}
                  </CommandItem>
                ))}
            </CommandGroup>
          ) : null}
        </CommandList>
      </CommandDialog>
    </>
  );
}
