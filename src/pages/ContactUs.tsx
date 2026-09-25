import { MapPin, MessageCircle, Mail, Send, CheckCircle2, AlertCircle, Loader2, Paperclip, FileText, Image as ImageIcon, X } from "lucide-react";
import { useState, useRef } from "react";

export default function ContactUs() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      // Max file size 10MB
      if (file.size > 10 * 1024 * 1024) {
        alert("File size exceeds 10MB limit. Please select a smaller document or photo.");
        return;
      }
      setAttachedFile(file);
    }
  };

  const removeAttachedFile = () => {
    setAttachedFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Use FormData to support multipart file attachments in formsubmit.co
      const formData = new FormData();
      formData.append("_subject", `New MAISC Inquiry with Attachment from ${fullName}`);
      formData.append("_cc", "arnizza1973@gmail.com");
      formData.append("Sender Name", fullName);
      formData.append("Sender Email", email);
      formData.append("Contact Number", phone || "Not provided");
      formData.append("Message", message);
      formData.append("Submitted At", new Date().toLocaleString());

      if (attachedFile) {
        formData.append("attachment", attachedFile);
      }

      const response = await fetch("https://formsubmit.co/ajax/noelcoronel23@gmail.com", {
        method: "POST",
        headers: {
          Accept: "application/json"
        },
        body: formData
      });

      if (response.ok) {
        setStatus("success");
        setFullName("");
        setEmail("");
        setPhone("");
        setMessage("");
        removeAttachedFile();
      } else {
        throw new Error("Unable to send message directly. Please use email fallback below.");
      }
    } catch {
      setStatus("error");
      setErrorMessage("Automatic submission encountered an issue. You can send your inquiry and attachment directly via your email client or WhatsApp below.");
    }
  };

  const mailtoLink = `mailto:noelcoronel23@gmail.com?cc=arnizza1973@gmail.com&subject=${encodeURIComponent(
    `Inquiry from ${fullName || "MAISC Website Visitor"}`
  )}&body=${encodeURIComponent(
    `Name: ${fullName}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}\n\n[Please remember to attach your file if applicable]`
  )}`;

  const whatsappMessage = encodeURIComponent(
    `Hello MAISC Team, my name is ${fullName || "Inquirer"}. ${message || "I would like to inquire about your services."}`
  );

  return (
    <div className="py-24 bg-[#FAFAFA] min-h-screen">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left Column: Contact Details */}
          <div>
            <span className="text-[#0f7652] font-bold text-xs tracking-[0.2em] uppercase mb-4 block">Let's connect</span>
            <h1 className="text-4xl md:text-5xl font-extrabold text-[#0B2149] mb-6 tracking-tight">START A CONVERSATION</h1>
            <p className="text-lg text-slate-600 mb-12 max-w-xl leading-relaxed">
              Whether you're building a workforce or looking for your next overseas opportunity, our team would be glad to hear from you.
            </p>

            <div className="space-y-8 mb-16">
              <div className="flex items-start">
                <div className="flex-shrink-0 mt-1">
                  <MapPin className="h-5 w-5 text-[#cc4646]" />
                </div>
                <div className="ml-4">
                  <p className="text-slate-600 text-[15px]">
                    115-A Moana Street, F.B. Harrison, Barangay 70, Pasay City, 1300 Philippines
                  </p>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <MessageCircle className="h-5 w-5 text-[#0f7652]" />
                </div>
                <div className="ml-4">
                  <a 
                    href="https://wa.me/63908499888" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-600 hover:text-[#0f7652] text-[15px] font-medium transition-colors"
                  >
                    WhatsApp: 0908 499 888
                  </a>
                </div>
              </div>

              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <Mail className="h-5 w-5 text-[#0f7652]" />
                </div>
                <div className="ml-4">
                  <a 
                    href="mailto:inquiry@maisc.ph?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com" 
                    className="text-slate-600 hover:text-[#0f7652] text-[15px] font-medium transition-colors"
                  >
                    inquiry@maisc.ph
                  </a>
                </div>
              </div>
            </div>

            {/* Licenses and Permits Box */}
            <div className="bg-white p-6 md:p-8 shadow-sm border border-slate-100 rounded-[30px] border-l-[6px] border-r-[6px] border-[#eb4d3d] w-full">
              <h3 className="text-[#0B2149] font-bold text-xl mb-5">Licenses and Permits</h3>
              <div className="flex flex-col space-y-4 text-base md:text-lg text-slate-600">
                <div><span className="font-bold text-[#0B2149]">SEC:</span> 2025060206883-86</div>
                <div><span className="font-bold text-[#0B2149]">DMW:</span> 042-LB-06302026-PL</div>
                <div><span className="font-bold text-[#0B2149]">BIR:</span> 061RC20250000002873</div>
              </div>
            </div>
          </div>

          {/* Right Column: Form */}
          <div className="bg-white p-8 md:p-12 shadow-sm border border-slate-200/80 rounded-2xl">
            <h3 className="text-[#0B2149] font-bold text-2xl mb-2">Send us a Message</h3>
            <p className="text-xs text-slate-500 mb-6">
              Messages will be delivered directly to <span className="font-semibold text-slate-700">noelcoronel23@gmail.com</span> & <span className="font-semibold text-slate-700">arnizza1973@gmail.com</span>.
            </p>

            {status === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#0f7652] shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-bold text-[#0f7652] text-sm">Message Sent Successfully!</h4>
                  <p className="text-slate-600 text-xs mt-1 leading-relaxed">
                    Thank you for reaching out. We have received your message and will reply to your email shortly.
                  </p>
                  <button 
                    type="button" 
                    onClick={() => setStatus("idle")} 
                    className="text-xs text-[#0f7652] font-semibold underline mt-2"
                  >
                    Send another message
                  </button>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-900 space-y-2">
                  <p className="font-bold">{errorMessage}</p>
                  <div className="flex flex-wrap gap-2 pt-1">
                    <a
                      href={mailtoLink}
                      className="inline-flex items-center px-3 py-1.5 bg-[#0f7652] text-white rounded-lg font-semibold hover:bg-[#0c5c40] transition-colors text-xs"
                    >
                      <Mail className="w-3.5 h-3.5 mr-1" />
                      Open in Email App
                    </a>
                    <a
                      href={`https://wa.me/63908499888?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center px-3 py-1.5 bg-emerald-700 text-white rounded-lg font-semibold hover:bg-emerald-800 transition-colors text-xs"
                    >
                      <MessageCircle className="w-3.5 h-3.5 mr-1" />
                      Send via WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  id="name" 
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all" 
                  placeholder="John Doe" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="email" 
                    id="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all" 
                    placeholder="john@example.com" 
                  />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Phone / WhatsApp Number
                  </label>
                  <input 
                    type="tel" 
                    id="phone" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all" 
                    placeholder="+63 908 499 888" 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea 
                  id="message" 
                  required
                  rows={4} 
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-[#0f7652] focus:border-[#0f7652] outline-none text-sm transition-all resize-none" 
                  placeholder="How can we help you? Describe your recruitment needs or job inquiry..."
                />
              </div>

              {/* Attachment Button & File Status */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                  Attach Document or Photo (Optional)
                </label>
                
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp"
                  className="hidden" 
                  id="file-attachment"
                />

                {!attachedFile ? (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-dashed border-slate-300 hover:border-[#0f7652] hover:bg-emerald-50/40 text-slate-600 hover:text-[#0f7652] text-xs font-semibold transition-all group"
                  >
                    <Paperclip className="w-4 h-4 text-slate-400 group-hover:text-[#0f7652] transition-colors" />
                    <span>Upload Attachment (PDF, DOC, DOCX, JPG, PNG up to 10MB)</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg">
                    <div className="flex items-center gap-2.5 overflow-hidden">
                      {attachedFile.type.startsWith("image/") ? (
                        <ImageIcon className="w-5 h-5 text-[#0f7652] shrink-0" />
                      ) : (
                        <FileText className="w-5 h-5 text-[#0f7652] shrink-0" />
                      )}
                      <div className="truncate">
                        <p className="text-xs font-semibold text-slate-800 truncate">
                          {attachedFile.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {(attachedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={removeAttachedFile}
                      className="p-1 text-slate-400 hover:text-red-500 rounded-full hover:bg-white transition-colors"
                      title="Remove file"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              <button 
                type="submit" 
                disabled={status === "submitting"}
                className="w-full py-3.5 px-6 rounded-lg text-sm font-bold text-white bg-[#0f7652] hover:bg-[#0c5c40] disabled:opacity-60 transition-all shadow-sm flex items-center justify-center gap-2"
              >
                {status === "submitting" ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Sending Message...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    Send Message
                  </>
                )}
              </button>

              <p className="text-[11px] text-center text-slate-400">
                You can also email us directly at <a href="mailto:inquiry@maisc.ph?cc=noelcoronel23@gmail.com,arnizza1973@gmail.com" className="text-[#0f7652] underline font-medium">inquiry@maisc.ph</a>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
