"use client";
import { useRouter } from 'next/navigation';

export default function RecentActivity() {
    const router = useRouter();
    const activities = [
        { id: 'TRX-1092', user: 'Michael Smith', action: 'Rent Payment - Aug 2026', unit: 'Unit 402', amount: '+$1,850.00', status: 'Cleared', date: 'Today, 09:42 AM' },
        { id: 'TRX-1091', user: 'System', action: 'Late Fee Assessed', unit: 'Unit 201', amount: '+$50.00', status: 'Pending', date: 'Yesterday, 11:00 PM' },
        { id: 'TRX-1090', user: 'Sarah Jenkins', action: 'Lease Renewal Signed', unit: 'Unit 310', amount: '-', status: 'Completed', date: 'Yesterday, 04:15 PM' },
        { id: 'MNT-4401', user: 'Maintenance Team', action: 'HVAC Repair', unit: 'Unit 105', amount: '-$320.00', status: 'Paid', date: 'Aug 12, 10:30 AM' },
        { id: 'TRX-1089', user: 'David Cho', action: 'Security Deposit', unit: 'Unit 505', amount: '+$2,100.00', status: 'Cleared', date: 'Aug 11, 01:20 PM' }
    ];

    return (
        <div className="glass-panel" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div style={{ padding: '24px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--panel-border)', background: 'linear-gradient(to right, rgba(255,255,255,0.02), transparent)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', letterSpacing: '0.025em', margin: 0 }}>Recent Financial Activity</h3>
                <button 
                    onClick={() => router.push('/reports')}
                    style={{ color: 'var(--accent)', fontSize: '0.875rem', fontWeight: 500, background: 'transparent', border: 'none', display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
                >
                    View All Register
                    <svg style={{ width: '16px', height: '16px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                </button>
            </div>
            
            <div style={{ overflowX: 'auto', paddingBottom: '16px', padding: '0 8px' }}>
                <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr style={{ color: 'var(--text-secondary)', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                            <th style={{ padding: '16px 24px' }}>Transaction ID</th>
                            <th style={{ padding: '16px 24px' }}>Tenant / User</th>
                            <th style={{ padding: '16px 24px' }}>Description</th>
                            <th style={{ padding: '16px 24px', textAlign: 'center' }}>Unit</th>
                            <th style={{ padding: '16px 24px' }}>Amount</th>
                            <th style={{ padding: '16px 24px', textAlign: 'right' }}>Status</th>
                        </tr>
                    </thead>
                    <tbody style={{ fontSize: '0.875rem' }}>
                        {activities.map((item, idx) => (
                            <tr key={idx} style={{ borderBottom: '1px solid var(--panel-border)', transition: 'background 0.2s', cursor: 'pointer' }} onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.02)'} onMouseOut={(e) => e.currentTarget.style.background = 'transparent'}>
                                <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontSize: '0.75rem', color: 'var(--text-secondary)', fontWeight: 500, letterSpacing: '0.025em' }}>{item.id}</td>
                                <td style={{ padding: '16px 24px' }}>
                                    <div style={{ fontWeight: 600, color: '#fff', letterSpacing: '0.025em', marginBottom: '2px' }}>{item.user}</div>
                                    <div style={{ fontSize: '0.625rem', color: 'var(--text-secondary)', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.date}</div>
                                </td>
                                <td style={{ padding: '16px 24px', color: '#cbd5e1', fontWeight: 300 }}>{item.action}</td>
                                <td style={{ padding: '16px 24px', color: 'var(--text-secondary)', textAlign: 'center' }}>
                                    <span style={{ background: 'rgba(30, 41, 59, 0.5)', border: '1px solid rgba(51, 65, 85, 1)', fontFamily: 'monospace', fontSize: '0.75rem', padding: '4px 8px', borderRadius: '4px' }}>{item.unit}</span>
                                </td>
                                <td style={{ padding: '16px 24px', fontFamily: 'monospace', fontWeight: 'bold', letterSpacing: '0.025em', color: item.amount.startsWith('-') ? 'var(--danger)' : item.amount !== '-' ? 'var(--success)' : 'var(--text-secondary)' }}>
                                    {item.amount}
                                </td>
                                <td style={{ padding: '16px 24px', textAlign: 'right' }}>
                                    <span style={{ 
                                        padding: '6px 12px', 
                                        borderRadius: '9999px', 
                                        fontSize: '0.625rem', 
                                        fontWeight: 'bold', 
                                        textTransform: 'uppercase', 
                                        letterSpacing: '0.1em', 
                                        border: '1px solid',
                                        ...(item.status === 'Cleared' || item.status === 'Completed' || item.status === 'Paid' 
                                            ? { background: 'rgba(16, 185, 129, 0.1)', color: 'var(--success)', borderColor: 'rgba(16, 185, 129, 0.2)', boxShadow: '0 0 10px rgba(16,185,129,0.1)' } 
                                            : { background: 'rgba(245, 158, 11, 0.1)', color: 'var(--warning)', borderColor: 'rgba(245, 158, 11, 0.2)', boxShadow: '0 0 10px rgba(245,158,11,0.1)' })
                                    }}>
                                        {item.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
