"use client";

import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

interface ImageItem {
  base64: string;
  name: string;
}

const modalKeyframes = `
  @keyframes modalEnter {
    from { opacity: 0; transform: translateY(16px) scale(0.98); }
    to   { opacity: 1; transform: translateY(0)    scale(1);    }
  }
`;

export default function RecommendationSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [text, setText] = useState("");
  const [images, setImages] = useState<ImageItem[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [mounted, setMounted] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isModalOpen, mounted]);

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
            if (width > height) { height = (height / width) * MAX; width = MAX; }
            else { width = (width / height) * MAX; height = MAX; }
          }
          canvas.width = width;
          canvas.height = height;
          canvas.getContext("2d")!.drawImage(img, 0, 0, width, height);
          resolve({ base64: canvas.toDataURL("image/jpeg", 0.8), name: file.name });
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL(file);
    });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const remaining = 3 - images.length;
    if (remaining <= 0) return;
    const compressed = await Promise.all(files.slice(0, remaining).map(compressImage));
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
      setTimeout(() => { setIsSuccess(false); setIsModalOpen(false); }, 3000);
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

  const closeModal = () => { if (!isSending) setIsModalOpen(false); };

  const canSend = !isSending && (text.trim().length > 0 || images.length > 0);

  const modalContent = (
    <>
      <style dangerouslySetInnerHTML={{ __html: modalKeyframes }} />
      <div
        style={{ position: "fixed", inset: 0, zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", padding: "16px" }}
        onClick={() => {}}
      >
        <div
          style={{ width: "100%", maxWidth: "460px", minWidth: "360px", backgroundColor: "#fff", borderRadius: "16px", boxShadow: "0 25px 50px -12px rgba(0,0,0,0.25)", padding: "24px", animation: "modalEnter 0.25s cubic-bezier(0.32,0.72,0,1) forwards", position: "relative" }}
        >
          <button
            onClick={closeModal}
            disabled={isSending}
            style={{ position: "absolute", top: "16px", right: "16px", width: "28px", height: "28px", borderRadius: "50%", backgroundColor: "#e8e8ed", border: "none", cursor: isSending ? "not-allowed" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", padding: 0, transition: "background-color 0.15s" }}
            onMouseEnter={(e) => { if (!isSending) (e.currentTarget.style.backgroundColor = "#d1d1d6"); }}
            onMouseLeave={(e) => { (e.currentTarget.style.backgroundColor = "#e8e8ed"); }}
            aria-label="Close"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1L9 9M9 1L1 9" stroke="#6e6e73" strokeWidth="1.75" strokeLinecap="round"/>
            </svg>
          </button>

          {isSuccess ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 0", textAlign: "center", gap: "8px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 700, color: "#111827", margin: 0 }}>
                Your Recommendation Has Been Sent!
              </h2>
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: 0 }}>
                Great Impact Starts with a Single Suggestion
              </p>
              <Image
                src="/Images/Icons/recommendSendIcon.png"
                alt="Sent"
                width={52}
                height={52}
                style={{ objectFit: "contain", opacity: 0.75, margin: "12px 0" }}
              />
              <div style={{ width: "48px", height: "1px", backgroundColor: "#e5e7eb" }} />
              <p style={{ fontSize: "12px", color: "#9ca3af", margin: "4px 0 0" }}>
                Your recommendation will be received via my personal email address
              </p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: "14px", fontWeight: 700, color: "#111827", marginBottom: "12px", lineHeight: 1.4 }}>
                Every recommendation can lead to big impact!
              </h2>

              <textarea
                value={text}
                onChange={(e) => setText(e.target.value.slice(0, 1000))}
                placeholder="Type here..."
                rows={5}
                style={{ width: "100%", resize: "none", borderRadius: "12px", border: "1px solid #e5e7eb", padding: "12px", fontSize: "14px", color: "#1f2937", outline: "none", fontFamily: "inherit", boxSizing: "border-box", transition: "box-shadow 0.2s" }}
                onFocus={(e) => (e.target.style.boxShadow = "0 0 0 2px #d1d5db")}
                onBlur={(e) => (e.target.style.boxShadow = "none")}
              />

              {images.length > 0 && (
                <div style={{ display: "flex", gap: "8px", marginTop: "10px", flexWrap: "wrap" }}>
                  {images.map((img, i) => (
                    <div
                      key={i}
                      style={{ position: "relative", width: "56px", height: "56px", borderRadius: "12px", overflow: "hidden", border: "1px solid #e5e7eb", flexShrink: 0 }}
                      className="group"
                    >
                      <img src={img.base64} alt={`preview-${i}`} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      <button
                        onClick={() => removeImage(i)}
                        style={{ position: "absolute", inset: 0, backgroundColor: "rgba(0,0,0,0.55)", color: "#fff", fontSize: "20px", fontWeight: 700, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: 0, transition: "opacity 0.15s" }}
                        onMouseEnter={(e) => ((e.target as HTMLButtonElement).style.opacity = "1")}
                        onMouseLeave={(e) => ((e.target as HTMLButtonElement).style.opacity = "0")}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "12px", gap: "8px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={images.length >= 3}
                    style={{ display: "flex", alignItems: "center", gap: "6px", padding: "6px 10px", borderRadius: "8px", border: "1px solid #e5e7eb", color: "#6b7280", backgroundColor: "transparent", cursor: images.length >= 3 ? "not-allowed" : "pointer", opacity: images.length >= 3 ? 0.3 : 1, transition: "all 0.15s", fontSize: "12px", fontWeight: 500 }}
                    onMouseEnter={(e) => { if (images.length < 3) { (e.currentTarget.style.backgroundColor = "#f3f4f6"); (e.currentTarget.style.borderColor = "#d1d5db"); (e.currentTarget.style.color = "#111827"); } }}
                    onMouseLeave={(e) => { (e.currentTarget.style.backgroundColor = "transparent"); (e.currentTarget.style.borderColor = "#e5e7eb"); (e.currentTarget.style.color = "#6b7280"); }}
                  >
                    <Image src="/Images/Icons/ImageAttach.png" alt="Attach image" width={15} height={15} style={{ objectFit: "contain" }} />
                    <span style={{ fontVariantNumeric: "tabular-nums" }}>{images.length}/3</span>
                  </button>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    multiple
                    style={{ display: "none" }}
                    onChange={handleImageUpload}
                  />

                  <span style={{ fontSize: "12px", color: "#9ca3af", fontVariantNumeric: "tabular-nums" }}>
                    {text.length}/1000
                  </span>
                </div>

                <button
                  onClick={handleSend}
                  disabled={!canSend}
                  style={{ padding: "6px 20px", borderRadius: "12px", backgroundColor: "#111827", color: "#fff", fontSize: "14px", fontWeight: 600, border: "none", cursor: canSend ? "pointer" : "not-allowed", opacity: canSend ? 1 : 0.3, transition: "all 0.15s" }}
                  onMouseEnter={(e) => { if (canSend) (e.currentTarget.style.backgroundColor = "#374151"); }}
                  onMouseLeave={(e) => { (e.currentTarget.style.backgroundColor = "#111827"); }}
                >
                  {isSending ? "SENDING..." : "SEND"}
                </button>
              </div>

              <p style={{ fontSize: "12px", color: "#9ca3af", marginTop: "12px", textAlign: "center" }}>
                Your recommendation will be received via my personal email address
              </p>
            </>
          )}
        </div>
      </div>
    </>
  );

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: `
        .rec-card { border-radius: 20px; border: 2px solid #111827; background-color: #fff; padding: clamp(20px, 3vw, 28px); display: flex; flex-direction: column; gap: 10px; width: 100%; height: 100%; box-sizing: border-box; transition: box-shadow 0.2s ease, transform 0.2s ease; cursor: default; }
        .rec-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.12); transform: translateY(-2px); }
        .rec-title { font-size: 15px; font-weight: 700; color: #111827; margin: 0; }
        .rec-desc { font-size: 14px; color: #000000; line-height: 1.6; margin: 0; font-weight: 400; }
        .rec-icon { width: 17px; height: 17px; object-fit: contain; }
        .rec-btn { width: auto; align-self: flex-end; padding: 6px 18px; border-radius: 10px; border: 1.5px solid #111827; font-size: 11px; font-weight: 500; color: #111827; background-color: transparent; cursor: pointer; transition: all 0.2s; margin-top: 2px; }
        .rec-btn:hover { background-color: #111827; color: #fff; }
        @media (min-width: 480px) {
          .rec-btn { padding: 6px 20px; font-size: 12px; }
        }
        @media (min-width: 768px) {
          .rec-title { font-size: 16px; }
          .rec-icon { width: 18px; height: 18px; }
        }
        @media (min-width: 1280px) {
          .rec-title { font-size: 17px; }
          .rec-icon { width: 20px; height: 20px; }
        }
      ` }} />
      <div className="rec-card">
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <Image
            src="/Images/Icons/recommend.png"
            alt="Recommendation"
            width={20}
            height={20}
            className="rec-icon"
            style={{ objectFit: "contain" }}
          />
          <h2 className="rec-title">
            Recommendation
          </h2>
        </div>

        <p className="rec-desc">
          Have you ever experience things that really hard for you? maybe i
          can help you with that problem and we solved using my skills
        </p>

        <button
          onClick={openModal}
          className="rec-btn"
        >
          Recommend
        </button>
      </div>

      {mounted && isModalOpen && createPortal(modalContent, document.body)}
    </>
  );
}