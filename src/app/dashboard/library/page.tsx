"use client";
import { useState } from "react";
import { Search, Star, BookOpen, Tag } from "lucide-react";
import { PageTitle, EmptyState } from "@/components/ui";
import { usePreferences } from "@/components/preferences";
import { useNotes } from "@/features/notes/provider";
import { NoteCard } from "@/features/notes/note-card";
import { searchNotes } from "@/features/notes/model";
export default function LibraryPage() {
  const { data } = useNotes();
  const { t } = usePreferences();
  const [query, setQuery] = useState("");
  const [tag, setTag] = useState("");
  const [favorites, setFavorites] = useState(false);
  const [sort, setSort] = useState("recent");
  const tags = [...new Set(data.notes.flatMap((n) => n.tags))];
  const notes = searchNotes(data.notes, query)
    .filter((n) => (!tag || n.tags.includes(tag)) && (!favorites || n.favorite))
    .sort((a, b) =>
      sort === "title"
        ? a.title.localeCompare(b.title)
        : b.updatedAt.localeCompare(a.updatedAt),
    );
  return (
    <>
      <PageTitle
        eyebrow={t("CURATED BY YOUR CURIOSITY", "با سلیقه کنجکاوی تو")}
        title={t("A library that feels like you.", "کتابخانه‌ای شبیه خودت.")}
        description={t(
          "Browse by topic, revisit your favorites, and find a little inspiration in your own words.",
          "موضوع‌ها را بگرد، به محبوب‌ها برگرد و میان کلمات خودت الهام بگیر.",
        )}
      />
      <div className="toolbar">
        <label className="search-field flex-1">
          <Search size={15} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label={t("Search library", "جست‌وجوی کتابخانه")}
            placeholder={t("Search the library…", "جست‌وجو در کتابخانه…")}
          />
        </label>
        <button
          className={"button " + (favorites ? "primary" : "")}
          onClick={() => setFavorites((v) => !v)}
          aria-pressed={favorites}
        >
          <Star size={14} />
          {t("Favorites", "علاقه‌مندی‌ها")}
        </button>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          aria-label={t("Sort notes", "مرتب‌سازی یادداشت‌ها")}
        >
          <option value="recent">
            {t("Recently updated", "آخرین ویرایش")}
          </option>
          <option value="title">{t("Title A–Z", "بر اساس عنوان")}</option>
        </select>
      </div>
      <div className="flex flex-wrap gap-2 mb-7">
        <button
          className={"button small " + (!tag ? "primary" : "")}
          onClick={() => setTag("")}
        >
          {t("All topics", "همه موضوعات")} <span>{data.notes.length}</span>
        </button>
        {tags.map((item) => (
          <button
            key={item}
            className={"button small " + (tag === item ? "primary" : "")}
            onClick={() => setTag(tag === item ? "" : item)}
          >
            <Tag size={11} />
            {item}
            <span className="opacity-60">
              {data.notes.filter((n) => n.tags.includes(item)).length}
            </span>
          </button>
        ))}
      </div>
      <div className="section-title">
        <h3>{tag || t("All your ideas", "همه ایده‌هایت")}</h3>
        <span className="muted text-[11px]">
          {notes.length} {t("notes", "یادداشت")}
        </span>
      </div>
      {notes.length ? (
        <div className="note-grid">
          {notes.map((n) => (
            <NoteCard key={n.id} note={n} />
          ))}
        </div>
      ) : (
        <EmptyState
          icon={<BookOpen size={24} />}
          title={t("Nothing on this shelf yet", "این قفسه هنوز خالی است")}
          description={t(
            "Try a different topic or search, or add a few favorites.",
            "موضوع یا جست‌وجوی دیگری امتحان کن، یا چند یادداشت محبوب انتخاب کن.",
          )}
        />
      )}
    </>
  );
}
