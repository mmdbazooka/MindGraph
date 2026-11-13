"use client";
import Link from "next/link";
import { FileText,Star,ArrowUpRight } from "lucide-react";
import { useNotes } from "./provider";
import { usePreferences } from "@/components/preferences";
import { formatDate } from "@/lib/utils";
import type { Note } from "./model";
export function NoteCard({note}:{note:Note}) { const {patchNote}=useNotes();const {t,locale}=usePreferences(); return <article className="note-card"><div className="flex justify-between items-center"><FileText size={18} className="accent-text"/><button className="icon-button !p-1" onClick={()=>patchNote(note.id,{favorite:!note.favorite})} aria-label={note.favorite?t("Remove favorite","حذف از علاقه‌مندی‌ها"):t("Add favorite","افزودن به علاقه‌مندی‌ها")} aria-pressed={note.favorite}><Star size={14} className={note.favorite?"accent-text":""} fill={note.favorite?"currentColor":"none"}/></button></div><Link href={"/dashboard/notes?id="+note.id}><h3>{note.title||t("Untitled note","یادداشت بدون عنوان")}</h3><p className="mt-3">{note.content.replace(/[#*`>\[\]]/g,"").slice(0,190)||t("An empty page full of possibilities.","صفحه‌ای خالی، پر از امکان.")}</p></Link><div className="flex flex-wrap gap-1">{note.tags.slice(0,3).map(tag=><span className="tag" key={tag}># {tag}</span>)}</div><Link href={"/dashboard/notes?id="+note.id} className="note-card-footer"><span>{formatDate(note.updatedAt,locale)}</span><ArrowUpRight size={13}/></Link></article>; }
