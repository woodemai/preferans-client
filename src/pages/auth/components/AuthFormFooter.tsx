import { FC } from 'react'
import { AuthFormState } from './AuthFormState'
import { Button } from '@/shared/components/ui/button'

type Props = {
    formState: AuthFormState
    setFormState: () => void
}

const AuthFormFooter: FC<Props> = ({ formState, setFormState }) => {
    if (formState === AuthFormState.LOGIN) {
        return <span className='text-gray-700 text-sm'>Нет аккаунта?<Button variant='link' onClick={setFormState}>Создать</Button></span>
    } else {
        return <span className='text-gray-700 text-sm'>Есть аккаунт?<Button variant='link' onClick={setFormState}>Войти</Button></span>
    }
}

export default AuthFormFooter