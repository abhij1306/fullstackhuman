import { Sidebar } from "@/components/Sidebar"
import { Button } from "@/components/ui/button"
import { Menu, Search, Moon, MessageSquare } from "lucide-react"
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
        <div className="flex h-screen flex-col overflow-hidden bg-background text-foreground md:flex-row">
            {/* Mobile Header */}
            <header className="sticky top-0 z-50 flex items-center justify-between border-b bg-background/95 backdrop-blur-sm px-3 py-2.5 md:hidden">
                <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        <Menu className="h-4 w-4" />
                    </Button>
                    <span className="font-semibold text-sm">PM OS</span>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Search className="h-4 w-4" />
                </Button>
            </header>

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-40 w-60 transform transition-transform md:sticky md:top-0 md:h-screen md:translate-x-0 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} border-r bg-background`}>
                <Sidebar />
            </aside>

            {/* Overlay for mobile sidebar */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            {/* Main Content */}
            <main className="flex-1 bg-surface relative">
                {/* Top Bar - Desktop */}
                <div className="hidden md:flex items-center justify-between px-5 py-3 border-b bg-white/80 backdrop-blur-md sticky top-0 z-20 shadow-sm">
                    <div className="flex items-center gap-3 flex-1">
                        <div className="relative max-w-md flex-1">
                            <SearchAutocomplete
                                placeholder="Search insights, frameworks, tools..."
                                suggestions={searchTerms}
                                onSearch={handleSearch}
                                className="w-full"
                            />
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-purple-50 hover:text-purple-600 transition-colors">
                            <MessageSquare className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-9 w-9 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                            <Moon className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Page Content */}
                <div className="p-4 md:p-6 overflow-y-auto h-[calc(100vh-3rem)] md:h-[calc(100vh-3.25rem)] scrollbar-thin bg-gradient-to-br from-gray-50/50 via-white to-purple-50/30">
                    <Outlet />
                </div>
            </main>
        </div>
    )
}
