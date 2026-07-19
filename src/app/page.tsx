import AIChat from "@/components/AiChat";
import Banner from "@/components/Banner";
import Featured from "@/components/featured";

export default function Home() {
  return (
    <div>
      <Banner />
      <Featured />
      <AIChat />
    </div>
  );
}
