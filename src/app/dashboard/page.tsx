"use client";
import {
  FileText,
  Link2,
  Network,
  Star,
  ArrowUpRight,
  Plus,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useNotes } from "@/features/notes/provider";
import { getConnections } from "@/features/notes/model";
import { KnowledgeGraph } from "@/features/notes/graph";
import { NoteCard } from "@/features/notes/note-card";
import { PageTitle, ArrowLink } from "@/components/ui";
import { usePreferences } from "@/components/preferences";
export default function Overview() {
  const { data, createNote } = useNotes();
  const { t } = usePreferences();
  const router = useRouter();
  const notes = data.notes;
  const connections = getConnections(notes);
  const tags = new Set(notes.flatMap((n) => n.tags));
  return (
    <>
      <PageTitle
        eyebrow={t("YOUR PERSONAL KNOWLEDGE SPACE", "فضای دانش شخصی تو")}
        title={t("A little clarity, every day.", "هر روز، کمی روشن‌تر.")}
        description={t(
          "Welcome back. Let’s make room for your next good idea.",
          "خوش برگشتی؛ بیا برای ایده خوب بعدی جا باز کنیم.",
        )}
        action={
          <button
            className="button primary"
            onClick={() =>
              router.push(
                "/dashboard/notes?id=" +
                  createNote(t("Untitled note", "یادداشت بدون عنوان")),
              )
            }
          >
            <Plus size={15} />
            {t("Capture a thought", "ثبت یک فکر")}
          </button>
        }
      />
      <div className="stats-grid">
        {[
          {
            icon: FileText,
            label: t("Total notes", "کل یادداشت‌ها"),
            value: notes.length,
            foot: t("A growing garden of thoughts", "باغ رو به رشد فکرها"),
          },
          {
            icon: Link2,
            label: t("Connections", "ارتباط‌ها"),
            value: connections.length,
            foot: t("Ideas are better together", "ایده‌ها کنار هم بهترند"),
          },
          {
            icon: Star,
            label: t("Favorites", "علاقه‌مندی‌ها"),
            value: notes.filter((n) => n.favorite).length,
            foot: t("The ones worth returning to", "ارزشمند برای بازگشت"),
          },
          {
            icon: Network,
            label: t("Topics explored", "موضوعات کشف‌شده"),
            value: tags.size,
            foot: t("Follow your curiosity", "کنجکاوی‌ات را دنبال کن"),
          },
        ].map(({ icon: Icon, label, value, foot }) => (
          <div className="stat-card" key={label}>
            <div className="stat-top">
              {label}
              <Icon size={15} />
            </div>
            <p className="stat-value">{value}</p>
            <p className="stat-foot">{foot}</p>
          </div>
        ))}
      </div>
      <div className="dashboard-grid">
        <section className="card">
          <div className="section-title">
            <div>
              <h3>{t("Your ideas, connected", "ایده‌هایت، متصل به هم")}</h3>
              <p className="muted text-[10px] mt-2">
                {t(
                  "A little map of what’s on your mind.",
                  "نقشه کوچکی از آنچه در ذهن توست.",
                )}
              </p>
            </div>
            <ArrowLink href="/dashboard/graph">
              {t("Explore graph", "کاوش گراف")}
            </ArrowLink>
          </div>
          <KnowledgeGraph notes={notes} compact />
          <div className="graph-legend mt-4">
            <span className="flex items-center gap-2">
              <span className="status-dot" />
              {t("Favorite note", "یادداشت محبوب")}
            </span>
            <span>
              {t(
                "Click a node to follow a thought",
                "برای دنبال کردن یک فکر روی گره کلیک کن",
              )}
            </span>
          </div>
        </section>
        <section className="card">
          <div className="section-title">
            <h3>{t("Worth revisiting", "ارزش یک نگاه دوباره")}</h3>
            <Star size={15} className="accent-text" />
          </div>
          {notes
            .filter((n) => n.favorite)
            .slice(0, 4)
            .map((n) => (
              <Link
                key={n.id}
                href={"/dashboard/notes?id=" + n.id}
                className="list-row"
              >
                <span className="row-icon">
                  <FileText size={15} />
                </span>
                <div className="row-copy">
                  <h3>{n.title}</h3>
                  <p>{n.tags.join(" · ")}</p>
                </div>
                <ArrowUpRight size={14} className="muted" />
              </Link>
            ))}
          <div
            className="mt-6 p-4 rounded-lg"
            style={{ background: "var(--accent-soft)" }}
          >
            <Sparkles size={16} className="accent-text mb-3" />
            <p className="text-[12px]">
              {t(
                "“The more you connect, the more you discover.”",
                "«هرچه بیشتر پیوند بزنی، بیشتر کشف می‌کنی.»",
              )}
            </p>
            <p className="muted text-[10px] mt-3">
              {t(
                "Try adding a [[wiki link]] to a note today.",
                "امروز یک [[پیوند ویکی]] به یادداشتی اضافه کن.",
              )}
            </p>
          </div>
        </section>
      </div>
      <section className="mt-8">
        <div className="section-title">
          <h3>{t("Fresh on your mind", "تازه در ذهن تو")}</h3>
          <ArrowLink href="/dashboard/notes">
            {t("All notes", "همه یادداشت‌ها")}
          </ArrowLink>
        </div>
        <div className="note-grid">
          {[...notes]
            .sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))
            .slice(0, 3)
            .map((n) => (
              <NoteCard key={n.id} note={n} />
            ))}
        </div>
      </section>
    </>
  );
}
