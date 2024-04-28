"use client";

import { cn } from "@/lib/utils"
import { Loader2 } from "lucide-react";
import React from "react"
import { useFormStatus } from "react-dom";

export interface FormButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement>{}

export default React.forwardRef<HTMLButtonElement, FormButtonProps>(function FormButton({type, children, className, ...props}, ref) {
   const { pending } = useFormStatus();

    return (
        <>
            <button type="submit" className={cn('bg-blue-950 rounded-md py-2 px-6 disabled:bg-opacity-60', className)} 
               {...props} disabled={props.disabled || pending}>

               <span className="flex justify-center items-center gap-3">
               { pending && <Loader2 size={16} color="white" className="animate-spin"/> }
                { children }
               </span>

            </button>
        </>
    )
})