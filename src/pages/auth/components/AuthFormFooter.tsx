import { FC } from 'react'
import { AuthFormState } from './AuthFormState'
import { Button } from '@/shared/components/ui/button'

type Props = {
    formState: AuthFormState
    setFormState: () => void
}

const AuthFormFooter: FC<Props> = ({ formState, setFormState }) => {
    if (formState === AuthFormState.LOGIN) {
        return <span className='text-gray-700 text-sm'>Don't have an accout?<Button variant='link' onClick={setFormState}>Create</Button></span>
    } else {
        return <span className='text-gray-700 text-sm'>Already have an accout?<Button variant='link' onClick={setFormState}>Login</Button></span>
    }
}

export default AuthFormFooter