import React from 'react'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import { Trash2 } from 'lucide-react'
import { useStateStore } from '@/StateStore'
import { useToast } from '../ui/use-toast'

const DeletePopUp = ({index}:{index :number}) => {

    const {jsonForm,setJsonForm} = useStateStore()

    const {toast}= useToast()

    function onDelete (){
        if(jsonForm.fields){
            jsonForm.fields.splice(index, 1)
            toast({
              variant: 'success',
              title : "Updated"
            })
            setJsonForm(jsonForm)
        }

    }


  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
      <Button variant='ghost' className="p-0">
        <Trash2 className="w-[15px] md:w-[20px]" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={()=>onDelete()} >Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeletePopUp