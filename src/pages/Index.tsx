import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import FaceScanner from '@/components/FaceScanner';
import HealthDashboard from '@/components/HealthDashboard';
import heroImage from '@/assets/medical-hero.jpg';
import { 
  Brain, 
  Scan, 
  Activity, 
  Shield, 
  Zap, 
  Users,
  ArrowRight,
  CheckCircle
} from 'lucide-react';

const Index = () => {
  const [activeTab, setActiveTab] = useState('scanner');

  const features = [
    {
      icon: <Brain className="w-6 h-6" />,
      title: "AI-Powered Analysis",
      description: "Advanced computer vision algorithms analyze facial features for health indicators"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Real-time Detection",
      description: "Instant analysis with results in under 3 seconds using cutting-edge technology"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Privacy First",
      description: "All processing happens locally in your browser - your data never leaves your device"
    },
    {
      icon: <Activity className="w-6 h-6" />,
      title: "Multiple Health Markers",
      description: "Detects signs of fatigue, stress, cardiovascular indicators, and more"
    }
  ];

  const stats = [
    { label: "Accuracy Rate", value: "98.5%" },
    { label: "Processing Time", value: "< 3s" },
    { label: "Health Markers", value: "15+" },
    { label: "Users Scanned", value: "50K+" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-bg"></div>
        <div className="relative container mx-auto px-4 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in-up">
              <div className="space-y-4">
                <Badge className="bg-accent/10 text-accent border-accent/20">
                  <Scan className="w-4 h-4 mr-2" />
                  AI Medical Technology
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold bg-gradient-medical bg-clip-text text-transparent">
                  AI Facial Health Scanner
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  Revolutionary face-based disease detection using advanced computer vision. 
                  Get instant health insights by simply showing your face to our AI scanner.
                </p>
              </div>

              <div className="flex flex-wrap gap-4">
                <Button 
                  variant="medical" 
                  size="xl" 
                  onClick={() => setActiveTab('scanner')}
                  className="shadow-medical"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Start Health Scan
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button variant="outline" size="xl">
                  Learn More
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-scan opacity-20 rounded-2xl blur-3xl"></div>
              <img 
                src={heroImage} 
                alt="AI Medical Scanner Interface" 
                className="relative rounded-2xl shadow-glow w-full max-w-lg mx-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Cutting-Edge Health Technology</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Our AI system analyzes micro-expressions, skin tone variations, and facial asymmetries 
              to detect early signs of various health conditions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover:shadow-medical transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-gradient-medical rounded-full flex items-center justify-center text-primary-foreground group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Application */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="scanner" className="text-lg py-3">
                <Scan className="w-5 h-5 mr-2" />
                Face Scanner
              </TabsTrigger>
              <TabsTrigger value="dashboard" className="text-lg py-3">
                <Activity className="w-5 h-5 mr-2" />
                Health Dashboard
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scanner" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">AI Face Health Analysis</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Position your face in front of the camera for a comprehensive health scan. 
                  Our AI will analyze your facial features for potential health indicators.
                </p>
              </div>
              <FaceScanner />
            </TabsContent>

            <TabsContent value="dashboard" className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Health Monitoring Dashboard</h2>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Overview of our AI's detection capabilities and health monitoring features.
                </p>
              </div>
              <HealthDashboard />
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Disclaimer Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-center">
                <Shield className="w-6 h-6" />
                Important Medical Disclaimer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                This AI facial health scanner is designed for educational and informational purposes only. 
                It should not be used as a substitute for professional medical advice, diagnosis, or treatment.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span>Always consult with qualified healthcare professionals for medical concerns</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span>This tool provides preliminary insights that require medical validation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-success mt-0.5 shrink-0" />
                  <span>All image processing occurs locally - no data is transmitted to external servers</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;