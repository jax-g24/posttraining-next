import { HeroVideo } from "@/components/HeroVideo";
import { VideoModalProvider } from "@/components/VideoModal";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/lib/data";

export default function Home() {
  return (
    <VideoModalProvider>
      <HeroVideo />
      <section className="video-grid-section">
        <div className="grid-header">
          <h2 className="grid-title">Building Thoughtful AI Systems,</h2>
          <p className="grid-names">Karina Nguyen &amp; Kevin Miao</p>
          <p className="grid-subtitle">Lecture Series</p>
        </div>
        <div className="video-grid">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} />
          ))}
        </div>
      </section>
    </VideoModalProvider>
  );
}
