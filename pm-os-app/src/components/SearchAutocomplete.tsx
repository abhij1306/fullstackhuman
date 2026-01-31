"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { cn } from "@/lib/utils"
import { Popover, PopoverContent, PopoverAnchor } from "@/components/ui/popover"

interface SearchAutocompleteProps {
    placeholder?: string
    suggestions: string[]
    value?: string
    onSearch: (value: string) => void
    className?: string
}

export function SearchAutocomplete({
    placeholder = "Search...",
    suggestions,
    value,
    onSearch,
    className,
}: SearchAutocompleteProps) {
    const [open, setOpen] = React.useState(false)
    const [inputValue, setInputValue] = React.useState(value || "")
    const [selectedIndex, setSelectedIndex] = React.useState(-1)
    const containerRef = React.useRef<HTMLDivElement>(null)
    const [width, setWidth] = React.useState(0)

    // Sync width before paint to avoid content shift/snap
    React.useLayoutEffect(() => {
        if (containerRef.current) {
            setWidth(containerRef.current.offsetWidth)
        }
    }, [])

    React.useEffect(() => {
        const observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width)
            }
        })
        if (containerRef.current) observer.observe(containerRef.current)
        return () => observer.disconnect()
    }, [])

    const filteredSuggestions = React.useMemo(() => {
        const query = inputValue.toLowerCase().trim()
        if (!query) return suggestions.slice(0, 10)
        return suggestions
            .filter(s => s.toLowerCase().includes(query))
            .slice(0, 10)
    }, [suggestions, inputValue])

    React.useEffect(() => {
        if (value !== undefined) setInputValue(value)
    }, [value])

    React.useEffect(() => {
        setSelectedIndex(-1)
    }, [inputValue])

    const handleSelect = (currentValue: string) => {
        setInputValue(currentValue)
        onSearch(currentValue)
        setOpen(false)
        setSelectedIndex(-1)
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault()
            if (!open) setOpen(true)
            setSelectedIndex(prev => (prev + 1) % filteredSuggestions.length)
        } else if (e.key === 'ArrowUp') {
            e.preventDefault()
            if (!open) setOpen(true)
            setSelectedIndex(prev => (prev - 1 + filteredSuggestions.length) % filteredSuggestions.length)
        } else if (e.key === 'Enter') {
            if (selectedIndex >= 0 && selectedIndex < filteredSuggestions.length && open) {
                e.preventDefault()
                handleSelect(filteredSuggestions[selectedIndex])
            } else {
                onSearch(inputValue)
                setOpen(false)
            }
        } else if (e.key === 'Escape') {
            setOpen(false)
        }
    }

    return (
        <Popover
            open={open}
            onOpenChange={setOpen}
            modal={false}
        >
            <PopoverAnchor asChild>
                <div
                    ref={containerRef}
                    className={cn("relative w-full group", className)}
                >
                    <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/30 transition-colors group-hover:text-muted-foreground/60 z-10 pointer-events-none" />
                    <input
                        className={cn(
                            "flex h-11 w-full rounded-2xl border border-input/50 bg-background/50 px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground/50 transition-all duration-300 pl-11 pr-4 hover:bg-muted/50 focus:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/20",
                            open && "shadow-lg bg-background border-input"
                        )}
                        placeholder={placeholder}
                        value={inputValue}
                        autoComplete="off"
                        onChange={(e) => {
                            setInputValue(e.target.value)
                            if (!open) setOpen(true)
                        }}
                        onFocus={() => {
                            if (!open) setOpen(true)
                        }}
                        onClick={() => {
                            // Clicking while focused should just ensure it's open
                            if (!open) setOpen(true)
                        }}
                        onKeyDown={handleKeyDown}
                    />
                </div>
            </PopoverAnchor>
            <PopoverContent
                className="p-1.5 bg-popover/90 backdrop-blur-xl border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] rounded-[24px] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
                align="start"
                side="bottom"
                sideOffset={10}
                onOpenAutoFocus={(e) => e.preventDefault()}
                style={{ width: width > 0 ? `${width}px` : 'auto' }}
            >
                <div className="max-h-[380px] overflow-y-auto overflow-x-hidden p-1 custom-scrollbar">
                    {filteredSuggestions.length === 0 ? (
                        <div className="py-10 text-center flex flex-col items-center justify-center text-muted-foreground/30 gap-3">
                            <Search className="h-6 w-6 opacity-20" />
                            <span className="text-[10px] uppercase font-black tracking-[0.2em]">No results found</span>
                        </div>
                    ) : (
                        <>
                            <div className="px-3 py-2 text-[10px] uppercase tracking-[0.25em] font-black text-primary/40 mb-1">
                                Suggestions
                            </div>
                            <div className="space-y-1">
                                {filteredSuggestions.map((suggestion, index) => (
                                    <div
                                        key={suggestion}
                                        onMouseDown={(e) => {
                                            // Vital: prevents blur on input before click is captured
                                            e.preventDefault()
                                        }}
                                        onClick={() => handleSelect(suggestion)}
                                        className={cn(
                                            "relative flex cursor-pointer select-none items-center rounded-xl px-4 py-3 text-[13px] outline-none transition-all duration-200",
                                            index === selectedIndex
                                                ? "bg-primary text-primary-foreground font-semibold shadow-md translate-x-1"
                                                : "hover:bg-muted/80 text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <Search className={cn(
                                            "mr-3 h-4 w-4 shrink-0 transition-all",
                                            index === selectedIndex ? "text-primary-foreground animate-pulse" : "opacity-20"
                                        )} />
                                        <span className="truncate">{suggestion}</span>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
