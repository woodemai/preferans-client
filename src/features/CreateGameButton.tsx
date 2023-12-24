import { Button } from "@/shared/components/ui/button"
import Spinner from "@/shared/components/ui/spinner";
import { useAppSelector } from "@/shared/store/hooks"
import { gameApi } from "@/shared/store/services/GameService";

const CreateGameButton = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const [create, { isLoading }] = gameApi.useCreateGameMutation()
    if (user) {
        return (
            <Button disabled={isLoading} type="button" size='lg' onClick={() => create(user.id)}>{isLoading && <Spinner />}Create game</Button>
        )
    }
}

export default CreateGameButton