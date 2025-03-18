"use client";

import { Button } from "@src/components/ui/button";
import { useRouter } from "next/navigation";
import { Twitter, Linkedin } from "lucide-react";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";

const LandingPage = () => {
  const router = useRouter();
  const { isSignedIn } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white text-gray-800">
      {/* Navigation Bar */}
      <nav className="px-4 py-4 ">
        <div className="container w-[80%] mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">
            Lumeos<span className="text-blue-600">AI</span>
          </h1>
          <Button
            onClick={() => {
              if (isSignedIn) {
                router.push("/");
              } else {
                router.push("/signin");
              }
            }}
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer"
          >
            {isSignedIn ? "Dashboard" : "Sign In"}
          </Button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-3xl px-4">
          <h1 className="text-6xl font-bold mb-4">
            Lumeos<span className="text-blue-600">AI</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Compare different AI models side by side. Generate and analyze
            results from DALL-E, Gemini, and more in one place.
          </p>

          {/* Homepage Screenshot Section */}
          <div className="py-12">
            <h2 className="text-3xl font-semibold mb-6">See it in Action</h2>
            <div className="flex justify-center">
              <div className="rounded-lg overflow-hidden shadow-xl">
                <Image
                  src="/screenshots/homepage.png"
                  alt="LumeosAI Application Homepage"
                  width={900}
                  height={500}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>

          {/* How it Works Section */}
          <div className="py-12">
            <h2 className="text-3xl font-semibold mb-6">How it Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600 mb-2">1</div>
                <h3 className="text-xl font-semibold mb-2">
                  Enter Your Prompt
                </h3>
                <p className="text-gray-600">
                  Write your creative prompt and select which AI models you want
                  to compare
                </p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600 mb-2">2</div>
                <h3 className="text-xl font-semibold mb-2">Generate Images</h3>
                <p className="text-gray-600">
                  Our system processes your prompt through the selected AI
                  models simultaneously
                </p>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-md">
                <div className="text-2xl font-bold text-blue-600 mb-2">3</div>
                <h3 className="text-xl font-semibold mb-2">Compare Results</h3>
                <p className="text-gray-600">
                  View and compare the generated images side by side to see how
                  each model interprets your prompt
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full py-8 mt-auto bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-6">
            <a
              href="https://twitter.com/lumeosai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Twitter className="h-6 w-6" />
              <span className="sr-only">Twitter</span>
            </a>
            <a
              href="https://linkedin.com/company/lumeosai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 transition-colors"
            >
              <Linkedin className="h-6 w-6" />
              <span className="sr-only">LinkedIn</span>
            </a>
          </div>
          <div className="text-center mt-4 text-gray-500">
            © {new Date().getFullYear()} LumeosAI. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
