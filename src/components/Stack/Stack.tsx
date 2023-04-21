import clx from "clsx";
import css from "./stack.module.css";
import { HTMLAttributes, ReactNode } from "react";

export type Stack = {
    f?: boolean;
    p?: boolean;
    v?: boolean;
    h?: boolean;
    s?: boolean;
    sm?: boolean;
    md?: boolean;
    lg?: boolean;
    ps?: boolean;
    pm?: boolean;
    pl?: boolean;
    rs?: boolean;
    vh?: boolean;
    start?: boolean;
    stretch?: boolean;
    className?: string;
    children?: ReactNode;
} & HTMLAttributes<HTMLDivElement>

export function Stack({ children, className = "", ...props }: Stack) {
    return <div className={clx([css.stack, className], {
        [css.f]: props.f,
        [css.v]: props.v,
        [css.h]: props.h,
        [css.sm]: props.sm,
        [css.md]: props.md,
        [css.lg]: props.lg,
        [css.ps]: props.ps,
        [css.pm]: props.pm,
        [css.pl]: props.pl,
        [css.rs]: props.rs,
        [css.vh]: props.vh,
        [css.start]: props.start,
        [css.stretch]: props.stretch,
    })}>{children}</div>
}