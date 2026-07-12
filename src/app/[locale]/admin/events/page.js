"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function AdminEventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleUr, setTitleUr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionUr, setDescriptionUr] = useState("");
  const [locationEn, setLocationEn] = useState("");
  const [locationUr, setLocationUr] = useState("");
  const [category, setCategory] = useState("ijtema");
  const [date, setDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [time, setTime] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Fetch events
  const fetchEvents = async () => {
    try {
      const res = await fetch("/api/events");
      if (!res.ok) throw new Error("Failed to fetch events");
      const data = await res.ok ? await res.json() : [];
      setEvents(data);
    } catch (err) {
      console.error(err);
      setError("Could not load events.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  // Handle Create
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    const eventData = {
      titleEn,
      titleUr,
      descriptionEn: descriptionEn || null,
      descriptionUr: descriptionUr || null,
      locationEn,
      locationUr,
      category,
      date,
      endDate: endDate || null,
      time: time || null,
    };

    try {
      const res = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create event");

      // Success: reset form, close modal, refetch
      setTitleEn("");
      setTitleUr("");
      setDescriptionEn("");
      setDescriptionUr("");
      setLocationEn("");
      setLocationUr("");
      setCategory("ijtema");
      setDate("");
      setEndDate("");
      setTime("");
      setShowModal(false);
      fetchEvents();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this event?")) return;

    try {
      const res = await fetch(`/api/events/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete event");
      }

      fetchEvents();
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-12">
      {/* Header */}
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-1 text-sm font-semibold text-stone-500 hover:text-charcoal"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
          <h1 className="mt-2 text-3xl font-bold text-charcoal">Manage Events</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl gradient-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:opacity-95"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Event
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Events Table / List */}
      {loading ? (
        <div className="py-12 text-center text-stone-500">Loading events...</div>
      ) : events.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-4 text-start">Date</th>
                  <th className="px-6 py-4 text-start">Event Title (EN / UR)</th>
                  <th className="px-6 py-4 text-start">Category</th>
                  <th className="px-6 py-4 text-start">Location (EN)</th>
                  <th className="px-6 py-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm text-charcoal">
                {events.map((e) => (
                  <tr key={e.id} className="hover:bg-stone-50/50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-stone-600">
                      {e.date}
                      {e.endDate && ` to ${e.endDate}`}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-semibold">{e.titleEn}</div>
                      <div className="mt-0.5 text-xs text-stone-400 text-right font-urdu" dir="rtl">
                        {e.titleUr}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700 border border-emerald-100 uppercase">
                        {e.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-stone-500">{e.locationEn}</td>
                    <td className="px-6 py-4 text-end whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(e.id)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
                        title="Delete Event"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-stone-300 bg-white p-12 text-center text-stone-500">
          No events created yet. Click "Add New Event" to get started.
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-stone-200 bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
              <h2 className="text-xl font-bold text-charcoal">Add New Event</h2>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg p-1 text-stone-400 hover:bg-stone-100 hover:text-charcoal"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Title (English)</label>
                  <input
                    type="text"
                    required
                    value={titleEn}
                    onChange={(e) => setTitleEn(e.target.value)}
                    placeholder="e.g. Weekly Bayan"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Title (Urdu)</label>
                  <input
                    type="text"
                    required
                    value={titleUr}
                    onChange={(e) => setTitleUr(e.target.value)}
                    placeholder="e.g. ہفتہ وار بیان"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 font-urdu"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Location (English)</label>
                  <input
                    type="text"
                    required
                    value={locationEn}
                    onChange={(e) => setLocationEn(e.target.value)}
                    placeholder="e.g. Raiwind Markaz"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Location (Urdu)</label>
                  <input
                    type="text"
                    required
                    value={locationUr}
                    onChange={(e) => setLocationUr(e.target.value)}
                    placeholder="e.g. رائیونڈ مرکز"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 font-urdu"
                    dir="rtl"
                  />
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                >
                  <option value="ijtema">Ijtema</option>
                  <option value="bayan">Bayan</option>
                  <option value="mashwara">Mashwara</option>
                  <option value="gasht">Gasht</option>
                </select>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Start Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">End Date (Optional)</label>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Time Description (Optional)</label>
                  <input
                    type="text"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="e.g. After Fajr"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Description (English)</label>
                  <textarea
                    rows={3}
                    value={descriptionEn}
                    onChange={(e) => setDescriptionEn(e.target.value)}
                    placeholder="Details about the event..."
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Description (Urdu)</label>
                  <textarea
                    rows={3}
                    value={descriptionUr}
                    onChange={(e) => setDescriptionUr(e.target.value)}
                    placeholder="پروگرام کی تفصیلات..."
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 font-urdu resize-none"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-stone-100 pt-4 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="rounded-xl border border-stone-200 px-4 py-2.5 text-sm font-semibold text-stone-600 hover:bg-stone-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitLoading}
                  className="rounded-xl gradient-emerald px-6 py-2.5 text-sm font-semibold text-white hover:opacity-95 disabled:opacity-50"
                >
                  {submitLoading ? "Creating..." : "Create Event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
