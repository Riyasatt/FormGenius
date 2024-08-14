import React from 'react'
import { Skeleton } from "@/components/ui/skeleton"



const FormSkeleton = () => {
  return (
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-32 w-full rounded-xl bg-blue-500/20" />
      <div className="space-y-2 mt-3 border p-3 rounded">
        <Skeleton className="h-10 w-2/4 md:w-1/4 bg-blue-500/20" />
        <Skeleton className="h-16 w-full md:w-3/4 bg-blue-500/20" />
      </div>
      <div className="space-y-2 mt-3 border p-3 rounded">
        <Skeleton className="h-10 w-2/4 md:w-1/4 bg-blue-500/20" />
        <Skeleton className="h-16 w-full md:w-3/4 bg-blue-500/20" />
      </div>
    </div>
  )
}

export default FormSkeleton