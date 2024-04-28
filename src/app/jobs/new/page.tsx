
import { Metadata } from "next"
import NewJobForm from "./NewJobForm"

export const metadata: Metadata = {
    title: "Post new job"
}
export default function Page(){

    return (
        <>
            <section className="max-w-3xl mx-auto my-6">
                <NewJobForm />
            </section>
        </>
    )
}