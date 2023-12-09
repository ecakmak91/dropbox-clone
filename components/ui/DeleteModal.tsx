import { Copy } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppStore } from "@/store/store"
import { useUser } from "@clerk/nextjs"
import { storage, db } from "@/firebase"
import { deleteObject, ref } from "firebase/storage"
import { deleteDoc, doc } from "firebase/firestore"
import toast from "react-hot-toast"

export function DeleteModal() {
  const { user } =useUser()
  
  const [isDeleteModalOpen, setIsDeleteModalOpen, fileId, setFileId] = 
  useAppStore(state=>[
    state.isDeleteModalOpen, 
    state.setIsDeleteModalOpen,
    state.fileId, 
    state.setFileId
  ])

  async function deleteFile() {
    if(!user || !fileId) return

    console.log(fileId)

    const  fileRef = ref(storage, `users/${user.id}/files/${fileId}`)

    const toastId=toast.loading("Deleting...")

    try{
      deleteObject(fileRef)
        .then(async()=>{
          deleteDoc(doc(db, "users", user.id, "files", fileId)).then(()=>{
            console.log("Deleted")
          })
        })
        .finally(()=>{
          setIsDeleteModalOpen(false)
          toast.success("Deleting Successfully",{
            id: toastId
          })
        })
    }catch(error){
      console.log(error)

      toast.error("Deleting failed, please try again",{
        id: toastId
      })
    }





  }

  return (
    <Dialog
      open={isDeleteModalOpen}
      onOpenChange={(isOpen)=>{
        setIsDeleteModalOpen(isOpen)
      }}
    >
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Are you sure you want to delete?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will parmanently delete your file!
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex space-x-2 py-3">
          <Button
            size="sm"
            className="px-3 flex-1"
            variant={"ghost"}
            onClick={()=>setIsDeleteModalOpen(false)}
          >
            <span className="sr-only">Cancel</span>
            <span>Cancel</span>
          </Button>

          <Button
            type="submit"
            size="sm"
            className="px-3 flex-1"
            variant={"destructive"}
            onClick={()=>deleteFile()}
          >
            <span className="sr-only">Delete</span>
            <span>Delete</span>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
