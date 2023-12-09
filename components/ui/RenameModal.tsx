'use client'

import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useState } from "react"
import { Button } from "./button"
import { Input } from "./input"
import { updateDoc, doc } from "firebase/firestore"
import { db } from "@/firebase"
import toast from "react-hot-toast"


export function RenameModal() {
  const { user } = useUser()
  const [input, setInput] = useState("")

  const [isRenameModalOpen, setIsRenameModalOpen, fileId, filename] = 
  useAppStore(state=>[
    state.isRenameModalOpen, 
    state.setIsRenameModalOpen,
    state.fileId, 
    state.filename
  ])

  const renameFile=async ()=>{
    if(!user || !fileId) return

    const toastId=toast.loading("Renaming...")
    await updateDoc(doc(db, "users", user.id, "files", fileId),{
      fileName:input,
    }).then(()=>{
      toast.success("Renamed Successfully",{
        id: toastId
      })
    }).catch((e)=>{
      console.log(e)
      toast.error("Renamed Failed, please try again",{
        id: toastId
      })
    })

    

    setInput("")
    setIsRenameModalOpen(false)
  }

  return (
    <Dialog
      open={isRenameModalOpen}
      onOpenChange={(isOpen)=>{
        setIsRenameModalOpen(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pb-2">Rename the File {filename} </DialogTitle>

          <Input
            id="link"
            defaultValue={filename}
            onChange={e=>setInput(e.target.value)}
            onKeyDownCapture={e=>{
              if(e.key==="Enter"){
                renameFile()
              }
            }}
          />
        </DialogHeader>
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={()=>setIsRenameModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            onClick={()=>renameFile()}
          >
            <span className="sr-only">Save</span>
            <span>Save</span>
          </Button>
        </div>
      </DialogContent>
      

    </Dialog>
  )
}
