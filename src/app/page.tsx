import HeroContent from "@/components/hero/HeroContent";
import GridBackground from "@/components/hero/GridBackground";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <GridBackground />
      <HeroContent />
    </div>
  );
}
