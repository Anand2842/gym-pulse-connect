
import React, { useState } from 'react';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MemberTable from '@/components/admin/MemberTable';
import QRScanner from '@/components/admin/QRScanner';
import { useMockData } from '@/context/MockDataContext';
import { Member } from '@/types';
import { Plus, QrCode, Users } from 'lucide-react';
import AddMemberForm from '@/components/admin/AddMemberForm';
import RecordPaymentForm from '@/components/admin/RecordPaymentForm';

const MembersPage = () => {
  const { members, addMember, updateMember, deleteMember, recordPayment } = useMockData();
  
  // State for member add/edit dialog
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  
  // State for payment dialog
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [paymentMember, setPaymentMember] = useState<Member | null>(null);
  
  // State for delete confirmation dialog
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deletingMemberId, setDeletingMemberId] = useState<string | null>(null);
  
  const handleAddMember = async (memberData: Omit<Member, 'id' | 'role'>) => {
    await addMember(memberData);
    setIsAddDialogOpen(false);
  };
  
  const handleEditMember = async (memberData: Omit<Member, 'id' | 'role'>) => {
    if (editingMember) {
      await updateMember(editingMember.id, memberData as Partial<Member>);
      setIsEditDialogOpen(false);
      setEditingMember(null);
    }
  };
  
  const handleEditClick = (member: Member) => {
    setEditingMember(member);
    setIsEditDialogOpen(true);
  };
  
  const handleDeleteClick = (id: string) => {
    setDeletingMemberId(id);
    setIsDeleteDialogOpen(true);
  };
  
  const handleDeleteConfirm = async () => {
    if (deletingMemberId) {
      await deleteMember(deletingMemberId);
      setIsDeleteDialogOpen(false);
      setDeletingMemberId(null);
    }
  };
  
  const handlePaymentClick = (member: Member) => {
    setPaymentMember(member);
    setIsPaymentDialogOpen(true);
  };
  
  const handleRecordPayment = async (paymentData: any) => {
    await recordPayment(paymentData);
    setIsPaymentDialogOpen(false);
    setPaymentMember(null);
  };

  return (
    <MainLayout>
      <div className="container mx-auto py-8 px-4">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Members</h1>
            <p className="text-gray-600">Manage gym members</p>
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)} className="bg-gym-primary hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-1" />
            Add Member
          </Button>
        </div>
        
        <Tabs defaultValue="list" className="mb-6">
          <TabsList>
            <TabsTrigger value="list" className="flex items-center">
              <Users className="mr-2 h-4 w-4" /> 
              Member List
            </TabsTrigger>
            <TabsTrigger value="scan" className="flex items-center">
              <QrCode className="mr-2 h-4 w-4" /> 
              QR Scanner
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="list" className="pt-4">
            <MemberTable 
              members={members} 
              onEdit={handleEditClick}
              onDelete={handleDeleteClick}
              onPaymentClick={handlePaymentClick}
            />
          </TabsContent>
          
          <TabsContent value="scan" className="pt-4">
            <div className="max-w-md mx-auto">
              <QRScanner />
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Add Member Dialog */}
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Member</DialogTitle>
            </DialogHeader>
            <AddMemberForm onSubmit={handleAddMember} />
          </DialogContent>
        </Dialog>
        
        {/* Edit Member Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Edit Member</DialogTitle>
            </DialogHeader>
            {editingMember && (
              <AddMemberForm 
                onSubmit={handleEditMember} 
                initialData={editingMember} 
                isEdit={true} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Record Payment Dialog */}
        <Dialog open={isPaymentDialogOpen} onOpenChange={setIsPaymentDialogOpen}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Record Payment</DialogTitle>
            </DialogHeader>
            {paymentMember && (
              <RecordPaymentForm 
                member={paymentMember} 
                onSubmit={handleRecordPayment} 
              />
            )}
          </DialogContent>
        </Dialog>
        
        {/* Delete Confirmation Dialog */}
        <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the member's data from the system.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction 
                className="bg-red-500 hover:bg-red-600"
                onClick={handleDeleteConfirm}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default MembersPage;
