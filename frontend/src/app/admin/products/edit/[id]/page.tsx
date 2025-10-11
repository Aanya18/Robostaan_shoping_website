"use client";

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { adminAPI, productsAPI } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';

export default function EditProductPage() {
  const { user } = useAuth() as any;
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id') || '';
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !user.is_admin) return;
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await productsAPI.getProduct(parseInt(id));
        setProduct(res.data);
      } catch (err) {
        console.error(err);
      } finally { setLoading(false); }
    };
    fetchProduct();
  }, [id, user]);

  const handleSave = async () => {
    try {
      await adminAPI.updateProduct(parseInt(id), product);
      alert('Product updated');
      router.push('/admin/products');
    } catch (err) { alert('Update failed'); }
  };

  if (!user || !user.is_admin) return <div className="p-8">Access denied</div>;
  if (loading) return <div className="p-8">Loading...</div>;
  if (!product) return <div className="p-8">Product not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Edit Product</h1>
      <div className="bg-white p-6 rounded shadow">
        <label className="block text-sm">Name</label>
        <input className="input mb-2" value={product.name} onChange={(e) => setProduct({ ...product, name: e.target.value })} />
        <label className="block text-sm">Price</label>
        <input type="number" className="input mb-2" value={product.price} onChange={(e) => setProduct({ ...product, price: parseFloat(e.target.value) })} />
        <label className="block text-sm">Stock</label>
        <input type="number" className="input mb-2" value={product.stock_quantity} onChange={(e) => setProduct({ ...product, stock_quantity: parseInt(e.target.value) })} />
        <div className="flex space-x-2 mt-4">
          <button onClick={handleSave} className="btn-primary">Save</button>
        </div>
      </div>
    </div>
  );
}


