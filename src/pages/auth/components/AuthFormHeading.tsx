import { FC, memo } from 'react'
import { AuthFormState } from './AuthFormState'

type Props = {
    formState: AuthFormState
}

const AuthFormHeading: FC<Props> = memo(({ formState }) => {
    if (formState === AuthFormState.LOGIN) {
        return <h2 className='text-xl font-semibold mb-4'>Войти в аккаунт</h2>
    } else {
        return <h2 className='text-xl font-semibold mb-4'>Создать аккаунт</h2>
    }
})

export default AuthFormHeading