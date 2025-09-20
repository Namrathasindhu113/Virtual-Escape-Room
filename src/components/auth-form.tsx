
'use client';

import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2, LogIn, UserPlus } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { signUpWithEmail, signInWithEmail } from '@/lib/auth-service';

const signUpSchema = z.object({
  displayName: z.string().min(3, { message: 'Name must be at least 3 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

const signInSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string(),
});

export function AuthForm() {
  const [isLoginView, setIsLoginView] = React.useState(true);
  const [isLoading, setIsLoading] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(isLoginView ? signInSchema : signUpSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  const onSignUpSubmit = async (values: z.infer<typeof signUpSchema>) => {
    setIsLoading(true);
    try {
      const result = await signUpWithEmail(values.email, values.password, values.displayName);
      if (result.user) {
        toast({
          title: 'Account Created!',
          description: 'You have been successfully signed up.',
        });
        router.push('/');
      } else if (result.error) {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign Up Failed',
        description: error.message || 'An unexpected error occurred. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const onSignInSubmit = async (values: z.infer<typeof signInSchema>) => {
    setIsLoading(true);
    try {
      const result = await signInWithEmail(values.email, values.password);
      if (result.user) {
        toast({
          title: 'Signed In!',
          description: 'You have been successfully signed in.',
        });
        router.push('/');
      } else if (result.error) {
        throw new Error(result.error);
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: error.message || 'Invalid credentials. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const toggleView = () => {
    setIsLoginView(!isLoginView);
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-3xl font-headline text-primary">
          {isLoginView ? 'Welcome Back' : 'Create Your Account'}
        </CardTitle>
        <CardDescription>
          {isLoginView
            ? 'Sign in to continue building and playing.'
            : 'Join the community and start creating today!'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(isLoginView ? onSignInSubmit : onSignUpSubmit)}
            className="space-y-6"
          >
            {!isLoginView && (
              <FormField
                control={form.control}
                name="displayName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Your Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="you@example.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="••••••••" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : isLoginView ? (
                <LogIn className="mr-2 h-4 w-4" />
              ) : (
                <UserPlus className="mr-2 h-4 w-4" />
              )}
              {isLoginView ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>
        </Form>
        <p className="mt-6 text-center text-sm text-muted-foreground">
          {isLoginView ? "Don't have an account?" : 'Already have an account?'}
          <Button variant="link" onClick={toggleView} className="p-1">
            {isLoginView ? 'Sign Up' : 'Sign In'}
          </Button>
        </p>
      </CardContent>
    </Card>
  );
}
