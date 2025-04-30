
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { CheckCircle2, Send, Template } from 'lucide-react';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { toast } from '@/components/ui/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const MESSAGE_TEMPLATES = [
  {
    id: 'payment_reminder',
    name: 'Payment Reminder',
    template: 'Hello {name}, this is a friendly reminder that your membership payment of ₹{amount} is due on {date}. Please make the payment to continue enjoying our gym facilities. Thank you!'
  },
  {
    id: 'membership_renewal',
    name: 'Membership Renewal',
    template: 'Hi {name}, your gym membership is expiring on {date}. Visit us to renew your membership and continue your fitness journey without interruption!'
  },
  {
    id: 'class_reminder',
    name: 'Class Reminder',
    template: 'Hi {name}, just a reminder that your {class} class is scheduled for tomorrow at {time}. Don\'t forget to bring your water bottle and towel!'
  },
  {
    id: 'birthday_wish',
    name: 'Birthday Wish',
    template: 'Happy Birthday {name}! 🎉 The entire FlexFit Gym team wishes you a fantastic day. As a birthday gift, enjoy a free personal training session this week!'
  },
  {
    id: 'custom',
    name: 'Custom Message',
    template: ''
  }
];

const WhatsAppNotificationPanel: React.FC = () => {
  const { members, sendWhatsAppNotification } = useMockData();
  const [selectedTemplate, setSelectedTemplate] = useState(MESSAGE_TEMPLATES[0]);
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [message, setMessage] = useState(MESSAGE_TEMPLATES[0].template);
  const [sending, setSending] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  
  const handleTemplateChange = (templateId: string) => {
    const template = MESSAGE_TEMPLATES.find(t => t.id === templateId) || MESSAGE_TEMPLATES[0];
    setSelectedTemplate(template);
    setMessage(template.template);
  };
  
  const handleSelectAll = () => {
    if (selectedMembers.length === filteredMembers.length) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(filteredMembers.map(m => m.id));
    }
  };
  
  const handleSelectMember = (memberId: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberId) 
        ? prev.filter(id => id !== memberId)
        : [...prev, memberId]
    );
  };
  
  const handleSendNotification = async () => {
    if (selectedMembers.length === 0) {
      toast({
        title: "No members selected",
        description: "Please select at least one member to send the notification.",
        variant: "destructive",
      });
      return;
    }
    
    setSending(true);
    
    try {
      // For each selected member, personalize and send the message
      for (const memberId of selectedMembers) {
        const member = members.find(m => m.id === memberId);
        if (member) {
          const personalizedMessage = personalizeMemberMessage(member);
          await sendWhatsAppNotification(member.id, personalizedMessage);
        }
      }
      
      toast({
        title: "Notifications sent",
        description: `Successfully sent notifications to ${selectedMembers.length} member(s).`,
      });
      
      // Reset selections after successful send
      setSelectedMembers([]);
    } catch (error) {
      console.error("Error sending notifications:", error);
      toast({
        title: "Failed to send notifications",
        description: "There was an error sending WhatsApp notifications.",
        variant: "destructive",
      });
    } finally {
      setSending(false);
    }
  };
  
  const personalizeMemberMessage = (member: Member): string => {
    let personalizedMsg = message;
    
    // Replace placeholders with actual member data
    personalizedMsg = personalizedMsg.replace(/{name}/g, member.name);
    personalizedMsg = personalizedMsg.replace(/{date}/g, member.membershipEndDate);
    
    // Calculate due amount based on membership type
    let amount = "1000";
    if (member.membershipType === 'quarterly') amount = "2700";
    if (member.membershipType === 'yearly') amount = "10000";
    personalizedMsg = personalizedMsg.replace(/{amount}/g, amount);
    
    // Add more placeholder replacements as needed
    
    return personalizedMsg;
  };
  
  // Filter members based on search query and filter type
  const filteredMembers = members.filter(member => {
    // Filter by search query
    const matchesQuery = member.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         member.phone?.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by membership status
    if (filterType === 'overdue' && member.paymentStatus !== 'overdue') return false;
    if (filterType === 'expiring' && new Date(member.membershipEndDate) > new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)) return false;
    if (filterType === 'active' && member.paymentStatus !== 'paid') return false;
    
    return matchesQuery;
  });
  
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Send size={20} className="text-green-500" />
          WhatsApp Notifications
        </CardTitle>
        <CardDescription>
          Send WhatsApp notifications to gym members
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="template">Message Template</Label>
          <Select 
            value={selectedTemplate.id} 
            onValueChange={handleTemplateChange}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select a template" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Message Templates</SelectLabel>
                {MESSAGE_TEMPLATES.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            placeholder="Enter your message here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-32"
          />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label>Select Recipients</Label>
            <div className="flex gap-2">
              <Select 
                value={filterType} 
                onValueChange={setFilterType}
              >
                <SelectTrigger className="w-36">
                  <SelectValue placeholder="Filter members" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="all">All Members</SelectItem>
                    <SelectItem value="overdue">Overdue Payments</SelectItem>
                    <SelectItem value="expiring">Expiring Soon</SelectItem>
                    <SelectItem value="active">Active Members</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              
              <Button 
                variant="outline" 
                size="sm"
                onClick={handleSelectAll}
              >
                {selectedMembers.length === filteredMembers.length ? "Unselect All" : "Select All"}
              </Button>
            </div>
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search members..."
              className="w-full px-3 py-2 border rounded-md mb-2"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <ScrollArea className="h-64 border rounded-md">
            <div className="p-2 space-y-1">
              {filteredMembers.length === 0 ? (
                <p className="text-sm text-center py-4 text-muted-foreground">No members found</p>
              ) : (
                filteredMembers.map(member => (
                  <div 
                    key={member.id} 
                    className={`flex items-center space-x-2 p-2 rounded-md hover:bg-accent cursor-pointer ${
                      selectedMembers.includes(member.id) ? 'bg-accent/50' : ''
                    }`}
                    onClick={() => handleSelectMember(member.id)}
                  >
                    <Checkbox 
                      id={`member-${member.id}`}
                      checked={selectedMembers.includes(member.id)}
                      onCheckedChange={() => handleSelectMember(member.id)}
                    />
                    <div className="flex-1">
                      <label 
                        htmlFor={`member-${member.id}`} 
                        className="text-sm font-medium cursor-pointer"
                      >
                        {member.name}
                      </label>
                      <p className="text-xs text-gray-500">{member.phone}</p>
                    </div>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${
                      member.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                      member.paymentStatus === 'overdue' ? 'bg-red-100 text-red-800' : 
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {member.paymentStatus}
                    </span>
                  </div>
                ))
              )}
            </div>
          </ScrollArea>
          
          <p className="text-sm text-muted-foreground">
            {selectedMembers.length} member{selectedMembers.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </CardContent>
      
      <CardFooter>
        <Button 
          onClick={handleSendNotification} 
          disabled={sending || selectedMembers.length === 0}
          className="w-full"
        >
          {sending ? (
            <>Sending <span className="animate-pulse">...</span></>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Send WhatsApp Notifications
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default WhatsAppNotificationPanel;
