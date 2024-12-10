import { useState, useRef } from "react";
import ReactPlayer from "react-player/youtube";
import { getSkillPathId } from "@/helper/useCookies";
import { markVideoCompleted } from "@/helper/progressHelpers";

interface VideoPlayerProps {
  videoUrl: string;
  lessonId: number;
  onVideoComplete: () => void;
}

export default function VideoPlayer({
  videoUrl,
  lessonId,
  onVideoComplete,
}: VideoPlayerProps) {
  const [isCompleted, setIsCompleted] = useState(false);
  const playerRef = useRef<ReactPlayer>(null);
  const skillPathId = getSkillPathId() || 0;

  const handleVideoEnd = () => {
    setIsCompleted(true);
    // Mark the video as completed
    markVideoCompleted(skillPathId, lessonId, lessonId);

    onVideoComplete();
    if (playerRef.current) {
      playerRef.current.seekTo(0); // Seek to the beginning of the video
      playerRef.current.getInternalPlayer().stopVideo(); // Stops video to prevent related videos from playing
    }
  };

  // Add the rel=0 parameter to the YouTube URL to disable related videos
  const youtubeUrl = `${videoUrl}?rel=0&modestbranding=1&showinfo=0&controls=1`;

  return (
    <div className="h-[800px]">
      <ReactPlayer
        ref={playerRef}
        url={youtubeUrl}
        controls={true}
        width="100%"
        height="100%"
        onEnded={handleVideoEnd}
      />
    </div>
  );
}
