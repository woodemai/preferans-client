import Spinner from "@/shared/components/ui/spinner";

const GameLoadingState = ({ isLoading }: { isLoading: boolean }) => {

    if (isLoading) {
        return <div className="flex justify-center items-center w-full h-screen"><Spinner size={24} /></div>
    }
}

export default GameLoadingState;