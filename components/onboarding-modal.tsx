"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";

interface Question {
  id: string;
  question: string;
  type: "text" | "radio" | "checkbox";
  options?: string[];
  validation?: Record<string, any>;
}

interface Step {
  title: string;
  questions: Question[];
}

interface OnboardingModalProps {
  title: string;
  steps: Step[];
  isVisible: boolean;
  onClose: () => void;
  onSubmit: SubmitHandler<FieldValues>;
}

export function OnboardingModalComponent({
  title,
  steps,
  isVisible,
  onClose,
  onSubmit,
}: OnboardingModalProps) {
  const [step, setStep] = useState(0);
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [modalRef, onClose]);

  const currentStep = steps[step];

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-99999 flex items-center justify-center bg-black bg-opacity-50">
      <motion.div
        ref={modalRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ type: "spring", damping: 20 }}
        className="relative w-full max-w-md rounded-lg border-stroke bg-white p-8 shadow-default dark:border-strokedark dark:bg-boxdark"
      >
        <button
          className="absolute right-4 top-4 text-black dark:text-white"
          onClick={onClose}
        >
          &times;
        </button>
        <form onSubmit={handleSubmit((data) => onSubmit({ ...data, step }))}>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -50, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
            >
              <h2 className="mb-4 text-2xl font-bold">{title}</h2>
              <h3 className="mb-4 text-xl font-semibold">
                {currentStep.title}
              </h3>
              {currentStep.questions.map((question) => (
                <div key={question.id} className="mb-4">
                  <Label htmlFor={question.id}>{question.question}</Label>
                  {question.type === "text" && (
                    <>
                      <Input
                        id={question.id}
                        {...register(question.id, question.validation)}
                        className={`w-full rounded-lg border-[1.5px] px-5 py-3 outline-none transition ${
                          errors[question.id]
                            ? "border-red-500"
                            : "border-stroke"
                        } dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary`}
                        placeholder="Type your answer here"
                      />
                      {errors[question.id] && (
                        <span className="text-red-500 text-sm">
                          {(errors[question.id]?.message as string) || ""}
                        </span>
                      )}
                    </>
                  )}
                  {question.type === "radio" && (
                    <RadioGroup className="mb-4">
                      {question.options?.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem
                            id={`${question.id}-${option}`}
                            value={option}
                            {...register(question.id, question.validation)}
                          />
                          <Label htmlFor={`${question.id}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  )}
                  {question.type === "checkbox" && (
                    <div className="space-y-2">
                      {question.options?.map((option) => (
                        <div
                          key={option}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`${question.id}-${option}`}
                            value={option}
                            {...register(question.id, question.validation)}
                          />
                          <Label htmlFor={`${question.id}-${option}`}>
                            {option}
                          </Label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
          <div className="mt-6 flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={() => setStep(Math.max(0, step - 1))}
              disabled={step === 0}
            >
              Previous
            </Button>
            <Button type="submit">
              {step === steps.length - 1 ? "Submit" : "Next"}
            </Button>
          </div>
        </form>
        <div className="mt-4 flex justify-center">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`mx-1 h-2 w-2 rounded-full ${index === step ? "bg-blue-500" : "bg-white dark:bg-boxdark-2"}`}
              initial={false}
              animate={{ scale: index === step ? 1.5 : 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
