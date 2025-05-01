
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { WhatsApp } from 'lucide-react';
import { Member } from '@/types';
import { useMockData } from '@/context/MockDataContext';
import { toast } from 'sonner';

interface WhatsAppPaymentReminderProps {
  member: Member;
  onClose: () => void;
}

const WhatsAppPaymentReminder: React.FC<WhatsAppPaymentReminderProps> = ({ member, onClose }) => {
  const { sendWhatsAppNotification } = useMockData();
  const [message, setMessage] = useState(
    `Hello ${member.name}, this is a friendly reminder that your membership payment of ₹${getMembershipAmount(member.membershipType)} is due. Please make the payment to continue enjoying our gym facilities. Thank you!`
  );
  const [sending, setSending] = useState(false);

  const getMembershipAmount = (membershipType: string): string => {
    switch (membershipType) {
      case 'monthly':
        return '1000';
      case 'quarterly':
        return '2700';
      case 'yearly':
        return '10000';
      default:
        return '0';
    }
  };

  const handleSendReminder = async () => {
    if (!message.trim()) {
      toast.error("Message cannot be empty");
      return;
    }

    setSending(true);
    try {
      await sendWhatsAppNotification(member.id, message);
      toast.success("Payment reminder sent successfully");
      onClose();
    } catch (error) {
      console.error("Error sending WhatsApp notification:", error);
      toast.error("Failed to send payment reminder");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <p className="font-medium text-sm">Sending reminder to: {member.name}</p>
        <p className="text-sm text-gray-600">Phone: {member.phone}</p>
        <p className="text-sm text-gray-600">Status: {member.paymentStatus}</p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">Reminder Message</Label>
        <Textarea
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="min-h-32"
        />
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onClose} disabled={sending}>
          Cancel
        </Button>
        <Button 
          onClick={handleSendReminder} 
          className="bg-green-600 hover:bg-green-700"
          disabled={sending}
        >
          {sending ? (
            <span className="flex items-center">
              Sending<span className="animate-pulse">...</span>
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <WhatsApp size={16} />
              Send Reminder
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default WhatsAppPaymentReminder;
