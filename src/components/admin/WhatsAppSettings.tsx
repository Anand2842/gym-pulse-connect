
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Settings } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const WhatsAppSettings: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [isVerified, setIsVerified] = useState(false);
  const [autoSettings, setAutoSettings] = useState({
    paymentReminders: true,
    membershipExpiry: true,
    birthdayWishes: false,
    classReminders: true
  });
  
  const handleVerify = () => {
    if (!phoneNumber || !apiKey) {
      toast({
        title: "Missing information",
        description: "Please enter both phone number and API key",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate API verification
    setTimeout(() => {
      setIsVerified(true);
      toast({
        title: "WhatsApp verified",
        description: "Your WhatsApp Business account has been successfully verified",
      });
    }, 1500);
  };
  
  const handleSaveSettings = () => {
    toast({
      title: "Settings saved",
      description: "Your WhatsApp notification settings have been updated",
    });
  };
  
  const toggleSetting = (setting: keyof typeof autoSettings) => {
    setAutoSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Settings size={20} className="text-blue-500" />
          WhatsApp Integration Settings
        </CardTitle>
        <CardDescription>
          Configure your WhatsApp Business API integration
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="account">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="account">Account</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="account" className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="phone">WhatsApp Business Phone Number</Label>
              <Input
                id="phone"
                placeholder="+91 98765 43210"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                Enter the phone number associated with your WhatsApp Business account
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                placeholder="WhatsApp Business API Key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                You can find this in your WhatsApp Business API dashboard
              </p>
            </div>
            
            <Button 
              onClick={handleVerify} 
              variant="outline"
              disabled={isVerified}
              className="w-full"
            >
              {isVerified ? 'Verified ✓' : 'Verify Connection'}
            </Button>
            
            {isVerified && (
              <div className="rounded-md bg-green-50 p-3 mt-4">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <Settings size={16} className="text-green-500" />
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-green-800">
                      Connection Verified
                    </h3>
                    <div className="mt-1 text-xs text-green-700">
                      Your WhatsApp Business account is properly connected and ready to use.
                    </div>
                  </div>
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="notifications" className="space-y-6 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Payment Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Send automatic reminders when payments are due
                </p>
              </div>
              <Switch 
                checked={autoSettings.paymentReminders} 
                onCheckedChange={() => toggleSetting('paymentReminders')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Membership Expiry</h4>
                <p className="text-sm text-muted-foreground">
                  Send reminders 7 days before membership expires
                </p>
              </div>
              <Switch 
                checked={autoSettings.membershipExpiry} 
                onCheckedChange={() => toggleSetting('membershipExpiry')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Birthday Wishes</h4>
                <p className="text-sm text-muted-foreground">
                  Send automatic birthday greetings to members
                </p>
              </div>
              <Switch 
                checked={autoSettings.birthdayWishes} 
                onCheckedChange={() => toggleSetting('birthdayWishes')} 
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Class Reminders</h4>
                <p className="text-sm text-muted-foreground">
                  Send reminders before scheduled classes
                </p>
              </div>
              <Switch 
                checked={autoSettings.classReminders} 
                onCheckedChange={() => toggleSetting('classReminders')} 
              />
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter>
        <Button onClick={handleSaveSettings} className="w-full">
          Save Settings
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppSettings;
