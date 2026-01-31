import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Lightbulb, ClipboardList, Palette, Code, Rocket, TrendingUp, Network, Zap, Layers } from "lucide-react"
import { getInsightStats, getFeaturedInsight, getAllSearchTerms, getAllEpisodes, PRODUCT_STAGES, getSmartNavigation } from "@/lib/insights"
import { useState, useMemo } from "react"
import { Link, useNavigate } from "react-router-dom"
import { SearchAutocomplete } from "@/components/SearchAutocomplete"

const stats = getInsightStats()
const episodes = getAllEpisodes()
const totalEpisodes = episodes.length

const stageIcons: Record<string, any> = {
    "Discovery": Lightbulb,
    "Strategy": ClipboardList,
    "Design": Palette,
    "Development": Code,
    "Launch": Rocket,
    "Growth": TrendingUp,
    "Scale": Network,
    "Optimization": Zap,
    "Core Skills": Layers
}

const stageIconBg: Record<string, string> = {
    "Discovery": "icon-bg-teal",
    "Strategy": "icon-bg-orange",
    "Design": "icon-bg-pink",
    "Development": "icon-bg-purple",
    "Launch": "icon-bg-blue",
    "Growth": "icon-bg-green",
    "Scale": "icon-bg-indigo",
    "Optimization": "icon-bg-amber",
    "Core Skills": "icon-bg-red"
}

const stages = PRODUCT_STAGES.map(stage => ({
    ...stage,
    icon: stageIcons[stage.name] || Layers,
    count: stats[stage.name] || 0,
    iconBg: stageIconBg[stage.name] || "icon-bg-gray"
}))

export default function HomePage() {
    const navigate = useNavigate()
    const [searchQuery, setSearchQuery] = useState("")
    const featuredInsight = useMemo(() => getFeaturedInsight(), [])
    const searchTerms = useMemo(() => getAllSearchTerms(), [])

    const handleSearch = (term: string) => {
        setSearchQuery(term)
        if (term.trim()) {
            navigate(getSmartNavigation(term))
        }
    }

    return (
        <div className="space-y-5 animate-fade-in">
            {/* Hero Section */}
            <div className="relative flex flex-col items-center text-center space-y-4 py-8 px-4 rounded-2xl bg-gradient-to-br from-teal-50 via-white to-purple-50 border border-teal-100/50 shadow-fun overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-teal-200/30 to-transparent rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-200/30 to-transparent rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />
                <div className="absolute top-1/2 left-1/4 w-20 h-20 bg-gradient-to-br from-orange-200/20 to-transparent rounded-full blur-2xl" />

                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-teal-100 to-teal-50 border border-teal-200/50 mb-3">
                        <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse" />
                        <span className="text-xs font-medium text-teal-700">Live Insights from Lenny's Podcast</span>
                    </div>
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-teal-600 via-purple-600 to-orange-500 bg-clip-text text-transparent pb-1 leading-tight">
                        Product Management OS
                    </h1>
                    <p className="max-w-lg text-sm text-muted-foreground mt-2">
                        Curated wisdom to help you build better products
                    </p>
                </div>
                <div className="w-full max-w-md pt-2 relative z-10">
                    <SearchAutocomplete
                        placeholder="Search insights..."
                        suggestions={searchTerms}
                        value={searchQuery}
                        onSearch={handleSearch}
                    />
                </div>
            </div>

            {/* Stats Overview - Horizontal Scrollable Pills */}
            <div className="space-y-4">
                <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 overflow-y-hidden">
                    {stages.map((stage, index) => (
                        <Link
                            key={stage.name}
                            to={`/stage/${stage.id}?tab=all`}
                            className="animate-fade-in-up flex-shrink-0 group"
                            style={{ animationDelay: `${index * 0.05}s` }}
                        >
                            <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all hover:-translate-y-0.5 min-w-[115px]">
                                <div className={`p-1.5 rounded-lg ${stage.iconBg} transition-transform group-hover:scale-110 shadow-sm`}>
                                    <stage.icon className="h-3.5 w-3.5" />
                                </div>
                                <div className="min-w-0 pr-0.5">
                                    <p className="text-[9px] text-muted-foreground font-black uppercase tracking-wider truncate">
                                        {stage.name}
                                    </p>
                                    <p className="text-lg font-bold leading-tight mt-0">{stage.count}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Featured Section */}
            {featuredInsight && (
                <div className="grid gap-4 md:grid-cols-2">
                    <Card className="relative overflow-hidden group border-gradient-purple shadow-fun hover:shadow-fun-hover hover-bounce border-0">
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-xl icon-bg-purple">
                                    <Lightbulb className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-semibold text-purple-600 uppercase tracking-wide">Featured Insight</span>
                            </div>
                            <CardTitle className="text-sm font-semibold group-hover:text-purple-600 transition-colors line-clamp-2">
                                {featuredInsight.topic}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4 px-4">
                            <p className="text-xs text-muted-foreground line-clamp-2 mb-3">
                                {featuredInsight.content}
                            </p>
                            <div className="flex items-center justify-between">
                                <span className="text-xs font-medium text-foreground bg-purple-50 px-2 py-1 rounded-full">
                                    {featuredInsight.guest}
                                </span>
                                <span className="text-[10px] font-medium text-purple-600 bg-purple-100 px-2 py-1 rounded-full">
                                    {featuredInsight.stage}
                                </span>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="relative overflow-hidden border-gradient-teal shadow-fun hover:shadow-fun-hover hover-bounce border-0">
                        <CardHeader className="pb-2 pt-4 px-4">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="p-2 rounded-xl icon-bg-teal">
                                    <TrendingUp className="h-4 w-4" />
                                </div>
                                <span className="text-xs font-semibold text-teal-600 uppercase tracking-wide">Quick Stats</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-0 pb-4 px-4">
                            <div className="grid grid-cols-2 gap-3">
                                <div className="p-3 rounded-xl bg-gradient-to-br from-teal-50 to-teal-100/50">
                                    <div className="text-2xl font-bold text-teal-700">{Object.values(stats).reduce((a, b) => a + b, 0)}</div>
                                    <p className="text-xs text-teal-600 font-medium">Total Insights</p>
                                </div>
                                <div className="p-3 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50">
                                    <div className="text-2xl font-bold text-orange-700">{totalEpisodes}</div>
                                    <p className="text-xs text-orange-600 font-medium">Episodes</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    )
}
