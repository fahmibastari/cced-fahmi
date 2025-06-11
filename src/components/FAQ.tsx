"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQCategory {
  category: string;
  items: FAQItem[];
}

interface FAQProps {
  data: FAQCategory[];
}

export default function FAQ({ data }: FAQProps) {
  const [activeIndex, setActiveIndex] = useState<{ [key: string]: number | null }>({});

  const toggle = (category: string, index: number) => {
    setActiveIndex((prev) => ({
      ...prev,
      [category]: prev[category] === index ? null : index
    }));
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
      {data.map((group, groupIdx) => (
        <section key={groupIdx}>
          <h2 className="text-lg md:text-xl font-semibold text-neutral-800 mb-4 border-l-4 border-green-500 pl-4">
            {group.category}
          </h2>
          <ul className="space-y-3">
            {group.items.map((item, idx) => {
              const isOpen = activeIndex[group.category] === idx;
              return (
                <li key={idx} className="border rounded-xl bg-white shadow-sm transition-all">
                  <button
                    onClick={() => toggle(group.category, idx)}
                    className="w-full px-5 py-4 flex justify-between items-center text-left text-sm md:text-base font-medium text-gray-800"
                  >
                    <span>{item.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-5 h-5 text-green-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-5 text-gray-600 text-sm whitespace-pre-line leading-relaxed">
                      {item.answer}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      ))}
    </div>
  );
}
