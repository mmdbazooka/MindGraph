"use client";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  BookOpen,
  Check,
  Feather,
  Link2,
  Sprout,
  Star,
} from "lucide-react";
import { NotebookCollage } from "@/components/landing/notebook-collage";
import { Logo, PreferencesControls } from "@/components/ui";
import { usePreferences } from "@/components/preferences";

export default function Landing() {
  const { t } = usePreferences();
  return (
    <div className="notebook-landing">
      <nav className="notebook-nav">
        <Logo />
        <div className="flex items-center gap-4">
          <PreferencesControls />
          <Link className="button primary" href="/dashboard">
            {t("Open workspace", "ورود به فضای کار")}
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </nav>
      <main>
        <section className="notebook-hero">
          <div className="notebook-hero-copy">
            <p className="journal-kicker">
              <span className="hand-drawn-sun" aria-hidden="true">
                ✷
              </span>
              {t(
                "FOR THOUGHTS THAT NEED A PLACE TO LAND",
                "برای فکرهایی که دنبال جایی برای نشستن‌اند",
              )}
            </p>
            <h1>
              {t("Your mind isn’t", "ذهنت قرار نیست")}
              <br />
              {t("a filing cabinet.", "یک کشوی بایگانی باشد.")}
              <br />
              <em>{t("Let it wander.", "بگذار پرسه بزند.")}</em>
            </h1>
            <p className="notebook-hero-description">
              {t(
                "That line from a book. An idea on your walk home. The question you keep coming back to. Give them a home — and see what grows between them.",
                "آن خط از یک کتاب. ایده‌ای در راه خانه. سؤالی که مدام به آن برمی‌گردی. برایشان خانه‌ای بساز و ببین میانشان چه رشد می‌کند.",
              )}
            </p>
            <Link href="/dashboard" className="button primary">
              <Feather size={16} />
              {t("Find your first blank page", "اولین صفحه سفیدت را پیدا کن")}
              <ArrowRight size={15} />
            </Link>
            <p className="notebook-small-print">
              {t(
                "Bring your curiosity. Everything else is ready.",
                "کنجکاوی‌ات را بیاور؛ بقیه چیزها آماده است.",
              )}
            </p>
          </div>
          <NotebookCollage />
        </section>
        <div className="notebook-values">
          <span>
            <Feather size={15} />
            {t("A little less noise", "کمی سکوت بیشتر")}
          </span>
          <span>
            <Link2 size={15} />
            {t("A few more connections", "چند ارتباط تازه‌تر")}
          </span>
          <span>
            <Sprout size={15} />
            {t("A space to grow into", "جایی برای رشد کردن")}
          </span>
        </div>
        <section id="the-idea" className="notebook-story">
          <div>
            <p className="journal-kicker">
              {t("A NOTE FROM US", "یک یادداشت از ما")}
            </p>
            <h2>
              {t("Good ideas rarely arrive", "ایده‌های خوب معمولاً")}
              <br />
              <em>{t("fully formed.", "کامل از راه نمی‌رسند.")}</em>
            </h2>
            <span className="journal-handwritten">
              {t("and that’s the lovely part.", "و زیبایی ماجرا همین است.")}
            </span>
          </div>
          <div className="notebook-story-text">
            <p>
              {t(
                "Most start as something small. A half-finished sentence, a passing observation, a thought that doesn’t quite fit anywhere yet.",
                "بیشترشان کوچک شروع می‌شوند؛ جمله‌ای نیمه‌تمام، نگاهی گذرا یا فکری که هنوز جایی برایش پیدا نکرده‌ای.",
              )}
            </p>
            <p>
              {t(
                "MindGraph is a personal notebook for those in-between moments. Write them down in Markdown, connect them as you go, and come back when you’re ready. There’s room in the margins.",
                "MindGraph دفتر شخصی همین لحظه‌های بینابین است. با Markdown ثبتشان کن، کم‌کم به هم وصلشان کن و هر وقت خواستی برگرد. در حاشیه‌ها همیشه جا هست.",
              )}
            </p>
          </div>
        </section>
        <section id="inside" className="notebook-inside">
          <div className="notebook-section-title">
            <p className="journal-kicker">
              {t(
                "SIMPLE TOOLS. A LITTLE POSSIBILITY.",
                "ابزارهای ساده؛ کمی امکان تازه",
              )}
            </p>
            <h2>
              {t(
                "A notebook that thinks with you.",
                "دفتری که با تو فکر می‌کند.",
              )}
            </h2>
          </div>
          <div className="notebook-feature-list">
            {[
              {
                n: "01",
                icon: Feather,
                title: t("Catch the little things.", "چیزهای کوچک را بگیر."),
                description: t(
                  "A Markdown editor that leaves you alone with your words. Write, preview, or see both side by side. Code, checklists, tables — they have a place too.",
                  "ادیتور Markdown تو را با کلماتت تنها می‌گذارد. بنویس، پیش‌نمایش ببین یا هر دو را کنار هم داشته باش. کد، چک‌لیست و جدول هم جای خودشان را دارند.",
                ),
                detail: (
                  <div className="notebook-markdown-demo" dir="ltr">
                    <span className="muted"># A thought on slow mornings</span>
                    <br />
                    <br />
                    {t(
                      "Maybe the best ideas need a little quiet.",
                      "شاید بهترین ایده‌ها به کمی سکوت نیاز دارند.",
                    )}
                    <br />
                    <span className="accent-text">
                      [[{t("Things worth noticing", "چیزهای دیدنی")}]]
                    </span>
                  </div>
                ),
              },
              {
                n: "02",
                icon: Link2,
                title: t("Follow the thread.", "نخ فکر را بگیر."),
                description: t(
                  "Add a [[wiki link]] when one thought reminds you of another. Backlinks keep the conversation going, and your graph lets you see the bigger picture.",
                  "وقتی فکری تو را یاد فکر دیگری می‌اندازد، یک [[پیوند ویکی]] اضافه کن. بک‌لینک‌ها گفت‌وگو را ادامه می‌دهند و گراف تصویر بزرگ‌تر را نشانت می‌دهد.",
                ),
                detail: (
                  <div className="notebook-link-demo">
                    <span>{t("A book I loved", "کتابی که دوست داشتم")}</span>
                    <svg viewBox="0 0 100 35" aria-hidden="true">
                      <path
                        d="M5 18 Q35 0 55 18 T95 18"
                        fill="none"
                        stroke="currentColor"
                        strokeDasharray="4 4"
                      />
                    </svg>
                    <span>{t("A new way to see", "نگاهی تازه")}</span>
                  </div>
                ),
              },
              {
                n: "03",
                icon: BookOpen,
                title: t("Find your way back.", "راه برگشت را پیدا کن."),
                description: t(
                  "Search a phrase, follow a tag, or reach for a favorite. Your library is a collection of things you’ve cared enough to keep.",
                  "یک عبارت را جست‌وجو کن، برچسبی را دنبال کن یا سراغ علاقه‌مندی‌ها برو. کتابخانه تو مجموعه چیزهایی است که ارزش نگه داشتن داشته‌اند.",
                ),
                detail: (
                  <div className="notebook-bookmarks-demo">
                    {[
                      t("A garden of ideas", "باغی از ایده‌ها"),
                      t("What I’m learning", "آنچه یاد می‌گیرم"),
                      t("Little everyday wonders", "شگفتی‌های کوچک هر روز"),
                    ].map((v) => (
                      <span key={v}>
                        <Star size={12} />
                        {v}
                        <ArrowUpRight size={12} />
                      </span>
                    ))}
                  </div>
                ),
              },
            ].map(({ n, icon: Icon, title, description, detail }) => (
              <article className="notebook-feature" key={n}>
                <span className="notebook-feature-number">{n}</span>
                <div className="notebook-feature-copy">
                  <Icon size={21} strokeWidth={1.4} />
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
                <div className="notebook-feature-detail">{detail}</div>
              </article>
            ))}
          </div>
        </section>
        <section className="notebook-ownership">
          <Sprout size={38} strokeWidth={1.1} />
          <h2>
            {t(
              "A small space. Entirely yours.",
              "یک فضای کوچک؛ کاملاً برای تو.",
            )}
          </h2>
          <p>
            {t(
              "Your notes live in this browser. No account to create, no cloud to keep up with. Export a JSON backup or a Markdown page whenever you want to take your thoughts somewhere else.",
              "یادداشت‌هایت در همین مرورگر زندگی می‌کنند. حسابی لازم نیست و خبری از همگام‌سازی ابری نیست. هر وقت خواستی فکرهایت را جای دیگری ببری، خروجی JSON یا Markdown بگیر.",
            )}
          </p>
          <div>
            <span>
              <Check size={13} />
              {t("English & فارسی", "فارسی و English")}
            </span>
            <span>
              <Check size={13} />
              {t("Light & dark", "روشن و تاریک")}
            </span>
            <span>
              <Check size={13} />
              {t("Made for your screen", "برای اندازه صفحه تو")}
            </span>
          </div>
          <p className="notebook-storage-note">
            {t(
              "A gentle reminder: browser data can be cleared. Keep a backup of the thoughts you’d miss.",
              "یک یادآوری دوستانه: داده مرورگر ممکن است پاک شود. از فکرهایی که دلت برایشان تنگ می‌شود، پشتیبان بگیر.",
            )}
          </p>
        </section>
        <section className="notebook-invitation">
          <span className="journal-handwritten">
            {t("whenever you’re ready…", "هر وقت آماده بودی…")}
          </span>
          <h2>{t("What’s on your mind?", "چه در ذهن تو می‌گذرد؟")}</h2>
          <Link href="/dashboard" className="button primary">
            <Feather size={15} />
            {t("Start with a thought", "با یک فکر شروع کن")}
            <ArrowRight size={15} />
          </Link>
        </section>
      </main>
      <footer className="notebook-footer">
        <Logo />
        <p>
          {t(
            "A small project for wonderfully busy minds.",
            "یک پروژه کوچک برای ذهن‌های پرماجرا.",
          )}
        </p>
        <a
          href="https://github.com/mmdbazooka/MindGraph"
          className="text-link"
          target="_blank"
          rel="noreferrer"
        >
          GitHub
          <ArrowUpRight size={13} />
        </a>
      </footer>
    </div>
  );
}
