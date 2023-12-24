import { useState } from "react"
import { AuthFormState } from "./AuthFormState"
import AuthFormHeading from "./AuthFormHeading";
import AuthFormFooter from "./AuthFormFooter";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { formSchema } from "./formSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import AuthFormButton from "./AuthFormButton";
import { useAppSelector } from "@/shared/store/hooks";
import { authApi } from "@/shared/store/services/AuthService";
import { IUser } from "@/entities/user";
import { Navigate } from "react-router-dom";


const AuthForm = () => {
    const [formState, setFormState] = useState(AuthFormState.LOGIN);
    const { user } = useAppSelector(state => state.authReducer)
    const [register] = authApi.useRegisterMutation()
    const [login, {isLoading}] = authApi.useLoginMutation()

    const handleFormState = () => {
        if (formState === AuthFormState.LOGIN) {
            setFormState(AuthFormState.REGISTER)
        } else {
            setFormState(AuthFormState.LOGIN)
        }
    }

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            name: "",
        }
    })

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        if (formState === AuthFormState.LOGIN) {
            login({ email: values.email, password: values.password })
        } else {
            register({ ...values } as IUser)
        }
    }
    if (user) {
        return <Navigate to={'/'} />
    }
    return (
        <div className="bg-card shadow-md rounded-md p-4 w-full md:max-w-xl">
            <AuthFormHeading formState={formState} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} autoComplete="username" placeholder="email@mail.com" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control} name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input disabled={isLoading} autoComplete="password" type="password" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {formState === AuthFormState.REGISTER &&
                        <FormField control={form.control} name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} autoComplete="name" placeholder="Nikolay" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    }
                    <AuthFormButton isLoading={isLoading} formState={formState} />
                </form>
            </Form>
            <AuthFormFooter formState={formState} setFormState={handleFormState} />
        </div>
    )
}

export default AuthForm