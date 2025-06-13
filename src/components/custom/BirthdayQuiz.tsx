
// src/components/custom/BirthdayQuiz.tsx
"use client";

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Award, RotateCcw, Lightbulb } from 'lucide-react';

interface QuizQuestion {
  id: number;
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
  jokeExplanation?: string; // Optional explanation for the "correct" joke answer
}

const quizQuestionsData: QuizQuestion[] = [
  {
    id: 1,
    questionText: "What's Alpha's absolute FAVORITE food (that they'd eat for breakfast, lunch, and dinner)?",
    options: [
      { text: "A giant bowl of... spaghetti code", isCorrect: false },
      { text: "Anything, as long as it's delivered so they don't stop coding", isCorrect: true },
      { text: "A perfectly optimized algorithm salad", isCorrect: false },
      { text: "Pizza, with extra pineapple (the ultimate test of friendship!)", isCorrect: false },
    ],
    jokeExplanation: "Because focus is everything! (And maybe a little bit of laziness for cooking)."
  },
  {
    id: 2,
    questionText: "If Alpha had a dollar for every time they said \"Just one more line of code...\", they would:",
    options: [
      { text: "Own a small country by now", isCorrect: true },
      { text: "Still be broke, because they'd spend it all on new keyboards", isCorrect: false },
      { text: "Fund a mission to Mars, coded entirely in Python", isCorrect: false },
      { text: "Say 'Hmm, let me debug that financial model.'", isCorrect: false },
    ],
    jokeExplanation: "We all know that 'one more line' is never just one!"
  },
  {
    id: 3,
    questionText: "Alpha's spirit animal is most likely:",
    options: [
      { text: "An owl (wise and definitely works at night)", isCorrect: false },
      { text: "A caffeinated squirrel (energetic and always multitasking)", isCorrect: false },
      { text: "A rubber duck (essential for debugging complex life problems)", isCorrect: true },
      { text: "A compiler (always finding faults, but ultimately helpful)", isCorrect: false },
    ],
    jokeExplanation: "Because who doesn't talk through their problems with a rubber duck?"
  },
  {
    id: 4,
    questionText: "What does Alpha *really* mean when they say 'It's compiling'?",
    options: [
      { text: "It's actually compiling, be patient!", isCorrect: false },
      { text: "Time for a quick 15-minute coffee break that turns into an hour.", isCorrect: true },
      { text: "I have no idea if this will work, let's pray.", isCorrect: false },
      { text: "I'm secretly watching cat videos.", isCorrect: false },
    ],
    jokeExplanation: "The sacred ritual of the 'compilation break' must be respected."
  },
];

const BirthdayQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    setShuffledQuestions(quizQuestionsData.sort(() => Math.random() - 0.5).map(q => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5)
    })));
  }, []);


  const handleAnswerSelection = (optionIndex: number) => {
    if (showFeedback) return; // Prevent changing answer after feedback is shown

    setSelectedAnswer(optionIndex);
    setShowFeedback(true);

    if (shuffledQuestions[currentQuestionIndex].options[optionIndex].isCorrect) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    setShowFeedback(false);
    setSelectedAnswer(null);
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setIsQuizFinished(false);
    setShuffledQuestions(quizQuestionsData.sort(() => Math.random() - 0.5).map(q => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5)
    })));
  };

  if (!shuffledQuestions.length) {
    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl bg-card/80 backdrop-blur-sm card-glow">
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Loading Quiz...</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Getting the fun ready!</p>
        </CardContent>
      </Card>
    );
  }

  if (isQuizFinished) {
    let resultMessage = "Good effort!";
    if (score === shuffledQuestions.length) {
      resultMessage = "Wow! You know Alpha like the back of your hand! (Or you're Alpha!)";
    } else if (score >= shuffledQuestions.length * 0.75) {
      resultMessage = "Excellent! You're practically Alpha's biographer!";
    } else if (score >= shuffledQuestions.length * 0.5) {
      resultMessage = "Not bad! You've definitely shared some laughs with Alpha!";
    } else {
      resultMessage = "Hmm, maybe spend more time with Alpha? (Or just enjoy the cake!)";
    }

    return (
      <Card className="w-full max-w-lg mx-auto shadow-xl bg-card/80 backdrop-blur-sm card-glow text-center">
        <CardHeader>
          <CardTitle className="font-headline text-3xl flex items-center justify-center">
            <Award className="mr-2 h-8 w-8 text-accent icon-glow" />
            Quiz Completed!
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-xl font-semibold">
            You scored {score} out of {shuffledQuestions.length}!
          </p>
          <p className="text-lg text-muted-foreground">{resultMessage}</p>
        </CardContent>
        <CardFooter>
          <Button onClick={handlePlayAgain} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-headline">
            <RotateCcw className="mr-2 h-5 w-5" />
            Play Again?
          </Button>
        </CardFooter>
      </Card>
    );
  }

  const currentQuestion = shuffledQuestions[currentQuestionIndex];

  return (
    <Card className="w-full max-w-lg mx-auto shadow-xl bg-card/80 backdrop-blur-sm card-glow">
      <CardHeader>
        <CardTitle className="font-headline text-xl md:text-2xl flex items-start">
            <Lightbulb className="mr-3 h-6 w-6 md:h-7 md:w-7 text-accent icon-glow flex-shrink-0 mt-1" />
            {currentQuestion.questionText}
        </CardTitle>
        <CardDescription className="font-body text-sm text-muted-foreground">
          Question {currentQuestionIndex + 1} of {shuffledQuestions.length}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {currentQuestion.options.map((option, index) => {
          let buttonVariant: "outline" | "secondary" | "default" = "outline";
          let Icon = null;

          if (showFeedback) {
            if (option.isCorrect) {
              buttonVariant = "default"; // Correct answer
              Icon = CheckCircle;
            } else if (selectedAnswer === index) {
              buttonVariant = "destructive"; // Incorrectly selected answer
              Icon = XCircle;
            } else {
              buttonVariant = "secondary"; // Other incorrect answers
            }
          } else if (selectedAnswer === index) {
             buttonVariant = "default"; // Selected but not yet revealed
          }
          
          return (
            <Button
              key={index}
              variant={buttonVariant}
              className={`w-full justify-start text-left h-auto py-3 px-4 font-body ${showFeedback && option.isCorrect ? 'bg-green-500/20 border-green-500 hover:bg-green-500/30' : ''} ${showFeedback && selectedAnswer === index && !option.isCorrect ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30' : ''} ${showFeedback ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleAnswerSelection(index)}
              disabled={showFeedback}
            >
              {Icon && <Icon className={`mr-2 h-5 w-5 ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`} />}
              {option.text}
            </Button>
          );
        })}
        {showFeedback && currentQuestion.jokeExplanation && (
          <div className="mt-4 p-3 bg-primary/50 rounded-md border border-border">
            <p className="text-sm text-accent font-semibold">The "Real" Answer:</p>
            <p className="text-xs text-muted-foreground">{currentQuestion.jokeExplanation}</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {showFeedback && (
          <Button onClick={handleNextQuestion} className="w-full bg-accent text-accent-foreground hover:bg-accent/90 font-headline">
            {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Next Question' : 'Show Results'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default BirthdayQuiz;

