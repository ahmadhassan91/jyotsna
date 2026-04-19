"use client";
import { useState } from 'react';

export default function ActionPanel() {
  const [workflowState, setWorkflowState] = useState('idle');

  const simulateWorkflow = () => {
      setWorkflowState('processing');
      setTimeout(() => {
          setWorkflowState('done');
      }, 3500);
  };

  const closeWorkflow = () => setWorkflowState('idle');

  return (
    <>
    <div className="action-panel glass-panel" style={{ display: 'flex', flexDirection: 'column', height: '100%', width: '100%' }}>
        <div style={{ marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 500, color: '#fff', letterSpacing: '0.025em', margin: 0 }}>Requires Attention</h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '4px', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Actionable Alerts</p>
        </div>
        
        <ul className="action-list" style={{ flex: 1 }}>
            <li className="action-item" style={{ background: 'rgba(245, 158, 11, 0.03)', border: '1px solid rgba(245, 158, 11, 0.1)', alignItems: 'flex-start' }}>
                <div className="action-icon warning" style={{ flexShrink: 0, boxShadow: '0 0 15px rgba(245,158,11,0.2)' }}>!</div>
                <div className="action-details flex-1" style={{ width: '100%' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.025em', marginBottom: '4px' }}>14 Leases Expiring in 30 Days</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>Review to send automated renewal forms</p>
                    <button 
                        style={{ cursor: 'pointer', display: 'block', width: 'fit-content', padding: '8px 24px', background: 'linear-gradient(to right, rgba(245, 158, 11, 0.2), rgba(245, 158, 11, 0.1))', border: '1px solid rgba(245, 158, 11, 0.3)', color: 'var(--warning)', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s' }}
                        onMouseOver={e => e.currentTarget.style.color = '#fff'}
                        onMouseOut={e => e.currentTarget.style.color = 'var(--warning)'}
                        onClick={simulateWorkflow}
                    >
                        Simulate Workflow
                    </button>
                </div>
            </li>
            
            <li className="action-item" style={{ background: 'rgba(244, 63, 94, 0.03)', border: '1px solid rgba(244, 63, 94, 0.1)', alignItems: 'flex-start' }}>
                <div className="action-icon danger" style={{ flexShrink: 0, boxShadow: '0 0 15px rgba(244,63,94,0.2)' }}>!</div>
                <div className="action-details flex-1" style={{ width: '100%' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 600, color: '#fff', letterSpacing: '0.025em', marginBottom: '4px' }}>Unbilled Parking Fees</h4>
                    <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '16px' }}>Yardi discrepancy found on 3 accounts</p>
                    <button 
                        style={{ cursor: 'pointer', display: 'block', width: 'fit-content', padding: '8px 24px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', color: '#cbd5e1', borderRadius: '8px', fontSize: '0.875rem', fontWeight: 500, transition: 'color 0.2s, background 0.2s' }}
                        onMouseOver={e => { e.currentTarget.style.color = '#fff'; e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; }}
                        onMouseOut={e => { e.currentTarget.style.color = '#cbd5e1'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    >
                        Investigate Ledgers
                    </button>
                </div>
            </li>
        </ul>
    </div>

    {workflowState !== 'idle' && (
      <div className="modal-overlay">
          <div className="modal glass-panel" style={{ border: '1px solid rgba(255,255,255,0.1)', boxShadow: '0 0 50px rgba(0,0,0,0.5)', maxWidth: '500px', width: '100%' }}>
              <div className="modal-header" style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '24px' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em', color: '#fff' }}>Automated Renewals Workflow</h3>
              </div>
              <div style={{ padding: '40px 32px', textAlign: 'center' }}>
                  {workflowState === 'processing' ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <svg style={{ animation: 'spin 1s linear infinite', height: '40px', width: '40px', color: 'var(--warning)', marginBottom: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                          <h4 style={{ color: '#fff', fontSize: '1.125rem', fontWeight: 500 }}>Batch Processing 14 Renewals...</h4>
                          <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '12px', lineHeight: 1.6 }}>System is securely fetching tenant ledgers, appending current market rent increases (3.5%), and dispatching dynamic web-forms via email.</p>
                      </div>
                  ) : (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                          <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                              <svg style={{ width: '32px', height: '32px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                          </div>
                          <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.025em' }}>Workflow Successfully Executed</h4>
                          <ul style={{ color: '#cbd5e1', fontSize: '0.875rem', textAlign: 'left', marginTop: '24px', marginBottom: '32px', background: 'rgba(255,255,255,0.02)', padding: '20px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)', width: '100%', listStyle: 'none' }}>
                              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '12px' }}><span>Tenants Contacted:</span> <strong style={{ color: '#fff' }}>14/14 Dispatched</strong></li>
                              <li style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.05)', paddingBottom: '8px', marginBottom: '12px' }}><span>Target Base Rent Escalation:</span> <strong style={{ color: '#fff' }}>+3.5%</strong></li>
                              <li style={{ display: 'flex', justifyContent: 'space-between' }}><span>Audit Log Updated:</span> <strong style={{ color: 'var(--success)', fontWeight: 'bold', textTransform: 'uppercase', fontSize: '0.625rem', letterSpacing: '0.1em', background: 'rgba(16, 185, 129, 0.1)', padding: '4px 8px', borderRadius: '4px' }}>Verified</strong></li>
                          </ul>
                          <button style={{ width: '100%', padding: '12px', background: 'var(--accent)', cursor: 'pointer', color: '#fff', fontWeight: 600, borderRadius: '12px', fontSize: '0.875rem', letterSpacing: '0.025em', border: 'none', transition: 'all 0.2s', boxShadow: '0 4px 12px rgba(56,189,248,0.3)' }} onClick={closeWorkflow}>
                              Close Workflow Summary
                          </button>
                      </div>
                  )}
              </div>
          </div>
      </div>
    )}
    </>
  );
}
