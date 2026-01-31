import consolidatedData from "@/data/insights.json"
import episodesMetadata from "../../../episodes_metadata.json"
import type { Batch, EnrichedInsight } from "@/types"

// Aggregates insights from all batches
const batches = [consolidatedData] as unknown as Batch[]

export const PRODUCT_STAGES = [
    { name: "Discovery", id: "discovery" },
    { name: "Strategy", id: "strategy" },
    { name: "Design", id: "design" },
    { name: "Development", id: "development" },
    { name: "Launch", id: "launch" },
    { name: "Growth", id: "growth" },
    { name: "Scale", id: "scale" },
    { name: "Optimization", id: "optimization" },
    { name: "Core Skills", id: "core-skills" },
]

// Safe access to episodes array regardless of whether JSON import is treated as objects or array
const metadataSource = ((episodesMetadata as any).episodes || (Array.isArray(episodesMetadata) ? episodesMetadata : [])) as any[];
const metadataMap = new Map(metadataSource.map((e: any) => [e.slug, e]));

// Flatten all insights into a single array with metadata
const allInsights: EnrichedInsight[] = batches.flatMap(batch =>
    (batch.insights || []).flatMap(episode => {
        const metadata = metadataMap.get(episode.slug)
        return (episode.insights || []).map(insight => ({
            ...insight,
            guest: episode.guest,
            episodeTitle: episode.title,
            slug: episode.slug,
            youtube_url: metadata?.youtube_url,
            publish_date: metadata?.publish_date
        }))
    })
)

export const getAllEpisodes = () => {
    return batches.flatMap(batch => (batch.insights || []).map(ep => {
        const metadata = metadataMap.get(ep.slug)
        return {
            ...ep,
            batchId: batch.batch_id,
            slug: ep.slug || ep.guest.toLowerCase().replace(/\s+/g, '-'),
            youtube_url: metadata?.youtube_url,
            publish_date: metadata?.publish_date
        }
    }))
}

export const getEpisodeBySlug = (slug: string) => {
    return getAllEpisodes().find(ep => ep.slug === slug)
}

export const getInsightsByStage = (stage: string) => {
    return allInsights.filter(i => (i.stage || "").toLowerCase() === stage.toLowerCase())
}

export const getAllInsights = () => allInsights

export const getInsightStats = () => {
    const stats: Record<string, number> = {}
    allInsights.forEach(i => {
        const stage = i.stage || "Uncategorized"
        stats[stage] = (stats[stage] || 0) + 1
    })
    return stats
}

// Get all unique tags/keywords from insights
export const getAllTags = (): string[] => {
    const tags = new Set<string>()
    allInsights.forEach(i => {
        if (i.tag) tags.add(i.tag)
    })
    return Array.from(tags).sort()
}

// Get all unique guests
export const getAllGuests = (): string[] => {
    const guests = new Set<string>()
    allInsights.forEach(i => {
        if (i.guest) guests.add(i.guest)
    })
    return Array.from(guests).sort()
}

// Get insights by tag/keyword
export const getInsightsByTag = (tag: string): EnrichedInsight[] => {
    return allInsights.filter(i => i.tag.toLowerCase() === tag.toLowerCase())
}

// Get insights by guest
export const getInsightsByGuest = (guest: string): EnrichedInsight[] => {
    return allInsights.filter(i => i.guest.toLowerCase() === guest.toLowerCase())
}

// Get tag counts for inventory display
export const getTagCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {}
    allInsights.forEach(i => {
        const tag = i.tag || "Uncategorized"
        counts[tag] = (counts[tag] || 0) + 1
    })
    return counts
}

// Get guest counts for inventory display
export const getGuestCounts = (): Record<string, number> => {
    const counts: Record<string, number> = {}
    allInsights.forEach(i => {
        const guest = i.guest || "Unknown"
        counts[guest] = (counts[guest] || 0) + 1
    })
    return counts
}

export const getFeaturedInsight = (): EnrichedInsight | null => {
    if (allInsights.length === 0) return null
    // For now, return a random insight. Future: Rotate daily.
    const randomIndex = Math.floor(Math.random() * allInsights.length)
    return allInsights[randomIndex]
}

export const getAllSearchTerms = (): string[] => {
    const terms = new Set<string>()

    // Add all tags and topics
    allInsights.forEach(i => {
        if (i.tag) terms.add(i.tag)
        if (i.topic) terms.add(i.topic)
    })

    // Add all guests
    allInsights.forEach(i => {
        if (i.guest) terms.add(i.guest)
    })

    // Add all stages and common stage + tab combinations
    PRODUCT_STAGES.forEach(s => {
        terms.add(s.name)
        terms.add(`${s.name} Frameworks`)
        terms.add(`${s.name} Tools`)
        terms.add(`${s.name} AI`)
        terms.add(`${s.name} Metrics`)
    })

    return Array.from(terms).sort()
}

/**
 * Returns the destination path based on the search term.
 * Priority: 1. Stage match (with optional tab), 2. Guest match, 3. Insight Topic match, 4. General search
 */
export const getSmartNavigation = (term: string): string => {
    const normalized = term.trim().toLowerCase()
    if (!normalized) return "/"

    // 1. Check for Stage match (handling suffixes like "discovery tools")
    const stageMatch = PRODUCT_STAGES.find(s => {
        const name = s.name.toLowerCase()
        return normalized === name ||
            normalized.startsWith(name + " ") ||
            normalized.endsWith(" " + name)
    })

    if (stageMatch) {
        let tab = ""

        if (normalized.includes("framework")) tab = "frameworks"
        else if (normalized.includes("tool")) tab = "tools"
        else if (normalized.includes("ai")) tab = "ai"
        else if (normalized.includes("metric")) tab = "metrics"

        return `/stage/${stageMatch.id}${tab ? `?tab=${tab}` : ""}`
    }

    // 2. Check for Guest match
    const episodes = getAllEpisodes()
    const guestMatch = episodes.find(ep =>
        ep.guest.toLowerCase() === normalized ||
        (ep.slug && ep.slug.toLowerCase() === normalized)
    )
    if (guestMatch) {
        const slug = guestMatch.slug || guestMatch.guest.toLowerCase().replace(/\s+/g, '-')
        return `/inventory?guest=${slug}`
    }

    // 3. Check for specific Insight Topic match
    const allInsights = getAllInsights()
    const insightMatch = allInsights.find(i => i.topic.toLowerCase() === normalized)

    if (insightMatch) {
        // If it's a specific type that maps to a stage tab, we might want to go there
        // However, user said insights are in inventory row. 
        // But if it's a "Tool" or "Framework" on a stage, maybe stage page is better?
        // Let's stick to the user's previous preference for Inventory row, 
        // UNLESS it's clearly a stage-specific tab request.

        if (insightMatch.guest) {
            const guestFromInsight = episodes.find(ep => ep.guest.toLowerCase() === insightMatch.guest?.toLowerCase())
            if (guestFromInsight) {
                const slug = guestFromInsight.slug || guestFromInsight.guest.toLowerCase().replace(/\s+/g, '-')
                return `/inventory?guest=${slug}`
            }
        }
    }

    // 4. Default to Browse Center for general search/filtering
    return `/browse/all?q=${encodeURIComponent(term)}`
}
