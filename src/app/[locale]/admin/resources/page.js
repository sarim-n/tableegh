"use client";

import { useState, useEffect } from "react";
import { Link } from "@/i18n/navigation";

export default function AdminResourcesPage() {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [error, setError] = useState("");
  
  // Form State
  const [titleEn, setTitleEn] = useState("");
  const [titleUr, setTitleUr] = useState("");
  const [descriptionEn, setDescriptionEn] = useState("");
  const [descriptionUr, setDescriptionUr] = useState("");
  const [type, setType] = useState("article");
  const [category, setCategory] = useState("dawah");
  const [author, setAuthor] = useState("");
  const [duration, setDuration] = useState("");
  const [link, setLink] = useState("");
  const [date, setDate] = useState("");

  const [showModal, setShowModal] = useState(false);

  // Fetch resources
  const fetchResources = async () => {
    try {
      const res = await fetch("/api/resources");
      if (!res.ok) throw new Error("Failed to fetch resources");
      const data = await res.json();
      setResources(data);
    } catch (err) {
      console.error(err);
      setError("Could not load resources.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle Create
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSubmitLoading(true);

    const resourceData = {
      titleEn,
      titleUr,
      descriptionEn: descriptionEn || null,
      descriptionUr: descriptionUr || null,
      type,
      category,
      author: author || null,
      duration: duration || null,
      link,
      date,
    };

    try {
      const res = await fetch("/api/resources", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(resourceData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to create resource");

      // Success: reset form, close modal, refetch
      setTitleEn("");
      setTitleUr("");
      setDescriptionEn("");
      setDescriptionUr("");
      setType("article");
      setCategory("dawah");
      setAuthor("");
      setDuration("");
      setLink("");
      setDate("");
      setShowModal(false);
      fetchResources();
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitLoading(false);
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (!confirm("Are you sure you want to delete this resource?")) return;

    try {
      const res = await fetch(`/api/resources/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to delete resource");
      }

      fetchResources();
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
          <h1 className="mt-2 text-3xl font-bold text-charcoal">Manage Resources</h1>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-2 rounded-xl gradient-emerald px-5 py-2.5 text-sm font-semibold text-white shadow-md transition-all hover:shadow-lg hover:opacity-95"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          Add New Resource
        </button>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 rounded-xl bg-red-50 border border-red-200 p-4 text-sm text-red-600">
          {error}
        </div>
      )}

      {/* Resources Table / List */}
      {loading ? (
        <div className="py-12 text-center text-stone-500">Loading resources...</div>
      ) : resources.length > 0 ? (
        <div className="overflow-hidden rounded-2xl border border-stone-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-start border-collapse">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-start text-xs font-semibold uppercase tracking-wider text-stone-500">
                  <th className="px-6 py-4 text-start">Resource (EN / UR)</th>
                  <th className="px-6 py-4 text-start">Type</th>
                  <th className="px-6 py-4 text-start">Category</th>
                  <th className="px-6 py-4 text-start">Author / Link</th>
                  <th className="px-6 py-4 text-end">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 text-sm text-charcoal">
                {resources.map((r) => (
                  <tr key={r.id} className="hover:bg-stone-50/50">
                    <td className="px-6 py-4">
                      <div className="font-semibold">{r.titleEn}</div>
                      <div className="mt-0.5 text-xs text-stone-400 text-right font-urdu" dir="rtl">
                        {r.titleUr}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700 border border-blue-100 uppercase">
                        {r.type}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-stone-600 uppercase text-xs font-semibold">
                      {r.category}
                    </td>
                    <td className="px-6 py-4">
                      {r.author && <div className="text-stone-700 font-medium text-xs">{r.author}</div>}
                      <a
                        href={r.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-emerald-600 hover:underline break-all"
                      >
                        {r.link}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-end whitespace-nowrap">
                      <button
                        onClick={() => handleDelete(r.id)}
                        className="rounded-lg p-2 text-stone-400 hover:bg-red-50 hover:text-red-600"
                        title="Delete Resource"
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
          No resources uploaded yet. Click "Add New Resource" to get started.
        </div>
      )}

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl border border-stone-200 bg-white p-6 shadow-xl animate-scale-in">
            <div className="mb-6 flex items-center justify-between border-b border-stone-100 pb-4">
              <h2 className="text-xl font-bold text-charcoal">Add New Resource</h2>
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
                    placeholder="e.g. Virtues of Dawah"
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
                    placeholder="e.g. فضائل دعوت"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 font-urdu"
                    dir="rtl"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Type</label>
                  <select
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="article">Article</option>
                    <option value="audio">Audio</option>
                    <option value="video">Video</option>
                    <option value="book">Book</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  >
                    <option value="dawah">Dawah</option>
                    <option value="education">Education</option>
                    <option value="literature">Literature</option>
                  </select>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Author (Optional)</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g. Maulana Yusuf"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Duration (Optional, e.g. for Audio/Video)</label>
                  <input
                    type="text"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g. 45 min"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Resource Link URL</label>
                  <input
                    type="url"
                    required
                    value={link}
                    onChange={(e) => setLink(e.target.value)}
                    placeholder="e.g. https://example.com/bayan.mp3"
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Date Published</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
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
                    placeholder="Describe this resource..."
                    className="w-full rounded-xl border border-stone-200 px-4 py-2.5 text-sm outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 resize-none"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold text-stone-500 uppercase">Description (Urdu)</label>
                  <textarea
                    rows={3}
                    value={descriptionUr}
                    onChange={(e) => setDescriptionUr(e.target.value)}
                    placeholder="تفصیل لکھیں..."
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
                  {submitLoading ? "Creating..." : "Create Resource"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
