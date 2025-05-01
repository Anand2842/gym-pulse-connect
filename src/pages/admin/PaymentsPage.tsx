
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { PlusCircle, Search, IndianRupee, MessageSquare } from 'lucide-react';
import RecordPaymentForm from '@/components/admin/RecordPaymentForm';
import WhatsAppPaymentReminder from '@/components/admin/WhatsAppPaymentReminder';

const PaymentsPage = () => {
  const { payments, members, recordPayment } = useMockData();
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for payment dialog
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  
  // State for WhatsApp reminder dialog
  const [isReminderDialogOpen, setIsReminderDialogOpen] = useState(false);
  
  // Filter members based on search query
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  // Filter payments based on search query
  const filteredPayments = searchQuery === '' 
    ? payments 
    : payments.filter(payment => {
        const member = members.find(m => m.id === payment.memberId);
        return member?.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
               member?.email.toLowerCase().includes(searchQuery.toLowerCase());
      });

  const handlePaymentClick = (member: Member) => {
    setSelectedMember(member);
    setIsPaymentDialogOpen(true);
  };
  
  const handleReminderClick = (member: Member) => {
    setSelectedMember(member);
    setIsReminderDialogOpen(true);
  };
  
  const handleRecordPayment = async (paymentData: any) => {
    await recordPayment(paymentData);
    setIsPaymentDialogOpen(false);
    setSelectedMember(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payments</h1>
            <p className="text-gray-600">Track and record payments</p>
          </div>
        </div>
        
        <div className="space-y-8">
          {/* Payment Records Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Payment Records</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search payments..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Member</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No payments found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredPayments.map((payment) => {
                      const member = members.find(m => m.id === payment.memberId);
                      return (
                        <TableRow key={payment.id}>
                          <TableCell>
                            {new Date(payment.date).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="font-medium">{member?.name || 'Unknown'}</TableCell>
                          <TableCell className="capitalize">{payment.membershipType}</TableCell>
                          <TableCell className="capitalize">{payment.paymentMethod}</TableCell>
                          <TableCell className="text-right font-semibold">₹{payment.amount}</TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
          
          {/* Record New Payment Section */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Record New Payment</h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <Input
                  placeholder="Search members..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Membership</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>End Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className="text-center py-8 text-gray-500">
                        No members found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="font-medium">{member.name}</div>
                          <div className="text-sm text-gray-500">{member.email}</div>
                        </TableCell>
                        <TableCell className="capitalize">{member.membershipType}</TableCell>
                        <TableCell>
                          <div className={`
                            inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                            ${member.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 
                              member.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                              'bg-red-100 text-red-800'}
                          `}>
                            {member.paymentStatus}
                          </div>
                        </TableCell>
                        <TableCell>{new Date(member.membershipEndDate).toLocaleDateString()}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end space-x-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handlePaymentClick(member)}
                              className="h-8"
                            >
                              <IndianRupee className="h-4 w-4 mr-2" />
                              Record Payment
                            </Button>
                            
                            {/* WhatsApp Reminder Button */}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleReminderClick(member)}
                              className="h-8 bg-green-50 hover:bg-green-100 border-green-200 text-green-700"
                            >
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Remind
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
        
        {/* Record Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            {selectedMember && (
              <RecordPaymentForm 
                member={selectedMember} 
                onSubmit={handleRecordPayment} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* WhatsApp Reminder Dialog */}
        <Dialog open={isReminderDialogOpen} onOpenChange={setIsReminderDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Send Payment Reminder</DialogTitle>
            </DialogHeader>
            {selectedMember && (
              <WhatsAppPaymentReminder 
                member={selectedMember} 
                onClose={() => setIsReminderDialogOpen(false)}
              />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default PaymentsPage;
