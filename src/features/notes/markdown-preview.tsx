"use client";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { useRouter } from "next/navigation";
import { useNotes } from "./provider";
import { usePreferences } from "@/components/preferences";
export function MarkdownPreview({ content }: { content: string }) {
  const { data, createNote } = useNotes();
  const { t } = usePreferences();
  const router = useRouter();
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h2>{children}</h2>,
          a: ({ href, children, ...props }) => (
            <a
              {...props}
              href={href}
              rel="noreferrer"
              onClick={(e) => {
                if (href?.startsWith("#wiki:")) {
                  e.preventDefault();
                  const title = decodeURIComponent(href.slice(6));
                  const existing = data.notes.find(
                    (n) => n.title.toLowerCase() === title.toLowerCase(),
                  );
                  const next = existing?.id || createNote(title);
                  router.push("/dashboard/notes?id=" + next);
                }
              }}
            >
              {children}
            </a>
          ),
        }}
      >
        {content.replace(
          /\[\[([^\]\n]+)\]\]/g,
          (_, title: string) =>
            `[${title}](#wiki:${encodeURIComponent(title.trim())})`,
        ) ||
          t(
            "Your preview will grow with your ideas.",
            "پیش‌نمایش همراه ایده‌هایت رشد می‌کند.",
          )}
      </ReactMarkdown>
    </div>
  );
}
