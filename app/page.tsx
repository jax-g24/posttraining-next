import { HeroVideo } from "@/components/HeroVideo";
import { VideoModalProvider } from "@/components/VideoModal";
import { VideoCard } from "@/components/VideoCard";
import { videos } from "@/lib/data";

export default function Home() {
  return (
    <VideoModalProvider>
      <HeroVideo />
      <section className="video-grid-section">
        <h2 className="grid-title">
          <span className="grid-title-names">Karina Nguyen &amp; Kevin Miao,</span>{" "}
          <span className="grid-title-course">Building Thoughtful AI Systems</span>
        </h2>
        <div className="video-grid">
          {videos.map((video, i) => (
            <VideoCard key={i} video={video} />
          ))}
        </div>
      </section>
    </VideoModalProvider>
  );
}
