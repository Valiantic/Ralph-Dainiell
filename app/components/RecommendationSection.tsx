"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageItem {
  base64: string;
  name: string;
}

export default function RecommendationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isModalOpen]);

  const compressImage = (file: File): Promise<ImageItem> =>
    new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement("img");
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX = 900;
          let { width, height } = img;
          if (width > MAX || height > MAX) {
            if (width > height) {
              height = (height / width) * MAX;
              width = MAX;
            } else {
              width = (width / height) * MAX;
              height = MAX;
            }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
          resolve({
            base64: canvas.toDataURL("image/jpeg", 0.8),
            name: file.name,
          });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 3 - images.length;
    if (remaining <= 0) return;
    const compressed = await Promise.all(
      files.slice(0, remaining).map(compressImage)
    );
    setImages((prev) => [...prev, ...compressed]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const handleSend = async () => {
    if (!text.trim() && images.length === 0) return;
    setIsSending(true);
    try {
      const res = await fetch("/api/send-recommendation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text, images }),
      });
      if (!res.ok) throw new Error("Failed");
      setIsSuccess(true);
      setText("");
      setImages([]);
      setTimeout(() => {
        setIsSuccess(false);
        setIsModalOpen(false);
      }, 3000);
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const openModal = () => {
    setText("");
    setImages([]);
    setIsSuccess(false);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    if (!isSending) setIsModalOpen(false);
  };

  const canSend = !isSending && (text.trim().length > 0 || images.length > 0);

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => e.target === e.currentTarget && closeModal()}
    >
      <div
        className="w-full sm:w-auto sm:min-w-[400px] sm:max-w-[460px] bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl p-5 sm:p-6"
        style={{
          animation: "modalEnter 0.25s cubic-bezier(0.32, 0.72, 0, 1) forwards",
        }}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center gap-2">
            <h2 className="text-base font-bold text-gray-900">
              Your Recommendation Has Been Sent!
            </h2>
            <p className="text-xs text-gray-400">
              Great Impact Starts with a Single Suggestion
            </p>
            <Image
              src="/Images/Icons/recommendSendIcon.png"
              alt="Sent"
              width={52}
              height={52}
              className="my-3 object-contain opacity-75"
            />
            <div className="w-12 h-px bg-gray-200" />
            <p className="text-xs text-gray-400 mt-1">
              Your recommendation will be received via my personal email address
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-sm font-bold text-gray-900 mb-3 leading-snug">
              Every recommendation can lead to big impact!
            </h2>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value.slice(0, 1000))}
              placeholder="Type here..."
              rows={5}
              className="w-full resize-none rounded-xl border border-gray-200 p-3 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300 transition-all duration-200"
            />

            {images.length > 0 && (
              <div className="flex gap-2 mt-2.5 flex-wrap">
                {images.map((img, i) => (
                  <div
                    key={i}
                    className="relative w-14 h-14 rounded-xl overflow-hidden border border-gray-200 group cursor-pointer shrink-0"
                  >
                    <img
                      src={img.base64}
                      alt={`preview-${i}`}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => removeImage(i)}
                      className="absolute inset-0 bg-black/55 text-white text-xl font-bold opacity-0 group-hover:opacity-100 active:opacity-100 transition-opacity duration-150 flex items-center justify-center"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex items-center justify-between mt-3 gap-2">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  disabled={images.length >= 3}
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 hover:border-gray-300 hover:text-gray-900 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
                >
                  <Image
                    src="/Images/Icons/ImageAttach.png"
                    alt="Attach image"
                    width={15}
                    height={15}
                    className="object-contain"
                  />
                  <span className="text-xs font-medium tabular-nums">
                    {images.length}/3
                  </span>
                </button>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handleImageUpload}
                />

                <span className="text-xs text-gray-400 tabular-nums">
                  {text.length}/1000
                </span>
              </div>

              <button
                onClick={handleSend}
                disabled={!canSend}
                className="px-5 py-1.5 rounded-xl bg-gray-900 text-white text-sm font-semibold hover:bg-gray-700 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95 transition-all duration-150"
              >
                {isSending ? "SENDING..." : "SEND"}
              </button>
            </div>

            <p className="text-xs text-gray-400 mt-3 text-center">
              Your recommendation will be received via my personal email address
            </p>
          </>
        )}
      </div>

      <style jsx global>{`
        @keyframes modalEnter {
          from {
            opacity: 0;
            transform: translateY(16px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
      `}</style>
    </div>
  );

  return (
    <>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 flex flex-col justify-between gap-3 min-h-[200px]">
        <div>
          <div className="flex items-center gap-2 mb-2.5">
            <Image
              src="/Images/Icons/recommend.png"
              alt="Recommendation"
              width={18}
              height={18}
              className="object-contain"
            />
            <h2 className="text-sm font-bold text-gray-900">Recommendation</h2>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed">
            Have you ever experience things that really hard for you? Maybe i
            can help you with that problem and we solved using my skills
          </p>
        </div>

        <div className="flex justify-center">
          <button
            onClick={openModal}
            className="w-full max-w-[160px] py-2 rounded-xl border border-gray-300 text-xs font-semibold text-gray-800 hover:bg-gray-900 hover:text-white hover:border-gray-900 active:scale-95 transition-all duration-200"
          >
            Recommend
          </button>
        </div>
      </div>

      {mounted && isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}