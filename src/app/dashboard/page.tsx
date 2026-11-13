"use client";
import {
  ArrowDown,
  ArrowUpRight,
  BookOpen,
  Feather,
  Link2,
  Sprout,
  Star,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotes } from "@/features/notes/provider";
import { getConnections } from "@/features/notes/model";
import { KnowledgeGraph } from "@/features/notes/graph";
import { NoteCard } from "@/features/notes/note-card";
import { ArrowLink } from "@/components/ui";
import { usePreferences } from "@/components/preferences";
import { formatDate } from "@/lib/utils";

export default function Overview() {
  const { data, createNote } = useNotes();
  const { t, locale } = usePreferences();
  const router = useRouter();
  const notes = [...data.notes].sort((a, b) =>
    b.updatedAt.localeCompare(a.updatedAt),
  );
  const favorites = notes.filter((n) => n.favorite);
  const connections = getConnections(notes);
  return (
    <div className="journal-home">
      <header className="journal-welcome">
        <div>
          <p className="journal-kicker">
            <span className="hand-drawn-sun" aria-hidden="true">
              ✷
            </span>
            {t(
              "YOUR OWN LITTLE CORNER OF THE INTERNET",
              "گوشه دنج تو در این دنیای شلوغ",
            )}
          </p>
          <h1>
            {t("Make room for", "جایی باز کن برای")}
            <br />
            <em>{t("a wandering mind.", "فکرهای پرسه‌زن.")}</em>
          </h1>
          <p className="journal-intro">
            {t(
              "Not everything needs to be a finished thought. A sentence, a question, something you noticed — start there.",
              "لازم نیست هر فکری کامل باشد. یک جمله، یک سؤال، چیزی که امروز دیدی؛ از همان‌جا شروع کن.",
            )}
          </p>
          <button
            className="button primary"
            onClick={() =>
              router.push(
                "/dashboard/notes?id=" +
                  createNote(t("Untitled note", "یادداشت بدون عنوان")),
              )
            }
          >
            <Feather size={16} />
            {t("Put a thought on paper", "یک فکر را روی کاغذ بیاور")}
          </button>
        </div>
        <div className="journal-margin-note">
          <Sprout size={34} strokeWidth={1.2} />
          <p>
            {t(
              "A small thought today.\nSomething wonderful tomorrow.",
              "یک فکر کوچک امروز؛\nشاید چیزی شگفت‌انگیز در فردا.",
            )}
          </p>
          <span className="journal-handwritten">
            {t("let it grow ↴", "بگذار رشد کند ↴")}
          </span>
        </div>
      </header>
      <section className="journal-desk">
        <div className="journal-section-heading">
          <h2>
            <span className="journal-number">01</span>
            {t("On your desk", "روی میز تو")}
          </h2>
          <ArrowLink href="/dashboard/library">
            {t("Leaf through everything", "ورق زدن همه یادداشت‌ها")}
          </ArrowLink>
        </div>
        {notes.length ? (
          <div className="journal-note-spread">
            {notes.slice(0, 3).map((note, i) => (
              <div key={note.id} className={"paper-note paper-tone-" + i}>
                <div className="paper-tape" aria-hidden="true" />
                <NoteCard note={note} />
              </div>
            ))}
          </div>
        ) : (
          <div className="journal-blank">
            <Feather size={28} />
            <p>
              {t(
                "A blank page is a lovely place to begin.",
                "صفحه سفید جای خوبی برای شروع است.",
              )}
            </p>
          </div>
        )}
      </section>
      <div className="journal-bottom-grid">
        <section className="journal-connections">
          <div className="journal-section-heading">
            <h2>
              <span className="journal-number">02</span>
              {t("The threads between", "رشته‌های میان فکرها")}
            </h2>
            <Link
              href="/dashboard/graph"
              className="journal-round-link"
              aria-label={t("Explore graph", "کاوش گراف")}
            >
              <ArrowUpRight size={18} />
            </Link>
          </div>
          <p className="muted text-xs mb-5">
            {t(
              "Funny how one thought leads to another.",
              "جالب است که چطور یک فکر، راه به فکر دیگری می‌برد.",
            )}
          </p>
          <KnowledgeGraph notes={notes} compact />
          <div className="journal-tally">
            <span>
              <BookOpen size={13} />
              {notes.length} {t("little notes", "یادداشت کوچک")}
            </span>
            <span>
              <Link2 size={13} />
              {connections.length} {t("connections", "ارتباط")}
            </span>
          </div>
        </section>
        <section className="journal-bookmarks">
          <div className="journal-section-heading">
            <h2>
              <Star size={17} strokeWidth={1.5} />
              {t("Keep these close", "این‌ها را نزدیک نگه دار")}
            </h2>
          </div>
          {favorites.slice(0, 4).map((n, i) => (
            <Link
              href={"/dashboard/notes?id=" + n.id}
              key={n.id}
              className="bookmark-row"
            >
              <span className="bookmark-index">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3>{n.title || t("Untitled note", "یادداشت بدون عنوان")}</h3>
                <p>
                  {formatDate(n.updatedAt, locale)}{" "}
                  <span> / {n.tags.slice(0, 2).join(", ")}</span>
                </p>
              </div>
              <ArrowUpRight size={14} />
            </Link>
          ))}
          {!favorites.length && (
            <p className="muted text-xs my-6">
              {t(
                "Star a note you’d like to come back to.",
                "روی ستاره یک یادداشت بزن تا دوباره به آن برگردی.",
              )}
            </p>
          )}
          <div className="journal-prompt">
            <span className="journal-handwritten">
              {t("a gentle nudge", "یک تلنگر کوچک")}
            </span>
            <p>
              {t(
                "What’s one thing you don’t want to forget about today?",
                "کدام اتفاق امروز را دوست داری فراموش نکنی؟",
              )}
            </p>
            <Link href="/dashboard/notes" className="text-link">
              {t("Sit with that for a moment", "کمی به آن فکر کن")}
              <ArrowDown size={13} />
            </Link>
          </div>
        </section>
      </div>
      <footer className="journal-signoff">
        <span className="hand-drawn-sun" aria-hidden="true">
          ✷
        </span>
        <p>
          {t(
            "There’s no right way to think. Only your way.",
            "برای فکر کردن، راه درست واحدی نیست. راه خودت را پیدا کن.",
          )}
        </p>
      </footer>
    </div>
  );
}
