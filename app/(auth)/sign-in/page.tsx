'use client'

import {useForm} from "react-hook-form";
import InputField from "@/components/forms/inputField";
import {Button} from "@/components/ui/button";
import FooterLink from "@/components/forms/FooterLink";
import {signInWithEmail} from "@/lib/actions/auth.actions";
import {useRouter} from "next/navigation";
import {toast} from "sonner";

const SignInPage = () => {

    const router = useRouter();

    const {
        register,
        handleSubmit,
        control,
        formState: {errors, isSubmitting},
    } = useForm<SignInFormData>({
        defaultValues:{
            email: '',
            password: ''
        },
        mode: 'onBlur'
    });

    const onSubmit = async (data: SignInFormData) => {
        try{
            const result = await signInWithEmail(data);
            if(result.success) router.push("/");
        }catch(e){
            console.error(e);
            toast.error('Sign In Failed', {
                description: e instanceof Error ? e.message : 'Failed to create an account'
            })
        }
    }

    return (
        <>
            <h1 className="form-title">Log In to Your Account</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <InputField
                name="email"
                label="Email"
                placeholder="contact@johndoe.com"
                register={register}
                error={errors.email}
                validation={{required: 'Email is required', pattern: /^\w+@\w+\.\w+$/, message: 'Email is required' }}
            />

            <InputField
                name="password"
                label="Password"
                placeholder="Enter a strong password"
                type="password"
                register={register}
                error={errors.password}
                validation={{required: 'Password is required', minLength: 8}}
            />

            <Button type="submit" disabled={isSubmitting} className="yellow-btn w-full mt-5">
                {isSubmitting ? 'Logging In' : 'Log In'}
            </Button>
            <FooterLink text="Don't have an account ?" linkText="Sign Up" href="/sign-up" />
            </form>
        </>
    )
}
export default SignInPage
