"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ordersAPI } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

export default function OrderDetail() {
  const { user } = useAuth() as any;
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [order, setOrder] = useState<any>(null);

  useEffect(() => {
    if (!user) return;
    if (!id) return;
    const fetchOrder = async () => {
      try {
        const res = await ordersAPI.getOrder(parseInt(id));
        setOrder(res.data);
      } catch (err) { console.error(err); }
    };
    fetchOrder();
  }, [id, user]);

  if (!user) return <div className="p-8">Please login</div>;
  if (!order) return <div className="p-8">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Order #{order.order_number}</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="mb-4">Total: ${order.total_amount.toFixed(2)}</div>
        <div className="mb-4">Status: {order.status}</div>
        <div className="mb-4">Items:
          <ul className="mt-2">
            {order.order_items.map((it: any) => (
              <li key={it.id}>{it.product.name} × {it.quantity} — ${it.total_price.toFixed(2)}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}


