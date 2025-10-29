import { Button } from "@/components/ui/button";
import { Mic, Zap, Target, TrendingUp, CheckCircle, Users, Award, Clock, ArrowRight, Star } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import { useEffect, useRef } from "react";

const Landing = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll(".scroll-animate");
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={scrollRef} className="min-h-screen bg-gradient-to-b from-background to-muted">
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
        <div className="mb-12 text-center scroll-animate">
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

      {/* How It Works Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center scroll-animate">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="text-lg text-muted-foreground">
              Start practicing in 3 simple steps
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <StepCard
              number="1"
              title="Choose Your Interview"
              description="Select from top tech companies and specific roles that match your career goals"
              icon={<Target className="h-6 w-6" />}
            />
            <StepCard
              number="2"
              title="Practice with AI"
              description="Engage in realistic voice-only interviews with AI that adapts to your responses"
              icon={<Mic className="h-6 w-6" />}
            />
            <StepCard
              number="3"
              title="Get Instant Feedback"
              description="Receive detailed scores and personalized feedback to improve your interview skills"
              icon={<Award className="h-6 w-6" />}
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="grid gap-8 md:grid-cols-4 scroll-animate">
          <StatCard number="10,000+" label="Interviews Completed" />
          <StatCard number="95%" label="Success Rate" />
          <StatCard number="50+" label="Company Scenarios" />
          <StatCard number="24/7" label="Available Anytime" />
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-card py-20">
        <div className="container mx-auto px-4">
          <div className="mb-12 text-center scroll-animate">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">Success Stories</h2>
            <p className="text-lg text-muted-foreground">
              Hear from users who landed their dream jobs
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <TestimonialCard
              name="Sarah Chen"
              role="Software Engineer at Google"
              content="This platform helped me nail my Google interview. The AI feedback was incredibly accurate and helped me improve my communication skills."
              rating={5}
            />
            <TestimonialCard
              name="Michael Rodriguez"
              role="Product Manager at Amazon"
              content="Practicing with realistic scenarios made all the difference. I felt confident and prepared during my actual interview."
              rating={5}
            />
            <TestimonialCard
              name="Emily Watson"
              role="Data Scientist at Meta"
              content="The instant scoring and detailed feedback helped me identify my weak points and improve rapidly. Highly recommend!"
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="scroll-animate rounded-2xl bg-gradient-to-r from-primary to-secondary p-12 text-center text-primary-foreground">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to Ace Your Next Interview?</h2>
          <p className="mb-8 text-lg opacity-90">
            Join thousands of successful candidates who prepared with our AI-powered platform
          </p>
          <Link to="/auth">
            <Button variant="outline" size="lg" className="bg-background text-foreground hover:bg-background/90">
              Get Started Free <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
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
    <div className="group scroll-animate rounded-lg border bg-card p-6 transition-all hover:border-primary hover:shadow-lg">
      <div className="mb-4 inline-flex rounded-lg bg-primary/10 p-3 text-primary transition-transform group-hover:scale-110">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const StepCard = ({
  number,
  title,
  description,
  icon,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) => {
  return (
    <div className="scroll-animate relative rounded-lg border bg-background p-6 text-center transition-all hover:border-primary hover:shadow-lg">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
        {number}
      </div>
      <div className="mb-3 flex items-center justify-center gap-2 text-primary">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

const StatCard = ({ number, label }: { number: string; label: string }) => {
  return (
    <div className="rounded-lg border bg-card p-6 text-center transition-all hover:border-primary hover:shadow-lg">
      <div className="mb-2 text-4xl font-bold text-primary">{number}</div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
};

const TestimonialCard = ({
  name,
  role,
  content,
  rating,
}: {
  name: string;
  role: string;
  content: string;
  rating: number;
}) => {
  return (
    <div className="scroll-animate rounded-lg border bg-background p-6 transition-all hover:border-primary hover:shadow-lg">
      <div className="mb-4 flex gap-1">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="h-4 w-4 fill-primary text-primary" />
        ))}
      </div>
      <p className="mb-4 text-muted-foreground">{content}</p>
      <div className="border-t pt-4">
        <div className="font-semibold">{name}</div>
        <div className="text-sm text-muted-foreground">{role}</div>
      </div>
    </div>
  );
};

export default Landing;
