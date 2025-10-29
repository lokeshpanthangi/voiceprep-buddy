import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { companies, roles, mockInterviews } from "@/lib/mockData";
import { useNavigate } from "react-router-dom";
import { Play, LogOut, TrendingUp, MessageSquare, Code } from "lucide-react";

const Dashboard = () => {
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (selectedCompany && selectedRole) {
      navigate("/interview", { state: { company: selectedCompany, role: selectedRole } });
    }
  };

  const handleViewResults = (interviewId: string) => {
    navigate(`/results/${interviewId}`);
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Button variant="ghost" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Start Interview Card */}
        <Card className="mb-8 overflow-hidden border-primary/20 animate-fade-in">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5" />
          <CardHeader className="relative">
            <CardTitle className="text-2xl">Start New Interview</CardTitle>
            <CardDescription>Select a company and role to begin your practice session</CardDescription>
          </CardHeader>
          <CardContent className="relative space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Company</label>
                <Select value={selectedCompany} onValueChange={setSelectedCompany}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    {companies.map((company) => (
                      <SelectItem key={company.id} value={company.id}>
                        {company.logo} {company.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select value={selectedRole} onValueChange={setSelectedRole}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.id} value={role.id}>
                        {role.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button
              onClick={handleStartInterview}
              disabled={!selectedCompany || !selectedRole}
              className="w-full md:w-auto"
              size="lg"
            >
              <Play className="mr-2 h-4 w-4" />
              Start Interview
            </Button>
          </CardContent>
        </Card>

        {/* Previous Interviews */}
        <div className="animate-slide-up">
          <h2 className="mb-4 text-2xl font-bold">Previous Interviews</h2>
          {mockInterviews.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center text-muted-foreground">
                No interviews yet. Start your first practice session above!
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {mockInterviews.map((interview) => {
                const company = companies.find((c) => c.id === interview.companyId);
                const role = roles.find((r) => r.id === interview.roleId);
                return (
                  <Card key={interview.id} className="transition-all hover:border-primary hover:shadow-lg">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="flex items-center gap-2">
                            <span className="text-2xl">{company?.logo}</span>
                            {company?.name}
                          </CardTitle>
                          <CardDescription>{role?.title}</CardDescription>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-primary">{interview.overallScore}%</div>
                          <div className="text-xs text-muted-foreground">Overall Score</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="mb-4 grid grid-cols-3 gap-2 text-sm">
                        <ScoreBadge
                          icon={<Code className="h-3 w-3" />}
                          label="Technical"
                          score={interview.technicalScore}
                        />
                        <ScoreBadge
                          icon={<MessageSquare className="h-3 w-3" />}
                          label="Communication"
                          score={interview.communicationScore}
                        />
                        <ScoreBadge
                          icon={<TrendingUp className="h-3 w-3" />}
                          label="Problem Solving"
                          score={interview.problemSolvingScore}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">
                          {new Date(interview.date).toLocaleDateString()}
                        </span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewResults(interview.id)}
                        >
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ScoreBadge = ({
  icon,
  label,
  score,
}: {
  icon: React.ReactNode;
  label: string;
  score: number;
}) => {
  return (
    <div className="flex flex-col items-center rounded-md bg-muted p-2">
      <div className="mb-1 flex items-center gap-1 text-muted-foreground">
        {icon}
        <span className="text-xs">{label}</span>
      </div>
      <div className="text-sm font-semibold">{score}%</div>
    </div>
  );
};

export default Dashboard;
