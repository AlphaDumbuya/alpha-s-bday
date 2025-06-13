
// src/components/custom/AIMessageGenerator.tsx
"use client";

import type { RefObject } from 'react';
import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { generateBirthdayMessage, type GenerateBirthdayMessageInput } from '@/ai/flows/generate-birthday-message';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const formSchema = z.object({
  userInput: z.string().min(10, { message: "Please share a bit more about your feelings (at least 10 characters)." }).max(500, {message: "Input is too long (max 500 characters)."}),
});

type FormValues = z.infer<typeof formSchema>;

interface AIMessageGeneratorProps {
  onMessageGenerated: (message: string) => void;
  onGenerationCompleteScrollToRef?: RefObject<HTMLDivElement>;
}

const AIMessageGenerator: React.FC<AIMessageGeneratorProps> = ({ onMessageGenerated, onGenerationCompleteScrollToRef }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userInput: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = async (values) => {
    setIsLoading(true);
    try {
      const aiInput: GenerateBirthdayMessageInput = { userInput: values.userInput };
      const result = await generateBirthdayMessage(aiInput);
      onMessageGenerated(result.message);
      toast({
        title: "Message Generated!",
        description: "Your personalized birthday message is ready.",
      });
      // form.reset(); // Optionally reset form
      if (onGenerationCompleteScrollToRef?.current) {
        onGenerationCompleteScrollToRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    } catch (error) {
      console.error("Error generating message:", error);
      let errorMessage = "Failed to generate birthday message. Please try again.";
      if (error instanceof Error) {
        errorMessage = error.message;
      }
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full shadow-xl bg-card/80 backdrop-blur-sm card-glow">
      <CardHeader>
        <CardTitle className="font-headline text-2xl flex items-center">
          <Wand2 className="mr-2 h-6 w-6 text-accent icon-glow" />
          Craft a Special Message
        </CardTitle>
        <CardDescription className="font-body">
          Describe your feelings of joy and gratitude. Our AI will help you write a heartfelt birthday message for Alpha!
        </CardDescription>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent>
            <FormField
              control={form.control}
              name="userInput"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="font-body text-foreground/80">Your feelings & thoughts:</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., 'So happy for Alpha's birthday! Wishing all the best...'"
                      className="resize-none bg-input focus:ring-accent font-body"
                      rows={5}
                      {...field}
                      aria-describedby="userInput-description userInput-message"
                    />
                  </FormControl>
                  <FormDescription id="userInput-description" className="font-body text-muted-foreground">
                    The AI will use this to personalize the message.
                  </FormDescription>
                  <FormMessage id="userInput-message" />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter>
            <Button 
              type="submit" 
              disabled={isLoading} 
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 focus:ring-accent font-headline"
              aria-live="polite"
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Message
                </>
              )}
            </Button>
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};

export default AIMessageGenerator;
