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
              className="w-full justify-start p-2"
              onClick={() => handleAnswerSelect(index)}
              style={
                selectedAnswer === index
                  ? {
                      border: "2px solid #3B82F6",
                      boxShadow: "0 0 8px #3B82F6",
                      backgroundColor: "#E0F2FE", // lighter background for selected state
                    }
                  : undefined
              }
              onMouseOver={(e) => {
                Object.assign(e.currentTarget.style, {
                  backgroundColor: "#3B82F6",
                  cursor: "pointer",
                });
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.backgroundColor = "";
                e.currentTarget.style.cursor = "";
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  width: "1.5rem",
                  height: "1.5rem",
                  marginRight: "1rem",
                  borderRadius: "50%",
                  border: "2px solid #3B82F6",
                  backgroundColor:
                    selectedAnswer === index ? "#3B82F6" : "transparent",
                }}
              ></span>
              {option}
            </Button>
          ))}
        </div>
        {!showFeedback && (
          <Button
            onClick={handleSubmit}
            className="mt-4 w-full py-2"
            disabled={selectedAnswer === null}
            style={{
              backgroundColor: selectedAnswer === null ? "#A0AEC0" : "#3B82F6",
              fontSize: "1.1rem",
              padding: "0.75rem",
              color: "#FFF",
              borderRadius: "0.5rem",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              Object.assign(e.currentTarget.style, {
                boxShadow: "0 0 10px #2563EB",
              });
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.boxShadow = "";
            }}
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
                : "Incorrect. The correct answer is: " +
                  currentQuestion.options[currentQuestion.correctAnswer]}
            </p>
            <Button onClick={handleNextQuestion} className="mt-2 w-full">
              Next Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
