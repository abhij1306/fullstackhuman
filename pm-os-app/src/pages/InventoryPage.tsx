import { Database, ChevronRight, ChevronDown, ExternalLink, PlayCircle, ArrowUpDown } from "lucide-react"
import { Link } from "react-router-dom"
import { useState, useMemo, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { getAllEpisodes, getAllTags, getAllGuests } from "@/lib/insights"
import { SearchAutocomplete } from "@/components/SearchAutocomplete"

type SortField = 'guest' | 'title' | 'date'
type SortOrder = 'asc' | 'desc'

function GuestRow({ ep, id, isExpanded, onToggle }: { ep: any; id: string; isExpanded: boolean; onToggle: () => void }) {
    return (
        <>
            <tr
                id={id}
                className={cn(
                    "border-b transition-colors cursor-pointer hover:bg-muted/40",
                    isExpanded && "bg-muted/30"
                )}
                onClick={onToggle}
            >
                <td className="p-3 align-middle">
                    <div className="flex items-center gap-2">
                        {isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 text-primary" />
                        ) : (
                            <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
                        )}
                        <span className="font-medium text-sm">{ep.guest}</span>
                    </div>
                </td>
                <td className="p-3 align-middle text-muted-foreground text-xs hidden md:table-cell line-clamp-1">{ep.title}</td>
                <td className="p-3 align-middle text-muted-foreground font-mono text-[10px] hidden sm:table-cell">
                    {ep.publish_date ? new Date(ep.publish_date).toLocaleDateString() : "-"}
                </td>
                <td className="p-3 align-middle">
                    {ep.youtube_url && (
                        <a
                            href={ep.youtube_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-[10px] font-medium text-primary hover:text-primary/80 transition-colors border border-primary/20 bg-primary/5 px-2 py-1 rounded-md"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <PlayCircle className="h-3 w-3" />
                            Watch
                        </a>
                    )}
                </td>
            </tr>
            {isExpanded && (
                <tr className="bg-muted/20 border-b">
                    <td colSpan={4} className="p-0">
                        <div className="p-3 space-y-2 animate-fade-in">
                            <div className="grid gap-2 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                                {ep.insights.map((insight: any, idx: number) => (
                                    <Link
                                        key={idx}
                                        to={`/stage/${(insight.stage || "discovery").toLowerCase()}`}
                                        className="group block p-2.5 rounded-md bg-background border border-border/50 hover:border-primary/40 hover:shadow-sm transition-all"
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <span className="text-[10px] font-medium uppercase tracking-wide text-primary px-1.5 py-0.5 rounded bg-primary/5">
                                                {insight.type}
                                            </span>
                                            <span className="text-[10px] text-muted-foreground flex items-center gap-0.5 group-hover:text-primary transition-colors">
                                                {insight.stage}
                                                <ExternalLink className="h-2.5 w-2.5" />
                                            </span>
                                        </div>
                                        <h4 className="text-xs font-medium mb-1 line-clamp-1 group-hover:text-primary transition-colors">
                                            {insight.topic}
                                        </h4>
                                        <p className="text-[11px] text-muted-foreground line-clamp-2 leading-relaxed">
                                            {insight.content}
                                        </p>
                                    </Link>
                                ))}
                            </div>
                            {ep.insights.length === 0 && (
                                <p className="text-center text-xs text-muted-foreground py-3 italic">
                                    No detailed insights available for this episode yet.
                                </p>
                            )}
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}

export default function InventoryPage() {
    const guestSlug = new URLSearchParams(window.location.search).get("guest")

    const [searchQuery, setSearchQuery] = useState("")
    const [expandedGuest, setExpandedGuest] = useState<string | null>(guestSlug)
    const [sortField, setSortField] = useState<SortField>('date')
    const [sortOrder, setSortOrder] = useState<SortOrder>('desc')

    const allTags = useMemo(() => getAllTags(), [])
    const allGuests = useMemo(() => getAllGuests(), [])
    const suggestions = useMemo(() => [...allTags, ...allGuests].sort(), [allTags, allGuests])

    const episodes = getAllEpisodes()

    // Stats
    const totalEpisodes = episodes.length
    const totalInsights = useMemo(() => episodes.reduce((acc, ep) => acc + (ep.insights?.length || 0), 0), [episodes])

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
        } else {
            setSortField(field)
            setSortOrder('desc')
        }
    }

    const filteredAndSortedEpisodes = useMemo(() => {
        let result = episodes

        if (searchQuery) {
            const q = searchQuery.toLowerCase()
            result = result.filter(ep =>
                ep.guest.toLowerCase().includes(q) ||
                ep.title.toLowerCase().includes(q) ||
                (ep.insights || []).some((ins: any) =>
                    (ins.topic || "").toLowerCase().includes(q) ||
                    (ins.tag || "").toLowerCase().includes(q)
                )
            )
        }

        return result.sort((a, b) => {
            let comparison = 0

            if (sortField === 'date') {
                const dateA = new Date(a.publish_date || 0).getTime()
                const dateB = new Date(b.publish_date || 0).getTime()
                comparison = dateA - dateB
            } else if (sortField === 'guest') {
                comparison = a.guest.localeCompare(b.guest)
            } else if (sortField === 'title') {
                comparison = a.title.localeCompare(b.title)
            }

            return sortOrder === 'asc' ? comparison : -comparison
        })
    }, [episodes, searchQuery, sortField, sortOrder])

    useEffect(() => {
        if (guestSlug) {
            setExpandedGuest(guestSlug)
            setTimeout(() => {
                const element = document.getElementById(`guest-${guestSlug}`)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'center' })
                }
            }, 300)
        }
    }, [guestSlug])

    const SortIcon = ({ field }: { field: SortField }) => {
        if (sortField !== field) return <ArrowUpDown className="ml-1 h-3 w-3 opacity-30" />
        return <ArrowUpDown className={cn("ml-1 h-3 w-3 text-primary", sortOrder === 'asc' && "transform rotate-180")} />
    }

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b">
                <div className="flex items-center gap-2">
                    <div className="p-1.5 rounded-md bg-primary/10">
                        <Database className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                        <h1 className="text-lg font-semibold tracking-tight">Content Inventory</h1>
                        <p className="text-xs text-muted-foreground">Explore the PM knowledge base</p>
                    </div>
                </div>

                <div className="flex gap-2">
                    <div className="bg-muted/50 border rounded-lg px-3 py-1.5 flex flex-col items-center min-w-[70px]">
                        <span className="text-lg font-semibold">{totalEpisodes}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Episodes</span>
                    </div>
                    <div className="bg-muted/50 border rounded-lg px-3 py-1.5 flex flex-col items-center min-w-[70px]">
                        <span className="text-lg font-semibold">{totalInsights}</span>
                        <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Insights</span>
                    </div>
                </div>
            </div>

            {/* Search */}
            <div className="flex items-center gap-2">
                <div className="relative w-full sm:w-64">
                    <SearchAutocomplete
                        placeholder="Filter guests, titles..."
                        value={searchQuery}
                        onSearch={(val) => setSearchQuery(val)}
                        suggestions={suggestions}
                    />
                </div>
                {searchQuery && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSearchQuery("")}
                        className="text-xs h-8"
                    >
                        Clear
                    </Button>
                )}
            </div>

            {/* Table */}
            <Card className="overflow-hidden">
                <CardHeader className="bg-muted/30 border-b py-2.5 px-3">
                    <CardTitle className="flex items-center gap-2 text-sm font-medium">
                        <Database className="h-3.5 w-3.5 text-primary" />
                        Guest Database
                        {searchQuery && (
                            <Badge variant="secondary" className="ml-2 text-[10px] h-5">
                                {filteredAndSortedEpisodes.length} matches
                            </Badge>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b bg-muted/20">
                                    <th
                                        className="h-8 px-3 text-left align-middle font-medium text-muted-foreground uppercase tracking-wide text-[10px] cursor-pointer hover:bg-muted/40 transition-colors"
                                        onClick={() => handleSort('guest')}
                                    >
                                        <div className="flex items-center">
                                            Guest
                                            <SortIcon field="guest" />
                                        </div>
                                    </th>
                                    <th
                                        className="h-8 px-3 text-left align-middle font-medium text-muted-foreground uppercase tracking-wide text-[10px] hidden md:table-cell cursor-pointer hover:bg-muted/40 transition-colors"
                                        onClick={() => handleSort('title')}
                                    >
                                        <div className="flex items-center">
                                            Title
                                            <SortIcon field="title" />
                                        </div>
                                    </th>
                                    <th
                                        className="h-8 px-3 text-left align-middle font-medium text-muted-foreground uppercase tracking-wide text-[10px] hidden sm:table-cell cursor-pointer hover:bg-muted/40 transition-colors"
                                        onClick={() => handleSort('date')}
                                    >
                                        <div className="flex items-center">
                                            Date
                                            <SortIcon field="date" />
                                        </div>
                                    </th>
                                    <th className="h-8 px-3 text-left align-middle font-medium text-muted-foreground uppercase tracking-wide text-[10px]">Watch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredAndSortedEpisodes.map((ep) => (
                                    <GuestRow
                                        key={ep.slug}
                                        ep={ep}
                                        id={`guest-${ep.slug}`}
                                        isExpanded={expandedGuest === ep.slug}
                                        onToggle={() => setExpandedGuest(expandedGuest === ep.slug ? null : ep.slug)}
                                    />
                                ))}
                                {filteredAndSortedEpisodes.length === 0 && (
                                    <tr>
                                        <td colSpan={4} className="p-8 text-center text-muted-foreground text-xs italic">
                                            No matching guests or insights found for "{searchQuery}".
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
