"use client";
import { createContext,useContext } from "react";
import { useLocalStore } from "@/lib/use-local-store";
import { initialWorkspace,workspaceSchema,type Workspace,type Note } from "./model";
import { id } from "@/lib/utils";
type Store = ReturnType<typeof useLocalStore<Workspace>> & { createNote:(title?:string)=>string; patchNote:(id:string,patch:Partial<Pick<Note,"title"|"content"|"tags"|"favorite">>)=>void; deleteNote:(id:string)=>void };
const Context=createContext<Store|null>(null);
export function NotesProvider({children}:{children:React.ReactNode}) { const store=useLocalStore("mindgraph-workspace-v1",initialWorkspace,workspaceSchema);
 const createNote=(title="Untitled note")=>{const note:Note={id:id(),title,content:"",tags:[],favorite:false,createdAt:new Date().toISOString(),updatedAt:new Date().toISOString()};store.update(s=>({...s,notes:[note,...s.notes]}));return note.id;};
 const patchNote=(noteId:string,patch:Partial<Pick<Note,"title"|"content"|"tags"|"favorite">>)=>store.update(s=>({...s,notes:s.notes.map(n=>n.id===noteId?{...n,...patch,updatedAt:new Date().toISOString()}:n)}));
 const deleteNote=(noteId:string)=>store.update(s=>({...s,notes:s.notes.filter(n=>n.id!==noteId)}));
 return <Context.Provider value={{...store,createNote,patchNote,deleteNote}}>{children}</Context.Provider>;
}
export function useNotes(){const store=useContext(Context);if(!store)throw new Error("NotesProvider missing");return store;}
