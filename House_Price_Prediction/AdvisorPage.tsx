import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User } from "lucide-react";
import { useState } from "react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export default function AdvisorPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Hello! I'm your AI Real Estate Advisor. I can help you with investment decisions, property analysis, market insights, and personalized recommendations. What would you like to know?",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const responses = [
        "Based on current market trends, properties in this area have shown strong appreciation potential. I'd recommend looking at neighborhoods with good school ratings and proximity to transit.",
        "For your budget range, I'd suggest considering properties built between 2010-2020, as they offer modern amenities with established neighborhoods. The ROI potential in this segment is quite strong.",
        "The rental yield in this location is approximately 4.5-5.2% annually. If you're looking for investment properties, this is a solid opportunity. Would you like me to analyze specific properties?",
        "Based on your preferences, I recommend focusing on properties with 3+ bedrooms in family-friendly neighborhoods. The appreciation potential in these areas is typically 6-8% annually.",
        "Market data shows that properties near metro stations appreciate 15-20% faster than average. I'd prioritize location over size for maximum returns.",
      ];

      const randomResponse = responses[Math.floor(Math.random() * responses.length)];

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: randomResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
      setLoading(false);
    }, 1000);
  };

  const suggestedQuestions = [
    "Is this property worth buying?",
    "What's the best area for investment?",
    "How do I calculate rental yield?",
    "What's the market trend for 2026?",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-white to-accent-light">
      <Navigation />

      <div className="container py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">AI Real Estate Advisor</h1>
            <p className="text-lg text-muted-foreground">
              Get personalized investment insights and answers to your real estate questions powered by advanced AI.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Chat Area */}
            <div className="lg:col-span-2">
              <Card className="h-96 lg:h-[600px] flex flex-col border-border overflow-hidden">
                {/* Messages */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-accent" />
                          </div>
                        )}

                        <div
                          className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                            message.role === "user"
                              ? "bg-accent text-white rounded-br-none"
                              : "bg-muted text-foreground rounded-bl-none"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                        </div>

                        {message.role === "user" && (
                          <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    ))}

                    {loading && (
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                          <Bot className="w-4 h-4 text-accent" />
                        </div>
                        <div className="bg-muted px-4 py-2 rounded-lg rounded-bl-none">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                            <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                {/* Input */}
                <div className="border-t border-border p-4 bg-white">
                  <form onSubmit={handleSendMessage} className="flex gap-2">
                    <Input
                      placeholder="Ask me anything about real estate..."
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      disabled={loading}
                      className="flex-1"
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={loading || !input.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </form>
                </div>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 space-y-6">
              {/* Suggested Questions */}
              <Card className="p-6 border-border">
                <h3 className="font-semibold text-foreground mb-4">Suggested Questions</h3>
                <div className="space-y-2">
                  {suggestedQuestions.map((question, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setInput(question);
                      }}
                      className="w-full text-left text-sm p-3 rounded-lg border border-border hover:border-accent hover:bg-accent/5 transition-all text-muted-foreground hover:text-foreground"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Tips */}
              <Card className="p-6 border-border bg-gradient-to-br from-accent/5 to-accent/10">
                <h3 className="font-semibold text-foreground mb-3">💡 Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>• Be specific about your budget and location preferences</li>
                  <li>• Ask about market trends and investment opportunities</li>
                  <li>• Request ROI calculations and rental yield analysis</li>
                  <li>• Get personalized recommendations based on your goals</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
