import { Button } from "@/shared/components/ui/button";
import Spinner from "@/shared/components/ui/spinner";
import { FC, ReactNode } from "react";

interface Props {
    children: ReactNode,
    loading: boolean,
    onClick: () => void,
    variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link',
    size?: 'default' | 'sm' | 'lg' | 'icon'
}
const LoadingButton: FC<Props> = ({ children, loading, onClick, variant, size }) => {

    return (
        <Button disabled={loading} type='button' onClick={onClick} variant={variant} size={size}>
            {loading
                ? <Spinner />
                : children
            }
        </Button>
    )
}

export default LoadingButton;
