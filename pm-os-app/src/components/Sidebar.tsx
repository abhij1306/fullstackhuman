import { Home, Lightbulb, ClipboardList, Palette, Code, Rocket, TrendingUp, Network, Zap, BookOpen, Box, Layers } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Link, useLocation, useSearchParams } from "react-router-dom"

const stages = [
    { name: "Discovery", icon: Lightbulb, path: "/stage/discovery", color: "text-teal-600", bg: "bg-teal-50" },
    { name: "Strategy", icon: ClipboardList, path: "/stage/strategy", color: "text-orange-600", bg: "bg-orange-50" },
    { name: "Design", icon: Palette, path: "/stage/design", color: "text-pink-600", bg: "bg-pink-50" },
    { name: "Development", icon: Code, path: "/stage/development", color: "text-purple-600", bg: "bg-purple-50" },
    { name: "Launch", icon: Rocket, path: "/stage/launch", color: "text-blue-600", bg: "bg-blue-50" },
    { name: "Growth", icon: TrendingUp, path: "/stage/growth", color: "text-green-600", bg: "bg-green-50" },
    { name: "Scale", icon: Network, path: "/stage/scale", color: "text-indigo-600", bg: "bg-indigo-50" },
    { name: "Optimization", icon: Zap, path: "/stage/optimization", color: "text-amber-600", bg: "bg-amber-50" },
]

export function Sidebar({ className }: { className?: string }) {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const currentTab = searchParams.get("tab")

    return (
        <div className={cn("h-full border-r bg-gradient-to-b from-white to-gray-50/50 overflow-y-auto scrollbar-hide", className)}>
            <div className="space-y-1 py-4">
                {/* Logo */}
                <div className="px-4 mb-5">
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-xl border border-gray-100 shadow-sm transition-all group-hover:shadow-md group-hover:scale-105 duration-200">
                            <img
                                src="/logo.png"
                                alt="PM OS Logo"
                                className="h-full w-full object-cover scale-150"
                            />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold tracking-tight bg-gradient-to-r from-teal-600 to-purple-600 bg-clip-text text-transparent">
                                PM OS
                            </h2>
                            <p className="text-[10px] text-muted-foreground -mt-0.5">by Lenny's Podcast</p>
                        </div>
                    </Link>
                </div>

                {/* Main Navigation */}
                <div className="px-3 space-y-1">
                    <Link to="/">
                        <Button
                            variant={location.pathname === "/" ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start h-9 px-3 text-sm font-medium rounded-lg transition-all",
                                location.pathname === "/"
                                    ? "bg-gradient-to-r from-teal-50 to-teal-100/50 text-teal-700 border border-teal-200/50"
                                    : "hover:bg-gray-100"
                            )}
                        >
                            <div className={cn("mr-3 p-1.5 rounded-lg transition-colors", location.pathname === "/" ? "bg-teal-200" : "bg-teal-100")}>
                                <Home className="h-3.5 w-3.5 text-teal-700" />
                            </div>
                            Home
                        </Button>
                    </Link>
                    <Link to="/inventory">
                        <Button
                            variant={location.pathname === "/inventory" ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start h-9 px-3 text-sm font-medium rounded-lg transition-all",
                                location.pathname === "/inventory"
                                    ? "bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-700 border border-purple-200/50"
                                    : "hover:bg-gray-100"
                            )}
                        >
                            <div className={cn("mr-3 p-1.5 rounded-lg transition-colors", location.pathname === "/inventory" ? "bg-purple-200" : "bg-purple-100")}>
                                <Box className="h-3.5 w-3.5 text-purple-700" />
                            </div>
                            Inventory
                        </Button>
                    </Link>
                    <Link to="/workflows">
                        <Button
                            variant={location.pathname.startsWith("/workflows") ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start h-9 px-3 text-sm font-medium rounded-lg transition-all",
                                location.pathname.startsWith("/workflows")
                                    ? "bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-700 border border-orange-200/50"
                                    : "hover:bg-gray-100"
                            )}
                        >
                            <div className={cn("mr-3 p-1.5 rounded-lg transition-colors", location.pathname.startsWith("/workflows") ? "bg-orange-200" : "bg-orange-100")}>
                                <BookOpen className="h-3.5 w-3.5 text-orange-700" />
                            </div>
                            Workflows
                        </Button>
                    </Link>
                    <Link to="/stage/core-skills">
                        <Button
                            variant={location.pathname === "/stage/core-skills" ? "secondary" : "ghost"}
                            className={cn(
                                "w-full justify-start h-9 px-3 text-sm font-medium rounded-lg transition-all",
                                location.pathname === "/stage/core-skills"
                                    ? "bg-slate-50 text-slate-700 border border-slate-200/50"
                                    : "hover:bg-gray-100"
                            )}
                        >
                            <div className={cn("mr-3 p-1.5 rounded-lg transition-colors", location.pathname === "/stage/core-skills" ? "bg-slate-200" : "bg-slate-100")}>
                                <Layers className="h-3.5 w-3.5 text-slate-700" />
                            </div>
                            Core Skills
                        </Button>
                    </Link>
                </div>

                {/* Stages Section */}
                <div className="px-4 pt-5 pb-2">
                    <h3 className="px-3 text-[11px] font-bold uppercase tracking-wider text-gray-400">
                        Product Stages
                    </h3>
                </div>
                <div className="px-3 space-y-0.5">
                    {stages.map((stage) => {
                        const isActive = location.pathname === stage.path
                        const iconBgClass: Record<string, string> = {
                            "text-teal-600": "bg-teal-100",
                            "text-orange-600": "bg-orange-100",
                            "text-pink-600": "bg-pink-100",
                            "text-purple-600": "bg-purple-100",
                            "text-blue-600": "bg-blue-100",
                            "text-green-600": "bg-green-100",
                            "text-indigo-600": "bg-indigo-100",
                            "text-amber-600": "bg-amber-100",
                        }
                        const bgClass = iconBgClass[stage.color] || "bg-gray-100"
                        const activeBgClass = bgClass.replace('100', '200')
                        return (
                            <Link
                                key={stage.path}
                                to={currentTab ? `${stage.path}?tab=${currentTab}` : stage.path}
                            >
                                <Button
                                    variant={isActive ? "secondary" : "ghost"}
                                    className={cn(
                                        "w-full justify-start h-9 px-3 text-sm font-medium rounded-lg transition-all",
                                        isActive
                                            ? `${stage.bg} ${stage.color} border border-current/20`
                                            : "hover:bg-gray-100"
                                    )}
                                >
                                    <div className={cn("mr-3 p-1.5 rounded-lg transition-colors", isActive ? activeBgClass : bgClass)}>
                                        <stage.icon className={cn("h-3.5 w-3.5", stage.color)} />
                                    </div>
                                    {stage.name}
                                </Button>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
