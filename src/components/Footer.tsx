import { footerLinks } from "@/lib/links"
import H1 from "./ui/h1"
import Link from "next/link"

export default function Footer(){

    return (
        <>
            <footer className="max-w-5xl mx-auto mb-10">
                <div className="flex items-center justify-between">
                    <div className="space-y-2">
                        <H1 className="text-blue-950">
                            Blue Collar
                        </H1>
                        <p className="text-muted-foreground text-base">No experience should go to waste</p>
                    </div>

                    <div className="flex items-center gap-3 text-muted-foreground text-sm">
                        {
                            footerLinks.map(link => (
                                <Link
                                key={link.href}
                                href={link.href}>
                                    {link.name}
                                </Link>
                            ))
                        }

                    </div>

                </div>
                <div className="mt-6 text-center text-muted-foreground text-sm">
                    <p>&copy;2024 Blue Collar Inc. All right reserved</p>
                </div>
            </footer>
        </>
    )
}