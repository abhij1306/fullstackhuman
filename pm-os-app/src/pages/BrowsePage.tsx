import { useParams, useSearchParams, Link, useNavigate } from "react-router-dom"
import { getAllInsights, getAllSearchTerms, getSmartNavigation } from "@/lib/insights"
import { useState, useMemo } from "react"
import { Search, Filter, Tag, User, BookOpen, ArrowRight, Sparkles, LayoutGrid } from "lucide-react"
import { SearchAutocomplete } from "@/components/SearchAutocomplete"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function BrowsePage() {
    const { category } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const [searchTerm, setSearchTerm] = useState(searchParams.get("q") || "")
    const navigate = useNavigate()

    const allInsights = useMemo(() => getAllInsights(), [])
    const searchSuggestions = useMemo(() => getAllSearchTerms(), [])

    const categoryFilter = category === "all" ? "" : category

    const filteredInsights = allInsights.filter(insight => {
        const matchesCategory = categoryFilter
            ? (insight.type || "").toLowerCase().includes(categoryFilter.toLowerCase())
            : true
        const matchesSearch =
            (insight.topic || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (insight.content || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (insight.tag || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
            (insight.guest && insight.guest.toLowerCase().includes(searchTerm.toLowerCase())) ||
            (insight.episodeTitle && insight.episodeTitle.toLowerCase().includes(searchTerm.toLowerCase()))

        return matchesCategory && matchesSearch
    })

    const handleSearchChange = (term: string) => {
        setSearchTerm(term)
        setSearchParams(prev => {
            if (term) prev.set("q", term)
            else prev.delete("q")
            return prev
        })
    }

    const categories = ["Advice", "Alignment", "Approach", "Career", "Framework", "Insight", "Metric", "Strategy"]

    // Group insights by type for a better layout
    const groupedInsights = filteredInsights.reduce((acc, insight) => {
        const type = insight.type || "Other"
        if (!acc[type]) acc[type] = []
        acc[type].push(insight)
        return acc
    }, {} as Record<string, typeof allInsights>)

    return (
        <div className="max-w-6xl mx-auto animate-fade-in">
            {/* Discovery Header - Hero Section */}
            <div className="relative mb-8 p-8 rounded-3xl bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden shadow-elevated">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 animate-pulse" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full blur-2xl -ml-10 -mb-10" />

                <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <div className="space-y-3">
                        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md w-fit text-xs font-medium border border-white/20">
                            <Sparkles className="h-3 w-3" />
                            <span>Global Intelligence Discovery</span>
                        </div>
                        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                            Discovery Center
                        </h1>
                        <p className="text-white/80 max-w-lg text-lg">
                            Explore {allInsights.length} refined product management insights, frameworks, and expert tools.
                        </p>
                    </div>

                    <div className="w-full md:w-80 space-y-2">
                        <div className="relative group">
                            <SearchAutocomplete
                                placeholder="Filter results..."
                                suggestions={searchSuggestions}
                                onSearch={handleSearchChange}
                                className="w-full bg-white/10 backdrop-blur-xl border-white/30 text-white placeholder:text-white/50 focus:bg-white/20 transition-all rounded-2xl h-12 pr-12"
                            />
                            <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/40 group-focus-within:text-white transition-colors" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Fixed Filter Sidebar for Desktop */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="p-5 rounded-2xl bg-white border border-border/60 shadow-subtle space-y-4 sticky top-24">
                        <div className="flex items-center gap-2 font-semibold text-sm">
                            <Filter className="h-4 w-4 text-primary" />
                            <span>Refine by Category</span>
                        </div>

                        <div className="flex flex-col gap-1.5">
                            <Link
                                to="/browse/all"
                                className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${!categoryFilter ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                            >
                                <div className="flex items-center gap-2">
                                    <LayoutGrid className="h-4 w-4" />
                                    <span>All Insights</span>
                                </div>
                                <Badge variant="secondary" className="bg-white/50 text-[10px] h-4 px-1">{allInsights.length}</Badge>
                            </Link>

                            {categories.map(cat => (
                                <Link
                                    key={cat}
                                    to={`/browse/${cat.toLowerCase()}`}
                                    className={`flex items-center justify-between px-3 py-2 rounded-xl text-sm transition-all ${categoryFilter?.toLowerCase() === cat.toLowerCase() ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-muted text-muted-foreground'}`}
                                >
                                    <span>{cat}</span>
                                    <Badge variant="secondary" className="bg-white/50 text-[10px] h-4 px-1">
                                        {allInsights.filter(i => (i.type || "").toLowerCase() === cat.toLowerCase()).length}
                                    </Badge>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Main Results Column */}
                <div className="lg:col-span-3 space-y-8">
                    {filteredInsights.length === 0 ? (
                        <div className="text-center py-20 bg-muted/30 rounded-3xl border-2 border-dashed border-muted/50">
                            <div className="bg-muted w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search className="h-8 w-8 text-muted-foreground" />
                            </div>
                            <h3 className="text-xl font-semibold mb-2">No matches found</h3>
                            <p className="text-muted-foreground">Try adjusting your search or filters to find what you're looking for.</p>
                            <Button variant="outline" className="mt-6 rounded-xl" onClick={() => handleSearchChange("")}>
                                Clear all filters
                            </Button>
                        </div>
                    ) : (
                        Object.entries(groupedInsights).map(([type, insights]) => (
                            <div key={type} className="space-y-4 animate-fade-in-up">
                                <div className="flex items-center justify-between px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="h-8 w-1.5 rounded-full bg-primary/40" />
                                        <h2 className="text-xl font-bold tracking-tight text-foreground">{type} ({insights.length})</h2>
                                    </div>
                                    <div className="h-px flex-1 mx-6 bg-gradient-to-r from-border to-transparent" />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                                    {insights.map((insight, idx) => (
                                        <div
                                            key={idx}
                                            onClick={() => navigate(getSmartNavigation(insight.topic))}
                                            className="group relative flex flex-col sm:flex-row gap-6 p-6 rounded-2xl bg-white border border-border/80 hover:border-primary/40 shadow-subtle hover:shadow-card transition-all cursor-pointer overflow-hidden"
                                        >
                                            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-primary/5 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                                            <div className="flex-1 space-y-4">
                                                <div className="space-y-2">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <div className="p-2 rounded-lg bg-primary/5 text-primary">
                                                                <BookOpen className="h-4 w-4" />
                                                            </div>
                                                            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
                                                                {insight.type || "Insight"}
                                                            </span>
                                                        </div>
                                                        <Link
                                                            to={getSmartNavigation(insight.stage || "discovery")}
                                                            onClick={(e) => e.stopPropagation()}
                                                            className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary hover:text-white transition-colors capitalize"
                                                        >
                                                            {insight.stage || "Uncategorized"}
                                                        </Link>
                                                    </div>
                                                    <h3 className="text-lg font-bold group-hover:text-primary transition-colors pr-8">
                                                        {insight.topic}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                                                        {insight.content}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap items-center gap-4 pt-2">
                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            navigate(getSmartNavigation(insight.guest || ""))
                                                        }}
                                                        className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-muted/50 hover:bg-primary/10 hover:text-primary transition-all text-sm border border-transparent hover:border-primary/20"
                                                    >
                                                        <User className="h-3.5 w-3.5" />
                                                        <span className="font-medium">{insight.guest || "Unknown"}</span>
                                                    </div>

                                                    <div
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            handleSearchChange(insight.tag || "")
                                                        }}
                                                        className="flex items-center gap-2 py-1.5 px-3 rounded-xl bg-muted/50 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-sm border border-transparent hover:border-indigo-100"
                                                    >
                                                        <Tag className="h-3.5 w-3.5" />
                                                        <span className="font-medium">#{insight.tag || "Topic"}</span>
                                                    </div>

                                                    <div className="ml-auto hidden sm:flex items-center gap-1 text-[10px] font-bold text-primary opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0 tracking-tighter uppercase">
                                                        <span>View Details</span>
                                                        <ArrowRight className="h-3 w-3" />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}
