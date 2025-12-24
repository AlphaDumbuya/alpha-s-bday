
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
    questionText: "What's Justious's favorite hobby when he eats?",
    options: [
      { text: "Using a fork like a ninja", isCorrect: false },
      { text: "Wearing more food than he eats!", isCorrect: true },
      { text: "Eating with perfect manners", isCorrect: false },
    ],
    jokeExplanation: "The classic toddler food explosion—fashion statement and dinner all in one! 😄"
  },
  {
    id: 2,
    questionText: "If Justious were a superhero, what would be his superpower?",
    options: [
      { text: "Flying through the sky", isCorrect: false },
      { text: "The ability to fall asleep ANYWHERE (even mid-play!)", isCorrect: true },
      { text: "Super strength", isCorrect: false },
    ],
    jokeExplanation: "Toddler narcolepsy is REAL! One second playing, next second—snooze mode activated! 💤"
  },
  {
    id: 3,
    questionText: "What does Justious do that makes everyone laugh?",
    options: [
      { text: "Tell long stories nobody understands", isCorrect: true },
      { text: "Solve complex math problems", isCorrect: false },
      { text: "Recite the alphabet backwards", isCorrect: false },
    ],
    jokeExplanation: "Pure gibberish with the most serious face ever! We have no idea what he's saying, but it's HILARIOUS! 😂"
  },
  {
    id: 4,
    questionText: "How many times can Justious say 'why' in one conversation?",
    options: [
      { text: "Maybe 5-10 times", isCorrect: false },
      { text: "INFINITE! It never ends!", isCorrect: true },
      { text: "He never asks why", isCorrect: false },
    ],
    jokeExplanation: "The eternal 'why' game—where every answer leads to another 'why?' Parents know the struggle! 🤦"
  },
  {
    id: 5,
    questionText: "What's Justious's favorite birthday activity?",
    options: [
      { text: "Eating cake with his hands, face, and everywhere in between!", isCorrect: true },
      { text: "Taking a nap", isCorrect: false },
      { text: "Organizing toys neatly", isCorrect: false },
    ],
    jokeExplanation: "Forget forks and spoons—hands are the best utensils! And somehow cake ends up in his ears too! 🎂😄"
  },
  {
    id: 6,
    questionText: "Where does Justious fall asleep the WORST possible places?",
    options: [
      { text: "In his cozy bed like a normal kid", isCorrect: false },
      { text: "In the middle of the living room, on the stairs, literally ANYWHERE BUT bed!", isCorrect: true },
      { text: "Only in his crib", isCorrect: false },
    ],
    jokeExplanation: "The moment you think he's tired enough to nap, he fights sleep like it's his enemy—then BOOM, asleep mid-tantrum on the kitchen floor! 😴"
  },
  {
    id: 7,
    questionText: "What's Justious's signature move when he doesn't get what he wants?",
    options: [
      { text: "The dramatic floor flop + incredible screaming performance!", isCorrect: true },
      { text: "Polite negotiation", isCorrect: false },
      { text: "Quiet acceptance", isCorrect: false },
    ],
    jokeExplanation: "Academy Award-worthy acting! Complete with rolling on the floor and sound effects that could wake the neighbors three blocks away! 🎭😆"
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
      resultMessage = "PERFECT SCORE! You're the ultimate Justious expert! 🏆 You deserve cake AND confetti!";
    } else if (score >= shuffledQuestions.length * 0.8) {
      resultMessage = "WOW! You know Justious SO well! Almost perfect! 🎉";
    } else if (score >= shuffledQuestions.length * 0.6) {
      resultMessage = "Great! You definitely spend quality time with Justious! 😄";
    } else {
      resultMessage = "Haha, well now you know Justious better! Time for cake! 🎂";
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
            <span className="min-w-0 flex-1">{currentQuestion.questionText}</span>
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
              className={`w-full justify-start text-left h-auto py-3 px-4 font-body whitespace-normal ${showFeedback && option.isCorrect ? 'bg-green-500/20 border-green-500 hover:bg-green-500/30' : ''} ${showFeedback && selectedAnswer === index && !option.isCorrect ? 'bg-red-500/20 border-red-500 hover:bg-red-500/30' : ''} ${showFeedback ? 'cursor-not-allowed' : ''}`}
              onClick={() => handleAnswerSelection(index)}
              disabled={showFeedback}
            >
              {Icon && <Icon className={`mr-2 h-5 w-5 flex-shrink-0 ${option.isCorrect ? 'text-green-400' : 'text-red-400'}`} />}
              <span className="flex-1 min-w-0">{option.text}</span>
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

