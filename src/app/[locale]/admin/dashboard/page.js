import prisma from "@/lib/prisma";
import { Link } from "@/i18n/navigation";
import LogoutButton from "@/components/LogoutButton";
import SectionHeading from "@/components/SectionHeading";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage({ params }) {
  const { locale } = await params;

  // Fetch stats directly from DB
  const eventCount = await prisma.event.count();
  const resourceCount = await prisma.resource.count();

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-charcoal">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-stone-500">Manage your community content and settings</p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-sm font-semibold text-emerald-700 transition-all hover:bg-emerald-100"
          >
            View Public Site
          </Link>
          <LogoutButton />
        </div>
      </div>

      {/* Grid Stats */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
        {/* Events Stat Card */}
        <div className="group rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-500">Total Events</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-charcoal">{eventCount}</span>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
            >
              Manage Events
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Resources Stat Card */}
        <div className="group rounded-2xl border border-stone-200/80 bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-stone-500">Library Resources</span>
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-4xl font-bold text-charcoal">{resourceCount}</span>
          </div>
          <div className="mt-6">
            <Link
              href="/admin/resources"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 hover:text-amber-800"
            >
              Manage Resources
              <svg className="h-4 w-4 rtl:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
