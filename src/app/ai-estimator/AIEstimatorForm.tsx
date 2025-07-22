'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { handleEstimateScore } from './actions';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Skeleton } from '@/components/ui/skeleton';
import { Bot, Lightbulb } from 'lucide-react';

const formSchema = z.object({
  playerHistory: z.string().min(10, 'Please provide more detail about the player\'s history.'),
  holeDifficulty: z.enum(['Easy', 'Medium', 'Hard']),
  weather: z.enum(['Sunny', 'Cloudy', 'Rainy', 'Windy']),
});

type FormValues = z.infer<typeof formSchema>;
type AIResponse = { estimatedScore: number; reasoning: string } | null;

export function AIEstimatorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState<AIResponse>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      playerHistory: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    setAiResponse(null);
    try {
      const response = await handleEstimateScore(values);
      setAiResponse(response);
    } catch (error) {
      console.error('Error estimating score:', error);
      // Here you could use a toast to show an error message
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <Card>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl">
                <Bot className="h-6 w-6 text-primary" />
                AI Score Estimator
              </CardTitle>
              <CardDescription>
                Fill in the details below and our AI will estimate the golfer's score for a single hole.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="playerHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Player's Historical Performance</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., Averages par on most courses, struggles with long irons, strong putter..."
                        className="min-h-[100px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="holeDifficulty"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Hole Difficulty</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select difficulty" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Easy">Easy</SelectItem>
                          <SelectItem value="Medium">Medium</SelectItem>
                          <SelectItem value="Hard">Hard</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="weather"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Weather Conditions</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select weather" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Sunny">Sunny</SelectItem>
                          <SelectItem value="Cloudy">Cloudy</SelectItem>
                          <SelectItem value="Rainy">Rainy</SelectItem>
                          <SelectItem value="Windy">Windy</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? 'Estimating...' : 'Estimate Score'}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {isLoading && <ResultSkeleton />}
      
      {aiResponse && (
        <Card className="bg-secondary/50 animate-in fade-in duration-500">
          <CardHeader>
            <CardTitle className="text-xl">AI Estimation Result</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-muted-foreground">Estimated Score</p>
              <p className="text-6xl font-bold text-primary">{aiResponse.estimatedScore}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold flex items-center gap-2"><Lightbulb className="h-4 w-4 text-primary" />Reasoning</h4>
              <p className="text-muted-foreground p-4 bg-background/50 rounded-md border">{aiResponse.reasoning}</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

function ResultSkeleton() {
    return (
        <Card className="bg-secondary/50">
            <CardHeader>
                <Skeleton className="h-7 w-48" />
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                    <Skeleton className="h-5 w-32 mx-auto" />
                    <Skeleton className="h-16 w-24 mx-auto" />
                </div>
                <div className="space-y-2">
                    <Skeleton className="h-6 w-24" />
                    <Skeleton className="h-24 w-full" />
                </div>
            </CardContent>
        </Card>
    );
}
