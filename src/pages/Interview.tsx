import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useLocation, useNavigate } from "react-router-dom";
import { Bot, Mic, Volume2, StopCircle } from "lucide-react";
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

interface QAPair {
  question: string;
  answer: string;
  questionNumber: number;
}

const Interview = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { company: companyId, role: roleId } = location.state || {};
  
  const [qaPairs, setQaPairs] = useState<QAPair[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [qaPairs, isAiSpeaking, isListening]);

  const askQuestion = (questionIndex: number) => {
    if (questionIndex >= totalQuestions) {
      return;
    }

    setIsAiSpeaking(true);
    setTimeout(() => {
      setIsAiSpeaking(false);
      // Auto-start listening after AI finishes speaking
      setTimeout(() => {
        startListening();
      }, 500);
    }, 2000);
  };

  const startListening = () => {
    if (currentQuestion >= totalQuestions) return;
    
    setIsListening(true);
    setCurrentAnswer("");
    
    // Simulate recording for 5 seconds
    setTimeout(() => {
      finishAnswer();
    }, 5000);
  };

  const finishAnswer = () => {
    setIsListening(false);
    const answer = "This is a simulated response. In a real implementation, this would be the transcribed audio from the user's microphone. I would explain my approach to solving the problem step by step.";
    
    const newPair: QAPair = {
      question: questions[currentQuestion],
      answer: answer,
      questionNumber: currentQuestion + 1,
    };
    
    setQaPairs((prev) => [...prev, newPair]);
    
    // Move to next question
    const nextQuestion = currentQuestion + 1;
    setCurrentQuestion(nextQuestion);
    
    if (nextQuestion < totalQuestions) {
      setTimeout(() => {
        askQuestion(nextQuestion);
      }, 1500);
    }
  };

  const handleEndInterview = () => {
    setShowEndDialog(false);
    navigate("/results/1");
  };

  const currentQuestionText = currentQuestion < totalQuestions ? questions[currentQuestion] : "";

  return (
    <div className="flex h-screen bg-gradient-to-b from-background to-muted">
      {/* Left Sidebar - AI Status */}
      <div className="flex w-80 flex-col border-r bg-card">
        {/* Header */}
        <div className="border-b p-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">{company?.logo}</span>
            <div>
              <h1 className="font-semibold">{company?.name}</h1>
              <p className="text-sm text-muted-foreground">{role?.title}</p>
            </div>
          </div>
        </div>

        {/* AI Avatar and Status */}
        <div className="flex flex-1 flex-col items-center justify-center p-6">
          <div className={`relative mb-6 flex h-40 w-40 items-center justify-center rounded-full bg-gradient-to-br from-primary to-secondary ${
            isAiSpeaking ? "animate-pulse-glow" : ""
          }`}>
            <Bot className="h-20 w-20 text-primary-foreground" />
            {isAiSpeaking && (
              <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                <Volume2 className="h-6 w-6 text-accent-foreground animate-pulse" />
              </div>
            )}
            {isListening && (
              <div className="absolute -right-2 -top-2 flex h-12 w-12 items-center justify-center rounded-full bg-destructive">
                <Mic className="h-6 w-6 text-destructive-foreground animate-pulse" />
              </div>
            )}
          </div>

          <div className="text-center">
            <h2 className="mb-2 text-xl font-semibold">AI Interviewer</h2>
            {isAiSpeaking && (
              <div className="flex items-center justify-center gap-2 text-secondary">
                <span className="text-sm font-medium">Speaking</span>
                <div className="flex gap-1">
                  <div className="h-2 w-2 animate-wave rounded-full bg-secondary" style={{ animationDelay: "0s" }} />
                  <div className="h-2 w-2 animate-wave rounded-full bg-secondary" style={{ animationDelay: "0.2s" }} />
                  <div className="h-2 w-2 animate-wave rounded-full bg-secondary" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
            {isListening && (
              <p className="text-sm font-medium text-destructive">Listening to your answer...</p>
            )}
            {!isAiSpeaking && !isListening && (
              <p className="text-sm text-muted-foreground">Ready</p>
            )}
          </div>

          <div className="mt-8 w-full rounded-lg bg-muted p-4">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className="font-semibold text-primary">{currentQuestion} / {totalQuestions}</span>
            </div>
            <div className="h-2 w-full rounded-full bg-background">
              <div 
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
              />
            </div>
          </div>
        </div>

        {/* End Button */}
        <div className="border-t p-4">
          <Button 
            variant="destructive" 
            className="w-full"
            onClick={() => setShowEndDialog(true)}
          >
            <StopCircle className="mr-2 h-4 w-4" />
            End Interview
          </Button>
        </div>
      </div>

      {/* Right Side - Chat Area */}
      <div className="flex flex-1 flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-3xl space-y-6">
            {qaPairs.map((pair, index) => (
              <div key={index} className="space-y-4 animate-fade-in">
                {/* Question */}
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                    Q{pair.questionNumber}
                  </div>
                  <Card className="flex-1 bg-card p-4">
                    <p className="text-sm font-medium">{pair.question}</p>
                  </Card>
                </div>

                {/* Answer */}
                <div className="flex items-start gap-3 pl-12">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                    A
                  </div>
                  <Card className="flex-1 bg-primary/10 p-4">
                    <p className="text-sm">{pair.answer}</p>
                  </Card>
                </div>
              </div>
            ))}

            {/* Current Question */}
            {isAiSpeaking && currentQuestionText && (
              <div className="flex items-start gap-3 animate-fade-in">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary text-secondary-foreground font-semibold">
                  Q{currentQuestion + 1}
                </div>
                <Card className="flex-1 bg-card p-4">
                  <p className="text-sm font-medium">{currentQuestionText}</p>
                </Card>
              </div>
            )}

            {/* Current Answer Being Recorded */}
            {isListening && (
              <div className="flex items-start gap-3 pl-12 animate-fade-in">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  A
                </div>
                <Card className="flex-1 bg-primary/10 p-4">
                  <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4 text-primary animate-pulse" />
                    <p className="text-sm text-muted-foreground">Recording your answer...</p>
                  </div>
                </Card>
              </div>
            )}

            {/* Completion Message */}
            {currentQuestion >= totalQuestions && !isAiSpeaking && (
              <div className="text-center animate-fade-in">
                <Card className="inline-block bg-accent/10 p-6">
                  <h3 className="mb-2 text-xl font-semibold">Interview Complete! 🎉</h3>
                  <p className="text-sm text-muted-foreground">
                    Great job! Click "End Interview" to see your results.
                  </p>
                </Card>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>
        </div>
      </div>

      {/* End Interview Dialog */}
      <AlertDialog open={showEndDialog} onOpenChange={setShowEndDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>End Interview?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {qaPairs.length} out of {totalQuestions} questions. Your progress will be saved and you can view your results.
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
