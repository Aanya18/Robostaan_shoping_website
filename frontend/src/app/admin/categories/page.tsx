"use client";

import { useEffect, useState } from 'react';
import { adminAPI, productsAPI } from '@/lib/types';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function AdminCategories() {
  const { user } = useAuth() as any;
  const [categories, setCategories] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  const fetchCategories = async () => {
    try {
      const res = await adminAPI.getProducts(); // placeholder call to ensure auth usage
    } catch (e) {
      // ignore
    }
    // Use public products categories endpoint instead
    try {
      const res = await productsAPI.getCategories();
      setCategories(res.data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user && !user.is_admin) return;
    fetchCategories();
  }, [user]);

  const handleCreate = async () => {
    try {
      await adminAPI.createCategory({ name, description: desc });
      setName(''); setDesc('');
      fetchCategories();
      alert('Category created');
    } catch (err) { alert('Create failed'); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete category?')) return;
    try {
      await adminAPI.deleteCategory(id);
      fetchCategories();
    } catch { alert('Delete failed'); }
  };

  if (!user || !user.is_admin) return <div className="p-8">Access denied</div>;

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Categories</h1>
        <Link href="/admin" className="btn-secondary">Back</Link>
      </div>

      <div className="bg-white p-6 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Create Category</h2>
        <input className="input mb-2" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        <textarea className="input mb-2" placeholder="Description" value={desc} onChange={(e) => setDesc(e.target.value)} />
        <div><button onClick={handleCreate} className="btn-primary">Create</button></div>
      </div>

      <div className="bg-white p-6 rounded shadow">
        <h2 className="font-semibold mb-4">Existing Categories</h2>
        <ul className="space-y-2">
          {categories.map(cat => (
            <li key={cat.id} className="flex justify-between items-center">
              <div>
                <div className="font-medium">{cat.name}</div>
                <div className="text-sm text-gray-600">{cat.description}</div>
              </div>
              <div>
                <button onClick={() => handleDelete(cat.id)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}


