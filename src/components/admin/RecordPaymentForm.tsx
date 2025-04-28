
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Member, Payment } from '@/types';

interface RecordPaymentFormProps {
  member: Member;
  onSubmit: (payment: Omit<Payment, 'id'>) => void;
}

const RecordPaymentForm: React.FC<RecordPaymentFormProps> = ({ member, onSubmit }) => {
  const [amount, setAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'online' | 'card'>('cash');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  
  // Calculate membership end date based on current date and membership type
  const calculateEndDate = (startDate: string, type: 'monthly' | 'quarterly' | 'yearly') => {
    const date = new Date(startDate);
    switch (type) {
      case 'monthly':
        date.setMonth(date.getMonth() + 1);
        break;
      case 'quarterly':
        date.setMonth(date.getMonth() + 3);
        break;
      case 'yearly':
        date.setFullYear(date.getFullYear() + 1);
        break;
    }
    return date.toISOString().split('T')[0];
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const validUntil = calculateEndDate(date, member.membershipType);
    
    const paymentData: Omit<Payment, 'id'> = {
      memberId: member.id,
      amount: parseFloat(amount),
      date,
      paymentMethod,
      membershipType: member.membershipType,
      validUntil,
      status: 'completed'
    };
    
    onSubmit(paymentData);
    
    // Reset form
    setAmount('');
    setPaymentMethod('cash');
    setDate(new Date().toISOString().split('T')[0]);
  };

  const suggestedAmount = () => {
    switch (member.membershipType) {
      case 'monthly':
        return 1000;
      case 'quarterly':
        return 2700;
      case 'yearly':
        return 10000;
      default:
        return 0;
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="bg-blue-50 p-3 rounded-md mb-4">
        <p className="font-medium text-sm">Payment for: {member.name}</p>
        <p className="text-sm text-gray-600">Membership: {member.membershipType}</p>
        <p className="text-sm text-gray-600">Current status: {member.paymentStatus}</p>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount (₹)</Label>
        <Input
          id="amount"
          type="number"
          min="0"
          step="100"
          placeholder={`Suggested: ₹${suggestedAmount()}`}
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="paymentMethod">Payment Method</Label>
        <Select 
          value={paymentMethod} 
          onValueChange={(value: 'cash' | 'online' | 'card') => setPaymentMethod(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select payment method" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cash">Cash</SelectItem>
            <SelectItem value="online">Online Transfer</SelectItem>
            <SelectItem value="card">Card</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="date">Payment Date</Label>
        <Input
          id="date"
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Valid Until</Label>
        <Input
          type="date"
          value={calculateEndDate(date, member.membershipType)}
          disabled
        />
        <p className="text-xs text-gray-500">
          Membership valid until date (auto-calculated)
        </p>
      </div>
      
      <Button type="submit" className="w-full bg-gym-secondary hover:bg-emerald-600">
        Record Payment
      </Button>
    </form>
  );
};

export default RecordPaymentForm;
