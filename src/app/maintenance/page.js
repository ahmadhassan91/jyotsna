"use client";
import { useState } from 'react';

export default function MaintenanceHub() {
    const [tickets, setTickets] = useState([
        { id: 'WO-1049', unit: 'GN-402', Category: 'HVAC', description: 'AC unit blowing warm air, making grinding noise', priority: 'High', status: 'In Progress', date: 'Today, 08:30 AM' },
        { id: 'WO-1048', unit: 'GN-205', Category: 'Plumbing', description: 'Leaking faucet in master bathroom', priority: 'Low', status: 'Open', date: 'Yesterday, 04:15 PM' },
        { id: 'WO-1047', unit: 'BMG-110', Category: 'Appliance', description: 'Refrigerator stopped cooling entirely', priority: 'Emergency', status: 'Dispatched', date: 'Yesterday, 02:00 PM' },
        { id: 'WO-1046', unit: 'BMG-305', Category: 'Electrical', description: 'Hallway outlet sparking when used', priority: 'Emergency', status: 'Closed - Resolved', date: 'Aug 10, 2026' }
    ]);

    const [isCreating, setIsCreating] = useState(false);
    const [form, setForm] = useState({ unit: '', Category: 'Plumbing', description: '', priority: 'Low' });

    const handleCreateTicket = (e) => {
        e.preventDefault();
        if(!form.unit || !form.description) return;

        const newTicket = {
            id: `WO-${1050 + tickets.length}`,
            unit: form.unit,
            Category: form.Category,
            description: form.description,
            priority: form.priority,
            status: 'Open',
            date: 'Just Now'
        };

        // Add to top of list
        setTickets([newTicket, ...tickets]);
        setIsCreating(false);
        setForm({ unit: '', Category: 'Plumbing', description: '', priority: 'Low' });
    };

    return (
        <div className="section-active" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                    <div style={{ background: 'rgba(255,255,255,0.03)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Open Tickets</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 300, color: '#fff', margin: 0 }}>{tickets.filter(t => t.status !== 'Closed - Resolved').length}</p>
                    </div>
                    <div style={{ background: 'rgba(244, 63, 94, 0.05)', padding: '16px 24px', borderRadius: '12px', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
                        <p style={{ fontSize: '0.75rem', color: 'rgba(244, 63, 94, 0.8)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '4px' }}>Emergencies</p>
                        <p style={{ fontSize: '1.5rem', fontWeight: 300, color: 'var(--danger)', margin: 0 }}>{tickets.filter(t => t.priority === 'Emergency' && t.status !== 'Closed - Resolved').length}</p>
                    </div>
                </div>
                <button 
                    className="btn btn-primary"
                    style={{ display: 'flex', alignItems: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)', padding: '12px 24px' }}
                    onClick={() => setIsCreating(true)}
                >
                    <svg style={{ width: '20px', height: '20px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                    Submit Work Order
                </button>
            </div>

            <div className="glass-panel" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <div style={{ padding: '24px 32px', borderBottom: '1px solid var(--panel-border)', background: 'linear-gradient(to right, rgba(255,255,255,0.02), transparent)' }}>
                    <h3 style={{ fontSize: '1.125rem', fontWeight: 500, color: '#fff', letterSpacing: '0.025em', margin: 0 }}>Active Maintenance Queue</h3>
                </div>
                
                <div style={{ overflow: 'auto', flex: 1, padding: '16px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {tickets.map((ticket) => (
                        <div key={ticket.id} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid var(--panel-border)', borderRadius: '12px', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px', transition: 'background 0.2s', cursor: 'default' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'}>
                            <div style={{ flex: 1 }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                                    <span style={{ fontFamily: 'monospace', color: 'var(--accent)', fontWeight: 'bold', fontSize: '0.875rem', letterSpacing: '0.025em' }}>{ticket.id}</span>
                                    <span style={{ color: '#fff', fontWeight: 500, paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>{ticket.unit}</span>
                                    <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', paddingLeft: '12px', borderLeft: '1px solid rgba(255,255,255,0.2)' }}>{ticket.date}</span>
                                </div>
                                <p style={{ color: '#cbd5e1', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>{ticket.description}</p>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '24px', flexWrap: 'wrap' }}>
                                <div>
                                    <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Category</p>
                                    <p style={{ fontSize: '0.875rem', fontWeight: 500, color: '#cbd5e1', margin: 0 }}>{ticket.Category}</p>
                                </div>
                                <div style={{ width: '96px' }}>
                                    <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Priority</p>
                                    <span style={{ 
                                        padding: '4px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 600, display: 'inline-block',
                                        ...(ticket.priority === 'Emergency' ? { background: 'rgba(244, 63, 94, 0.2)', color: 'var(--danger)', border: '1px solid rgba(244, 63, 94, 0.3)' } :
                                            ticket.priority === 'High' ? { background: 'rgba(245, 158, 11, 0.2)', color: 'var(--warning)', border: '1px solid rgba(245, 158, 11, 0.3)' } :
                                            { background: 'rgba(100, 116, 139, 0.2)', color: '#cbd5e1', border: '1px solid rgba(100, 116, 139, 0.3)' })
                                    }}>{ticket.priority}</span>
                                </div>
                                <div style={{ width: '128px' }}>
                                    <p style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '4px' }}>Status</p>
                                    <span style={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                        {ticket.status !== 'Closed - Resolved' ? (
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent)', animation: 'pulse 2s infinite' }}></span>
                                        ) : (
                                            <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#475569' }}></span>
                                        )}
                                        {ticket.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Functional Create Modal */}
            {isCreating && (
                <div className="modal-overlay" style={{ zIndex: 50 }}>
                    <div className="modal glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 50px rgba(0,0,0,0.5)', maxWidth: '512px', width: '100%' }}>
                        <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', color: '#fff', display: 'flex', alignItems: 'center', gap: '8px', margin: 0 }}>
                                <svg style={{ width: '20px', height: '20px', color: 'var(--accent)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                Issue New Work Order
                            </h3>
                        </div>
                        <form onSubmit={handleCreateTicket} style={{ padding: '24px 0', display: 'flex', flexDirection: 'column', gap: '24px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 1fr))', gap: '24px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Target Unit</label>
                                    <input 
                                        type="text" required
                                        className="input-field" 
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}
                                        placeholder="e.g. GN-405"
                                        value={form.unit}
                                        onChange={(e) => setForm({...form, unit: e.target.value})}
                                    />
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column' }}>
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Issue Category</label>
                                    <select 
                                        className="input-field" 
                                        style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}
                                        value={form.Category}
                                        onChange={(e) => setForm({...form, Category: e.target.value})}
                                    >
                                        <option value="Plumbing" style={{ background: '#1e293b' }}>Plumbing</option>
                                        <option value="HVAC" style={{ background: '#1e293b' }}>HVAC / AC</option>
                                        <option value="Appliance" style={{ background: '#1e293b' }}>Appliance Repair</option>
                                        <option value="Electrical" style={{ background: '#1e293b' }}>Electrical</option>
                                        <option value="General" style={{ background: '#1e293b' }}>General Repair</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    Priority Level
                                    {form.priority === 'Emergency' && <span style={{ color: 'var(--danger)', animation: 'pulse 2s infinite' }}>Immediate Dispatch Required</span>}
                                </label>
                                <select 
                                    className="input-field" 
                                    style={{ 
                                        width: '100%', transition: 'all 0.2s',
                                        ...(form.priority === 'Emergency' ? { border: '1px solid rgba(244, 63, 94, 0.5)', color: 'var(--danger)', background: 'rgba(244, 63, 94, 0.05)' } : { background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' })
                                    }}
                                    value={form.priority}
                                    onChange={(e) => setForm({...form, priority: e.target.value})}
                                >
                                    <option value="Low" style={{ background: '#1e293b', color: '#fff' }}>Low - Standard queue</option>
                                    <option value="High" style={{ background: '#1e293b', color: '#fff' }}>High - Within 24-hours</option>
                                    <option value="Emergency" style={{ background: '#1e293b', color: 'var(--danger)' }}>Emergency - Dispatch Immediately</option>
                                </select>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column' }}>
                                <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Description of Problem</label>
                                <textarea 
                                    required rows="4"
                                    className="input-field" 
                                    style={{ width: '100%', resize: 'none', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', color: '#fff' }}
                                    placeholder="Provide detailed description for the maintenance contractor..."
                                    value={form.description}
                                    onChange={(e) => setForm({...form, description: e.target.value})}
                                ></textarea>
                            </div>

                            <div style={{ paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '16px' }}>
                                <button type="button" className="btn btn-outline" style={{ padding: '10px 24px', borderRadius: '12px' }} onClick={() => setIsCreating(false)}>Cancel</button>
                                <button type="submit" className="btn btn-primary" style={{ padding: '10px 32px', boxShadow: '0 4px 12px rgba(56,189,248,0.3)' }}>Submit Ticket</button>
                            </div>
                        </form>
                    </div>
                </div> 
            )}
        </div>
    );
}
