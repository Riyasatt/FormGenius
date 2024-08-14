import React, { useState } from "react";
import { Separator } from "../ui/separator";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { fields, form } from "@/lib/types";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";




import EditPopUp from "./EditPopUp";
import DeletePopUp from "./DeletePopUp";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { useStateStore } from "@/StateStore";

const FormUI = () => {
  const { jsonForm, setJsonForm } = useStateStore();
  

  //  console.log(formSchema.shape)

  return (
    <div className=" p-2  rounded">
      <div className="md:flex justify-between  ">
        <div>
          <div className="text-3xl px-4 md:text-4xl lg:text-5xl font-extrabold mt-5 mb-1 text-blue-500">
            {jsonForm.title}
          </div>
          <div className=" text-sm px-4 md:text-medium lg:text-lg mb-2 text-white/50">
            {jsonForm.description}
          </div>
        </div>

         
          <div className=" px-4 text-red-500 text-xs md:text-sm flex items-center gap-x-3">
            <EditPopUp
              index={0}
              title={jsonForm.title}
              description={jsonForm.description}
            />
          </div>
        
      </div>
      <Separator className="mt-3" />

      <div>
        {jsonForm.fields?.map((field: fields, index: number) => {
          return (
            <div
              key={index}
              className={`px-4 transition-all  ${
                field.type === "submit" ? "hidden" : ""
              }  rounded-lg mt-4 md:px-6 py-10 bg-slate-900 `}
            >
              {field.type === "submit" ? (
                <div className="hidden"></div>
              ) 
              : 
              field.type === "checkbox" && field.options  ? (
                <div>

                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm mb-3">
                      {field.label}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </div>
                     
                      <div className=" text-red-500 text-xs md:text-sm flex items-center gap-x-3">
                        <EditPopUp options={field.options} field={field} index={index} />
                        <DeletePopUp index={index} />
                      </div>
                    
                  </div>
                  <div className="space-y-5">
                {field.options.map((option,index)=>{
                  return (
                    <div key={index} className="flex items-center space-x-2">
                  <Checkbox
                    className="bg-transparent"
                    required={field.required}
                    id="terms"
                  />
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {option.label}
                  </label>
                </div>
                  )
                })}
                </div>
              </div>
              ) 
              : field.type === "checkbox"  ? 

              <div className="sm:flex space-y-2 sm:space-y-0 items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      className="bg-transparent"
                      required={field.required}
                      id="terms"
                    />
                    <label
                      htmlFor="terms"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {field.label}
                    </label>
                  </div>
                   
                    <div className=" text-red-500 text-xs md:text-sm flex items-center gap-x-3">
                      <EditPopUp field={field} index={index} />
                      <DeletePopUp index={index} />
                    </div>
                  
                </div>
              
              : field.type === "select" ? (
                <div>
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-sm mb-3">
                      {field.label}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </div>
                     
                      <div className=" text-red-500 text-xs md:text-sm flex items-center gap-x-3">
                        <EditPopUp options={field.options} field={field} index={index} />
                        <DeletePopUp index={index} />
                      </div>
                    
                  </div>
                  <Select required={field.required}>
                    <SelectTrigger className="w-full sm:w-60 bg-transparent">
                      <SelectValue placeholder="select" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {field.options?.map((option, index) => (
                          <SelectItem key={index} value={String(option?.value)}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              ) : field.type === "radio" ? (
                <div>
                  <div className=" flex items-center justify-between mb-3">
                    <div className=" font-bold   text-sm">
                      {field.label}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </div>
                     
                      <div className=" text-red-500 text-xs md:text-sm flex items-center gap-x-3">
                        <EditPopUp options={field.options} field={field} index={index} />
                        <DeletePopUp index={index} />
                      </div>
                    
                  </div>
                  <RadioGroup
                    className="bg-transparent space-y-3"
                    defaultValue="comfortable"
                  >
                    {field.options?.map((option, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <RadioGroupItem
                          className=""
                          value={String(option.value)}
                          id="r1"
                        />
                        <Label>{option.label}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between">
                    <div className=" font-bold   text-sm">
                      {field.label}
                      {field.required ? (
                        <span className="text-red-500">*</span>
                      ) : (
                        ""
                      )}
                    </div>
                     
                      <div className=" text-red-500 text-xs md:text-sm flex items-center gap-x-3">
                        <EditPopUp field={field} index={index} />
                        <DeletePopUp index={index} />
                      </div>
                    
                  </div>
                  <Input
                    required={field.required}
                    className={`${
                      field.type === "file" ? "" : "py-6"
                    } mt-3 w-full lg:w-2/4 bg-transparent border-t-0 border-r-0 border-l-0 rounded-none  border-b border-blue-500/50 focus:outline-blue`}
                    type={field.type}
                    placeholder={field.placeholder}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FormUI;
