import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useNavigate, useParams } from "react-router-dom";
import { mockInterviews, companies, roles } from "@/lib/mockData";
import { ArrowLeft, Download, RefreshCw, Code, MessageSquare, TrendingUp } from "lucide-react";

const Results = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const interview = mockInterviews.find((i) => i.id === id);
  const company = companies.find((c) => c.id === interview?.companyId);
  const role = roles.find((r) => r.id === interview?.roleId);

  if (!interview) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Card>
          <CardContent className="p-6">
            <p className="text-muted-foreground">Interview not found</p>
            <Button onClick={() => navigate("/dashboard")} className="mt-4">
              Back to Dashboard
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-accent";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate("/dashboard")}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Overall Score */}
        <Card className="mb-8 overflow-hidden animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <CardHeader className="relative">
            <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
              <div>
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{company?.logo}</span>
                  <div>
                    <CardTitle className="text-2xl">{company?.name}</CardTitle>
                    <p className="text-muted-foreground">{role?.title}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  {new Date(interview.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
              <div className="text-center">
                <div className={`text-6xl font-bold ${getScoreColor(interview.overallScore)}`}>
                  {interview.overallScore}%
                </div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Score Breakdown */}
        <div className="mb-8 grid gap-4 md:grid-cols-3 animate-slide-up">
          <ScoreCard
            icon={<Code className="h-6 w-6" />}
            title="Technical Skills"
            score={interview.technicalScore}
            description="Problem-solving and technical knowledge"
          />
          <ScoreCard
            icon={<MessageSquare className="h-6 w-6" />}
            title="Communication"
            score={interview.communicationScore}
            description="Clarity and articulation"
          />
          <ScoreCard
            icon={<TrendingUp className="h-6 w-6" />}
            title="Problem Solving"
            score={interview.problemSolvingScore}
            description="Analytical thinking and approach"
          />
        </div>

        {/* Detailed Q&A */}
        <Card className="animate-slide-up">
          <CardHeader>
            <CardTitle>Detailed Answers & Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              {interview.questions.map((question, index) => (
                <AccordionItem key={question.id} value={question.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                        {index + 1}
                      </div>
                      <span className="flex-1">{question.text}</span>
                      <span className={`text-sm font-semibold ${getScoreColor(question.score)}`}>
                        {question.score}%
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4 pl-11">
                      <div>
                        <h4 className="mb-2 font-semibold text-sm">Your Answer:</h4>
                        <p className="text-sm text-muted-foreground">{question.userAnswer}</p>
                      </div>
                      <div className="rounded-lg bg-muted p-4">
                        <h4 className="mb-2 font-semibold text-sm">AI Feedback:</h4>
                        <p className="text-sm">{question.feedback}</p>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button variant="outline" size="lg">
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
          <Button size="lg" onClick={() => navigate("/dashboard")}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Retake Interview
          </Button>
        </div>
      </div>
    </div>
  );
};

const ScoreCard = ({
  icon,
  title,
  score,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  score: number;
  description: string;
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-accent";
    if (score >= 70) return "text-primary";
    return "text-destructive";
  };

  return (
    <Card className="transition-all hover:border-primary hover:shadow-lg">
      <CardContent className="p-6">
        <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary">
          {icon}
        </div>
        <h3 className="mb-1 text-lg font-semibold">{title}</h3>
        <div className={`mb-2 text-4xl font-bold ${getScoreColor(score)}`}>
          {score}%
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default Results;
