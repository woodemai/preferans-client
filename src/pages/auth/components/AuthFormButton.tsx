import { FC } from 'react'
import { AuthFormState } from './AuthFormState'
import { Button } from '@/shared/components/ui/button'

type Props = {
    formState: AuthFormState
}
const AuthFormButton: FC<Props> = ({ formState }) => {
    if (formState === AuthFormState.LOGIN) {
        return <Button>Войти</Button>
    } else {
        return <Button>Создать</Button>
    }
}

export default AuthFormButton