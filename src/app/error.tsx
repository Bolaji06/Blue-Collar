"use client"

import H1 from "@/components/ui/h1"

export default function ErrorPage(){

    return (
        <>
            <main className="py-5 mx-auto max-w-5xl text-center space-y-3">
                <H1 className="text-5xl text-foreground">Error</H1>
                <p>Please try Again</p>

            </main>
        </>
    )
}