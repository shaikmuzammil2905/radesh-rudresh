'use client';

import React, { useEffect, useState } from 'react';
import { AdminHeader } from '@/components/admin/AdminHeader';
import { ImageUploadField } from '@/components/admin/ImageUploadField';
import { Project } from '@/types';
import { Plus, Edit2, Trash2, X, Briefcase, MapPin, Building2 } from 'lucide-react';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editProject, setEditProject] = useState<Partial<Project>>({
    title: '',
    client: '',
    location: '',
    category: 'Residential',
    image: '/assets/hero_slide_1.png',
    description: '',
    completionYear: '2025',
    featured: true,
  });
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const fetchProjects = async () => {
    try {
      const res = await fetch('/api/cms/projects');
      const data = await res.json();
      if (data.success) setProjects(data.projects || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpenAdd = () => {
    setIsEditing(false);
    setEditProject({
      id: `proj-${Date.now()}`,
      title: '',
      client: 'Private Client',
      location: 'Hyderabad',
      category: 'Villa',
      image: '/assets/hero_slide_1.png',
      description: 'Exclusive marble flooring and wall cladding architecture.',
      completionYear: '2025',
      featured: true,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (p: Project) => {
    setIsEditing(true);
    setEditProject({ ...p });
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/cms/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editProject),
      });
      const data = await res.json();
      if (data.success) {
        setIsModalOpen(false);
        fetchProjects();
      }
    } catch (err) {
      alert('Save failed');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await fetch(`/api/cms/projects?id=${id}`, { method: 'DELETE' });
      setDeleteId(null);
      fetchProjects();
    } catch (err) {
      alert('Delete failed');
    }
  };

  return (
    <div className="space-y-6">
      <AdminHeader
        title="Architectural Projects & Portfolio"
        subtitle="Showcase completed marble installations, corporate plazas and luxury villa residences."
      />

      <div className="flex justify-between items-center bg-white p-4 rounded-2xl border border-gray-200/80 shadow-2xs">
        <span className="text-xs font-bold text-gray-700">Total Showcase Projects: {projects.length}</span>
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-brand-500 to-pink-600 hover:from-brand-600 hover:to-pink-700 text-white rounded-xl text-xs font-bold shadow-sm transition active:scale-95 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Add Project</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((proj) => (
          <div
            key={proj.id}
            className="bg-white rounded-2xl border border-gray-200/80 overflow-hidden shadow-2xs flex flex-col justify-between hover:shadow-md transition"
          >
            <div>
              <div className="relative h-44 bg-gray-100 overflow-hidden">
                <img src={proj.image} alt={proj.title} className="w-full h-full object-cover" />
                <span className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                  {proj.category}
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="font-bold text-sm text-gray-900">{proj.title}</h3>
                <div className="flex items-center gap-1 text-[11px] text-gray-500 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-brand-500 shrink-0" />
                  <span className="truncate">{proj.location}</span>
                </div>
                <p className="text-xs text-gray-600 line-clamp-2">{proj.description}</p>
                <div className="text-[11px] text-gray-400 font-medium">Completed: {proj.completionYear}</div>
              </div>
            </div>

            <div className="p-4 pt-0 border-t border-gray-100 mt-2 flex justify-end gap-1.5 pt-3">
              <button
                onClick={() => handleOpenEdit(proj)}
                className="p-1.5 text-gray-600 hover:text-brand-600 hover:bg-pink-50 rounded-lg transition"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setDeleteId(proj.id)}
                className="p-1.5 text-gray-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-gray-200 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-3 border-b border-gray-100">
              <h2 className="text-base font-black text-gray-900">
                {isEditing ? 'Edit Project' : 'Add New Project'}
              </h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4 pt-4 text-xs">
              <div>
                <label className="block font-bold text-gray-700 mb-1">Project Title *</label>
                <input
                  type="text"
                  required
                  value={editProject.title || ''}
                  onChange={(e) => setEditProject({ ...editProject, title: e.target.value })}
                  placeholder="e.g. Jubilee Hills Luxury Villa"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Category</label>
                  <select
                    value={editProject.category || 'Residential'}
                    onChange={(e: any) => setEditProject({ ...editProject, category: e.target.value })}
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  >
                    <option value="Villa">Villa</option>
                    <option value="Residential">Residential</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Hospitality">Hospitality</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-gray-700 mb-1">Year</label>
                  <input
                    type="text"
                    value={editProject.completionYear || ''}
                    onChange={(e) => setEditProject({ ...editProject, completionYear: e.target.value })}
                    placeholder="2025"
                    className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={editProject.location || ''}
                  onChange={(e) => setEditProject({ ...editProject, location: e.target.value })}
                  placeholder="e.g. Road No 36, Jubilee Hills, Hyderabad"
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <ImageUploadField
                label="Project Photograph (AWS S3 Upload)"
                value={editProject.image || ''}
                onChange={(url) => setEditProject({ ...editProject, image: url })}
                folder="projects"
              />

              <div>
                <label className="block font-bold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  value={editProject.description || ''}
                  onChange={(e) => setEditProject({ ...editProject, description: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-xl"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-gray-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-gradient-to-r from-brand-500 to-pink-600 text-white rounded-xl font-bold shadow-md"
                >
                  Save Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-sm w-full p-5 text-center space-y-4">
            <h3 className="text-sm font-black text-gray-900">Delete Project?</h3>
            <p className="text-xs text-gray-500">Are you sure you want to delete this showcase project?</p>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => setDeleteId(null)}
                className="px-4 py-2 bg-gray-100 rounded-xl text-xs font-bold"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteId)}
                className="px-4 py-2 bg-rose-600 text-white rounded-xl text-xs font-bold"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
