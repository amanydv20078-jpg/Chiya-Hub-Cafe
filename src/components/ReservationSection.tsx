import React, { useState } from 'react';
import { ReservationData } from '../types';
import { MapPin, Phone, Mail, Clock, Calendar, Users, CheckCircle2, Sparkles, Send } from 'lucide-react';

export const ReservationSection: React.FC = () => {
  const [formData, setFormData] = useState<ReservationData>({
    fullName: '',
    email: '',
    phone: '',
    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
    time: '11:00 AM',
    guests: 2,
    seatingArea: 'Indoor Cozy',
    occasion: 'Casual Catchup',
    specialRequests: '',
  });

  const [confirmedReservation, setConfirmedReservation] = useState<ReservationData | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConfirmedReservation({ ...formData });
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 md:px-12 bg-[#f0eded]/60 border-t border-[#e5e2e1] relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs md:text-sm font-bold tracking-widest text-[#c86d3b] uppercase font-sans">
            Visit & Connect
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#271310] mt-2 mb-4 tracking-tight">
            Reserve a Table & Find Us
          </h2>
          <p className="text-sm md:text-base text-[#504442]">
            Whether you're planning a meeting, an afternoon tea date, or solo deep-work hours, we’ll save the perfect cozy spot for you.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Contact Info & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#fcf9f8] p-6 sm:p-8 rounded-2xl border border-[#e5e2e1] shadow-[0_4px_20px_rgba(39,19,16,0.04)]">
              <h3 className="font-serif text-xl font-bold text-[#271310] mb-6">
                Café Details & Hours
              </h3>

              <div className="space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eadecc] text-[#271310] flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-[#271310]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#504442]">
                      Location
                    </h4>
                    <p className="text-sm font-semibold text-[#271310] mt-0.5">
                      142 Heritage Way, Arts District
                    </p>
                    <p className="text-xs text-[#827472]">Corner of Timberline & Silk St.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eadecc] text-[#271310] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5 text-[#271310]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#504442]">
                      Opening Hours
                    </h4>
                    <p className="text-sm text-[#271310] mt-0.5">
                      <strong className="text-[#271310]">Mon – Fri:</strong> 7:00 AM – 9:00 PM
                    </p>
                    <p className="text-sm text-[#271310]">
                      <strong className="text-[#271310]">Sat – Sun:</strong> 8:00 AM – 10:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eadecc] text-[#271310] flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5 text-[#271310]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#504442]">
                      Direct Telephone
                    </h4>
                    <p className="text-sm font-semibold text-[#271310] mt-0.5">
                      +1 (555) 244-9248 / +977 1-4239870
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-[#eadecc] text-[#271310] flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5 text-[#271310]" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-[#504442]">
                      Email & Events
                    </h4>
                    <p className="text-sm font-semibold text-[#271310] mt-0.5">
                      namaste@chiyahub.cafe
                    </p>
                  </div>
                </div>
              </div>

              {/* Special Features Card */}
              <div className="mt-8 pt-6 border-t border-[#f0eded] bg-[#f6f3f2] p-4 rounded-xl">
                <div className="flex items-center gap-2 text-xs font-bold text-[#c86d3b] mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Complimentary Amenities</span>
                </div>
                <p className="text-xs text-[#504442] leading-relaxed">
                  High-speed 1Gbps fiber internet, laptop charging stations at every booth, and pet-friendly outdoor terrace.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Reservation Form / Digital Pass (7 cols) */}
          <div className="lg:col-span-7">
            <div className="bg-[#fcf9f8] p-6 sm:p-8 rounded-2xl border border-[#e5e2e1] shadow-[0_4px_20px_rgba(39,19,16,0.04)]">
              {confirmedReservation ? (
                <div className="text-center py-8 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <span className="text-xs font-bold tracking-widest text-[#c86d3b] uppercase">
                    Table Reserved!
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#271310] mt-1 mb-2">
                    We Look Forward to Welcoming You
                  </h3>
                  <p className="text-xs sm:text-sm text-[#504442] max-w-md mx-auto mb-8">
                    A confirmation SMS & email have been dispatched with your reservation pass.
                  </p>

                  {/* Digital Reservation Pass Card */}
                  <div className="bg-[#ede1cf] p-6 rounded-2xl border-2 border-dashed border-[#827472] max-w-md mx-auto text-left shadow-inner mb-6 relative">
                    <div className="flex justify-between items-start border-b border-[#827472]/40 pb-3 mb-4">
                      <div>
                        <span className="text-[10px] uppercase font-bold text-[#6a6253]">Chiya Hub Café</span>
                        <h4 className="font-serif text-lg font-bold text-[#271310]">Table Booking Pass</h4>
                      </div>
                      <span className="text-xs font-mono bg-[#271310] text-[#fcf9f8] px-2 py-1 rounded">
                        #CH-{(Math.random() * 9000 + 1000).toFixed(0)}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs mb-4">
                      <div>
                        <span className="text-[#6a6253] block text-[11px]">Guest Name</span>
                        <strong className="text-[#271310] text-sm">{confirmedReservation.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-[#6a6253] block text-[11px]">Party Size</span>
                        <strong className="text-[#271310] text-sm">{confirmedReservation.guests} Guests</strong>
                      </div>
                      <div>
                        <span className="text-[#6a6253] block text-[11px]">Date</span>
                        <strong className="text-[#271310] text-sm">{confirmedReservation.date}</strong>
                      </div>
                      <div>
                        <span className="text-[#6a6253] block text-[11px]">Time</span>
                        <strong className="text-[#271310] text-sm">{confirmedReservation.time}</strong>
                      </div>
                      <div className="col-span-2">
                        <span className="text-[#6a6253] block text-[11px]">Seating Preference</span>
                        <strong className="text-[#271310]">{confirmedReservation.seatingArea}</strong>
                      </div>
                    </div>

                    <div className="text-[11px] text-[#504442] italic border-t border-[#827472]/30 pt-2 flex items-center justify-between">
                      <span>Held for 15 minutes past scheduled time.</span>
                      <span>☕ Enjoy!</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setConfirmedReservation(null)}
                    className="text-xs font-bold text-[#271310] hover:text-[#c86d3b] underline cursor-pointer"
                  >
                    Modify or Book Another Table
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#e5e2e1] pb-4 mb-2">
                    <h3 className="font-serif text-xl font-bold text-[#271310]">
                      Book Your Table
                    </h3>
                    <p className="text-xs text-[#504442] mt-0.5">
                      Instant reservation with zero booking fee.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Maya Joshi"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="e.g. (555) 019-2834"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Date *
                      </label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Time Slot *
                      </label>
                      <select
                        value={formData.time}
                        onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      >
                        {[
                          '8:00 AM',
                          '9:30 AM',
                          '11:00 AM',
                          '12:30 PM',
                          '2:00 PM',
                          '3:30 PM',
                          '5:00 PM',
                          '6:30 PM',
                          '8:00 PM',
                        ].map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Guests *
                      </label>
                      <select
                        value={formData.guests}
                        onChange={(e) =>
                          setFormData({ ...formData, guests: parseInt(e.target.value, 10) })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      >
                        {[1, 2, 3, 4, 5, 6, 8, 10, 12].map((g) => (
                          <option key={g} value={g}>
                            {g} {g === 1 ? 'Guest' : 'Guests'}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Seating Zone
                      </label>
                      <select
                        value={formData.seatingArea}
                        onChange={(e) =>
                          setFormData({ ...formData, seatingArea: e.target.value as any })
                        }
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      >
                        <option value="Indoor Cozy">Indoor Cozy Leather Booth</option>
                        <option value="Window Sunlit">Window Sunlit Table</option>
                        <option value="Outdoor Garden Terrace">Outdoor Garden Terrace</option>
                        <option value="Quiet Workspace">Quiet Workspace Pod</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="For reservation confirmation"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                      Special Requests / Notes
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. high chair needed, anniversary table, quiet corner..."
                      value={formData.specialRequests}
                      onChange={(e) =>
                        setFormData({ ...formData, specialRequests: e.target.value })
                      }
                      className="w-full text-xs p-3 rounded-xl border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#271310] hover:bg-[#3e2723] text-white py-3.5 rounded-xl font-sans font-bold text-sm tracking-wide shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-2"
                  >
                    <span>Confirm Table Booking</span>
                    <span>→</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
