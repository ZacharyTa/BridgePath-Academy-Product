import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";

interface VideoPlayerProps {
  videoUrl: string;
  onComplete: () => void;
}

export default function VideoPlayer({
  videoUrl,
  onComplete,
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleVideoEnd = () => {
    setIsCompleted(true);
  };

  const handleMarkAsCompleted = () => {
    onComplete();
  };

  return (
    <div>
      <video
        ref={videoRef}
        src={videoUrl}
        controls
        className="w-full"
        onEnded={handleVideoEnd}
      />
      {isCompleted && (
        <Button onClick={handleMarkAsCompleted} className="mt-4">
          Mark as Completed
        </Button>
      )}
    </div>
  );
}
