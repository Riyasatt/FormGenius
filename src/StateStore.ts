import {create} from 'zustand'
import { form,fields } from './lib/types'




interface stateStore {
    isSideNav : boolean,
    setIsSideNav : (isSideNav : boolean) => void,
    formPrompt : string,
    setFormPrompt : (formPrompt : string) => void,
    username : string,
    setUsername : (username : string) => void,
    jsonForm : form,
    setJsonForm : (jsonForm : form) => void,
    previewForm : form,
    setPreviewForm : (previewForm : form) => void

}

export const useStateStore = create<stateStore>((set)=>({
    isSideNav :false,
    setIsSideNav : (isSideNav : boolean)=> set({isSideNav}),
    formPrompt : "",
    setFormPrompt : (formPrompt : string) => set({formPrompt}),
    username : "",
    setUsername : (username : string) => set({username}),
    jsonForm : {title : "", description : "",fields:[{name:""}]},
    setJsonForm: (jsonForm :form) => set({jsonForm}),
    previewForm : {title : "", description : "",fields:[{name:""}]},
    setPreviewForm: (previewForm :form) => set({previewForm})
    })
)