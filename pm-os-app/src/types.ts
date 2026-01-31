export interface InsightItem {
    type: string // "Framework", "Strategy", etc.
    topic: string
    content: string
    quotation: string
    stage: string // "Discovery", "Strategy", etc.
    tag: string
}

export interface Episode {
    slug: string
    guest: string
    title: string
    insights: InsightItem[]
    youtube_url?: string
    publish_date?: string
}

export interface Batch {
    batch_id: string
    episodes_processed: number
    insights: Episode[]
}

// The flattened structure used by the UI
export interface EnrichedInsight extends InsightItem {
    guest: string
    episodeTitle: string
    slug: string
    youtube_url?: string
    publish_date?: string
}

export type Stage = "Discovery" | "Strategy" | "Design" | "Development" | "Launch" | "Growth" | "Scale" | "Optimization" | "Core Skills"
