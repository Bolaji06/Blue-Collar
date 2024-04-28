import clsx from "clsx";

export default function H1(props : React.HTMLProps<HTMLHeadingElement>){

    return (
        <>
            <h1 {...props} className={`${clsx('text-2xl font-bold tracking-tighter', props.className)}`}/>
        </>
    )

}