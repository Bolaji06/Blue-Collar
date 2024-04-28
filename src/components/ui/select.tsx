import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

export default React.forwardRef<HTMLSelectElement,
 React.HTMLProps<HTMLSelectElement>> 
 (function Select({ className, ...props }: React.HTMLProps<HTMLSelectElement>, ref){
  return (
    <>
      <div className="relative w-full">
        <select
          className={cn(
            `h-10 w-full appearance-none truncate rounded-lg  border border-input
            bg-background pl-3 pr-8 text-sm ring-offset-background focus:outline-none
            focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed
            disabled:opacity-50`,
            className,
          )}
          {...props}
        />
        <ChevronDown size={18}  className="absolute text-muted-foreground right-3 top-2"/>
      </div>
    </>
  );
});
