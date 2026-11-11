/**
 * Learning Management System (LMS) & Verified Certificate Engine
 * Syllabus player, progress tracking, and verifiable credential generator.
 */

import React, { useState } from 'react';
import { Database } from '../../lib/database';
import { useApp } from '../../context/AppContext';
import { CourseItem, CertificateItem } from '../../types';
import {
  GraduationCap,
  Award,
  PlayCircle,
  CheckCircle2,
  Clock,
  Star,
  Users,
  ShieldCheck,
  FileCheck,
  X
} from 'lucide-react';

export const LmsViewer: React.FC = () => {
  const { currentUser, showToast } = useApp();
  const [courses, setCourses] = useState<CourseItem[]>(() => Database.getCourses());
  const [certificates, setCertificates] = useState<CertificateItem[]>(() => Database.getCertificates());
  const [selectedCourse, setSelectedCourse] = useState<CourseItem | null>(null);
  const [activeLessonIdx, setActiveLessonIdx] = useState<number>(0);
  const [activeCert, setActiveCert] = useState<CertificateItem | null>(null);

  const handleIssueCertificate = (course: CourseItem) => {
    const cert = Database.issueCertificate(course.id, currentUser.id, currentUser.fullName, course.title);
    setCertificates(Database.getCertificates());
    setActiveCert(cert);
    showToast(`Certificate ${cert.certificateNumber} generated!`, 'success');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div>
          <h2 className="text-xl font-bold text-slate-100 tracking-tight">
            Learning Management System & Certificates
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Enterprise curriculum, interactive architecture lessons, and cryptographically verified certifications.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3.5 py-1.5 bg-slate-950 rounded-lg border border-slate-800 text-xs font-mono text-slate-300">
            <span className="text-slate-500">Issued Certs:</span>{' '}
            <span className="text-emerald-400 font-bold tabular-nums">{certificates.length}</span>
          </div>
        </div>
      </div>

      {/* Courses Catalog */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {courses.map((course) => (
          <div
            key={course.id}
            className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden hover:border-slate-700 transition-colors flex flex-col justify-between"
          >
            <div className="p-5 space-y-3.5">
              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="font-semibold uppercase tracking-wider text-indigo-400">
                  {course.category}
                </span>
                <div className="flex items-center gap-1.5 font-mono">
                  <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                  <span className="text-slate-200 tabular-nums">{course.rating}</span>
                </div>
              </div>

              <h3 className="text-base font-bold text-slate-100 leading-snug">
                {course.title}
              </h3>

              <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
                {course.description}
              </p>

              {/* Course Meta Info (Zero-Pill discipline) */}
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1 font-mono">
                <span className="capitalize">{course.level}</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{course.durationMinutes} mins</span>
                <span aria-hidden="true">·</span>
                <span className="tabular-nums">{course.lessons.length} lessons</span>
              </div>
            </div>

            <div className="p-4 border-t border-slate-800/80 bg-slate-950/40 flex items-center justify-between">
              <button
                onClick={() => {
                  setSelectedCourse(course);
                  setActiveLessonIdx(0);
                }}
                className="flex items-center gap-1.5 text-xs font-medium text-indigo-400 hover:text-indigo-300 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>Open Lesson Player</span>
              </button>

              <button
                onClick={() => handleIssueCertificate(course)}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-950/60 hover:bg-emerald-900/60 border border-emerald-800/60 text-emerald-300 rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Claim Certificate</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Lesson Player Modal */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-3xl w-full h-[600px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-slate-800 bg-slate-950 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono text-indigo-400 uppercase">
                  {selectedCourse.category}
                </span>
                <h3 className="text-sm font-bold text-slate-100 truncate max-w-xl">
                  {selectedCourse.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedCourse(null)}
                className="text-slate-400 hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 flex overflow-hidden">
              {/* Syllabus sidebar */}
              <div className="w-64 border-r border-slate-800 bg-slate-950/50 p-3 overflow-y-auto space-y-2 shrink-0">
                <div className="text-[10px] uppercase font-semibold text-slate-400 px-2 mb-2">
                  Course Syllabus
                </div>
                {selectedCourse.lessons.map((lesson, idx) => (
                  <button
                    key={lesson.id}
                    onClick={() => setActiveLessonIdx(idx)}
                    className={`w-full text-left p-2.5 rounded-lg text-xs transition-colors ${
                      activeLessonIdx === idx
                        ? 'bg-indigo-600/20 text-indigo-300 border border-indigo-500/30'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span className="truncate">{lesson.title}</span>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-1 pl-5">
                      {lesson.durationMinutes} min
                    </div>
                  </button>
                ))}
              </div>

              {/* Lesson Content Viewer */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono text-slate-400">
                    Lesson {activeLessonIdx + 1} of {selectedCourse.lessons.length}
                  </span>
                  <h4 className="text-base font-bold text-slate-100 mt-1">
                    {selectedCourse.lessons[activeLessonIdx]?.title}
                  </h4>
                </div>

                <div className="text-xs text-slate-300 leading-relaxed space-y-3">
                  <p>{selectedCourse.lessons[activeLessonIdx]?.content}</p>
                  <div className="p-4 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-slate-300">
                    <code>
                      // Architectural Pattern Implementation<br />
                      export class ResilientService &lt;T&gt; &#123;<br />
                      &nbsp;&nbsp;constructor(private readonly client: SupabaseClient) &#123;&#125;<br />
                      &#125;
                    </code>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Verified Certificate Modal */}
      {activeCert && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-xl w-full p-8 space-y-6 text-center animate-in zoom-in-95 duration-150">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 flex items-center justify-center mx-auto text-emerald-400">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-[10px] uppercase font-mono tracking-widest text-emerald-400">
                Official Credential Verification
              </div>
              <h3 className="text-xl font-bold text-slate-100">Certificate of Mastery</h3>
              <p className="text-xs text-slate-400">This certifies that</p>
              <div className="text-lg font-bold text-indigo-400 py-1">
                {activeCert.userName}
              </div>
              <p className="text-xs text-slate-400">has successfully completed all requirements for</p>
              <div className="text-sm font-semibold text-slate-200">
                {activeCert.courseTitle}
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-left font-mono text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Credential ID:</span>
                <span className="text-slate-200 font-bold">{activeCert.certificateNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Issued On:</span>
                <span className="text-slate-200">{activeCert.issueDate.split('T')[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Performance Score:</span>
                <span className="text-emerald-400 tabular-nums">{activeCert.grade}%</span>
              </div>
              <div className="pt-2 border-t border-slate-900">
                <span className="text-[10px] text-slate-400 block mb-1">SHA-256 Verification Digest:</span>
                <span className="text-[9px] text-slate-400 break-all select-all">
                  {activeCert.verificationHash}
                </span>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                onClick={() => setActiveCert(null)}
                className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-medium transition-colors"
              >
                Close Certificate
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
