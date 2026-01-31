import { useParams, Link } from "react-router-dom"
import ReactMarkdown from "react-markdown"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { oneDark, oneLight } from "react-syntax-highlighter/dist/esm/styles/prism"
import { workflows } from "@/data/workflows"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useState, useEffect, useMemo } from "react"
import {
  ArrowLeft,
  Terminal,
  Layers,
  Hash,
  FileText,
  List,
  Copy,
  Check,
  ExternalLink,
} from "lucide-react"

// Parse markdown content to extract headings for TOC
function extractHeadings(content: string): { level: number; text: string; id: string }[] {
  const headings: { level: number; text: string; id: string }[] = []
  const lines = content.split("\n")

  for (const line of lines) {
    const match = line.match(/^(#{1,3})\s+(.+)$/)
    if (match) {
      const level = match[1].length
      const text = match[2].replace(/\*\*/g, "").replace(/__/g, "").trim()
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
      headings.push({ level, text, id })
    }
  }

  return headings
}

// Generate ID from heading text
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
}

const categoryColors: Record<string, string> = {
  Engineering: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20",
  Product: "text-violet-600 bg-violet-500/10 border-violet-500/20",
  Strategy: "text-amber-600 bg-amber-500/10 border-amber-500/20",
  Quality: "text-rose-600 bg-rose-500/10 border-rose-500/20",
  System: "text-slate-600 bg-slate-500/10 border-slate-500/20",
}

const stageLabels: Record<string, string> = {
  discovery: "Discovery",
  strategy: "Strategy",
  design: "Design",
  development: "Development",
  launch: "Launch",
  optimization: "Optimization",
  scale: "Scale",
}

// Custom components for ReactMarkdown
function MarkdownComponents({ isDark }: { isDark: boolean }) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = async (code: string) => {
    await navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return {
    h1: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children)
      const id = slugify(text)
      return (
        <h1 id={id} className="text-xl font-semibold text-foreground mt-8 mb-3 scroll-mt-24 first:mt-0">
          {children}
        </h1>
      )
    },
    h2: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children)
      const id = slugify(text)
      return (
        <h2 id={id} className="text-base font-semibold text-foreground mt-6 mb-2 scroll-mt-24 flex items-center gap-1.5">
          <Hash className="h-3.5 w-3.5 text-primary/60 flex-shrink-0" />
          <span>{children}</span>
        </h2>
      )
    },
    h3: ({ children }: { children?: React.ReactNode }) => {
      const text = String(children)
      const id = slugify(text)
      return (
        <h3 id={id} className="text-sm font-semibold text-foreground mt-4 mb-1.5 scroll-mt-24">
          {children}
        </h3>
      )
    },
    p: ({ children }: { children?: React.ReactNode }) => (
      <p className="text-sm text-muted-foreground leading-relaxed mb-3">{children}</p>
    ),
    ul: ({ children }: { children?: React.ReactNode }) => (
      <ul className="list-disc pl-4 space-y-1 mb-3 text-sm text-muted-foreground">{children}</ul>
    ),
    ol: ({ children }: { children?: React.ReactNode }) => (
      <ol className="list-decimal pl-4 space-y-1 mb-3 text-sm text-muted-foreground">{children}</ol>
    ),
    li: ({ children }: { children?: React.ReactNode }) => <li className="leading-relaxed pl-1">{children}</li>,
    code: ({ inline, className, children }: { inline?: boolean; className?: string; children?: React.ReactNode }) => {
      const match = /language-(\w+)/.exec(className || "")
      const code = String(children).replace(/\n$/, "")

      if (!inline && match) {
        const language = match[1]
        return (
          <div className="relative group my-3 rounded-lg overflow-hidden border">
            <div className="flex items-center justify-between px-2.5 py-1.5 bg-muted/50 border-b">
              <span className="text-[10px] font-medium text-muted-foreground uppercase">{language}</span>
              <button
                onClick={() => copyToClipboard(code)}
                className="flex items-center gap-1 text-[10px] text-muted-foreground hover:text-foreground transition-colors"
              >
                {copiedCode === code ? (
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
              </button>
            </div>
            <SyntaxHighlighter
              style={isDark ? oneDark : oneLight}
              language={language}
              PreTag="div"
              customStyle={{
                margin: 0,
                padding: "0.75rem",
                fontSize: "0.75rem",
                lineHeight: "1.5",
                background: isDark ? "hsl(var(--muted))" : "hsl(var(--muted))",
              }}
            >
              {code}
            </SyntaxHighlighter>
          </div>
        )
      }

      return (
        <code className="px-1 py-0.5 rounded bg-muted font-mono text-[11px] text-foreground">
          {children}
        </code>
      )
    },
    pre: ({ children }: { children?: React.ReactNode }) => <>{children}</>,
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="border-l-2 border-primary/30 pl-3 my-3 text-sm text-muted-foreground italic">
        {children}
      </blockquote>
    ),
    hr: () => <hr className="my-4 border-border/50" />,
    table: ({ children }: { children?: React.ReactNode }) => (
      <div className="overflow-x-auto my-3 rounded-lg border">
        <table className="w-full text-sm border-collapse">{children}</table>
      </div>
    ),
    thead: ({ children }: { children?: React.ReactNode }) => (
      <thead className="bg-muted/50 border-b">{children}</thead>
    ),
    th: ({ children }: { children?: React.ReactNode }) => (
      <th className="px-3 py-2 text-left text-[11px] font-medium text-foreground whitespace-nowrap">
        {children}
      </th>
    ),
    td: ({ children }: { children?: React.ReactNode }) => (
      <td className="px-3 py-2 text-xs text-muted-foreground border-b last:border-b-0">
        {children}
      </td>
    ),
    tbody: ({ children }: { children?: React.ReactNode }) => (
      <tbody className="divide-y">{children}</tbody>
    ),
    strong: ({ children }: { children?: React.ReactNode }) => (
      <strong className="font-medium text-foreground">{children}</strong>
    ),
  }
}

export default function WorkflowDetailPage() {
  const { workflowId } = useParams()
  const workflow = workflows.find((w) => w.id === workflowId)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const [isDark, setIsDark] = useState(false)

  // Detect dark mode
  useEffect(() => {
    const checkDarkMode = () => {
      setIsDark(document.documentElement.classList.contains("dark"))
    }
    checkDarkMode()
    const observer = new MutationObserver(checkDarkMode)
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] })
    return () => observer.disconnect()
  }, [])

  // Extract headings for TOC
  const headings = useMemo(() => {
    if (!workflow) return []
    return extractHeadings(workflow.content)
  }, [workflow])

  // Track active section on scroll
  useEffect(() => {
    if (headings.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id)
          }
        })
      },
      { rootMargin: "-20% 0px -80% 0px" }
    )

    headings.forEach((h) => {
      const element = document.getElementById(h.id)
      if (element) observer.observe(element)
    })

    return () => observer.disconnect()
  }, [headings])

  if (!workflow) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 text-center">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-3">
          <FileText className="h-6 w-6 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Protocol Not Found</h2>
        <p className="text-xs text-muted-foreground mb-3">
          The workflow you're looking for doesn't exist.
        </p>
        <Button size="sm" asChild>
          <Link to="/workflows">Return to Library</Link>
        </Button>
      </div>
    )
  }

  const categoryStyle = categoryColors[workflow.category] || categoryColors.System

  return (
    <div className="h-full flex animate-fade-in">
      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl px-3 py-4">
          {/* Back Link */}
          <Link
            to="/workflows"
            className="inline-flex items-center gap-1 text-[11px] text-muted-foreground hover:text-foreground transition-colors mb-3"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to Protocols
          </Link>

          {/* Header */}
          <header className="mb-4">
            {/* Meta Row */}
            <div className="flex flex-wrap items-center gap-1.5 mb-2">
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium uppercase tracking-wide border ${categoryStyle}`}>
                {workflow.category}
              </span>
              {workflow.stages.map((stage) => (
                <span
                  key={stage}
                  className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-secondary text-secondary-foreground"
                >
                  {stageLabels[stage] || stage}
                </span>
              ))}
            </div>

            {/* Title */}
            <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-foreground mb-2">
              {workflow.title}
            </h1>

            {/* Description */}
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
              {workflow.description}
            </p>

          </header>

          {/* Divider */}
          <div className="h-px bg-border mb-4" />

          {/* Content */}
          <article className="prose prose-sm max-w-none prose-headings:tracking-tight">
            <ReactMarkdown components={MarkdownComponents({ isDark })}>
              {workflow.content}
            </ReactMarkdown>
          </article>

          {/* Footer */}
          <footer className="mt-8 pt-4 border-t">
            <div className="flex items-center justify-between text-[11px] text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <Layers className="h-3 w-3" />
                <span>Gemini Protocol Library</span>
              </div>
              <Link
                to="/workflows"
                className="inline-flex items-center gap-1 hover:text-foreground transition-colors"
              >
                Browse all
                <ExternalLink className="h-2.5 w-2.5" />
              </Link>
            </div>
          </footer>
        </div>
      </div>

      {/* Sidebar TOC */}
      {headings.length > 0 && (
        <aside className="hidden lg:block w-56 border-l bg-muted/20">
          <div className="sticky top-0 p-3">
            <div className="flex items-center gap-1.5 mb-2">
              <List className="h-3 w-3 text-muted-foreground" />
              <span className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                Contents
              </span>
            </div>
            <ScrollArea className="h-[calc(100vh-6rem)]">
              <nav className="space-y-0.5">
                {headings.map((heading) => (
                  <a
                    key={heading.id}
                    href={`#${heading.id}`}
                    onClick={(e) => {
                      e.preventDefault()
                      document.getElementById(heading.id)?.scrollIntoView({ behavior: "smooth" })
                    }}
                    className={`block py-0.5 text-[11px] transition-colors hover:text-foreground ${
                      heading.level === 1
                        ? "font-medium"
                        : heading.level === 2
                        ? "pl-2"
                        : "pl-4 text-muted-foreground/70"
                    } ${
                      activeSection === heading.id
                        ? "text-primary font-medium"
                        : "text-muted-foreground"
                    }`}
                  >
                    {heading.text}
                  </a>
                ))}
              </nav>
            </ScrollArea>
          </div>
        </aside>
      )}
    </div>
  )
}
