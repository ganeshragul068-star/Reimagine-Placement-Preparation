"use client";

import React, { useState, useRef } from "react";
import {
  Video,
  Play,
  Clock,
  Sparkles,
  CheckCircle2,
  Filter,
  ExternalLink,
  Upload,
  X,
  FileVideo,
  Trash2,
} from "lucide-react";
import { MASTERCLASSES } from "@/data/videoData";
import { VideoMasterclass } from "@/types";

interface CustomUploadedVideo {
  id: string;
  title: string;
  speaker: string;
  role: string;
  category: string;
  duration: string;
  videoUrl: string; // Object URL or direct URL
  isLocal: boolean;
  takeaways: string[];
}

export default function VideoVaultPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [playingVideoId, setPlayingVideoId] = useState<string | null>(null);
  const [uploadedVideos, setUploadedVideos] = useState<CustomUploadedVideo[]>([]);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  // Upload modal inputs
  const [newVideoTitle, setNewVideoTitle] = useState<string>("");
  const [newVideoSpeaker, setNewVideoSpeaker] = useState<string>("CIT Alumni Guest");
  const [newVideoCategory, setNewVideoCategory] = useState<string>("CIT Alumni Placement Breakdown");
  const [newVideoFile, setNewVideoFile] = useState<File | null>(null);
  const [customUrlInput, setCustomUrlInput] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const categories = [
    "All",
    "Zero-Skill Foundation",
    "Cracking HR & STAR Method",
    "CIT Alumni Placement Breakdown",
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewVideoFile(file);
      if (!newVideoTitle) {
        setNewVideoTitle(file.name.replace(/\.[^/.]+$/, ""));
      }
    }
  };

  const handleSaveUpload = (e: React.FormEvent) => {
    e.preventDefault();

    let videoUrl = "";
    let isLocal = false;

    if (newVideoFile) {
      videoUrl = URL.createObjectURL(newVideoFile);
      isLocal = true;
    } else if (customUrlInput.trim()) {
      videoUrl = customUrlInput.trim();
      isLocal = false;
    } else {
      return;
    }

    const newVideo: CustomUploadedVideo = {
      id: "custom-" + Date.now(),
      title: newVideoTitle || (newVideoFile ? newVideoFile.name : "Custom Alumni Recording"),
      speaker: newVideoSpeaker || "CIT Senior / Mentor",
      role: "Alumni Placement Masterclass",
      category: newVideoCategory,
      duration: "User Video",
      videoUrl,
      isLocal,
      takeaways: [
        "Key practical insights from campus alumni experience",
        "Direct advice on company-specific technical rounds",
        "Real-world interview communication strategies",
      ],
    };

    setUploadedVideos((prev) => [newVideo, ...prev]);
    // Reset and close
    setNewVideoFile(null);
    setCustomUrlInput("");
    setNewVideoTitle("");
    setIsUploadModalOpen(false);
  };

  const handleDeleteUploaded = (id: string) => {
    setUploadedVideos((prev) => prev.filter((v) => v.id !== id));
  };

  const filteredMasterclasses = MASTERCLASSES.filter((video) => {
    if (selectedCategory === "All") return true;
    return video.category === selectedCategory;
  });

  const filteredUploaded = uploadedVideos.filter((vid) => {
    if (selectedCategory === "All") return true;
    return vid.category === selectedCategory;
  });

  return (
    <div className="space-y-8 animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-violet-50 border border-violet-200 text-violet-700 text-xs font-bold">
            <Video className="w-3.5 h-3.5 text-violet-600" />
            <span>Placement Prep Masterclasses</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Video Vault: Industry &amp; Alumni Masterclasses
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Curated high-yield video sessions focusing on genuine mental models, verified CIT alumni breakdowns, and cracking campus HR rounds.
          </p>
        </div>

        {/* Action Button: Upload Video */}
        <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
          <button
            onClick={() => setIsUploadModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 transition-all transform hover:-translate-y-0.5"
          >
            <Upload className="w-4 h-4" />
            <span>Upload / Add Video</span>
          </button>

          <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-emerald-700">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            <span>{MASTERCLASSES.length + uploadedVideos.length} Available</span>
          </div>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-500 font-bold mr-1 flex items-center gap-1.5">
          <Filter className="w-3.5 h-3.5" /> Filter by Track:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedCategory === cat
                ? "bg-indigo-600 text-white shadow-xs font-bold"
                : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* SECTION 1: USER UPLOADED VIDEOS (IF ANY) */}
      {filteredUploaded.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Your Uploaded Placement Videos ({filteredUploaded.length})
            </h3>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredUploaded.map((uVideo) => (
              <div
                key={uVideo.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between"
              >
                {/* Native HTML5 Video Player */}
                <div className="relative aspect-video w-full bg-slate-950">
                  <video
                    src={uVideo.videoUrl}
                    controls
                    autoPlay={false}
                    className="w-full h-full object-contain"
                  />
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase">
                        {uVideo.category}
                      </span>
                      <button
                        onClick={() => handleDeleteUploaded(uVideo.id)}
                        className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1"
                        title="Delete video"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {uVideo.title}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1">
                      Uploaded Session • {uVideo.speaker} ({uVideo.role})
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Takeaways:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {uVideo.takeaways.map((t, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION 2: VERIFIED MASTERCLASSES */}
      <div className="space-y-4">
        {filteredUploaded.length > 0 && (
          <div className="flex items-center gap-2 pt-4">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600" />
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Verified Masterclass Library
            </h3>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredMasterclasses.map((video) => {
            const isPlaying = playingVideoId === video.id;
            const thumbnailSrc = video.youtubeId
              ? `https://i.ytimg.com/vi/${video.youtubeId}/hqdefault.jpg`
              : null;

            return (
              <div
                key={video.id}
                className="rounded-3xl bg-white border border-slate-200 overflow-hidden shadow-sm hover:border-slate-300 transition-all flex flex-col justify-between"
              >
                {/* Video Player Container */}
                <div className="relative aspect-video w-full bg-slate-950 border-b border-slate-100 overflow-hidden group">
                  {isPlaying ? (
                    <iframe
                      src={`${video.embedUrl}${video.embedUrl.includes('?') ? '&' : '?'}autoplay=1`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      referrerPolicy="strict-origin-when-cross-origin"
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div
                      onClick={() => setPlayingVideoId(video.id)}
                      className="w-full h-full cursor-pointer relative flex items-center justify-center group"
                    >
                      {thumbnailSrc && (
                        <img
                          src={thumbnailSrc}
                          alt={video.title}
                          className="w-full h-full object-cover opacity-85 group-hover:opacity-95 transition-opacity duration-300"
                        />
                      )}
                      <div className="absolute inset-0 bg-slate-900/40 group-hover:bg-slate-900/25 transition-colors" />

                      {/* Play Button Overlay */}
                      <div className="w-14 h-14 rounded-2xl bg-indigo-600/90 text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform duration-200 z-10">
                        <Play className="w-6 h-6 fill-white ml-0.5" />
                      </div>

                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-black/75 backdrop-blur-md text-white text-[11px] font-mono flex items-center gap-1 z-10">
                        <Clock className="w-3 h-3" />
                        <span>{video.duration}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 uppercase">
                        {video.category}
                      </span>
                      <a
                        href={video.watchUrl || video.embedUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold flex items-center gap-1"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 leading-snug">
                      {video.title}
                    </h3>

                    {/* Speaker info */}
                    <div className="flex items-center gap-2 mt-2 pt-2 border-t border-slate-100 text-xs">
                      <div className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-[10px]">
                        {video.speaker.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-slate-800">{video.speaker}</span>
                        <span className="text-slate-500 text-[11px] block">{video.role}</span>
                      </div>
                    </div>
                  </div>

                  {/* Key Takeaways */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 mt-2">
                    <div className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Key Placement Takeaways:</span>
                    </div>
                    <ul className="space-y-1 text-xs text-slate-700">
                      {video.takeaways.map((takeaway, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                          <span>{takeaway}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Jumpable Timestamps */}
                  <div className="pt-2">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                      Jump to Section:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {video.timestamps.map((ts, idx) => (
                        <div
                          key={idx}
                          className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-[11px] text-slate-700 flex items-center gap-1.5"
                        >
                          <span className="font-mono text-indigo-700 font-bold">{ts.time}</span>
                          <span className="truncate max-w-[150px]">{ts.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* UPLOAD VIDEO MODAL */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white border border-slate-200 rounded-3xl p-6 sm:p-7 shadow-2xl space-y-5 relative">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-700">
                  <FileVideo className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Upload / Add Placement Video</h3>
                  <p className="text-xs text-slate-500">Add an alumni breakdown or mock interview video</p>
                </div>
              </div>
              <button
                onClick={() => setIsUploadModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 p-1 rounded-lg hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveUpload} className="space-y-4">
              {/* File upload drag-and-drop box */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1.5">
                  Select Video File (MP4, WebM, MOV):
                </label>
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-slate-300 hover:border-indigo-500 bg-slate-50 cursor-pointer flex flex-col items-center justify-center gap-2 transition-all text-center group"
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="video/*"
                    className="hidden"
                  />
                  <div className="w-10 h-10 rounded-xl bg-indigo-100 group-hover:bg-indigo-200 flex items-center justify-center text-indigo-700 transition-colors">
                    <Upload className="w-5 h-5" />
                  </div>
                  {newVideoFile ? (
                    <div>
                      <p className="text-xs font-bold text-indigo-700 truncate max-w-xs">{newVideoFile.name}</p>
                      <p className="text-[11px] text-slate-500 font-mono">{(newVideoFile.size / (1024 * 1024)).toFixed(1)} MB</p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-xs font-bold text-slate-800">Click to browse or drop your video file here</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Supports MP4, WebM, MOV</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Title input */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Video Title:
                </label>
                <input
                  type="text"
                  required
                  value={newVideoTitle}
                  onChange={(e) => setNewVideoTitle(e.target.value)}
                  placeholder="e.g. Sanjay's TCS Digital Technical Round Breakdown"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs"
                />
              </div>

              {/* Category selector */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Category Track:
                </label>
                <select
                  value={newVideoCategory}
                  onChange={(e) => setNewVideoCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs"
                >
                  <option value="CIT Alumni Placement Breakdown">CIT Alumni Placement Breakdown</option>
                  <option value="Zero-Skill Foundation">Zero-Skill Foundation</option>
                  <option value="Cracking HR & STAR Method">Cracking HR &amp; STAR Method</option>
                </select>
              </div>

              {/* Speaker name */}
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">
                  Speaker / Presenter Name:
                </label>
                <input
                  type="text"
                  value={newVideoSpeaker}
                  onChange={(e) => setNewVideoSpeaker(e.target.value)}
                  placeholder="e.g. Sanjay B. (Thoughtworks)"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 focus:bg-white focus:border-indigo-500 focus:outline-none text-slate-900 text-xs"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsUploadModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newVideoFile && !customUrlInput.trim()}
                  className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-600/20 disabled:opacity-50"
                >
                  Save to Video Vault
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
