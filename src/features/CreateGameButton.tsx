import { Button } from "@/shared/components/ui/button"
import Spinner from "@/shared/components/ui/spinner";
import { useAppDispatch, useAppSelector } from "@/shared/store/hooks"
import { gameSlice } from "@/shared/store/reducers/GameSlice";
import { gameApi } from "@/shared/store/services/GameService";
import { useNavigate } from "react-router-dom";

const CreateGameButton = () => {
    const { user } = useAppSelector(state => state.authReducer);
    const dispatch = useAppDispatch()
    const [create, { isLoading }] = gameApi.useCreateGameMutation()
    const navigate = useNavigate()
    
    if (user) {
        const handleCreate = async () => {
            try {
                create(user.id)
                navigate(`/game/${res.data.id}`)
            } catch (error) {
                console.log(error);
                
            }
        }

        return (
            <Button  type="button" size='lg' onClick={handleCreate}>{isLoading && <Spinner />}Create game</Button>
        )
    }
}

export default CreateGameButton