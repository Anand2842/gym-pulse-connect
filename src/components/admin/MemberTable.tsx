
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Member } from '@/types';
import { Edit, Trash2, Search, IndianRupee, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface MemberTableProps {
  members: Member[];
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onPaymentClick?: (member: Member) => void;
}

const MemberTable: React.FC<MemberTableProps> = ({ members, onEdit, onDelete, onPaymentClick }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredMembers = members.filter(member => 
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (member.phone && member.phone.includes(searchQuery))
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'overdue':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center relative">
        <Search className="absolute left-3 text-gray-400" size={18} />
        <Input
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Membership</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Join Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredMembers.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                  No members found
                </TableCell>
              </TableRow>
            ) : (
              filteredMembers.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="text-sm">{member.email}</span>
                      <span className="text-xs text-gray-500">{member.phone}</span>
                    </div>
                  </TableCell>
                  <TableCell className="capitalize">{member.membershipType}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={getStatusBadgeColor(member.paymentStatus)}>
                      {member.paymentStatus}
                    </Badge>
                  </TableCell>
                  <TableCell>{new Date(member.joinDate).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(member.membershipEndDate).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {onPaymentClick && (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={() => onPaymentClick(member)}
                          className="h-8 w-8 p-0 border-emerald-200 text-emerald-600 hover:bg-emerald-50"
                          title="Record Payment"
                        >
                          <IndianRupee className="h-4 w-4" />
                          <span className="sr-only">Payment</span>
                        </Button>
                      )}
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onEdit(member)}
                        className="h-8 w-8 p-0"
                        title="Edit Member"
                      >
                        <Edit className="h-4 w-4" />
                        <span className="sr-only">Edit</span>
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onDelete(member.id)}
                        className="h-8 w-8 p-0 border-red-200 text-red-600 hover:bg-red-50"
                        title="Delete Member"
                      >
                        <Trash2 className="h-4 w-4" />
                        <span className="sr-only">Delete</span>
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
  );
};

export default MemberTable;
