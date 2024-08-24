import Header from "@/components/Header/page";
import Image from "next/image";
import Hero from "./_home/Hero";
import Benefit from "./_home/Benefit";
import Feature from "./_home/Feature";
import Bottom from "./_home/Bottom";
import Footer from "@/components/Footer/page";

export default function Home() {
  return (
    <div>
      <div className="bg-[#F7FAFF]">
        <Header />
        <Hero />
      </div>
      <div>
        <Benefit />
      </div>
      <div>
        <Feature />
      </div>
      <div>
        <Bottom />
      </div>
      <div className="mt-5">
        <Footer />
      </div>
    </div>
  );
}
