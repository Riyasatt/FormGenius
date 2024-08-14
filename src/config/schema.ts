import {  boolean, date, integer, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";




export const form = pgTable('forms',{
    id : serial('id').primaryKey(),
    prompt : varchar('prompt').notNull(),
    jsonForms : text('jsonForms').notNull(),
    createdBy : varchar('createdBy'),
    createdOn : varchar('createdAt').notNull(),
    createdTime : varchar('createdTime').notNull(),
    integrated : boolean('integrated').notNull().default(false),
    googleLink : varchar('googleLink').notNull().default('NOT GENERATED'),
    googleFormId : varchar('googleFormId').notNull().default('NOT GENERATED')

})

export const userResponses = pgTable('userResponses',{
    id : serial('id').primaryKey(),
    response : varchar('response').notNull(),
    responseAt : varchar('responseAt').notNull(),
    formId : integer('formId').notNull().references(()=> form.id),
    responseBy : varchar('ResponseBy').notNull().default('Anonymous')
})


