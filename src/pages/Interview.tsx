import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Mic, MicOff, X } from "lucide-react";
import { companies, roles, sampleQuestions } from "@/lib/mockData";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Message {
  id: string;
  type: "ai" | "user";
  text: string;
  timestamp: Date;
}

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { company: companyId, role: roleId } = location.state || {};
  
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);

  const company = companies.find((c) => c.id === companyId);
  const role = roles.find((r) => r.id === roleId);
  const questions = sampleQuestions[roleId as keyof typeof sampleQuestions] || [];
  const totalQuestions = questions.length;

  useEffect(() => {
    if (!companyId || !roleId) {
      navigate("/dashboard");
      return;
    }

    // Start with first question
    setTimeout(() => {
      askQuestion(0);
    }, 1000);
  }, [companyId, roleId]);

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= totalQuestions) {
      handleEndInterview();
      return;
    }

    setIsAiSpeaking(true);
    setTimeout(() => {
      const aiMessage: Message = {
        id: `ai-${questionIndex}`,
        type: "ai",
        text: questions[questionIndex],
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiMessage]);
      setIsAiSpeaking(false);
    }, 1500);
  };

  const handleMicToggle = () => {
    setIsListening(!isListening);
    
    if (!isListening) {
      // Simulate recording for 3 seconds
      setTimeout(() => {
        setIsListening(false);
        simulateUserResponse();
      }, 3000);
    }
  };

  const simulateUserResponse = () => {
    const userMessage: Message = {
      id: `user-${currentQuestion}`,
      type: "user",
      text: "This is a simulated response. In a real implementation, this would be the transcribed audio from the user's microphone.",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, userMessage]);
    
    // Move to next question after a delay
    setTimeout(() => {
      setCurrentQuestion(currentQuestion + 1);
      askQuestion(currentQuestion + 1);
    }, 2000);
  };

  const handleEndInterview = () => {
    navigate("/results/1"); // Navigate to mock results
  };

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{company?.logo}</span>
            <div>
              <h1 className="font-semibold">{company?.name}</h1>
              <p className="text-sm text-muted-foreground">{role?.title}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-sm">
              Question <span className="font-semibold text-primary">{currentQuestion + 1}</span> of {totalQuestions}
            </div>
            <Button variant="ghost" size="sm" onClick={() => setShowEndDialog(true)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="container mx-auto max-w-3xl space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex animate-fade-in ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <Card
                className={`max-w-[80%] p-4 ${
                  message.type === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-card"
                }`}
              >
                <div className="flex items-start gap-3">
                  {message.type === "ai" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                      AI
                    </div>
                  )}
                  <div className="flex-1">
                    <p className="text-sm">{message.text}</p>
                    <p className={`mt-2 text-xs ${
                      message.type === "user" ? "text-primary-foreground/70" : "text-muted-foreground"
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                  {message.type === "user" && (
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                      U
                    </div>
                  )}
                </div>
              </Card>
            </div>
          ))}
          
          {isAiSpeaking && (
            <div className="flex justify-start">
              <Card className="max-w-[80%] p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
                    AI
                  </div>
                  <div className="flex gap-1">
                    <div className="h-2 w-2 animate-wave rounded-full bg-primary" style={{ animationDelay: "0s" }} />
                    <div className="h-2 w-2 animate-wave rounded-full bg-primary" style={{ animationDelay: "0.2s" }} />
                    <div className="h-2 w-2 animate-wave rounded-full bg-primary" style={{ animationDelay: "0.4s" }} />
                  </div>
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>

      {/* Microphone Controls */}
      <div className="border-t bg-card/50 p-6 backdrop-blur-sm">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="mb-4">
            {isListening ? (
              <p className="text-sm font-medium text-primary">Listening...</p>
            ) : isAiSpeaking ? (
              <p className="text-sm font-medium text-secondary">AI is speaking...</p>
            ) : (
              <p className="text-sm text-muted-foreground">Tap the microphone to answer</p>
            )}
          </div>
          <button
            onClick={handleMicToggle}
            disabled={isAiSpeaking}
            className={`mx-auto flex h-20 w-20 items-center justify-center rounded-full transition-all ${
              isListening
                ? "animate-pulse-glow bg-destructive hover:bg-destructive/90"
                : "bg-primary hover:bg-primary/90"
            } disabled:opacity-50`}
          >
            {isListening ? (
              <MicOff className="h-10 w-10 text-primary-foreground" />
            ) : (
              <Mic className="h-10 w-10 text-primary-foreground" />
            )}
          </button>
        </div>
      </div>

      {/* End Interview Dialog */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end this interview? Your progress will be saved.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continue Interview</AlertDialogCancel>
            <AlertDialogAction onClick={handleEndInterview}>
              End Interview
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Interview;
