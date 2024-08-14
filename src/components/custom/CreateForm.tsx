'use client'

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "../ui/textarea"
import { useStateStore } from "@/StateStore"
import { useState } from "react"
import { Loader2 } from "lucide-react"
import axios, { AxiosError } from 'axios'
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation"
import { useToast } from "../ui/use-toast"
  

const CreateForm = () => {

  const {formPrompt, setFormPrompt} = useStateStore();
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const {toast} = useToast()

  const {user} = useUser()
  
  const onSubmit =async ()=>{
    setIsLoading(true)
    
    try {
      const response = await axios.post('/api/generate-form',{
        userPrompt : formPrompt,
        user : user?.primaryEmailAddress?.emailAddress
      })


      setIsLoading(false)
      setIsDialogOpen(false)

      toast({
        variant: 'success',
        title : response.data.success ? 'success' : 'error',
        description : response.data.message,
      })

      router.replace(`/edit-form/${response.data.id}`)


    } catch (error) {
      toast({
        title : "error",
        description : "error while generating form",
        variant:"destructive"
      })
    }finally{
      setIsLoading(false)
      setIsDialogOpen(false)
    }


    
  }


  return (
    <div className="">
    <Dialog open={isDialogOpen}>
    <DialogTrigger asChild>
    <Button
          className=" rounded border bg-btn text-white sm:w-auto  "
          onClick={()=>setIsDialogOpen(!isDialogOpen)}
        >
          + Create AI Form
        </Button>
    </DialogTrigger>
    <DialogContent className="sm:max-w-xl">
      <DialogHeader className="text-left">
        <DialogTitle>Form Creator</DialogTitle>
        <DialogDescription>
          Let us know the details of the form you need to create
        </DialogDescription>
      </DialogHeader>
      <div className="grid w-full gap-1.5">
      <Label htmlFor="message" className="mt-5">Prompt</Label>
      <Textarea onChange={(e)=>setFormPrompt(e.target.value)} placeholder="Tell us about your form" className="resize-none h-32 "  id="message" />
    </div>
      <DialogFooter className="gap-y-2">
      <Button variant='destructive' className=" rounded border  sm:w-auto " onClick={()=>setIsDialogOpen(!isDialogOpen)} >  Cancel</Button>
        <Button disabled={isLoading} className=" rounded border bg-btn text-white  sm:w-32  " onClick={()=>onSubmit()} type="submit">{isLoading ? <div className="flex items-center gap-x-2"><Loader2 className=" animate-spin" /> Generating</div> : <span className="text-white">+ Create</span>}</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
  </div>

  )
}

export default CreateForm