'use client';

import clsx from "clsx";
import dynamic from "next/dynamic";
import { forwardRef } from "react";
import { EditorProps } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

// using next dynamic import to import the Editor
const Editor = dynamic(() => import('react-draft-wysiwyg').then((mod) => mod.Editor), 
{ssr: false})

export default forwardRef<Object, EditorProps>(function RichTextEditor(props, ref){
    return (
        <Editor
        editorClassName={clsx(`min-h-[150px] px-2 border rounded-md focus-within:outline-none 
        focus-within:ring-2 ring-offset-background cursor-text focus-within:ring-ring focus-within:ring-offset-2`, props.editorClassName)}
        {...props}
        toolbar={{
            options: ['inline', 'list', 'link', 'history'],
            inline: {
               options: ['bold', 'italic', 'underline']
            }
        }}
        editorRef={(r)=>{
            if (typeof ref === 'function'){
                ref(r)
            }else if (ref){
                ref.current = r
            }
        }}
      />
    )
})