"use client";
import { useState } from "react";
import { Network } from "lucide-react";
import { PageTitle, EmptyState } from "@/components/ui";
import { usePreferences } from "@/components/preferences";
import { useNotes } from "@/features/notes/provider";
import { KnowledgeGraph } from "@/features/notes/graph";
export default function GraphPage() {
  const { data } = useNotes();
  const { t } = usePreferences();
  const [tag, setTag] = useState("");
  const tags = [...new Set(data.notes.flatMap((n) => n.tags))];
  const notes = data.notes.filter((n) => !tag || n.tags.includes(tag));
  return (
    <>
      <PageTitle
        eyebrow={t("THE BIGGER PICTURE", "تصویر بزرگ‌تر")}
        title={t("Follow a thread of thought.", "رشته یک فکر را دنبال کن.")}
        description={t(
          "Every connection tells a story. Click a node to open a note, or filter by a topic to find a new perspective.",
          "هر ارتباط یک داستان است؛ روی گره کلیک کن یا با موضوع فیلتر کن تا زاویه تازه‌ای پیدا کنی.",
        )}
      />
      <div className="toolbar">
        <Network size={18} className="accent-text" />
        <select
          aria-label={t("Filter graph by topic", "فیلتر گراف با موضوع")}
          value={tag}
          onChange={(e) => setTag(e.target.value)}
        >
          <option value="">{t("All topics", "همه موضوعات")}</option>
          {tags.map((tag) => (
            <option key={tag} value={tag}>
              {tag}
            </option>
          ))}
        </select>
        <div className="graph-legend ms-auto">
          <span className="flex items-center gap-2">
            <span className="status-dot" />
            {t("Favorite", "علاقه‌مندی")}
          </span>
          <span>
            {t(
              "Larger nodes have more connections",
              "گره‌های بزرگ‌تر ارتباط بیشتری دارند",
            )}
          </span>
        </div>
      </div>
      {notes.length ? (
        <KnowledgeGraph notes={notes} />
      ) : (
        <EmptyState
          icon={<Network size={24} />}
          title={t(
            "Your universe starts with a note",
            "جهان تو با یک یادداشت آغاز می‌شود",
          )}
          description={t(
            "Write a note and use [[Note title]] to connect it to another.",
            "یادداشتی بنویس و با [[عنوان یادداشت]] آن را به دیگری متصل کن.",
          )}
        />
      )}
      <div className="notice mt-5">
        {t(
          "Tip: links match note titles. A link to a new title creates a note when you click it in Preview. The graph displays up to 80 notes at once.",
          "نکته: پیوندها با عنوان یادداشت تطبیق پیدا می‌کنند. کلیک روی پیوند جدید در پیش‌نمایش، یادداشت تازه می‌سازد. گراف تا ۸۰ یادداشت را هم‌زمان نمایش می‌دهد.",
        )}
      </div>
    </>
  );
}
