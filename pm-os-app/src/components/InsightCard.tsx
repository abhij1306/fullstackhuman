import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Link } from "react-router-dom"
import { ExternalLink, Quote, Tag } from "lucide-react"
import type { EnrichedInsight } from "@/types"
import { cn } from "@/lib/utils"

interface InsightCardProps {
    insight: EnrichedInsight
    index?: number
    className?: string
}

// Fun color schemes for different insight types
const typeColors: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
    "Framework": { bg: "bg-blue-50", text: "text-blue-700", border: "border-blue-200", iconBg: "icon-bg-blue" },
    "Strategy": { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", iconBg: "icon-bg-purple" },
    "Tactic": { bg: "bg-teal-50", text: "text-teal-700", border: "border-teal-200", iconBg: "icon-bg-teal" },
    "Metric": { bg: "bg-orange-50", text: "text-orange-700", border: "border-orange-200", iconBg: "icon-bg-orange" },
    "Principle": { bg: "bg-pink-50", text: "text-pink-700", border: "border-pink-200", iconBg: "icon-bg-pink" },
    "Case Study": { bg: "bg-green-50", text: "text-green-700", border: "border-green-200", iconBg: "icon-bg-green" },
}

export const InsightCard = ({ insight, index, className }: InsightCardProps) => {
    const colors = typeColors[insight.type] || { bg: "bg-purple-50", text: "text-purple-700", border: "border-purple-200", iconBg: "icon-bg-purple" }

    return (
        <Card
            className={cn(
                "break-inside-avoid animate-fade-in group shadow-fun hover:shadow-fun-hover hover-bounce transition-all duration-300 border-0 overflow-hidden",
                className
            )}
            style={{ animationDelay: `${(index || 0) * 0.05}s` }}
        >
            {/* Top gradient bar */}
            <div className={cn("h-1 w-full bg-gradient-to-r from-transparent via-current to-transparent opacity-30", colors.text)} />

            <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex items-center justify-between mb-2">
                    <div className={cn("flex items-center gap-1.5 px-2.5 py-1 rounded-full", colors.bg, colors.border)}>
                        <Tag className={cn("h-3 w-3", colors.text)} />
                        <span className={cn("text-[10px] font-semibold uppercase tracking-wide", colors.text)}>
                            {insight.type}
                        </span>
                    </div>
                    <Link
                        to={`/inventory?guest=${insight.slug || insight.guest.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-[10px] text-muted-foreground font-medium hover:text-purple-600 transition-colors flex items-center gap-0.5 px-2 py-1 rounded-full hover:bg-purple-50"
                    >
                        {insight.guest}
                        <ExternalLink className="h-2.5 w-2.5 opacity-50" />
                    </Link>
                </div>
                <CardTitle className="text-sm leading-tight group-hover:text-purple-600 transition-colors font-semibold">
                    {insight.topic}
                </CardTitle>
            </CardHeader>
            <CardContent className="pt-0 pb-4 px-4">
                {insight.publish_date && (
                    <div className="flex items-center gap-1.5 mb-2 text-[10px] text-muted-foreground">
                        <span className="px-1.5 py-0.5 rounded bg-gray-100">{new Date(insight.publish_date).toLocaleDateString()}</span>
                        {insight.youtube_url && (
                            <a href={insight.youtube_url} target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors p-0.5 rounded hover:bg-purple-50">
                                <ExternalLink className="h-2.5 w-2.5" />
                            </a>
                        )}
                    </div>
                )}
                <p className="text-xs text-muted-foreground leading-relaxed">
                    {insight.content}
                </p>

                {insight.quotation && (
                    <div className="relative border-l-2 border-purple-300 pl-3 py-2 my-3 bg-gradient-to-r from-purple-50/50 to-transparent rounded-r-lg">
                        <Quote className="absolute -left-1 -top-1 h-3 w-3 text-purple-300 rotate-180" />
                        <p className="italic text-[11px] text-purple-700/70 leading-snug">
                            "{insight.quotation}"
                        </p>
                    </div>
                )}

                {insight.tag && (
                    <div className="mt-3 flex flex-wrap gap-1.5">
                        <Link to={`/inventory?q=${encodeURIComponent(insight.tag)}`}>
                            <Badge
                                variant="secondary"
                                className="text-[10px] bg-gradient-to-r from-purple-100 to-purple-50 hover:from-purple-500 hover:to-purple-600 hover:text-white transition-all cursor-pointer px-2.5 py-0.5 h-5 border-0 font-medium"
                            >
                                #{insight.tag}
                            </Badge>
                        </Link>
                    </div>
                )}
            </CardContent>
        </Card>
    )
}
