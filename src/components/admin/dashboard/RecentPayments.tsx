
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Member, Payment } from '@/types';

interface RecentPaymentsProps {
  payments: Payment[];
  members: Member[];
}

const RecentPayments: React.FC<RecentPaymentsProps> = ({ payments, members }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Payments</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {payments.length === 0 ? (
            <p className="text-gray-500">No payments recorded yet.</p>
          ) : (
            payments.slice(0, 5).map((payment) => {
              const member = members.find(m => m.id === payment.memberId);
              return (
                <div key={payment.id} className="flex justify-between items-center border-b pb-3 last:border-0">
                  <div>
                    <p className="font-medium">{member?.name || 'Unknown Member'}</p>
                    <p className="text-sm text-gray-500">
                      {new Date(payment.date).toLocaleDateString()} • {payment.paymentMethod}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">₹{payment.amount}</p>
                    <p className="text-xs text-gray-500 capitalize">{payment.membershipType}</p>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentPayments;
