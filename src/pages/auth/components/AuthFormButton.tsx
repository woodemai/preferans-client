import { FC } from 'react'
import { AuthFormState } from './AuthFormState'
import { Button } from '@/shared/components/ui/button'
import Spinner from '@/shared/components/ui/spinner'

type Props = {
    formState: AuthFormState,
    isLoading?: boolean
}
const AuthFormButton: FC<Props> = ({ formState, isLoading }) => {
    if (formState === AuthFormState.LOGIN) {
        return <Button disabled={isLoading}>{isLoading && <Spinner />}Войти</Button>
    } else {
        return <Button disabled={isLoading}>{isLoading && <Spinner />}Создать</Button>
    }
}

export default AuthFormButton