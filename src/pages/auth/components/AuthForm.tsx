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
import { authApi } from "@/shared/store/services/AuthService";
import { IUser } from "@/entities/user";


const AuthForm = () => {
    const [formState, setFormState] = useState(AuthFormState.LOGIN);
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
 
    return (
        <div className="bg-card shadow-md rounded-md p-4 w-full md:max-w-xl">
            <AuthFormHeading formState={formState} />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
                    <FormField control={form.control} name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Почта</FormLabel>
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
                                <FormLabel>Пароль</FormLabel>
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
                                    <FormLabel>Имя</FormLabel>
                                    <FormControl>
                                        <Input disabled={isLoading} autoComplete="name" placeholder="Николай" {...field} />
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