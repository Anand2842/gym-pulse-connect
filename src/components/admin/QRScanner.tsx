
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { CheckCircle, ScanLine, XCircle } from 'lucide-react';

const QRScanner: React.FC = () => {
  const { members, recordAttendance } = useMockData();
  const [scanning, setScanning] = useState(false);
  const [scannedMember, setScannedMember] = useState<Member | null>(null);
  const [success, setSuccess] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);
  const [scanLines, setScanLines] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  
  // Effect to animate the scan progress
  useEffect(() => {
    if (scanning) {
      let progress = 0;
      const intervalId = setInterval(() => {
        progress += 4;
        setScanProgress(Math.min(progress, 100));
        if (progress >= 100) {
          clearInterval(intervalId);
          // Simulate successful scan after progress reaches 100%
          setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * members.length);
            const mockQrData = JSON.stringify({
              id: members[randomIndex].id,
              name: members[randomIndex].name,
              timestamp: new Date().toISOString()
            });
            handleQrResult(mockQrData);
          }, 500);
        }
      }, 100);
      
      // Start scanning animation
      setScanLines(true);
      
      return () => {
        clearInterval(intervalId);
        setScanLines(false);
        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }
      };
    }
  }, [scanning, members]);
  
  const startScanning = async () => {
    setScanning(true);
    setSuccess(false);
    setScannedMember(null);
    setScanProgress(0);
    
    // In a real implementation, we'd access the camera here
    console.log('Starting camera scan simulation');
  };
  
  const handleQrResult = async (result: string) => {
    try {
      const data = JSON.parse(result);
      
      // Find member by ID
      const member = members.find(m => m.id === data.id);
      
      if (member) {
        setScannedMember(member);
        
        // Record attendance
        await recordAttendance(member.id);
        setSuccess(true);
        
        toast({
          title: "Check-in Successful",
          description: `${member.name} has been checked in successfully.`,
          variant: "default",
        });
      } else {
        toast({
          title: "Invalid QR Code",
          description: "Member not found in the system.",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error processing QR code:", error);
      toast({
        title: "Error",
        description: "Could not process the QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setScanning(false);
    }
  };
  
  const stopScanning = () => {
    setScanning(false);
    setScanProgress(0);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Attendance Scanner</CardTitle>
        <CardDescription>
          Scan member QR codes for quick check-in
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center">
        {success ? (
          <div className="text-center py-6">
            <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-xl font-medium text-gray-900">Check-in Successful!</h3>
            <p className="mt-2 text-gray-500">
              {scannedMember?.name} has been checked in
            </p>
            <Button
              onClick={() => {
                setSuccess(false);
                setScannedMember(null);
              }}
              className="mt-4"
            >
              Scan Another Member
            </Button>
          </div>
        ) : (
          <>
            <div className="w-full max-w-sm aspect-square relative mb-4 overflow-hidden rounded-lg border-2 border-dashed">
              {scanning ? (
                <>
                  <div className="w-full h-full bg-black/10 absolute inset-0 flex items-center justify-center">
                    {/* Scan lines animation */}
                    {scanLines && (
                      <div className="absolute w-full h-1 bg-blue-500 opacity-70" 
                        style={{ 
                          top: `${(scanProgress % 100)}%`, 
                          boxShadow: '0 0 10px 2px rgba(59, 130, 246, 0.6)', 
                          transition: 'top 0.3s ease-in-out' 
                        }} 
                      />
                    )}
                    <div className="z-10">
                      <ScanLine className="h-12 w-12 text-gym-primary animate-pulse" />
                    </div>
                    
                    {/* Corners for scan effect */}
                    <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-blue-500"></div>
                    <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500"></div>
                    <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-blue-500"></div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-blue-500"></div>
                  </div>
                  
                  {/* Progress indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-200">
                    <div 
                      className="h-full bg-gym-primary transition-all duration-300 ease-out"
                      style={{ width: `${scanProgress}%` }}
                    ></div>
                  </div>
                </>
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ScanLine className="h-12 w-12 text-gray-400" />
                </div>
              )}
              <video
                ref={videoRef}
                className="w-full h-full absolute top-0 left-0 hidden"
                autoPlay
                playsInline
                muted
              ></video>
              <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
            
            {scanning ? (
              <Button variant="outline" onClick={stopScanning} className="mb-4">
                <XCircle className="h-4 w-4 mr-2" />
                Cancel Scan
              </Button>
            ) : (
              <Button onClick={startScanning} className="mb-4">
                <ScanLine className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            )}
            
            <p className="text-sm text-gray-500 text-center">
              {scanning 
                ? "Scanning... Please hold the QR code steady" 
                : "Position the QR code within the camera frame to scan"}
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QRScanner;
