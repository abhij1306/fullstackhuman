import { workflows, type Workflow } from "@/data/workflows"
import { useState, useMemo } from "react"
import { Search, Command, Layers, ArrowRight, Terminal, Zap } from "lucide-react"
import { Link } from "react-router-dom"
import { SearchAutocomplete } from "@/components/SearchAutocomplete"

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Engineering: { bg: "bg-emerald-500/10", text: "text-emerald-600", border: "border-emerald-500/20" },
  Product: { bg: "bg-violet-500/10", text: "text-violet-600", border: "border-violet-500/20" },
  Strategy: { bg: "bg-amber-500/10", text: "text-amber-600", border: "border-amber-500/20" },
  Quality: { bg: "bg-rose-500/10", text: "text-rose-600", border: "border-rose-500/20" },
  System: { bg: "bg-slate-500/10", text: "text-slate-600", border: "border-slate-500/20" },
}

const stageLabels: Record<string, string> = {
  discovery: "Discovery",
  strategy: "Strategy",
  design: "Design",
  development: "Development",
  launch: "Launch",
  optimization: "Optimization",
  scale: "Scale",
  "core-skills": "Core Skills",
}

function WorkflowRow({ workflow, index }: { workflow: Workflow; index: number }) {
  const colors = categoryColors[workflow.category] || categoryColors.System

  return (
    <Link
      to={`/workflows/${workflow.id}`}
      className="group flex items-center gap-3 px-3 py-2.5 -mx-3 rounded-md hover:bg-muted/50 transition-colors border-b border-border/40 last:border-b-0"
      style={{ animationDelay: `${index * 0.02}s` }}
    >
      {/* Command */}
      <div className="flex-shrink-0 w-32 sm:w-40">
        <code className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-muted font-mono text-[11px] text-muted-foreground group-hover:text-foreground transition-colors">
          <Terminal className="h-3 w-3 text-primary" />
          {workflow.command}
        </code>
      </div>

      {/* Title & Description */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-sm text-foreground group-hover:text-primary transition-colors truncate">
            {workflow.title}
          </h3>
        </div>
        <p className="text-xs text-muted-foreground truncate">
          {workflow.description}
        </p>
      </div>

      {/* Category Badge */}
      <div className="flex-shrink-0 hidden sm:block">
        <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide border ${colors.bg} ${colors.text} ${colors.border}`}>
          {workflow.category}
        </span>
      </div>

      {/* Stages */}
      <div className="flex-shrink-0 hidden md:flex items-center gap-1">
        {workflow.stages.slice(0, 3).map((stage) => (
          <span
            key={stage}
            className="inline-flex items-center px-1 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground"
            title={stageLabels[stage] || stage}
          >
            {stage.slice(0, 3)}
          </span>
        ))}
        {workflow.stages.length > 3 && (
          <span className="text-[10px] text-muted-foreground">
            +{workflow.stages.length - 3}
          </span>
        )}
      </div>

      {/* Arrow */}
      <div className="flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
      </div>
    </Link>
  )
}

export default function WorkflowsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const suggestions = useMemo(() => workflows.map(w => w.title), [])

  const categories = useMemo(() => {
    const cats = new Set(workflows.map((w) => w.category))
    return Array.from(cats).sort()
  }, [])

  const filteredWorkflows = useMemo(() => {
    return workflows.filter((w) => {
      const matchesSearch =
        searchQuery === "" ||
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.command.toLowerCase().includes(searchQuery.toLowerCase())
      const matchesCategory = selectedCategory === null || w.category === selectedCategory
      return matchesSearch && matchesCategory
    })
  }, [searchQuery, selectedCategory])

  const groupedWorkflows = useMemo(() => {
    const grouped: Record<string, Workflow[]> = {}
    filteredWorkflows.forEach((w) => {
      if (!grouped[w.category]) grouped[w.category] = []
      grouped[w.category].push(w)
    })
    return grouped
  }, [filteredWorkflows])


  return (
    <div className="h-full flex flex-col animate-fade-in">
      {/* Header */}
      <div className="border-b bg-background/95 backdrop-blur-sm sticky top-0 z-10">
        <div className="px-3 py-3">
          <div className="flex items-center gap-3 mb-3">
            <div className="flex items-center justify-center w-9 h-9 rounded-xl bg-primary/10 shadow-sm transition-all group-hover:shadow-md duration-200">
              <Command className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Gemini Protocols</h1>
              <p className="text-[10px] text-muted-foreground font-black uppercase tracking-wider">Automated Workflows</p>
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 max-w-sm">
              <SearchAutocomplete
                placeholder="Search protocols..."
                value={searchQuery}
                onSearch={(val) => setSearchQuery(val)}
                suggestions={suggestions}
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-1 flex-wrap">
              <button
                onClick={() => setSelectedCategory(null)}
                className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${selectedCategory === null
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
              >
                <Layers className="h-3 w-3 mr-1" />
                All
              </button>
              {categories.map((cat) => {
                const colors = categoryColors[cat] || categoryColors.System
                const isSelected = selectedCategory === cat
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(isSelected ? null : cat)}
                    className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium transition-colors ${isSelected
                      ? `${colors.bg} ${colors.text} ring-1 ${colors.border}`
                      : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                  >
                    {cat}
                  </button>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto p-3">
        {Object.entries(groupedWorkflows).length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center mb-2">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">No protocols found</h3>
            <p className="text-xs text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(groupedWorkflows).map(([category, categoryWorkflows]) => {
              const colors = categoryColors[category] || categoryColors.System
              return (
                <section key={category} className="animate-fade-in-up">
                  {/* Category Header */}
                  <div className="flex items-center gap-1.5 mb-1.5 px-0.5">
                    <span className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace('/10', '')}`} />
                    <h2 className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {category}
                    </h2>
                    <span className="text-[11px] text-muted-foreground/60">
                      ({categoryWorkflows.length})
                    </span>
                  </div>

                  {/* Workflow List */}
                  <div className="bg-card rounded-lg border overflow-hidden">
                    {categoryWorkflows.map((workflow, index) => (
                      <WorkflowRow key={workflow.id} workflow={workflow} index={index} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t px-3 py-2 bg-muted/30">
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
          <div className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-primary" />
            <span>Press <kbd className="px-1 rounded bg-muted font-mono">/</kbd> to search</span>
          </div>
          <div className="hidden sm:flex items-center gap-1">
            <Terminal className="h-3 w-3" />
            <span>Use commands to invoke workflows</span>
          </div>
        </div>
      </div>
    </div>
  )
}
