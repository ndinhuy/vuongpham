import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import data from "@/app/admin/data.json";
import { SiteHeader } from "@/components/ui/site-header";
import { SectionCards } from "@/components/ui/section-cards";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { ChartAreaInteractive } from "@/components/ui/chart-area-interactive";
import { DataTable } from "@/components/ui/data-table";
import { AppSidebar } from "@/components/ui/app-sidebar";

export default function Page() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 72)",
          "--header-height": "calc(var(--spacing) * 12)",
        } as React.CSSProperties
      }
    >
      <AppSidebar />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <SectionCards />
              <div className="px-4 lg:px-6">
                <ChartAreaInteractive />
              </div>
              <DataTable data={data} />
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
