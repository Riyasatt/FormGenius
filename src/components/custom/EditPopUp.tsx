"use client";

import React, { useEffect, useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Pencil } from "lucide-react";
import { fields } from "@/lib/types";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useStateStore } from "@/StateStore";
import { useToast } from "../ui/use-toast";

const EditPopUp = ({
  field,
  title,
  description,
  index,
  options,
}: {
  field?: fields;
  title?: string;
  description?: string;
  index: number;
  options?: [{ value?: string; label?: string }];
}) => {
  const { jsonForm, setJsonForm } = useStateStore();
  const [openDialog, setOpenDialog] = useState(false);
  const [fieldSchema, setFieldSchema] = useState<z.ZodObject<any>>(
    z.object({
      Label: z.string().min(4, {
        message: "Label must be at least 4 characters.",
      }),
      placeholder: z.string().optional(),
      required: z.boolean(),
    })
  );

  const {toast} = useToast()

  let editFormSchemaFields = z.object({
    Label: z.string().min(4, {
      message: "Label must be at least 4 characters.",
    }),
    placeholder: z.string().optional(),
    required: z.boolean(),
  });

  const editFormSchemaTitle = z.object({
    title: z.string().min(4, {
      message: "Title must be at least 4 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
  });

  let newSchema = z.object({});

  useEffect(() => {
    if (options !== undefined) {
      options.forEach((option) => {
        let fieldSchema: z.ZodSchema<any>;
        fieldSchema = z.string().default(`${option.label}`);

        newSchema = newSchema.extend({
          [String(option.value)]: fieldSchema,
        });
      });
      newSchema = fieldSchema.merge(newSchema);
      setFieldSchema(newSchema);
    }
  }, []);

  const fieldForm = useForm<z.infer<typeof fieldSchema>>({
    resolver: zodResolver(fieldSchema),
    defaultValues: {
      Label: field?.label,
      placeholder: field?.placeholder,
      required: field?.required,
    },
  });

  const titleForm = useForm<z.infer<typeof editFormSchemaTitle>>({
    resolver: zodResolver(editFormSchemaTitle),
    defaultValues: {
      title: title,
      description: description,
    },
  });

  function onSubmitFieldForm(values: z.infer<typeof fieldSchema>) {
    jsonForm.fields[index].label = values.Label;
    jsonForm.fields[index].required = values.required;
    jsonForm.fields[index].placeholder = values.placeholder;
    jsonForm.fields[index].name = values.Label.replace(/\s/g, "").toLowerCase();
    if (field?.options) {
      field.options.forEach((opt, key) => {
        const label = opt.label;
        const value = opt.value;
        const option = jsonForm.fields?.[index]?.options?.[key];
        if (option) {
          option.label = values[value];
          option.value = values[value].replace(/\s/g, "").toLowerCase();
        }
      });
    }
    toast({
      variant: 'success',
      title : "Updated"
    })
    setOpenDialog(false);
    setJsonForm(jsonForm);
  }

  function onSubmitTitleForm(values: z.infer<typeof editFormSchemaTitle>) {
    (jsonForm.title = values.title),
      (jsonForm.description = values.description);

      toast({
        variant: 'success',
        title : "Updated"
      })

    setOpenDialog(false);
    setJsonForm(jsonForm);
  }

  return (
    <Popover open={openDialog}>
      <PopoverTrigger asChild>
        <Button
          onClick={() => setOpenDialog(!openDialog)}
          variant="outline"
          size="sm"
          className=" text-white/80 px-3 gap-x-2 py-1 rounded-lg bg-white/20 border flex items-center"
        >
          <Pencil className="w-[15px] md:w-[20px]" /> edit
        </Button>
      </PopoverTrigger>
      <PopoverContent className=" md:w-96">
        {field ? (
          <Form {...fieldForm}>
            <form
              onSubmit={fieldForm.handleSubmit(onSubmitFieldForm)}
              className="space-y-8"
            >
              <FormField
                control={fieldForm.control}
                name="Label"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extrabold text-blue-500">
                      Label
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="label" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {field.placeholder && (
                <FormField
                  control={fieldForm.control}
                  name="placeholder"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-extrabold text-blue-500">
                        Placeholder
                      </FormLabel>
                      <FormControl>
                        <Input placeholder="placeholder" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {field.options && (
                <div>
                  <FormLabel className="font-extrabold text-blue-500">
                    Options
                  </FormLabel>
                  <div className="flex flex-wrap gap-2 mt-3 ">
                    {field.options.map((option, index) => {
                      return (
                        <FormField
                          control={fieldForm.control}
                          name={option.value}
                          key={index}
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <Input
                                  className="w-[100px]"
                                  defaultValue={option.label}
                                  placeholder={`option ${index + 1}`}
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      );
                    })}
                  </div>
                </div>
              )}

              <FormField
                control={fieldForm.control}
                name="required"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="relative -top-1 mr-4 font-extrabold text-blue-500">
                      Required :
                    </FormLabel>
                    <FormControl>
                      <Switch
                        className=" "
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-btn text-white" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        ) : (
          <Form {...titleForm}>
            <form
              onSubmit={titleForm.handleSubmit(onSubmitTitleForm)}
              className="space-y-8"
            >
              <FormField
                control={titleForm.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extrabold text-blue-500">
                      Title
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={titleForm.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-extrabold text-blue-500">
                      Description
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="description" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button className="bg-btn text-white" type="submit">
                Submit
              </Button>
            </form>
          </Form>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default EditPopUp;
