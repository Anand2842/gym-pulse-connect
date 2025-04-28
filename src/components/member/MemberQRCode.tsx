
import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';

interface MemberQRCodeProps {
  size?: number;
  showDownload?: boolean;
}

const MemberQRCode: React.FC<MemberQRCodeProps> = ({ 
  size = 200, 
  showDownload = true 
}) => {
  const { currentUser } = useMockData();
  
  if (!currentUser || currentUser.role !== 'member') {
    return null;
  }
  
  const member = currentUser as Member;
  
  // Creating a QR code value that includes member ID and a timestamp
  // This makes each QR code unique and can be validated server-side
  const qrValue = JSON.stringify({
    id: member.id,
    name: member.name,
    timestamp: new Date().toISOString()
  });

  const handleDownloadQR = () => {
    const canvas = document.getElementById('member-qr-code') as HTMLCanvasElement;
    if (!canvas) return;
    
    const url = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.download = `gympulse-qr-${member.name.replace(/\s+/g, '-').toLowerCase()}.png`;
    link.href = url;
    link.click();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base font-medium">Your GymPulse QR Code</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center pt-0">
        <div className="bg-white p-3 rounded-md shadow-sm mb-4">
          <QRCodeSVG
            id="member-qr-code"
            value={qrValue}
            size={size}
            level="H"
            includeMargin={true}
            bgColor="#FFFFFF"
            fgColor="#000000"
          />
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">
          Show this QR code at the gym entrance for quick check-in
        </p>
        
        {showDownload && (
          <Button 
            variant="outline" 
            onClick={handleDownloadQR} 
            className="flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Download QR Code
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default MemberQRCode;
