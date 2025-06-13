
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
    questionText: "Alpha’s love life can best be described as:",
    options: [
      { text: "A romantic movie", isCorrect: false },
      { text: "A mystery novel", isCorrect: false },
      { text: "A Wi-Fi signal—sometimes strong, sometimes gone!", isCorrect: true },
    ],
    jokeExplanation: "Because love, like Wi-Fi, can be beautifully unpredictable!"
  },
  {
    id: 2,
    questionText: "Alpha’s religious habit includes:",
    options: [
      { text: "Praying 24/7", isCorrect: false },
      { text: "Sleeping in church", isCorrect: false },
      { text: "Saying “Thank God” even when Wi-Fi connects", isCorrect: true },
    ],
    jokeExplanation: "Priorities! A stable internet connection is a true blessing in the modern age."
  },
  {
    id: 3,
    questionText: "What does Alpha do when he’s angry?",
    options: [
      { text: "Yells at everyone", isCorrect: false },
      { text: "Goes silent like a phone on airplane mode", isCorrect: true },
      { text: "Eats 3 plates of food to calm down", isCorrect: false },
    ],
    jokeExplanation: "Sometimes silence is the loudest reboot sequence."
  },
  {
    id: 4,
    questionText: "What’s one thing Alpha can’t live without?",
    options: [
      { text: "Cap", isCorrect: false },
      { text: "His phone & Computer", isCorrect: true },
      { text: "His socks (even in hot weather)", isCorrect: false },
    ],
    jokeExplanation: "The essential toolkit for modern survival and conquering the digital world!"
  },
  {
    id: 5,
    questionText: "If Alpha was to choose between sleep and food, he would:",
    options: [
      { text: "Sleep and dream of food", isCorrect: false },
      { text: "Eat, then sleep like a king", isCorrect: true },
      { text: "Pray for strength to resist both", isCorrect: false },
    ],
    jokeExplanation: "A well-fed nap is truly the pinnacle of existence and productivity."
  },
  {
    id: 6,
    questionText: "What’s Alpha’s biggest dream?",
    options: [
      { text: "Finding love", isCorrect: false },
      { text: "Helping the less privileged", isCorrect: true },
      { text: "Eating jollof on a yacht with no network", isCorrect: false },
    ],
    jokeExplanation: "A truly noble aspiration! (Though the jollof yacht has its merits too.)"
  }
];

const BirthdayQuiz: React.FC = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [shuffledQuestions, setShuffledQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    // Shuffle questions and their options once on component mount
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
    // Re-shuffle questions and options for a new game
    setShuffledQuestions(quizQuestionsData.sort(() => Math.random() - 0.5).map(q => ({
      ...q,
      options: q.options.sort(() => Math.random() - 0.5)
    })));
  };

  if (!shuffledQuestions.length) {
    // Placeholder while questions are being shuffled
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
