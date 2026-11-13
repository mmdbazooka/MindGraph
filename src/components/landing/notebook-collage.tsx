"use client";
import { Check, Star, Sprout } from "lucide-react";
import { usePreferences } from "../preferences";
export function NotebookCollage() {
  const { t } = usePreferences();
  return (
    <div
      className="notebook-collage"
      aria-label={t(
        "Illustration of connected personal notes",
        "تصویر یادداشت‌های شخصی متصل به هم",
      )}
    >
      <svg
        className="notebook-collage-thread"
        viewBox="0 0 520 500"
        aria-hidden="true"
      >
        <path
          d="M110 80 C510 -20 420 260 260 220 S-50 300 170 380 S500 330 440 450"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="5 6"
        />
        <path
          d="M420 447l20 3 4-18"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
      </svg>
      <div className="collage-main-note">
        <span className="paper-tape" />
        <p className="collage-date">
          {t("A PAGE FROM MY NOTEBOOK", "برگی از دفتر من")}
        </p>
        <h2>
          {t("Things worth", "چیزهایی که")}
          <br />
          <em>{t("noticing.", "ارزش دیدن دارند.")}</em>
        </h2>
        <p>
          {t(
            "The best conversations start with a good question. So do the best ideas.",
            "بهترین گفت‌وگوها با یک سؤال خوب شروع می‌شوند. بهترین ایده‌ها هم همین‌طور.",
          )}
        </p>
        <div className="collage-check">
          <Check size={12} />
          {t(
            "Leave a little room for surprise.",
            "کمی جا برای غافلگیر شدن بگذار.",
          )}
        </div>
        <span className="collage-wiki">
          ↗ [[{t("Creative process", "فرایند خلاقیت")}]]
        </span>
      </div>
      <div className="collage-sticky">
        <Star size={17} strokeWidth={1.3} />
        <p>{t("What if I just\nstarted?", "اگر فقط\nشروع کنم چه؟")}</p>
        <span>{t("a thought for later", "فکری برای بعد")}</span>
      </div>
      <div className="collage-small-note">
        <Sprout size={23} strokeWidth={1.2} />
        <span>
          {t(
            "Small seeds.\nUnexpected connections.",
            "بذرهای کوچک؛\nارتباط‌های دور از انتظار.",
          )}
        </span>
      </div>
      <span className="collage-caption">
        {t("messy thoughts welcome here ↗", "فکرهای نامرتب هم خوش آمدند ↗")}
      </span>
    </div>
  );
}
