import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Question {
  id: number;
  text: string;
  options: string[];
  correctAnswer: number;
}

interface QuizContainerProps {
  lessonId: number;
}

export default function QuizContainer({ lessonId }: QuizContainerProps) {
  // In a real application, you would fetch questions based on the lessonId
  const [questions] = useState<Question[]>([
    {
      id: 1,
      text: "What is the primary goal of digital marketing?",
      options: [
        "Increase offline sales",
        "Promote products and services online",
        "Reduce marketing costs",
        "Eliminate traditional marketing",
      ],
      correctAnswer: 1,
    },
    // Add more questions here
  ]);

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleAnswerSelect = (index: number) => {
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{currentQuestion.text}</p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className="w-full justify-start"
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </Button>
          ))}
        </div>
        {!showFeedback && (
          <Button
            onClick={handleSubmit}
            className="mt-4"
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </Button>
        )}
        {showFeedback && (
          <div className="mt-4">
            <p
              className={
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct!"
                : "Incorrect. Try again!"}
            </p>
            <Button onClick={handleNextQuestion} className="mt-2">
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
