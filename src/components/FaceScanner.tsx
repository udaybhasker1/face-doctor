import React, { useRef, useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Camera, Scan, Upload, AlertTriangle, CheckCircle, Brain } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface AnalysisResult {
  condition: string;
  confidence: number;
  severity: 'low' | 'medium' | 'high';
  recommendations: string[];
  description: string;
}

const FaceScanner: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const { toast } = useToast();

  // Mock AI analysis function - In production, this would call a real AI model
  const analyzeImage = useCallback(async (imageData: string): Promise<AnalysisResult> => {
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Mock analysis results with variety
    const conditions = [
      {
        condition: 'Healthy',
        confidence: 85 + Math.random() * 10,
        severity: 'low' as const,
        description: 'No significant health indicators detected. Facial analysis shows normal vital signs and skin condition.',
        recommendations: [
          'Maintain regular health checkups',
          'Continue healthy lifestyle habits',
          'Stay hydrated and get adequate sleep'
        ]
      },
      {
        condition: 'Fatigue Detection',
        confidence: 78 + Math.random() * 15,
        severity: 'medium' as const,
        description: 'Signs of fatigue detected in facial features. Eye area analysis indicates potential sleep deprivation.',
        recommendations: [
          'Ensure 7-9 hours of quality sleep',
          'Take regular breaks during work',
          'Consider stress management techniques',
          'Consult healthcare provider if fatigue persists'
        ]
      },
      {
        condition: 'Stress Indicators',
        confidence: 70 + Math.random() * 20,
        severity: 'medium' as const,
        description: 'Facial tension patterns suggest elevated stress levels. Micro-expressions indicate psychological strain.',
        recommendations: [
          'Practice relaxation techniques',
          'Consider meditation or mindfulness',
          'Evaluate work-life balance',
          'Speak with a healthcare professional'
        ]
      }
    ];

    return conditions[Math.floor(Math.random() * conditions.length)];
  }, []);

  const startCamera = useCallback(async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' 
        } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        setStream(mediaStream);
        setIsScanning(true);
        toast({
          title: "Camera activated",
          description: "Position your face in the frame for analysis"
        });
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        variant: "destructive",
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions."
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setIsScanning(false);
    }
  }, [stream]);

  const captureAndAnalyze = useCallback(async () => {
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    ctx.drawImage(video, 0, 0);

    const imageData = canvas.toDataURL('image/jpeg', 0.8);
    setCapturedImage(imageData);
    stopCamera();
    setIsAnalyzing(true);

    try {
      const result = await analyzeImage(imageData);
      setAnalysisResult(result);
      toast({
        title: "Analysis Complete",
        description: `${result.condition} detected with ${result.confidence.toFixed(1)}% confidence`
      });
    } catch (error) {
      console.error('Analysis error:', error);
      toast({
        variant: "destructive",
        title: "Analysis Failed",
        description: "Unable to complete facial analysis. Please try again."
      });
    } finally {
      setIsAnalyzing(false);
    }
  }, [analyzeImage, stopCamera, toast]);

  const handleFileUpload = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      const imageData = e.target?.result as string;
      setCapturedImage(imageData);
      setIsAnalyzing(true);

      try {
        const result = await analyzeImage(imageData);
        setAnalysisResult(result);
        toast({
          title: "Analysis Complete",
          description: `${result.condition} detected with ${result.confidence.toFixed(1)}% confidence`
        });
      } catch (error) {
        console.error('Analysis error:', error);
        toast({
          variant: "destructive",
          title: "Analysis Failed",
          description: "Unable to analyze uploaded image. Please try again."
        });
      } finally {
        setIsAnalyzing(false);
      }
    };
    reader.readAsDataURL(file);
  }, [analyzeImage, toast]);

  const resetAnalysis = useCallback(() => {
    setAnalysisResult(null);
    setCapturedImage(null);
    setIsAnalyzing(false);
  }, []);

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, [stopCamera]);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-success';
      case 'medium': return 'bg-warning';
      case 'high': return 'bg-destructive';
      default: return 'bg-muted';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'low': return <CheckCircle className="w-4 h-4" />;
      case 'medium': return <AlertTriangle className="w-4 h-4" />;
      case 'high': return <AlertTriangle className="w-4 h-4" />;
      default: return <Brain className="w-4 h-4" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Scanner Interface */}
      <Card className="overflow-hidden">
        <CardHeader className="bg-gradient-medical text-primary-foreground">
          <CardTitle className="flex items-center gap-2">
            <Brain className="w-6 h-6" />
            AI Facial Health Scanner
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="relative">
            {/* Video/Image Display */}
            <div className="relative bg-muted rounded-lg overflow-hidden aspect-video mb-4">
              {isScanning && (
                <>
                  <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    muted
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-4 border-2 border-accent rounded-lg animate-medical-pulse">
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-accent"></div>
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-accent"></div>
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-accent"></div>
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-accent"></div>
                  </div>
                </>
              )}
              
              {capturedImage && (
                <img 
                  src={capturedImage} 
                  alt="Captured for analysis" 
                  className="w-full h-full object-cover"
                />
              )}
              
              {!isScanning && !capturedImage && (
                <div className="flex items-center justify-center h-full text-muted-foreground">
                  <div className="text-center">
                    <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Camera preview will appear here</p>
                  </div>
                </div>
              )}

              {isAnalyzing && (
                <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-scan animate-medical-pulse"></div>
                    <p className="text-lg font-medium">Analyzing facial features...</p>
                    <p className="text-sm text-muted-foreground">This may take a moment</p>
                  </div>
                </div>
              )}
            </div>

            {/* Controls */}
            <div className="flex flex-wrap gap-4 justify-center">
              {!isScanning && !capturedImage && (
                <>
                  <Button 
                    variant="medical" 
                    size="lg" 
                    onClick={startCamera}
                    disabled={isAnalyzing}
                  >
                    <Camera className="w-5 h-5 mr-2" />
                    Start Camera
                  </Button>
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isAnalyzing}
                  >
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Image
                  </Button>
                </>
              )}

              {isScanning && (
                <>
                  <Button 
                    variant="scan" 
                    size="lg" 
                    onClick={captureAndAnalyze}
                    disabled={isAnalyzing}
                  >
                    <Scan className="w-5 h-5 mr-2" />
                    Analyze Face
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={stopCamera}
                    disabled={isAnalyzing}
                  >
                    Cancel
                  </Button>
                </>
              )}

              {(capturedImage || analysisResult) && !isScanning && (
                <Button 
                  variant="outline" 
                  onClick={resetAnalysis}
                  disabled={isAnalyzing}
                >
                  New Scan
                </Button>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Analysis Results */}
      {analysisResult && (
        <Card className="animate-fade-in-up">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {getSeverityIcon(analysisResult.severity)}
              Analysis Results
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-xl font-semibold">{analysisResult.condition}</h3>
                <p className="text-muted-foreground">{analysisResult.description}</p>
              </div>
              <div className="flex flex-col items-end gap-2">
                <Badge className={getSeverityColor(analysisResult.severity)}>
                  {analysisResult.confidence.toFixed(1)}% Confidence
                </Badge>
                <Badge variant="outline">
                  {analysisResult.severity.toUpperCase()} Priority
                </Badge>
              </div>
            </div>

            <div>
              <h4 className="font-medium mb-2">Recommendations:</h4>
              <ul className="space-y-1">
                {analysisResult.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-success shrink-0" />
                    {rec}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm text-muted-foreground">
                <strong>Disclaimer:</strong> This AI analysis is for informational purposes only and should not replace professional medical advice. 
                Please consult with a healthcare provider for any health concerns.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
};

export default FaceScanner;