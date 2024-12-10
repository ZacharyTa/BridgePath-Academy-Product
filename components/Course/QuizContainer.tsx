"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Quiz } from "@/libs/types";
import {
  getSkillPathId,
  getCompletedQuizzes,
  getCourseId,
} from "@/helper/useCookies";
import { markQuizCompleted } from "@/helper/progressHelpers";
import { getUserProgress } from "@/helper/progressStorage";

interface QuizContainerProps {
  quizzes: Quiz[];
  lessonId: number;
  onQuizComplete: (quizId: number) => void;
}

const QuizContainer: React.FC<QuizContainerProps> = ({
  quizzes,
  lessonId,
  onQuizComplete,
}) => {
  // State variables
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);

  const skillPathId = getSkillPathId() || 0;

  const currentQuiz = quizzes && quizzes[currentQuizIndex];
  const currentQuestion =
    currentQuiz && currentQuiz.questions[currentQuestionIndex];

  // Effect to handle quiz initialization or completion
  useEffect(() => {
    if (quizzes && quizzes.length > 0 && currentQuiz && currentQuestion) {
      // Reset states for the new quiz
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setIsQuizCompleted(false);

      // Check if the quiz is already completed
      const completedQuizzes =
        getUserProgress().skillPaths[skillPathId]?.courses[getCourseId()]
          ?.lessons[lessonId]?.quizzesCompleted || [];
      if (completedQuizzes.includes(currentQuiz.id)) {
        const correctAnswerIndex = currentQuestion.options.findIndex(
          (option) => option.is_correct,
        );
        setSelectedAnswer(correctAnswerIndex);
        setIsQuizCompleted(true);
        setShowFeedback(true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentQuizIndex, lessonId]);

  // Early return if data is not available
  if (!quizzes || quizzes.length === 0 || !currentQuiz || !currentQuestion) {
    return null;
  }

  const handleAnswerSelect = (index: number) => {
    if (!isQuizCompleted) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmit = () => {
    if (selectedAnswer !== null) {
      setShowFeedback(true);
      if (currentQuestion.options[selectedAnswer].is_correct) {
        // Mark the quiz as completed
        markQuizCompleted(
          skillPathId,
          currentQuiz.id,
          lessonId,
          currentQuiz.id,
        );
        setIsQuizCompleted(true);

        // Check if all quizzes are completed
        if (currentQuizIndex === quizzes.length - 1) {
          onQuizComplete(quizzes[currentQuizIndex].id);
        }
      }
    }
  };

  const handleNextQuestion = () => {
    setSelectedAnswer(null);
    setShowFeedback(false);

    if (currentQuestionIndex < currentQuiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleNextQuiz();
    }
  };

  const handleNextQuiz = () => {
    if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const correctAnswerIndex = currentQuestion.options.findIndex(
    (option) => option.is_correct,
  );

  return (
    <Card className="relative">
      {showFeedback &&
        selectedAnswer !== null &&
        currentQuestion.options[selectedAnswer].is_correct && (
          <div className="pointer-events-none absolute inset-0 bg-green-100 opacity-30 dark:bg-green-900"></div>
        )}
      <CardHeader>
        <CardTitle>Take this Quiz</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="mb-4 text-lg font-semibold">Test Your Knowledge</p>
        <p className="mb-4 text-lg">{currentQuestion.question_text}</p>
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
              disabled={isQuizCompleted}
            >
              <span
                className={`mr-4 inline-block h-6 w-6 rounded-full border-2 ${
                  selectedAnswer === index
                    ? "border-blue-500 bg-blue-500"
                    : "border-blue-500"
                }`}
              ></span>
              {option.option_text}
            </Button>
          ))}
        </div>
        {!showFeedback && (
          <Button
            onClick={handleSubmit}
            className={`mt-4 w-full py-2 ${
              selectedAnswer === null || isQuizCompleted
                ? "cursor-not-allowed bg-neutral"
                : "bg-blue-500 hover:bg-blue-600"
            } rounded-lg font-medium text-white transition-all duration-300 ease-in-out`}
            disabled={selectedAnswer === null || isQuizCompleted}
          >
            Submit Answer
          </Button>
        )}
        {showFeedback && (
          <div className="relative z-10 mt-4">
            <p
              className={
                selectedAnswer !== null &&
                currentQuestion.options[selectedAnswer].is_correct
                  ? "text-green-600"
                  : "text-red-600"
              }
            >
              {selectedAnswer !== null &&
              currentQuestion.options[selectedAnswer].is_correct
                ? "Correct!"
                : `Incorrect. The correct answer is: ${currentQuestion.options[correctAnswerIndex].option_text}`}
            </p>

            {!isQuizCompleted && currentQuiz.questions.length > 1 && (
              <Button
                onClick={handleNextQuestion}
                className="mt-2 w-full rounded-lg bg-blue-500 font-medium text-white transition-all duration-300 ease-in-out hover:bg-blue-600"
              >
                {currentQuestionIndex < currentQuiz.questions.length - 1
                  ? "Next Question"
                  : "Next Quiz"}
              </Button>
            )}

            {isQuizCompleted && currentQuiz.questions.length === 1 && (
              <p className="mt-2 text-center font-medium text-green-600">
                You have completed this quiz!
              </p>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default QuizContainer;
