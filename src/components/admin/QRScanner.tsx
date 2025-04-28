
import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from '@/components/ui/use-toast';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { CheckCircle, Camera, XCircle } from 'lucide-react';

const QRScanner: React.FC = () => {
  const { members, recordAttendance } = useMockData();
  const [scanning, setScanning] = useState(false);
  const [scannedMember, setScannedMember] = useState<Member | null>(null);
  const [success, setSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // This is a mock implementation since we can't access real camera in this environment
  // In a real implementation, we'd use a library like react-qr-reader
  const startScanning = async () => {
    setScanning(true);
    setSuccess(false);
    setScannedMember(null);
    
    // Simulate QR scanning process
    setTimeout(() => {
      // In a real app, this would come from the QR scanner
      const mockQrData = JSON.stringify({
        id: members[0].id,
        name: members[0].name,
        timestamp: new Date().toISOString()
      });
      
      handleQrResult(mockQrData);
    }, 2000);
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
    // In a real implementation, we'd stop the camera stream here
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
            <div className="w-full max-w-sm aspect-square relative mb-4">
              {scanning ? (
                <>
                  <Skeleton className="w-full h-full absolute" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Camera className="h-12 w-12 text-gray-400 animate-pulse" />
                  </div>
                </>
              ) : (
                <div className="w-full h-full border-2 border-dashed rounded-lg flex items-center justify-center">
                  <Camera className="h-12 w-12 text-gray-400" />
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
                <Camera className="h-4 w-4 mr-2" />
                Start Scanning
              </Button>
            )}
            
            <p className="text-sm text-gray-500 text-center">
              Position the QR code within the camera frame to scan
            </p>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default QRScanner;
