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
    <Card className="relative">
      {showFeedback && selectedAnswer === currentQuestion.correctAnswer && (
        <div className="pointer-events-none absolute inset-0 bg-green-100 opacity-30 dark:bg-green-900"></div>
      )}
      <CardHeader>
        <CardTitle>Take this Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg font-semibold">Test Your Knowledge</p>
        <p
          className="mb-4"
          style={{ fontSize: "1.2rem", marginBottom: "1rem" }}
        >
          {currentQuestion.text}
        </p>
        <div className="space-y-2">
          {currentQuestion.options.map((option, index) => (
            <Button
              key={index}
              variant={selectedAnswer === index ? "default" : "outline"}
              className={`w-full justify-start p-2 ${
                selectedAnswer === index
                  ? "text-gray-800 border-2 border-blue-500 bg-slate-200 dark:bg-boxdark"
                  : ""
              } hover:bg-slate-200 hover:dark:bg-boxdark`}
              onClick={() => handleAnswerSelect(index)}
            >
              <span
                className={`mr-4 inline-block h-6 w-6 rounded-full border-2 ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-500"
                    : "border-blue-500"
                }`}
              ></span>
              {option}
            </Button>
          ))}
        </div>
        {!showFeedback && (
          <Button
            onClick={handleSubmit}
            className={`mt-4 w-full py-2 ${
              selectedAnswer === null
                ? "cursor-not-allowed bg-neutral"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-lg font-medium text-white transition-all duration-300 ease-in-out`}
            disabled={selectedAnswer === null}
          >
            Submit Answer
          </Button>
        )}
        {showFeedback && (
          <div className="relative z-10 mt-4">
            <p
              className={
                selectedAnswer === currentQuestion.correctAnswer
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {selectedAnswer === currentQuestion.correctAnswer
                ? "Correct!"
                : "Incorrect. The correct answer is: " +
                  currentQuestion.options[currentQuestion.correctAnswer]}
            </p>
            <Button
              onClick={handleNextQuestion}
              className="mt-2 w-full rounded-lg bg-blue-500 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
            >
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
