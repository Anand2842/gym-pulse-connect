
import React, { useState, useEffect } from 'react';
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
import { Member } from '@/types';

interface AddMemberFormProps {
  onSubmit: (memberData: Omit<Member, 'id' | 'role'>) => void;
  initialData?: Member;
  isEdit?: boolean;
}

const AddMemberForm: React.FC<AddMemberFormProps> = ({ 
  onSubmit, 
  initialData, 
  isEdit = false 
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [membershipType, setMembershipType] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [joinDate, setJoinDate] = useState(new Date().toISOString().split('T')[0]);

  // Calculate end date based on membership type and join date
  const calculateEndDate = (joinDateStr: string, type: 'monthly' | 'quarterly' | 'yearly') => {
    const date = new Date(joinDateStr);
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

  useEffect(() => {
    if (initialData) {
      setName(initialData.name);
      setEmail(initialData.email);
      setPhone(initialData.phone || '');
      setMembershipType(initialData.membershipType);
      setJoinDate(initialData.joinDate);
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const memberData = {
      name,
      email,
      phone,
      membershipType,
      joinDate,
      membershipEndDate: calculateEndDate(joinDate, membershipType),
      paymentStatus: 'pending' as const,
    };
    
    onSubmit(memberData);
    
    // Reset form if not editing
    if (!isEdit) {
      setName('');
      setEmail('');
      setPhone('');
      setMembershipType('monthly');
      setJoinDate(new Date().toISOString().split('T')[0]);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input
          id="phone"
          placeholder="Phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="membershipType">Membership Type</Label>
        <Select 
          value={membershipType} 
          onValueChange={(value: 'monthly' | 'quarterly' | 'yearly') => setMembershipType(value)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select membership type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="monthly">Monthly</SelectItem>
            <SelectItem value="quarterly">Quarterly (3 Months)</SelectItem>
            <SelectItem value="yearly">Annual</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor="joinDate">Join Date</Label>
        <Input
          id="joinDate"
          type="date"
          value={joinDate}
          onChange={(e) => setJoinDate(e.target.value)}
          required
        />
      </div>
      
      <div className="space-y-2">
        <Label>Membership End Date</Label>
        <Input
          type="date"
          value={calculateEndDate(joinDate, membershipType)}
          readOnly
          disabled
        />
        <p className="text-xs text-gray-500">
          Automatically calculated based on join date and membership type
        </p>
      </div>
      
      <Button type="submit" className="w-full bg-gym-primary hover:bg-blue-600">
        {isEdit ? 'Update Member' : 'Add Member'}
      </Button>
    </form>
  );
};

export default AddMemberForm;
