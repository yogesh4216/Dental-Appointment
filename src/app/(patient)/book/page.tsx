'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CalendarDays, Clock, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Star, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const fadeUp = { hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } } };

export default function BookAppointment() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [selectedSpecialty, setSelectedSpecialty] = useState('All');
  const [selectedDoctor, setSelectedDoctor] = useState<any>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedSlot, setSelectedSlot] = useState('');
  const [reason, setReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const doctors = [
    { id: 1, name: 'Dr. Sarah Smith', specialty: 'General Dentist', rating: 4.9, initials: 'SS', location: 'Main Campus', gradient: 'linear-gradient(135deg, #2563EB, #3B82F6)' },
    { id: 2, name: 'Dr. Michael Chen', specialty: 'Orthodontist', rating: 4.8, initials: 'MC', location: 'East Wing', gradient: 'linear-gradient(135deg, #0D9488, #14B8A6)' },
    { id: 3, name: 'Dr. Emily Carter', specialty: 'Endodontist', rating: 4.9, initials: 'EC', location: 'Suite 200', gradient: 'linear-gradient(135deg, #8B5CF6, #A78BFA)' },
  ];

  const specialties = ['All', 'General Dentist', 'Orthodontist', 'Endodontist'];
  const filteredDoctors = selectedSpecialty === 'All' ? doctors : doctors.filter(d => d.specialty === selectedSpecialty);

  const slots = [
    { time: '09:00 AM', available: true },
    { time: '09:30 AM', available: false },
    { time: '10:00 AM', available: true },
    { time: '10:30 AM', available: true },
    { time: '11:00 AM', available: true },
    { time: '01:00 PM', available: true },
    { time: '02:00 PM', available: true },
    { time: '02:30 PM', available: false },
    { time: '03:00 PM', available: true },
  ];

  const handleConfirm = () => {
    setIsSubmitting(true);
    setTimeout(() => { setStep(4); setIsSubmitting(false); }, 1200);
  };

  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      {step < 4 && (
        <motion.div variants={fadeUp} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
          <h1 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Book Appointment</h1>
          <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Find a specialist and schedule your visit.</p>
          {/* Steps */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 24 }}>
            {['Doctor', 'Schedule', 'Confirm'].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4, flex: 1 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, fontWeight: 700,
                  background: step > i + 1 ? 'var(--accent)' : step === i + 1 ? 'var(--accent-soft)' : 'var(--bg-subtle)',
                  color: step > i + 1 ? 'white' : step === i + 1 ? 'var(--accent)' : 'var(--text-tertiary)',
                  border: step === i + 1 ? '2px solid var(--accent)' : '2px solid transparent',
                  transition: 'all 0.3s',
                }}>
                  {step > i + 1 ? <CheckCircle2 size={14} /> : i + 1}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: step >= i + 1 ? 'var(--text-primary)' : 'var(--text-tertiary)' }}>{s}</span>
                {i < 2 && <div style={{ flex: 1, height: 2, background: step > i + 1 ? 'var(--accent)' : 'var(--border)', borderRadius: 2, marginLeft: 4, transition: 'background 0.4s' }} />}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      <AnimatePresence mode="wait">
        {/* STEP 1: Select Doctor */}
        {step === 1 && (
          <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* Filters */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
              {specialties.map(s => (
                <button key={s} onClick={() => setSelectedSpecialty(s)}
                  style={{
                    padding: '8px 18px', borderRadius: 99, fontSize: 13, fontWeight: 500, cursor: 'pointer',
                    background: selectedSpecialty === s ? 'var(--accent)' : 'var(--bg-surface)',
                    color: selectedSpecialty === s ? 'white' : 'var(--text-secondary)',
                    border: `1px solid ${selectedSpecialty === s ? 'var(--accent)' : 'var(--border)'}`,
                    transition: 'all 0.2s',
                  }}
                >{s}</button>
              ))}
            </div>

            <div style={{ display: 'grid', gap: 12 }}>
              {filteredDoctors.map(doc => (
                <div key={doc.id} className="card" onClick={() => { setSelectedDoctor(doc); setStep(2); }}
                  style={{ padding: 24, display: 'flex', alignItems: 'center', gap: 20, cursor: 'pointer' }}>
                  <div style={{ width: 56, height: 56, borderRadius: 16, background: doc.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 18, flexShrink: 0 }}>
                    {doc.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 2 }}>{doc.name}</div>
                    <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 6 }}>{doc.specialty}</div>
                    <div style={{ display: 'flex', gap: 12, fontSize: 12, color: 'var(--text-tertiary)' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Star size={12} fill="#F59E0B" color="#F59E0B" /> {doc.rating}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><MapPin size={12} /> {doc.location}</span>
                    </div>
                  </div>
                  <ArrowRight size={18} style={{ color: 'var(--text-tertiary)' }} />
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* STEP 2: Schedule */}
        {step === 2 && (
          <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            {/* Doctor Summary */}
            <div className="card" style={{ padding: 20, marginBottom: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: selectedDoctor?.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 700, fontSize: 14 }}>
                {selectedDoctor?.initials}
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 700 }}>{selectedDoctor?.name}</div>
                <div style={{ fontSize: 12, color: 'var(--text-tertiary)' }}>{selectedDoctor?.specialty}</div>
              </div>
              <button onClick={() => setStep(1)} style={{ marginLeft: 'auto', fontSize: 13, color: 'var(--accent)', fontWeight: 600, background: 'none', border: 'none', cursor: 'pointer' }}>Change</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <div className="card" style={{ padding: 24 }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <CalendarDays size={16} style={{ color: 'var(--accent)' }} /> Select Date
                </h4>
                <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} className="input-field"
                  min={new Date().toISOString().split('T')[0]} style={{ marginBottom: 20 }} />

                {selectedDate && (
                  <>
                    <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12, display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Clock size={16} style={{ color: 'var(--teal)' }} /> Available Slots
                    </h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                      {slots.map((slot, i) => (
                        <button key={i} disabled={!slot.available} onClick={() => setSelectedSlot(slot.time)}
                          className={`time-slot ${slot.available ? (selectedSlot === slot.time ? 'selected' : 'available') : 'booked'}`}>
                          {slot.time}
                        </button>
                      ))}
                    </div>
                    {selectedSlot && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12, padding: '8px 12px', borderRadius: 10, background: 'var(--amber-soft)', color: 'var(--amber)', fontSize: 12, fontWeight: 500 }}>
                        <AlertCircle size={14} /> Slot held for 5 minutes
                      </div>
                    )}
                  </>
                )}
              </div>

              <div className="card" style={{ padding: 24, display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: 14, fontWeight: 700, marginBottom: 12 }}>Reason for Visit</h4>
                <textarea value={reason} onChange={e => setReason(e.target.value)} className="input-field" placeholder="Describe your symptoms or reason..."
                  style={{ minHeight: 140, resize: 'vertical', flex: 1 }} />
                <button onClick={() => setStep(3)} disabled={!selectedDate || !selectedSlot || !reason}
                  className="btn btn-primary" style={{ width: '100%', marginTop: 16, opacity: (!selectedDate || !selectedSlot || !reason) ? 0.5 : 1 }}>
                  Continue to Summary <ArrowRight size={16} />
                </button>
              </div>
            </div>

            <button onClick={() => setStep(1)} className="btn btn-ghost" style={{ marginTop: 12 }}>
              <ArrowLeft size={16} /> Back to Doctors
            </button>
          </motion.div>
        )}

        {/* STEP 3: Summary */}
        {step === 3 && (
          <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }}>
            <div className="card" style={{ maxWidth: 520, margin: '0 auto', overflow: 'hidden' }}>
              <div style={{ padding: '32px 32px 24px', background: 'linear-gradient(135deg, #EFF6FF, #F0FDFA)', borderBottom: '1px solid var(--border)', textAlign: 'center' }}>
                <h2 style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.02em', marginBottom: 4 }}>Appointment Summary</h2>
                <p style={{ fontSize: 13, color: 'var(--text-secondary)' }}>Review and confirm your booking</p>
              </div>
              <div style={{ padding: 32, display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { label: 'Doctor', value: selectedDoctor?.name },
                  { label: 'Specialty', value: selectedDoctor?.specialty },
                  { label: 'Date', value: selectedDate },
                  { label: 'Time', value: selectedSlot },
                  { label: 'Reason', value: reason },
                ].map((r, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', paddingBottom: 12, borderBottom: '1px solid var(--border)' }}>
                    <span style={{ fontSize: 13, color: 'var(--text-tertiary)' }}>{r.label}</span>
                    <span style={{ fontSize: 14, fontWeight: 600, textAlign: 'right', maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.value}</span>
                  </div>
                ))}
                <div style={{ display: 'flex', gap: 12 }}>
                  <button onClick={() => setStep(2)} className="btn btn-secondary" style={{ flex: 1 }}>Back</button>
                  <button onClick={handleConfirm} disabled={isSubmitting} className="btn btn-primary" style={{ flex: 1 }}>
                    {isSubmitting ? 'Confirming...' : 'Confirm Booking'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* STEP 4: Success */}
        {step === 4 && (
          <motion.div key="s4" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            style={{ maxWidth: 480, margin: '40px auto', textAlign: 'center' }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--accent), var(--teal))', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', boxShadow: 'var(--shadow-glow)' }}>
              <CheckCircle2 size={36} color="white" />
            </motion.div>
            <h2 style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.03em', marginBottom: 8 }}>Booking Confirmed!</h2>
            <p style={{ fontSize: 15, color: 'var(--text-secondary)', marginBottom: 32, lineHeight: 1.6 }}>
              Your appointment with {selectedDoctor?.name} is set for {selectedDate} at {selectedSlot}.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <button className="btn btn-secondary" style={{ width: '100%' }}>
                <CalendarDays size={16} /> Add to Calendar
              </button>
              <button onClick={() => router.push('/dashboard')} className="btn btn-primary" style={{ width: '100%' }}>
                Return to Dashboard
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
