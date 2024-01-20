import { useAppSelector } from "@/shared/store/hooks"
import { gameApi } from "@/shared/store/services/GameService";
import { useNavigate } from "react-router-dom";
import LoadingButton from "./LoadingButton";

const CreateGameButton = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const [create, {data, isLoading, isSuccess}] = gameApi.useCreateGameMutation()
    const navigate = useNavigate()

    if (user) {
        const handleCreate = async () => {
            try {
                await create(user.id)
                if (data && isSuccess) {
                    navigate(`/game/${data.id}`)

                }

            } catch (error) {
                console.log(error);

            }
        }
        return (<LoadingButton loading={isLoading} size="lg" onClick={handleCreate}>Create game</LoadingButton>)
    }
}

export default CreateGameButton