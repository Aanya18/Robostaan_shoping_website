"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { authAPI } from '@/lib/types';

export default function ProfilePage() {
  const { user, updateProfile } = useAuth() as any;
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (user) setForm({ ...user });
  }, [user]);

  const handleChange = (e: any) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    try {
      await updateProfile(form);
      setEditing(false);
      alert('Profile updated');
    } catch (err) {
      alert('Failed to update profile');
    }
  };

  if (!user) return <div className="p-8">Please login to view your profile.</div>;

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">My Profile</h1>
      <div className="bg-white p-6 rounded shadow">
        <div className="grid grid-cols-1 gap-4">
          <label className="text-sm">Email</label>
          <input name="email" value={form.email || ''} onChange={handleChange} className="input" disabled />

          <label className="text-sm">First name</label>
          <input name="first_name" value={form.first_name || ''} onChange={handleChange} className="input" disabled={!editing} />

          <label className="text-sm">Last name</label>
          <input name="last_name" value={form.last_name || ''} onChange={handleChange} className="input" disabled={!editing} />

          <label className="text-sm">Phone</label>
          <input name="phone" value={form.phone || ''} onChange={handleChange} className="input" disabled={!editing} />

          <label className="text-sm">Address</label>
          <textarea name="address" value={form.address || ''} onChange={handleChange} className="input" disabled={!editing} />

          <div className="flex space-x-2 mt-4">
            {editing ? (
              <>
                <button onClick={handleSave} className="btn-primary">Save</button>
                <button onClick={() => setEditing(false)} className="btn-secondary">Cancel</button>
              </>
            ) : (
              <button onClick={() => setEditing(true)} className="btn-primary">Edit Profile</button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


