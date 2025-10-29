import { Button } from "@/components/ui/button";
import { Mic, Zap, Target, TrendingUp } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="container relative z-10 mx-auto px-4 py-20 md:py-32">
          <div className="mx-auto max-w-3xl text-center animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              <Zap className="h-4 w-4" />
              AI-Powered Interview Practice
            </div>
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-6xl lg:text-7xl">
              Master Your Interview Skills with{" "}
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                AI
              </span>
            </h1>
            <p className="mb-8 text-lg text-muted-foreground md:text-xl">
              Practice voice-only interviews with real company scenarios. Get instant AI feedback and scoring to ace your next interview.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/auth">
                <Button variant="hero" size="lg" className="w-full sm:w-auto">
                  Get Started Free
                </Button>
              </Link>
              <Link to="/auth">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  Sign In
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="mb-12 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Why Choose Our Platform?</h2>
          <p className="text-lg text-muted-foreground">
            Everything you need to prepare for your dream job interview
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <FeatureCard
            icon={<Target className="h-8 w-8" />}
            title="Real Company Scenarios"
            description="Practice with questions from top tech companies like Google, Amazon, and Meta"
          />
          <FeatureCard
            icon={<Mic className="h-8 w-8" />}
            title="Voice-Only Practice"
            description="No camera required. Focus purely on your communication and technical skills"
          />
          <FeatureCard
            icon={<Zap className="h-8 w-8" />}
            title="AI-Powered Questions"
            description="Dynamic questions tailored to your role and experience level"
          />
          <FeatureCard
            icon={<TrendingUp className="h-8 w-8" />}
            title="Instant Scoring"
            description="Get detailed feedback on technical skills, communication, and problem-solving"
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-8">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>&copy; 2025 AI Interview Platform. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const FeatureCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="group rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg animate-slide-up">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default Landing;
