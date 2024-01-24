import { Button, ButtonProps } from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import { cn } from "@/shared/lib/utils";
import { FC } from "react";

interface Props extends ButtonProps {loading: boolean}


const LoadingButton: FC<Props> = ({ children, loading, onClick, variant, size, className }) => {

    return (
        <Button className={cn('transition-all duration-200', className)}   disabled={loading} type='button' onClick={onClick} variant={variant} size={size}>
            {loading
                ? <Spinner />
                : children
            }
        </Button>
    )
}

export default LoadingButton;
