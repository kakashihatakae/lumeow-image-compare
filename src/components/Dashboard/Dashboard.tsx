"use client";

import { useState } from "react";
import { UserButton } from "@clerk/nextjs";
import { Button } from "@src/components/ui/button";
import { Textarea } from "@src/components/ui/textarea";
import { Checkbox } from "@src/components/ui/checkbox";
import { MODELS } from "@src/lib/contstants";
import type { SelectedModelsType } from "@src/lib/types";
import ImageSection from "../ImageSection/ImageSection";

export default function Dashboard() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [selectedModels, setSelectedModels] = useState<SelectedModelsType>({
    [MODELS.DALLE]: false,
    [MODELS.GEMINI]: false,
  });

  const handleModelChange = (model: keyof typeof MODELS) => {
    setSelectedModels((prev) => ({
      ...prev,
      [model]: !prev[model],
    }));
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-image", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
          selectedModels,
        }),
      });
      const data = await response.json();
      if (data.status === "success" && data.images) {
        setImages(data.images);
      }
    } catch (error) {
      console.error("Error generating images:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="w-full px-4 py-4 bg-white border-b">
        <div className="w-[80%] container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Lumeos<span className="text-blue-400">AI</span>
          </h1>
          <UserButton afterSignOutUrl="/" />
        </div>
      </nav>

      <main className="flex justify-center container mx-auto px-4 py-8">
        <div className="space-y-6 w-[80%]">
          <Textarea
            placeholder="Enter your prompt here"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {(Object.keys(MODELS) as Array<keyof typeof MODELS>).map((key) => (
              <div key={key} className="flex items-center space-x-2">
                <Checkbox
                  id={key}
                  checked={selectedModels[key]}
                  onCheckedChange={() => handleModelChange(key)}
                />
                <label htmlFor={key}>{MODELS[key]}</label>
              </div>
            ))}
          </div>

          <Button onClick={handleSubmit} disabled={isLoading}>
            {isLoading ? "Generating..." : "Generate Images"}
          </Button>

          <ImageSection images={images} loading={isLoading} />
        </div>
      </main>
    </div>
  );
}
