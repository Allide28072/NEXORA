/**
 * NEXORA Virtual File Storage & Explorer
 * Hierarchical folders, file metadata, mime-type categorization, and upload simulator.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { StorageFile } from '../../types';
import {
  HardDrive,
  Folder,
  File,
  FileText,
  FileCode,
  Image as ImageIcon,
  Upload,
  Download,
  Trash2,
  CheckCircle2,
  X
} from 'lucide-react';

export const StorageViewer: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [files, setFiles] = useState<StorageFile[]>(() => Database.getFiles());
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [newFileName, setNewFileName] = useState('');
  const [newMimeType, setNewMimeType] = useState('application/pdf');

  const totalBytes = files.reduce((acc, f) => acc + f.fileSizeBytes, 0);
  const totalMb = (totalBytes / (1024 * 1024)).toFixed(2);

  const getFileIcon = (mime: string) => {
    if (mime.includes('image')) return <ImageIcon className="w-4 h-4 text-emerald-400" />;
    if (mime.includes('pdf')) return <FileText className="w-4 h-4 text-rose-400" />;
    return <FileCode className="w-4 h-4 text-indigo-400" />;
  };

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFileName.trim()) return;

    Database.uploadFile({
      name: newFileName.trim(),
      folderId: 'root',
      fileSizeBytes: Math.floor(100000 + Math.random() * 2000000),
      mimeType: newMimeType,
      uploadedBy: currentUser.fullName,
      storageUrl: '#',
      isPublic: true
    });

    setFiles(Database.getFiles());
    setIsUploadModalOpen(false);
    setNewFileName('');
    showToast('File uploaded successfully', 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Virtual File Storage & Artifacts
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Store, catalog, and manage enterprise architecture schematics, documents, and release bundles.
          </p>
        </div>

        <button
          onClick={() => setIsUploadModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-lg transition-colors whitespace-nowrap cursor-pointer"
        >
          <Upload className="w-4 h-4" />
          <span>Upload File</span>
        </button>
      </div>

      {/* Storage Quota Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            <HardDrive className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-slate-200">Storage Usage</span>
          </div>
          <span className="font-mono text-slate-300 tabular-nums">
            {totalMb} MB <span className="text-slate-500 font-normal">of 50,000 MB</span>
          </span>
        </div>
        <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-indigo-500 rounded-full" style={{ width: '1%' }} />
        </div>
      </div>

      {/* File Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="px-5 py-3.5 border-b border-slate-800 flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-200">Cataloged Files</span>
          <span className="text-[11px] font-mono text-slate-400 tabular-nums">{files.length} items</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-950/50 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-3">File Name</th>
                <th className="px-4 py-3 w-36">MIME Type</th>
                <th className="px-4 py-3 w-28">Size</th>
                <th className="px-4 py-3 w-40">Uploaded By</th>
                <th className="px-4 py-3 w-32">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-mono">
              {files.map((file) => (
                <tr key={file.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="px-4 py-3 text-slate-200 font-sans flex items-center gap-2.5">
                    {getFileIcon(file.mimeType)}
                    <span className="font-medium">{file.name}</span>
                  </td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">{file.mimeType}</td>
                  <td className="px-4 py-3 text-slate-300 tabular-nums text-[11px]">
                    {(file.fileSizeBytes / 1024).toFixed(1)} KB
                  </td>
                  <td className="px-4 py-3 text-slate-400 font-sans text-[11px]">{file.uploadedBy}</td>
                  <td className="px-4 py-3 text-slate-400 text-[11px]">
                    {file.createdAt.split('T')[0]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-md w-full p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100">Upload Virtual File</h3>
              <button onClick={() => setIsUploadModalOpen(false)} className="text-slate-400 hover:text-slate-200">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleUpload} className="space-y-4 text-xs">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  File Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. system_architecture_spec.pdf"
                  value={newFileName}
                  onChange={(e) => setNewFileName(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  MIME Category
                </label>
                <select
                  value={newMimeType}
                  onChange={(e) => setNewMimeType(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-slate-200 focus:outline-none focus:border-indigo-500"
                >
                  <option value="application/pdf">application/pdf</option>
                  <option value="image/svg+xml">image/svg+xml</option>
                  <option value="image/png">image/png</option>
                  <option value="application/json">application/json</option>
                  <option value="text/typescript">text/typescript</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-medium transition-colors"
                >
                  Upload & Register
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
