"use client";
import { useState } from 'react';

export default function AlertsCenter() {
    const alerts = [
        { id: 1, type: 'renewal', title: 'Lease Expiry: Sarah Jenkins', detail: 'Unit 310 expires in 12 days. No renewal signed.', status: 'urgent' },
        { id: 2, type: 'vacancy', title: 'Unit 204 Now Available', detail: 'Transitioned from "Maintenance" to "Ready".', status: 'info' },
        { id: 3, type: 'audit', title: 'Potential Missing Charge', detail: 'Parking fee missing from Michael Smith (TRX-1092).', status: 'warning' },
        { id: 4, type: 'renewal', title: 'Renewal Alert: West Side', detail: '4 leases in West Side Property expire next month.', status: 'scheduled' },
    ];

    const getStatusColor = (status) => {
        switch (status) {
            case 'urgent': return 'var(--danger)';
            case 'warning': return 'var(--warning)';
            case 'info': return 'var(--accent)';
            case 'scheduled': return 'var(--success)';
            default: return 'var(--text-secondary)';
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 600, color: '#fff', margin: 0 }}>Automated Lifecycle Alerts</h3>
                <span className="badge" style={{ background: 'rgba(239, 68, 68, 0.2)', color: 'var(--danger)', border: '1px solid rgba(239, 68, 68, 0.2)' }}>2 ACTION REQUIRED</span>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {alerts.map((alert) => (
                    <div key={alert.id} style={{ 
                        display: 'flex', gap: '16px', padding: '12px 16px', borderRadius: '8px', 
                        background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
                        transition: 'transform 0.2s, background 0.2s', cursor: 'pointer'
                    }} onMouseOver={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                        e.currentTarget.style.transform = 'translateX(4px)';
                    }} onMouseOut={(e) => {
                        e.currentTarget.style.background = 'rgba(255,255,255,0.02)';
                        e.currentTarget.style.transform = 'translateX(0)';
                    }}>
                        <div style={{ 
                            width: '4px', borderRadius: '2px', background: getStatusColor(alert.status)
                        }}></div>
                        <div style={{ flex: 1 }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                                <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: '#f8fafc' }}>{alert.title}</span>
                                <span style={{ fontSize: '0.625rem', fontWeight: 700, color: getStatusColor(alert.status), textTransform: 'uppercase' }}>{alert.status}</span>
                            </div>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>{alert.detail}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button style={{ 
                background: 'transparent', border: '1px dashed rgba(255,255,255,0.1)', color: 'var(--text-secondary)', 
                padding: '12px', borderRadius: '8px', fontSize: '0.75rem', cursor: 'pointer', transition: 'all 0.2s'
            }} onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--text-secondary)'} onMouseOut={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)'}>
                + Connect to Yardi Webhooks
            </button>
        </div>
    );
}
