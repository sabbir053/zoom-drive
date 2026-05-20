import AvailableCars from "@/components/AvailableCars";
import Banner from "@/components/Banner";
import WhyChooseUs from "@/components/WhyChooseUs";
import PromoCTA from "../components/PromoCTA";

export default function Home() {
  return (
    <div>
      <main>
        <Banner />
        <AvailableCars />
        <WhyChooseUs />
        <PromoCTA />
      </main>
    </div>
  );
}
