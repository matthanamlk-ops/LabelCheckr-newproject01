import React, { useRef, useState, useEffect } from 'react';
import { Camera, X, RefreshCw, Sparkles, AlertCircle } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onCapture: (imageDataUrl: string) => void;
}

export const CameraCaptureModal: React.FC<Props> = ({
  isOpen,
  onClose,
  onCapture
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
        setStream(null);
      }
      return;
    }

    // Request camera
    const startCamera = async () => {
      try {
        setCameraError(null);
        const mediaStream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 }
          }
        });
        setStream(mediaStream);
        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (err: any) {
        console.warn('Camera access error:', err);
        setCameraError(
          'ไม่สามารถเข้าถึงกล้องถ่ายภาพได้ (กรุณาอนุญาตการใช้งานกล้อง หรือใช้การอัปโหลดรูปภาพแทน)'
        );
      }
    };

    startCamera();

    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [isOpen]);

  const handleSnap = () => {
    if (!videoRef.current) return;
    setIsProcessing(true);

    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth || 1280;
    canvas.height = videoRef.current.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      onCapture(dataUrl);
      onClose();
    }
    setIsProcessing(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-xl bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-700 text-white flex flex-col">
        {/* Header */}
        <div className="p-4 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-bold text-slate-100">
              ถ่ายภาพฉลากอาหารเพื่อตรวจสอบมาตรฐาน อย.
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-all cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Viewfinder */}
        <div className="relative aspect-4/3 w-full bg-black flex items-center justify-center overflow-hidden">
          {cameraError ? (
            <div className="p-6 text-center max-w-sm">
              <AlertCircle className="w-10 h-10 text-amber-400 mx-auto mb-3" />
              <p className="text-sm text-slate-300 mb-4">{cameraError}</p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold rounded-xl"
              >
                สลับไปใช้ปุ่ม "อัปโหลดไฟล์" แทน
              </button>
            </div>
          ) : (
            <>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
              />

              {/* HUD Scanner Overlay */}
              <div className="absolute inset-8 sm:inset-12 border-2 border-dashed border-blue-400/80 rounded-2xl pointer-events-none flex flex-col justify-between p-3">
                {/* Corner markers */}
                <div className="flex justify-between">
                  <div className="w-6 h-6 border-t-4 border-l-4 border-cyan-400 -mt-1 -ml-1" />
                  <div className="w-6 h-6 border-t-4 border-r-4 border-cyan-400 -mt-1 -mr-1" />
                </div>

                {/* Laser animation bar */}
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#38bdf8] animate-pulse" />

                <div className="flex justify-between">
                  <div className="w-6 h-6 border-b-4 border-l-4 border-cyan-400 -mb-1 -ml-1" />
                  <div className="w-6 h-6 border-b-4 border-r-4 border-cyan-400 -mb-1 -mr-1" />
                </div>
              </div>

              {/* Viewfinder Tip */}
              <div className="absolute top-4 inset-x-0 flex justify-center pointer-events-none">
                <span className="text-[11px] font-medium bg-slate-950/80 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-slate-700/70 text-slate-200 shadow-md">
                  จัดให้เลข อย. 13 หลัก และตารางโภชนาการอยู่ในกรอบ
                </span>
              </div>
            </>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-3">
          <span className="text-xs text-slate-400 hidden sm:inline">
            ระบบจะสแกนหาเลขสารบบอาหารและอ่านข้อมูลโภชนาการโดยอัตโนมัติ
          </span>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold"
            >
              ยกเลิก
            </button>

            {!cameraError && (
              <button
                onClick={handleSnap}
                disabled={isProcessing}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 transition-all cursor-pointer"
              >
                <Camera className="w-4 h-4" />
                <span>{isProcessing ? 'กำลังวิเคราะห์...' : 'กดถ่ายภาพฉลาก'}</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
