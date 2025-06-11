import FAQ from "@/components/FAQ";
import { faqData } from "@/data/faq";


export default function FAQPage() {
  return (
    <main className="max-w-5xl mx-auto px-4 py-16">
  <h1 className="text-4xl font-bold mb-12 text-green-800">
  Frequently Asked Questions
  </h1>
  <FAQ data={faqData} />
</main>

  );
}
