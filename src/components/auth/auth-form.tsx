
"use client"

import * as React from "react"
import { useSearchParams, useRouter } from 'next/navigation'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { Loader2 } from "lucide-react"
import { Separator } from "../ui/separator"
import { signUpWithEmail, signInWithEmail, signInWithGoogle } from "@/lib/auth-service"


const signUpSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
});

const signInSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

type SignUpFormValues = z.infer<typeof signUpSchema>;
type SignInFormValues = z.infer<typeof signInSchema>;


export function AuthForm() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { toast } = useToast()
  
  const mode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  const redirectUrl = searchParams.get('redirect') || '/';

  const [isLoading, setIsLoading] = React.useState(false)

  const signInForm = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  const signUpForm = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { name: "", email: "", password: "" },
  });

  const handleAuthSuccess = () => {
    router.push(redirectUrl);
    toast({
        title: `Successfully ${mode === 'signup' ? 'signed up' : 'signed in'}!`,
        description: `Welcome to Room Forge!`,
    });
  }

  const handleAuthError = (error: any) => {
    console.error("Authentication error:", error);
    let description = "An unexpected error occurred. Please try again.";
    if (error.code) {
        switch (error.code) {
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                description = 'Invalid email or password.';
                break;
            case 'auth/email-already-in-use':
                description = 'An account with this email already exists.';
                break;
            case 'auth/weak-password':
                description = 'The password is too weak.';
                break;
            case 'auth/popup-closed-by-user':
                description = 'Google sign-in was cancelled.';
                break;
            default:
                description = error.message;
        }
    }
    toast({
      variant: "destructive",
      title: "Authentication Failed",
      description,
    });
  }

  async function onSignInSubmit(data: SignInFormValues) {
    setIsLoading(true)
    try {
      await signInWithEmail(data.email, data.password);
      handleAuthSuccess();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false)
    }
  }
  
  async function onSignUpSubmit(data: SignUpFormValues) {
    setIsLoading(true)
    try {
      await signUpWithEmail(data.email, data.password, data.name);
      handleAuthSuccess();
    } catch (error) {
      handleAuthError(error);
    } finally {
      setIsLoading(false)
    }
  }

  async function onGoogleSignIn() {
    setIsLoading(true);
    try {
        await signInWithGoogle();
        handleAuthSuccess();
    } catch (error) {
        handleAuthError(error);
    } finally {
        setIsLoading(false);
    }
  }

  const toggleMode = () => {
    const newMode = mode === 'signin' ? 'signup' : 'signin';
    router.push(`/auth?mode=${newMode}&redirect=${redirectUrl}`);
  };

  return (
    <div className={cn("grid gap-6")}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {mode === 'signup' ? 'Create an account' : 'Sign in to your account'}
        </h1>
        <p className="text-sm text-muted-foreground">
            {mode === 'signup' 
                ? 'Enter your details below to create your account'
                : 'Enter your email and password to sign in'
            }
        </p>
      </div>

      {mode === 'signin' ? (
        <form onSubmit={signInForm.handleSubmit(onSignInSubmit)}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                placeholder="name@example.com"
                type="email"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                disabled={isLoading}
                {...signInForm.register("email")}
              />
              {signInForm.formState.errors.email && <p className="text-sm text-destructive">{signInForm.formState.errors.email.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input 
                id="password" 
                type="password"
                disabled={isLoading}
                {...signInForm.register("password")}
               />
               {signInForm.formState.errors.password && <p className="text-sm text-destructive">{signInForm.formState.errors.password.message}</p>}
            </div>
            <Button disabled={isLoading}>
              {isLoading && (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              )}
              Sign In
            </Button>
          </div>
        </form>
      ) : (
        <form onSubmit={signUpForm.handleSubmit(onSignUpSubmit)}>
        <div className="grid gap-4">
          <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                type="text"
                autoCapitalize="words"
                autoCorrect="off"
                disabled={isLoading}
                {...signUpForm.register("name")}
              />
              {signUpForm.formState.errors.name && <p className="text-sm text-destructive">{signUpForm.formState.errors.name.message}</p>}
            </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="name@example.com"
              type="email"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              disabled={isLoading}
              {...signUpForm.register("email")}
            />
            {signUpForm.formState.errors.email && <p className="text-sm text-destructive">{signUpForm.formState.errors.email.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input 
                id="password" 
                type="password"
                disabled={isLoading}
                {...signUpForm.register("password")}
            />
            {signUpForm.formState.errors.password && <p className="text-sm text-destructive">{signUpForm.formState.errors.password.message}</p>}
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Sign Up
          </Button>
        </div>
      </form>
      )}
      
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
      <Button variant="outline" type="button" disabled={isLoading} onClick={onGoogleSignIn}>
        {isLoading ? (
          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24"><path fill="currentColor" d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12.5C5,8.75 8.36,5.73 12.19,5.73C15.22,5.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2.5 12.19,2.5C6.42,2.5 2,7.2 2,12.5C2,17.8 6.42,22.5 12.19,22.5C18.1,22.5 22,18.12 22,12.73C22,11.77 21.75,11.1 21.35,11.1Z"></path></svg>
        )}{" "}
        Google
      </Button>

      <p className="px-8 text-center text-sm text-muted-foreground">
        {mode === 'signin'
          ? "Don't have an account? "
          : 'Already have an account? '}
        <button onClick={toggleMode} className="underline underline-offset-4 hover:text-primary">
          {mode === 'signin' ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  )
}
