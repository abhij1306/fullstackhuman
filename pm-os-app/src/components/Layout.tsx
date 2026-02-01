import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Menu } from "lucide-react"
import { useState, useMemo } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import { SearchAutocomplete } from "@/components/SearchAutocomplete"
import { getAllSearchTerms, getSmartNavigation } from "@/lib/insights"

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const navigate = useNavigate()
    const searchTerms = useMemo(() => getAllSearchTerms(), [])

    const handleSearch = (term: string) => {
        if (term.trim()) {
            navigate(getSmartNavigation(term))
        }
    }

    return (
        <div className="relative min-h-screen bg-background text-foreground md:flex md:flex-row md:h-screen md:overflow-hidden">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/80 backdrop-blur-xl px-4 py-3 md:hidden">
                <div className="flex items-center gap-3">
                    <Button
                        variant="ghost"
                        size="icon"
                        className="h-10 w-10 rounded-xl hover:bg-muted/50 transition-colors"
                        onClick={() => setSidebarOpen(!sidebarOpen)}
                    >
                        <Menu className="h-5 w-5" />
                    </Button>
                    <div className="flex flex-col">
                        <span className="font-bold text-sm leading-none">PM OS</span>
                        <span className="text-[10px] text-muted-foreground font-medium uppercase tracking-tight">System v1.0</span>
                    </div>
                </div>
                <div className="flex items-center gap-1">
                    {/* Placeholder for future actions */}
                </div>
            </header>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed inset-y-0 left-0 z-50 w-72 transform transition-all duration-500 ease-in-out md:sticky md:top-0 md:h-screen md:translate-x-0 border-r bg-background shadow-2xl md:shadow-none",
                    sidebarOpen ? "translate-x-0" : "-translate-x-full pointer-events-none md:pointer-events-auto"
                )}
            >
                <div className="flex h-full flex-col">
                    <div className="flex items-center justify-between px-6 py-4 md:hidden border-b">
                        <span className="font-bold">Navigation</span>
                        <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
                            <Menu className="h-5 w-5 rotate-90" />
                        </Button>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        <Sidebar className="border-r-0" onItemClick={() => setSidebarOpen(false)} />
                    </div>
                </div>
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden animate-in fade-in"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="bg-surface relative md:flex-1 md:flex md:flex-col md:min-w-0">
                {/* Top Bar - Desktop */}
                <div className="hidden md:flex items-center justify-between px-8 py-4 border-b bg-white/40 backdrop-blur-xl sticky top-0 z-20">
                    <div className="flex items-center gap-4 flex-1">
                        <div className="relative max-w-xl flex-1">
                            <SearchAutocomplete
                                placeholder="Search insights, frameworks, tools..."
                                suggestions={searchTerms}
                                onSearch={handleSearch}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-3 ml-8">
                        {/* Placeholder for future desktop actions */}
                    </div>
                </div>

                {/* Page Content */}
                <div className="bg-gradient-to-br from-gray-50/80 via-white to-purple-50/40 md:flex-1 md:min-h-0 md:overflow-y-auto scrollbar-thin">
                    <div className="max-w-7xl mx-auto w-full p-4 sm:p-6 md:p-8">
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    )
}
