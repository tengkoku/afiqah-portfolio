import React, { useState, useEffect } from 'react';
import { Mail, Linkedin, Github, FileText, Send, Sparkles, Inbox, Trash2, CheckCircle } from 'lucide-react';
import { developerProfile } from '../data/portfolioData';

interface MockMessage {
  id: string;
  name: string;
  email: string;
  topic: string;
  message: string;
  timestamp: string;
  replied: boolean;
}

export default function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [topic, setTopic] = useState('collaboration');
  const [message, setMessage] = useState('');

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  // Local persistence for submitted mock emails
  const [savedMessages, setSavedMessages] = useState<MockMessage[]>([]);

  useEffect(() => {
    const localMsgs = localStorage.getItem('portfolio-contacts');
    if (localMsgs) {
      try {
        setSavedMessages(JSON.parse(localMsgs));
      } catch (err) {
        console.error("Failed to parse local contact logs", err);
      }
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    // Basic validation
    if (!name.trim() || !email.trim() || !message.trim()) {
      setValidationError('All form fields are strictly required.');
      return;
    }

    if (!email.includes('@') || email.length < 5) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    setIsSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      const newMessage: MockMessage = {
        id: `msg-${Date.now()}`,
        name,
        email,
        topic,
        message,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        replied: false
      };

      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      localStorage.setItem('portfolio-contacts', JSON.stringify(updated));

      setIsSubmitting(false);
      setSubmitted(true);

      // Reset form fields
      setName('');
      setEmail('');
      setMessage('');

      // Auto-reply animation after 2.5 seconds to show state reactive events
      setTimeout(() => {
        setSavedMessages(prev => prev.map(m => {
          if (m.id === newMessage.id) {
            return { ...m, replied: true };
          }
          return m;
        }));
      }, 3000);

    }, 1200);
  };

  const deleteMessage = (id: string) => {
    const filtered = savedMessages.filter(m => m.id !== id);
    setSavedMessages(filtered);
    localStorage.setItem('portfolio-contacts', JSON.stringify(filtered));
  };

  return (
    <section id="contact" className="py-20">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-12 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 mb-4">
            <Mail className="w-3.5 h-3.5" />
            Establish Callback Handlers
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold font-display tracking-tight text-slate-900 dark:text-slate-100">
            Let's Build Something Resilient
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
            Interested in hiring me, collaborating on open-source code, or talking about botanical state loops? Send a message below. All inputs write directly to local memory so you can audit the validation.
          </p>
        </div>

        {/* Form and Contact info grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">

          {/* Left: Contact Info & Connections (Span 5) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Direct Card links */}
            <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4 shadow-sm">
              <h3 className="font-bold font-display text-sm text-slate-900 dark:text-slate-100 uppercase tracking-wider">
                Direct Channels
              </h3>

              <div className="space-y-3.5">
                <a
                  href={`mailto:${developerProfile.contact.email}`}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors group border border-slate-100 dark:border-slate-850"
                >
                  <div className="p-2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Email Address</span>
                    <span className="text-sm font-semibold group-hover:underline">{developerProfile.contact.email}</span>
                  </div>
                </a>

                <a
                  href={`https://${developerProfile.contact.linkedin}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors group border border-slate-100 dark:border-slate-850"
                >
                  <div className="p-2 bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 rounded-lg">
                    <Linkedin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">LinkedIn Profile</span>
                    <span className="text-sm font-semibold group-hover:underline">{developerProfile.contact.linkedin}</span>
                  </div>
                </a>

                <a
                  href={`https://${developerProfile.contact.github}`}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors group border border-slate-100 dark:border-slate-850"
                >
                  <div className="p-2 bg-slate-950/10 dark:bg-white/10 text-slate-800 dark:text-slate-100 rounded-lg">
                    <Github className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">GitHub Repository</span>
                    <span className="text-sm font-semibold group-hover:underline">{developerProfile.contact.github}</span>
                  </div>
                </a>

                <a
                  href={developerProfile.contact.resumeUrl}
                  className="flex items-center gap-3.5 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-950 text-slate-600 dark:text-slate-300 transition-colors group border border-slate-100 dark:border-slate-850"
                >
                  <div className="p-2 bg-rose-500/10 text-rose-600 dark:text-rose-400 rounded-lg">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Formal Resume</span>
                    <span className="text-sm font-semibold group-hover:underline">Download PDF (140 KB)</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Micro-inbox state display for dynamic feedback */}
            <div className="bg-slate-950 text-white rounded-2xl p-5 border border-slate-800 space-y-4 shadow-md">
              <div className="flex justify-between items-center border-b border-slate-800 pb-3">
                <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider font-mono flex items-center gap-1.5">
                  <Inbox className="w-4 h-4" /> Message Dispatcher Logs
                </span>
                <span className="text-[9px] bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded font-mono border border-emerald-500/20">
                  Local Memory
                </span>
              </div>

              <div className="space-y-3.5 max-h-[200px] overflow-y-auto scrollbar-thin">
                {savedMessages.length === 0 ? (
                  <div className="text-slate-500 text-xs text-center py-6">
                    No active transmissions in memory. Send a message to see the reactive log.
                  </div>
                ) : (
                  savedMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="text-xs border border-slate-800 p-3 rounded-lg bg-slate-900/50 space-y-1.5 animate-in fade-in zoom-in-95 duration-200"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <strong className="text-slate-200">{msg.name}</strong>
                          <span className="text-slate-500 text-[10px] block font-mono">{msg.email}</span>
                        </div>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="text-slate-500 hover:text-red-400 transition-colors p-1 cursor-pointer"
                          aria-label="Delete local message"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[10px] text-slate-400 leading-normal bg-black/40 p-2 rounded border border-slate-850">
                        Topic: <span className="text-slate-200 font-bold">{msg.topic}</span>
                        <p className="mt-1 font-mono italic text-[9px]">"{msg.message}"</p>
                      </div>

                      {/* Mock Auto reply trigger states */}
                      <div className="flex justify-between items-center text-[9px]">
                        <span className="text-slate-500 font-mono">{msg.timestamp}</span>
                        {msg.replied ? (
                          <span className="text-emerald-400 font-bold flex items-center gap-1">
                            <Sparkles className="w-3 h-3 text-emerald-400 animate-spin" /> Auto-Responder Sent!
                          </span>
                        ) : (
                          <span className="text-amber-500 font-semibold font-mono animate-pulse">
                            Processing webhook...
                          </span>
                        )}
                      </div>

                      {msg.replied && (
                        <div className="text-[10px] bg-emerald-950/20 text-emerald-400/90 p-2 rounded-lg border border-emerald-900/30 font-sans leading-normal animate-in slide-in-from-top-1 duration-250">
                          <strong>Afiqah AutoBot:</strong> "Transmissions cached successfully! Handshake verified. Standby for standard manual reply soon."
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            </div>

          </div>

          {/* Right: Contact Form (Span 7) */}
          <div className="lg:col-span-7">
            <form
              id="portfolio-contact-form"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm"
            >
              <h3 className="font-bold font-display text-slate-900 dark:text-slate-100 text-lg">
                Send a Message
              </h3>

              {/* Validation alert */}
              {validationError && (
                <div className="p-3.5 rounded-xl border border-rose-200 bg-rose-50 dark:bg-rose-950/20 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2 font-semibold">
                  <span>❌ {validationError}</span>
                </div>
              )}

              {/* Submitted success overlay */}
              {submitted && !validationError && (
                <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50 dark:bg-emerald-950/20 text-xs text-emerald-700 dark:text-emerald-400 flex justify-between items-center font-semibold">
                  <span className="flex items-center gap-1.5">
                    <CheckCircle className="w-4 h-4" /> Message compiled successfully into local storage!
                  </span>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-emerald-600 hover:underline cursor-pointer"
                  >
                    Send another
                  </button>
                </div>
              )}

              {/* Form Input fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label htmlFor="contact-name" className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Your Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe"
                    className="p-3 border rounded-xl bg-slate-50 focus:bg-gray dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-sans dark:text-slate-100"
                  />
                </div>

                <div className="flex flex-col">
                  <label htmlFor="contact-email" className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                    Email Address
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="p-3 border rounded-xl bg-slate-50 focus:bg-gray dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-sans dark:text-slate-100"
                  />
                </div>
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact-topic" className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Collaboration Focus
                </label>
                <select
                  id="contact-topic"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="p-3 border rounded-xl bg-slate-50 focus:bg-gray dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-sans dark:text-slate-100"
                >
                  <option value="collaboration">General React/Frontend Collaboration</option>
                  <option value="contracting">Contract / Part-time Front-end Project</option>
                  <option value="botany">Botanic State Simulator feedback</option>
                  <option value="hiring">Full-time Junior Frontend role opportunity</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="contact-message" className="text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Your Transmission Message
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your project, timeline, or botany advice..."
                  className="p-3 border rounded-xl bg-slate-50 focus:bg-gray dark:bg-slate-950 border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm font-sans dark:text-slate-100"
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
              >
                {isSubmitting ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                    Transmitting payload...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" /> Send Local Transmission
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
