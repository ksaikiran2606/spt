import { HeroDynamic } from "@/components/home/HeroDynamic";
import { ServicesCarousel } from "@/components/home/ServicesCarousel";
import { ValueProposition } from "@/components/home/ValueProposition";
import { HomeCTA } from "@/components/home/HomeCTA";

export default function HomePage() {
  return (
    <>
      <HeroDynamic />
      <ServicesCarousel />
      <ValueProposition />
      <HomeCTA />
    </>
  );
}
