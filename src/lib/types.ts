import { z } from "zod"



export type fields ={
    type?:string,
    name:string,
    label?:string,
    options?: [{value :string, label:string}],
    placeholder?: string,
    required?:boolean,
    accept? : string | [string]
}

export type dataTable ={
    id?:number,
    prompt? :string,
    jsonForms? :string,
    createdBy?:string,
    createdOn? :string,
    createdTime? :string,
    integrated?: boolean,
    googleLink? : string,
    googleFormId? : string
}


export type form ={
    title? : string,
    description?: string,
    fields :[fields]
}

export type apiResponse ={
    success : Boolean,
    message :String,
    jsonForm? :form,
    createdBy? : String,
    id?: number
}

export type userResponse = {
    
}




 

