"use client";
import { useState } from 'react';

export default function LeadModal({ leadName, onClose }) {
  const [activeTab, setActiveTab] = useState('overview'); // overview, timeline
  const [workflowState, setWorkflowState] = useState('idle'); // idle, generating, done

  if (!leadName) return null;

  const handleGenerateLease = () => {
      setWorkflowState('generating');
      setTimeout(() => {
          setWorkflowState('done');
      }, 3000); // Simulate 3 seconds of generating a lease connecting to API
  };

  const timelineEvents = [
    { date: 'May 10', time: '10:30 AM', title: 'Zillow Inquiry Received', detail: 'Initial interest in 2BHK unit.', icon: '✉️', type: 'auto' },
    { date: 'May 11', time: '02:15 PM', title: 'Initial Phone Call', detail: 'Discussed amenities and parking requirements.', icon: '📞', type: 'manual' },
    { date: 'May 12', time: '11:00 AM', title: 'Virtual Tour Shared', detail: 'Sent 3D walkthrough of Unit 402.', icon: '🖼️', type: 'system' },
    { date: 'May 15', time: '04:45 PM', title: 'Price List Generated', detail: 'Digital quote sent via system.', icon: '📄', type: 'system' },
  ];

  return (
    <div className="modal-overlay" style={{ zIndex: 50 }}>
        <div className="modal glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 50px rgba(0,0,0,0.5)', maxWidth: '600px', width: '100%' }}>
            <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', color: '#fff', margin: 0 }}>{leadName}</h3>
                    <div className="tab-pill-container" style={{ display: 'flex', background: 'rgba(0,0,0,0.2)', padding: '2px', borderRadius: '8px' }}>
                        <button 
                            onClick={() => setActiveTab('overview')}
                            style={{ 
                                padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                                background: activeTab === 'overview' ? 'var(--accent)' : 'transparent',
                                color: activeTab === 'overview' ? '#fff' : 'var(--text-secondary)'
                            }}
                        >Overview</button>
                        <button 
                            onClick={() => setActiveTab('timeline')}
                            style={{ 
                                padding: '4px 12px', borderRadius: '6px', fontSize: '0.75rem', border: 'none', cursor: 'pointer',
                                background: activeTab === 'timeline' ? 'var(--accent)' : 'transparent',
                                color: activeTab === 'timeline' ? '#fff' : 'var(--text-secondary)'
                            }}
                        >Timeline</button>
                    </div>
                </div>
                <button style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }} onClick={onClose}>
                    <svg style={{ width: '24px', height: '24px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                </button>
            </div>
            
            <div style={{ padding: '24px 0', minHeight: '320px', display: 'flex', flexDirection: 'column' }}>
                {workflowState === 'idle' ? (
                    activeTab === 'overview' ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Contact Info</label>
                                <input type="text" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} defaultValue={`${leadName.toLowerCase().replace(' ','')}@example.com | (555) 123-4567`} />
                            </div>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '16px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Lead Source</label>
                                    <select className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} defaultValue="Zillow">
                                        <option value="Zillow" style={{ background: '#1e293b' }}>Zillow</option>
                                        <option value="Direct Website" style={{ background: '#1e293b' }}>Direct Website</option>
                                        <option value="Referral" style={{ background: '#1e293b' }}>Referral</option>
                                    </select>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Follow-up Date</label>
                                    <input type="date" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} />
                                </div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Notes</label>
                                <textarea className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }} rows="4" defaultValue="Looking for an immediate move-in. Needs a parking spot."></textarea>
                            </div>
                        </div>
                    ) : (
                        <div className="timeline-container" style={{ padding: '8px 4px' }}>
                            {timelineEvents.map((event, idx) => (
                                <div key={idx} style={{ display: 'flex', gap: '16px', position: 'relative', marginBottom: '24px' }}>
                                    {idx !== timelineEvents.length - 1 && (
                                        <div style={{ position: 'absolute', left: '16px', top: '32px', bottom: '-24px', width: '2px', background: 'rgba(255,255,255,0.05)' }}></div>
                                    )}
                                    <div style={{ 
                                        width: '32px', height: '32px', borderRadius: '50%', background: 'rgba(30, 41, 59, 0.8)', border: '1px solid rgba(255,255,255,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.875rem', zIndex: 1
                                    }}>{event.icon}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                            <h4 style={{ fontSize: '0.875rem', fontWeight: 600, color: '#f8fafc', margin: 0 }}>{event.title}</h4>
                                            <span style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase' }}>{event.date} • {event.time}</span>
                                        </div>
                                        <p style={{ fontSize: '0.75rem', color: '#94a3b8', margin: 0 }}>{event.detail}</p>
                                        <span style={{ 
                                            display: 'inline-block', marginTop: '8px', fontSize: '0.6rem', padding: '2px 6px', borderRadius: '4px',
                                            background: event.type === 'auto' ? 'rgba(56, 189, 248, 0.1)' : event.type === 'manual' ? 'rgba(16, 185, 129, 0.1)' : 'rgba(99, 102, 241, 0.1)',
                                            color: event.type === 'auto' ? '#38bdf8' : event.type === 'manual' ? '#10b981' : '#818cf8',
                                            border: '1px solid rgba(255,255,255,0.05)'
                                        }}>
                                            {event.type.toUpperCase()} LOG
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )
                ) : workflowState === 'generating' ? (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 0', flex: 1 }}>
                        <svg style={{ animation: 'spin 1s linear infinite', height: '40px', width: '40px', color: 'var(--accent)', marginBottom: '16px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                        <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 500, letterSpacing: '0.025em' }}>Generating Lease Agreement...</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '8px' }}>Pulling prospect data and mapping to state-specific templates.</p>
                        <div style={{ width: '100%', background: 'rgba(255,255,255,0.05)', height: '8px', borderRadius: '9999px', marginTop: '24px', overflow: 'hidden' }}>
                            <div style={{ height: '100%', background: 'var(--accent)', width: '75%', borderRadius: '9999px', animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' }}></div>
                        </div>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '32px 0', flex: 1 }}>
                        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px' }}>
                            <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                        </div>
                        <h4 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em' }}>Agreement Dispatched!</h4>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '8px', textAlign: 'center', maxWidth: '300px' }}>Lease document has been securely generated and emailed to {leadName} via DocuSign workflow integration.</p>
                        <button className="btn btn-outline" style={{ marginTop: '32px' }} onClick={onClose}>
                            Return to Board
                        </button>
                    </div>
                )}
            </div>

            {workflowState === 'idle' && (
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', marginTop: '8px', display: 'flex', justifyContent: 'space-between' }}>
                    <button 
                        style={{ cursor: 'pointer', padding: '8px 24px', background: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500 }}
                        onClick={handleGenerateLease}
                    >
                        Simulate: Generate Auto-Lease
                    </button>
                    <div style={{ display: 'flex', gap: '12px' }}>
                        <button className="btn btn-outline" style={{ padding: '8px 24px' }} onClick={onClose}>Cancel</button>
                        <button className="btn btn-primary" style={{ padding: '8px 24px' }} onClick={onClose}>Update Record</button>
                    </div>
                </div>
            )}
        </div>
    </div>
  );
}
