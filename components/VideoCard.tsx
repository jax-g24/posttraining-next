"use client";

import { useVideoModal } from "./VideoModal";
import type { VideoItem } from "@/lib/data";

export function VideoCard({ video }: { video: VideoItem }) {
  const { open } = useVideoModal();

  const handleClick = () => {
    if (video.upcoming) return;
    open({
      videoId: video.videoId,
      slides: video.slides,
      notes: video.notes,
    });
  };

  return (
    <article
      className={`video-card ${video.upcoming ? "upcoming" : ""}`}
      onClick={handleClick}
    >
      <div className="video-thumbnail">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={video.thumbnail} alt={`${video.title} thumbnail`} />
      </div>
      <div className="video-info">
        <h3 className="video-title">{video.title}, {video.date}</h3>
        <span className="video-module">{video.module}</span>
      </div>
    </article>
  );
}
