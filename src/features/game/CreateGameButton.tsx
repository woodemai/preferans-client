import { useAppSelector } from "@/shared/store/hooks"
import { gameApi } from "@/shared/store/services/GameService";
import { useNavigate } from "react-router-dom";
import LoadingButton from "../user/LoadingButton";
import { memo, useEffect } from "react";


const CreateGameButton = memo(() => {
    const { user } = useAppSelector(state => state.authReducer);
    const [create, { data, isLoading }] = gameApi.useCreateGameMutation()
    const navigate = useNavigate()

    useEffect(() => {
        if (data) {
            navigate(`/game/${data.id}`)
        }
    }, [data, navigate])
    
    if (user.id) {
        const handleCreate = async () => {
            await create(user.id)
        }
        return (<LoadingButton loading={isLoading} size="lg" onClick={handleCreate}>Создать игру</LoadingButton>)
    }
})

export default CreateGameButton