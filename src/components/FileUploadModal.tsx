import React, { useState, useRef } from 'react';
import { 
  X, 
  Upload, 
  Video, 
  Image as ImageIcon, 
  AlertCircle, 
  FileCheck, 
  Sparkles,
  RefreshCw,
  FolderOpen
} from 'lucide-react';
import { Creator, CreatorNiche, CreatorPortfolioItem, ThemeMode } from '../types';
import { allCreatorNiches } from '../data/mockData';

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  creators: Creator[];
  currentCreatorId?: string;
  onUploadSuccess: (creatorId: string, item: CreatorPortfolioItem) => void;
  theme?: ThemeMode;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({
  isOpen,
  onClose,
  creators,
  currentCreatorId,
  onUploadSuccess,
  theme = 'dark'
}) => {
  const [selectedCreatorId, setSelectedCreatorId] = useState<string>(
    currentCreatorId || (creators[0]?.id || '')
  );
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CreatorNiche>('Brand Promotion');
  const [duration, setDuration] = useState('1:30');
  const [clientName, setClientName] = useState('Brand Campaign');
  const [description, setDescription] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  // File state
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string>('');
  const [fileType, setFileType] = useState<'video' | 'image'>('video');
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const isDark = theme === 'dark';

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleFile = (file: File) => {
    setErrorMessage('');
    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isVideo && !isImage) {
      setErrorMessage('Please select a valid video (.mp4, .mov, .webm) or image (.png, .jpg, .webp) file.');
      return;
    }

    setSelectedFile(file);
    setFileType(isVideo ? 'video' : 'image');

    // Generate blob preview URL
    const objectUrl = URL.createObjectURL(file);
    setFilePreviewUrl(objectUrl);

    // Auto-fill title from filename if not yet set
    if (!title.trim()) {
      const cleanName = file.name
        .replace(/\.[^/.]+$/, '')
        .replace(/[-_]/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase());
      setTitle(cleanName);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleResetFile = () => {
    setSelectedFile(null);
    setFilePreviewUrl('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMessage('Please provide a title for your work.');
      return;
    }

    const finalUrl = filePreviewUrl || 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&auto=format&fit=crop&q=80';
    const newItem: CreatorPortfolioItem = {
      id: `port_dev_${Date.now()}`,
      title: title.trim(),
      category,
      duration: duration || '1:30',
      year: new Date().getFullYear().toString(),
      thumbnail: finalUrl,
      videoUrl: fileType === 'video' ? finalUrl : undefined,
      description: description.trim() || `Production showcase for ${category} with custom editing, pacing, and color grading.`,
      clientName: clientName.trim() || 'Client Showcase',
      isFileUpload: Boolean(selectedFile),
      fileType: selectedFile ? fileType : 'video',
      fileName: selectedFile?.name,
      fileSize: selectedFile ? formatFileSize(selectedFile.size) : undefined
    };

    onUploadSuccess(selectedCreatorId || creators[0]?.id, newItem);
    handleResetFile();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity" 
        onClick={onClose} 
      />

      {/* Modal Dialog */}
      <div className={`relative w-full max-w-2xl rounded-3xl p-6 sm:p-8 shadow-2xl z-10 space-y-6 max-h-[92vh] overflow-y-auto ${
        isDark ? 'bg-[#09111e] border border-slate-800 text-slate-100' : 'bg-white border border-slate-200 text-slate-800'
      }`}>
        {/* Header */}
        <div className={`flex items-center justify-between border-b pb-4 ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-lg shadow-blue-600/30">
              <Upload className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <span>Upload File from Device</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">
                  Local Storage Access
                </span>
              </h2>
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                Select videos (.mp4, .mov, .webm) or images (.png, .jpg) directly from your phone or computer
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-lg hover:opacity-75 transition-opacity cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {errorMessage && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-xl text-xs text-red-300 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Section 1: Drag & Drop Device File Area */}
          <div className="space-y-2">
            <label className={`text-xs font-semibold flex items-center justify-between ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
              <span className="flex items-center gap-1.5">
                <FolderOpen className="w-3.5 h-3.5 text-blue-400" />
                <span>Select Device File (Videos & Images)</span>
              </span>
              <span className="text-[10px] text-slate-400">MP4, MOV, WEBM, PNG, JPG</span>
            </label>

            {!selectedFile ? (
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all ${
                  isDragging 
                    ? 'border-blue-500 bg-blue-600/10 scale-[1.01]' 
                    : isDark 
                      ? 'border-slate-700 hover:border-blue-500/70 bg-[#070d18] hover:bg-[#0c1626]' 
                      : 'border-slate-300 hover:border-blue-500 bg-slate-50 hover:bg-slate-100'
                }`}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*,image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <div className="flex flex-col items-center justify-center space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">
                      Click to browse or drag & drop files from your device
                    </p>
                    <p className={`text-xs mt-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                      Select your finished video edits, reels, commercials, or high-res thumbnails
                    </p>
                  </div>
                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/25 pointer-events-none"
                  >
                    Browse Device Files
                  </button>
                </div>
              </div>
            ) : (
              /* File Selected Preview Card */
              <div className={`p-4 rounded-2xl border space-y-3 ${
                isDark ? 'bg-[#070d18] border-slate-700' : 'bg-slate-100 border-slate-300'
              }`}>
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                      {fileType === 'video' ? <Video className="w-4 h-4" /> : <ImageIcon className="w-4 h-4" />}
                    </div>
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold truncate">{selectedFile.name}</p>
                      <p className={`text-[11px] ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                        {formatFileSize(selectedFile.size)} • {selectedFile.type || (fileType === 'video' ? 'Video File' : 'Image File')}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleResetFile}
                    className="text-xs text-rose-400 hover:text-rose-300 flex items-center gap-1 shrink-0 p-1 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Change File</span>
                  </button>
                </div>

                {/* Live Preview Container */}
                <div className="relative rounded-xl overflow-hidden bg-black flex items-center justify-center border border-slate-800">
                  {fileType === 'video' ? (
                    <video
                      src={filePreviewUrl}
                      controls
                      autoPlay
                      muted
                      className="w-full max-h-56 object-contain"
                    />
                  ) : (
                    <img
                      src={filePreviewUrl}
                      alt="Preview"
                      className="w-full max-h-56 object-contain"
                    />
                  )}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-mono text-emerald-400 flex items-center gap-1">
                    <FileCheck className="w-3 h-3" />
                    <span>Device File Loaded</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Work Specifications */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Work / Project Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Brand Commercial Video Reel"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark 
                    ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Creator Niche / Category *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as CreatorNiche)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border cursor-pointer ${
                  isDark 
                    ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              >
                {allCreatorNiches.map(niche => (
                  <option key={niche} value={niche}>{niche}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Assign to Creator Portfolio
              </label>
              <select
                value={selectedCreatorId}
                onChange={(e) => setSelectedCreatorId(e.target.value)}
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border cursor-pointer ${
                  isDark 
                    ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              >
                {creators.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.primaryNiche})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Duration (min:sec)
              </label>
              <input
                type="text"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g. 1:45"
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark 
                    ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>

            <div className="space-y-1.5">
              <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
                Client / Brand Name
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                placeholder="e.g. Aura Brand Co."
                className={`w-full rounded-xl px-3.5 py-2.5 text-xs focus:outline-none border ${
                  isDark 
                    ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                    : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
                }`}
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className={`text-xs font-semibold ${isDark ? 'text-slate-300' : 'text-slate-700'}`}>
              Description & Editing Specifications
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail pacing, transitions, color grading LUTs, sound effects, sound design, hook retention..."
              className={`w-full rounded-xl p-3 text-xs focus:outline-none resize-none border ${
                isDark 
                  ? 'bg-[#070d18] border-slate-800 text-white focus:border-blue-500' 
                  : 'bg-slate-50 border-slate-300 text-slate-900 focus:border-blue-500'
              }`}
            />
          </div>

          {/* Actions */}
          <div className={`flex items-center justify-between pt-4 border-t ${isDark ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-1.5 text-xs text-blue-400 font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Instantly playable in portfolio reels</span>
            </div>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-slate-200 cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 shadow-lg shadow-blue-600/30 flex items-center gap-2 cursor-pointer transition-transform active:scale-95"
              >
                <Upload className="w-4 h-4" />
                <span>Save & Upload to Portfolio</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
