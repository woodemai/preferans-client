import AuthForm from "./components/AuthForm"

const AuthPage = () => {
  return (
    <div className="w-full h-screen flex flex-col gap-y-8 justify-center items-center">
        <h1 className="text-3xl font-bold">Preferans the Game</h1>
        <AuthForm/>
    </div>
  )
}

export default AuthPage