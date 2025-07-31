import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Heart, 
  Brain, 
  Activity, 
  Eye, 
  Thermometer, 
  TrendingUp,
  Clock,
  Shield
} from 'lucide-react';

const HealthDashboard: React.FC = () => {
  const healthMetrics = [
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Cardiovascular",
      description: "Heart rate & circulation analysis",
      status: "Normal",
      confidence: 92,
      color: "bg-success"
    },
    {
      icon: <Brain className="w-5 h-5" />,
      title: "Neurological",
      description: "Facial symmetry & nerve function",
      status: "Healthy",
      confidence: 88,
      color: "bg-success"
    },
    {
      icon: <Eye className="w-5 h-5" />,
      title: "Vision Health",
      description: "Eye movement & pupil response",
      status: "Monitor",
      confidence: 76,
      color: "bg-warning"
    },
    {
      icon: <Thermometer className="w-5 h-5" />,
      title: "Inflammatory",
      description: "Skin temperature patterns",
      status: "Normal",
      confidence: 84,
      color: "bg-success"
    }
  ];

  const detectionCapabilities = [
    "Fatigue and stress indicators",
    "Cardiovascular health markers", 
    "Neurological symmetry analysis",
    "Sleep deprivation signs",
    "Inflammatory responses",
    "Mental health indicators"
  ];

  return (
    <div className="space-y-6">
      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-medical transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-2 bg-primary/10 rounded-lg text-primary">
                  {metric.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-sm">{metric.title}</h3>
                  <Badge className={`${metric.color} text-xs`}>
                    {metric.confidence}%
                  </Badge>
                </div>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{metric.description}</p>
              <div className="text-sm font-medium">{metric.status}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Detection Capabilities */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5" />
            AI Detection Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {detectionCapabilities.map((capability, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                <div className="w-2 h-2 bg-accent rounded-full"></div>
                <span className="text-sm">{capability}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Activity className="w-8 h-8 text-primary" />
            </div>
            <div className="text-2xl font-bold">98.5%</div>
            <div className="text-sm text-muted-foreground">Accuracy Rate</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <Clock className="w-8 h-8 text-accent" />
            </div>
            <div className="text-2xl font-bold">&lt; 3s</div>
            <div className="text-sm text-muted-foreground">Analysis Time</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center mb-2">
              <TrendingUp className="w-8 h-8 text-success" />
            </div>
            <div className="text-2xl font-bold">15+</div>
            <div className="text-sm text-muted-foreground">Health Markers</div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default HealthDashboard;