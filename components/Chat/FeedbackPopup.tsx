"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageCircle, X } from "lucide-react";
import toast from "react-hot-toast";

export function FeedbackPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [feedback, setFeedback] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Feedback submitted:", feedback);
    toast.success("Feedback submitted!");
    setFeedback("");
    setIsOpen(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="relative">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="absolute bottom-0 right-0 h-12 w-12 rounded-full shadow-lg"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}
        {isOpen && (
          <div className="rounded-lg border bg-white p-4 shadow-lg transition-all duration-300 ease-in-out">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-info/50">
                Provide Feedback
              </h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-6 w-6"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <Textarea
                placeholder="Type your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                className="w-full resize-none bg-slate-200 text-black"
              />
              <Button type="submit" className="w-full text-white">
                Submit Feedback
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
