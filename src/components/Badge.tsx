
interface BadgeProps {
    children: React.ReactNode,
}
export default function Badge({ children }: BadgeProps){

    return(
        <>
            <span className="rounded border bg-muted text-sm font-medium text-muted-foreground px-2 py-0.5">
                { children }
            </span>
        </>
    )
}