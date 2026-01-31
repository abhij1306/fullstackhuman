import { useParams, Link, useSearchParams } from "react-router-dom"
import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import { Lightbulb, ClipboardList, Palette, Code, Rocket, TrendingUp, Network, Zap, Bot, ArrowRight, Layers, AlertTriangle, ChevronDown, Copy, Check, Wand2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { InsightCard } from "@/components/InsightCard"
import { getInsightsByStage } from "@/lib/insights"
import { stages } from "@/data/stages"
import { workflows } from "@/data/workflows"
import type { EnrichedInsight } from "@/types"
import { getEpisodeBySlug } from "@/lib/insights"
import { toolMetadata } from "@/data/tool_metadata"
import { ExternalLink } from "lucide-react"
import type { AIWorkflow } from "@/data/stages"
import { cn } from "@/lib/utils"

// AI Workflow Row Component
function AIWorkflowRow({ workflow }: { workflow: AIWorkflow }) {
    const [isOpen, setIsOpen] = useState(false)
    const [copied, setCopied] = useState(false)

    const handleCopy = async () => {
        const textToCopy = `${workflow.title}\n\n${workflow.description}\n\n${workflow.prompt_template || ''}`
        await navigator.clipboard.writeText(textToCopy)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border rounded-lg bg-card overflow-hidden">
            <CollapsibleTrigger asChild>
                <button className="w-full flex items-center justify-between p-3 hover:bg-muted/50 transition-colors text-left">
                    <div className="flex items-center gap-2.5">
                        <div className="flex-shrink-0 w-7 h-7 rounded-md bg-primary/10 flex items-center justify-center">
                            <Wand2 className="h-3.5 w-3.5 text-primary" />
                        </div>
                        <div>
                            <h4 className="font-medium text-sm">{workflow.title}</h4>
                            <p className="text-xs text-muted-foreground line-clamp-1">{workflow.description}</p>
                        </div>
                    </div>
                    <ChevronDown className={cn("h-4 w-4 text-muted-foreground transition-transform", isOpen && "rotate-180")} />
                </button>
            </CollapsibleTrigger>
            <CollapsibleContent>
                <div className="px-3 pb-3 pt-0 border-t bg-muted/20">
                    <div className="pt-3 space-y-2">
                        <p className="text-xs text-muted-foreground">{workflow.description}</p>
                        {workflow.prompt_template && (
                            <div className="relative">
                                <div className="bg-background border rounded-md p-3 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                                    {workflow.prompt_template}
                                </div>
                                <Button
                                    size="sm"
                                    variant="secondary"
                                    className="absolute top-1.5 right-1.5 h-7 gap-1 text-xs"
                                    onClick={handleCopy}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="h-3 w-3" />
                                            Copied
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="h-3 w-3" />
                                            Copy
                                        </>
                                    )}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </CollapsibleContent>
        </Collapsible>
    )
}

// Map stage names to icons
const stageIcons: Record<string, any> = {
    discovery: Lightbulb,
    strategy: ClipboardList,
    design: Palette,
    development: Code,
    launch: Rocket,
    growth: TrendingUp,
    scale: Network,
    optimization: Zap,
    "cross-cutting": Layers,
}

export default function StagePage() {
    const { stageId } = useParams()
    const [searchParams, setSearchParams] = useSearchParams()
    const activeTab = searchParams.get("tab") || "overview"

    const stageKey = stageId?.toLowerCase() || "discovery"
    const stageData = stages[stageKey] || stages.discovery
    const StageIcon = stageIcons[stageKey] || Lightbulb

    const insights = getInsightsByStage(stageData.label)

    const filterByType = (type: string) => insights.filter(i => (i.type || "").toLowerCase().includes(type.toLowerCase()))

    // Insights
    const frameworksInsights = filterByType("Framework")
    const toolsInsights = filterByType("Tool")
    const metricsInsights = filterByType("Metric")
    const aiInsights = insights.filter(i => (i.tag || "").toLowerCase().includes("ai") || (i.topic || "").toLowerCase().includes("ai"))

    // Filter global workflows for this stage
    const stageWorkflows = workflows.filter(w => w.stages.includes(stageKey))

    return (
        <div className="space-y-4 animate-fade-in">
            {/* Header */}
            <div className="flex items-start gap-3 pb-3 border-b">
                <div className="p-2 rounded-lg bg-primary/10">
                    <StageIcon className="h-5 w-5 text-primary" />
                </div>
                <div>
                    <h1 className="text-xl font-semibold tracking-tight capitalize">{stageData.label}</h1>
                    <p className="text-sm text-muted-foreground">{stageData.definition}</p>
                </div>
            </div>

            {/* Tabs */}
            <Tabs
                value={activeTab}
                onValueChange={(value) => {
                    setSearchParams(prev => {
                        prev.set("tab", value)
                        return prev
                    })
                }}
                className="w-full"
            >
                <TabsList className="h-8 w-full justify-start rounded-md bg-muted p-1">
                    <TabsTrigger value="overview" className="text-xs h-6 px-2.5">Overview</TabsTrigger>
                    <TabsTrigger value="frameworks" className="text-xs h-6 px-2.5">Frameworks</TabsTrigger>
                    <TabsTrigger value="tools" className="text-xs h-6 px-2.5">Tools</TabsTrigger>
                    <TabsTrigger value="ai" className="text-xs h-6 px-2.5">AI</TabsTrigger>
                    <TabsTrigger value="metrics" className="text-xs h-6 px-2.5">Metrics</TabsTrigger>
                    <TabsTrigger value="all" className="text-xs h-6 px-2.5">All</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="mt-4 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <Card>
                            <CardHeader className="pb-2 pt-3 px-3">
                                <CardTitle className="flex items-center gap-1.5 text-sm">
                                    <Bot className="h-3.5 w-3.5 text-primary" />
                                    Key Objectives
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3 px-3">
                                <ul className="list-disc pl-4 space-y-1">
                                    {stageData.objectives.map((obj, i) => (
                                        <li key={i} className="text-xs text-muted-foreground">{obj}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>

                        <Card className="border-destructive/20 bg-destructive/5">
                            <CardHeader className="pb-2 pt-3 px-3">
                                <CardTitle className="flex items-center gap-1.5 text-sm text-destructive">
                                    <AlertTriangle className="h-3.5 w-3.5" />
                                    Failure Modes
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="pt-0 pb-3 px-3">
                                <ul className="space-y-2">
                                    {stageData.failure_modes.map((fail, i) => (
                                        <li key={i}>
                                            <div className="font-medium text-xs text-destructive/90">{fail.problem}</div>
                                            <div className="text-[11px] text-muted-foreground">{fail.avoidance}</div>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </div>
                </TabsContent>

                {/* Frameworks Tab */}
                <TabsContent value="frameworks" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-3">
                            <CardTitle className="text-sm">Recommended Frameworks</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3 px-3">
                            <ul className="list-disc pl-4 grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                                {stageData.frameworks.map((fw, i) => (
                                    <li key={i}>
                                        <Link
                                            to={`/browse/all-insights?q=${encodeURIComponent(fw)}`}
                                            className="text-muted-foreground hover:text-primary hover:underline transition-colors"
                                        >
                                            {fw}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {frameworksInsights.map((insight, index) => (
                            <InsightCard
                                key={index}
                                insight={{
                                    ...insight,
                                    slug: getEpisodeBySlug(insight.guest.toLowerCase().replace(/\s+/g, '-'))?.slug || insight.guest.toLowerCase().replace(/\s+/g, '-')
                                } as EnrichedInsight}
                                index={index}
                            />
                        ))}
                    </div>
                </TabsContent>

                {/* Tools Tab */}
                <TabsContent value="tools" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-3">
                            <CardTitle className="text-sm">Recommended Tools</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3 px-3">
                            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                                {stageData.tools.map((tool, i) => {
                                    const metadata = toolMetadata[tool];
                                    if (!metadata) return null;

                                    return (
                                        <a
                                            key={i}
                                            href={metadata.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="group flex flex-col items-center p-2 rounded-lg border bg-card hover:border-primary/30 hover:bg-primary/[0.02] transition-all text-center space-y-1.5"
                                        >
                                            <div className="w-8 h-8 flex items-center justify-center rounded-md bg-background p-1 border group-hover:border-primary/20 transition-colors">
                                                <img
                                                    src={metadata.logoUrl}
                                                    alt={metadata.name}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(metadata.name)}&background=random&size=128`;
                                                    }}
                                                />
                                            </div>
                                            <div className="flex items-center gap-0.5 min-w-0">
                                                <span className="text-[10px] font-medium truncate group-hover:text-primary transition-colors">
                                                    {metadata.name}
                                                </span>
                                                <ExternalLink className="h-2 w-2 text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
                                            </div>
                                        </a>
                                    );
                                })}
                            </div>
                        </CardContent>
                    </Card>

                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {toolsInsights.map((insight, idx) => (
                            <InsightCard key={idx} insight={insight} index={idx} />
                        ))}
                    </div>
                </TabsContent>

                {/* AI Tab */}
                <TabsContent value="ai" className="mt-4 space-y-4">
                    {/* Native Stage AI Workflows */}
                    <div className="space-y-2">
                        <h3 className="text-sm font-semibold px-0.5">Stage Prompts & Utilities</h3>
                        <div className="space-y-1.5">
                            {stageData.ai_workflows.map((flow, i) => (
                                <AIWorkflowRow key={i} workflow={flow} />
                            ))}
                        </div>
                    </div>

                    {/* Global Gemini Workflows for this Stage */}
                    {stageWorkflows.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold px-0.5">Global Gemini Protocols</h3>
                            <div className="grid gap-3 md:grid-cols-2">
                                {stageWorkflows.map((workflow) => (
                                    <Card key={workflow.id} className="flex flex-col h-full">
                                        <CardHeader className="pb-2 pt-3 px-3">
                                            <div className="flex items-center justify-between mb-1">
                                                <Badge variant="outline" className="text-[10px] h-5">{workflow.category}</Badge>
                                                <Bot className="h-3.5 w-3.5 text-muted-foreground" />
                                            </div>
                                            <CardTitle className="text-sm">{workflow.title}</CardTitle>
                                            <CardDescription className="text-xs line-clamp-2">{workflow.description}</CardDescription>
                                        </CardHeader>
                                        <CardContent className="flex-1 pt-0 pb-3 px-3">
                                            <div className="bg-muted/50 p-1.5 rounded text-[10px] font-mono text-muted-foreground truncate">
                                                {workflow.command}
                                            </div>
                                        </CardContent>
                                        <CardFooter className="pt-0 pb-3 px-3">
                                            <Button variant="outline" size="sm" className="w-full justify-between text-xs h-8" asChild>
                                                <Link to={`/workflows/${workflow.id}`}>
                                                    Read Protocol
                                                    <ArrowRight className="h-3 w-3 ml-1.5" />
                                                </Link>
                                            </Button>
                                        </CardFooter>
                                    </Card>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Related Insights */}
                    {aiInsights.length > 0 && (
                        <div className="space-y-2">
                            <h3 className="text-sm font-semibold px-0.5">AI Insights from Podcasts</h3>
                            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                                {aiInsights.map((insight, idx) => (
                                    <InsightCard key={idx} insight={insight} index={idx} />
                                ))}
                            </div>
                        </div>
                    )}
                </TabsContent>

                {/* Metrics Tab */}
                <TabsContent value="metrics" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader className="pb-2 pt-3 px-3">
                            <CardTitle className="text-sm">Success Metrics</CardTitle>
                        </CardHeader>
                        <CardContent className="pt-0 pb-3 px-3">
                            <ul className="list-disc pl-4 grid grid-cols-1 md:grid-cols-2 gap-1 text-xs">
                                {stageData.success_metrics.map((metric, i) => (
                                    <li key={i} className="text-muted-foreground">{metric}</li>
                                ))}
                            </ul>
                        </CardContent>
                    </Card>

                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {metricsInsights.map((insight, idx) => (
                            <InsightCard key={idx} insight={insight} index={idx} />
                        ))}
                    </div>
                </TabsContent>

                {/* All Insights Tab */}
                <TabsContent value="all" className="mt-4">
                    <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
                        {insights.map((insight, idx) => (
                            <InsightCard key={idx} insight={insight} index={idx} />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
