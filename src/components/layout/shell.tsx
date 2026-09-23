import { useEffect, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, BookOpen, GitBranch, LayoutDashboard, LayoutGrid, Users } from "lucide-react";
import { NewCaseDialog } from "@/components/osint/new-case-dialog";
import { StrandMark } from "@/components/osint/mark";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useOsint } from "@/lib/osint/store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Operations", icon: LayoutGrid },
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/agents", label: "Agents", icon: Users },
  { to: "/mesh", label: "Mesh", icon: GitBranch },
  { to: "/learn", label: "Learning", icon: Activity },
  { to: "/framework", label: "Framework", icon: BookOpen },
] as const;

function useSweepClock() {
  const running = useOsint((s) => s.running);
  const tickOnce = useOsint((s) => s.tickOnce);
  useEffect(() => {
    if (!running) return;
    const id = window.setInterval(() => tickOnce(), 1150);
    return () => window.clearInterval(id);
  }, [running, tickOnce]);
}

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const hydrate = useOsint((s) => s.hydrate);
  useSweepClock();
  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-dvh bg-background text-foreground">
        <aside className="sticky top-0 hidden h-dvh w-[232px] shrink-0 flex-col border-r border-border px-4 py-5 md:flex">
          <Link to="/" className="flex items-center gap-2 text-foreground">
            <StrandMark className="h-7 w-7" />
            <span className="flex flex-col">
              <span className="font-display text-lg leading-none tracking-tight">STRAND</span>
              <span className="mt-1 font-mono text-[10px] tracking-[0.18em] text-ink uppercase">
                OSINT mesh
              </span>
            </span>
          </Link>
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex h-11 items-center gap-2 rounded-md px-3 text-sm transition-colors duration-150",
                    active ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
          <NewCaseDialog />
          <p className="mt-4 font-mono text-[10px] leading-relaxed tracking-[0.04em] text-ink">
            Synthetic collection. Educational methods. No live scrape.
          </p>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3 md:hidden">
            <Link to="/" className="flex items-center gap-2">
              <StrandMark className="h-6 w-6" />
              <span className="font-display text-base tracking-tight">STRAND</span>
            </Link>
            <NewCaseDialog triggerClassName="h-10 px-3 text-xs" />
          </header>
          <main className="mx-auto w-full max-w-[1280px] flex-1 px-4 py-5 pb-24 md:px-8 md:py-8 md:pb-8">
            {children}
          </main>
          <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-3 border-t border-border bg-background/95 pb-[env(safe-area-inset-bottom)] sm:grid-cols-6 md:hidden">
            {NAV.map((item) => {
              const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-1 text-[11px]",
                    active ? "text-foreground" : "text-muted-foreground",
                  )}
                >
                  <item.icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </TooltipProvider>
  );
}
