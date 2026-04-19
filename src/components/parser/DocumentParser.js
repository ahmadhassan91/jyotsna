"use client";
import { useState, useRef } from 'react';

export default function DocumentParser() {
    const [state, setState] = useState('upload'); // 'upload', 'processing', 'result', 'syncing', 'done'
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef(null);

    const handleDragEvent = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === 'dragenter' || e.type === 'dragover') setIsDragOver(true);
        if (e.type === 'dragleave' || e.type === 'drop') setIsDragOver(false);
    };

    const handleDrop = (e) => {
        handleDragEvent(e);
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            startProcessing();
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files.length > 0) {
            startProcessing();
        }
    };

    const startProcessing = () => {
        setState('processing');
        setTimeout(() => {
            setState('result');
        }, 3500);
    };

    const resetParser = () => {
        if (fileInputRef.current) fileInputRef.current.value = '';
        setState('upload');
    };

    const handleApprove = () => {
        setState('syncing');
        setTimeout(() => {
            setState('done');
        }, 3000); // Simulate network sync
    };

    const ConfidenceBadge = ({ score }) => {
        const isHigh = score > 90;
        const isMed = score > 70 && score <= 90;
        return (
            <span style={{ 
                marginLeft: '8px', 
                fontSize: '0.65rem', 
                padding: '2px 6px', 
                borderRadius: '4px', 
                background: isHigh ? 'rgba(16, 185, 129, 0.2)' : isMed ? 'rgba(245, 158, 11, 0.2)' : 'rgba(239, 68, 68, 0.2)', 
                color: isHigh ? 'var(--success)' : isMed ? 'var(--warning)' : 'var(--danger)' 
            }}>
                {score}% AI Match
            </span>
        )
    }

    return (
        <div className="parser-container" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            {/* Upload State */}
            {state === 'upload' && (
                <div 
                    className={`upload-zone glass-panel ${isDragOver ? 'dragover' : ''}`}
                    onDragEnter={handleDragEvent}
                    onDragOver={handleDragEvent}
                    onDragLeave={handleDragEvent}
                    onDrop={handleDrop}
                    onClick={() => fileInputRef.current?.click()}
                    style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', ...(isDragOver ? { borderColor: 'var(--accent)', background: 'rgba(56, 189, 248, 0.1)' } : {}) }}
                >
                    <svg className="upload-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <h2>Simulate: Upload Signed Lease</h2>
                    <p className="sub-text">Drag and drop a PDF file, or click to browse</p>
                    <input 
                        type="file" 
                        className="hidden-input" 
                        accept=".pdf" 
                        ref={fileInputRef}
                        onChange={handleFileChange} 
                    />
                    <div style={{ display: 'flex', gap: '16px', marginTop: '16px' }}>
                        <button className="btn btn-outline" style={{ padding: '12px 24px' }} onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}>Browse Files</button>
                        <button className="btn btn-primary" style={{ padding: '12px 24px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }} onClick={(e) => { e.stopPropagation(); startProcessing(); }}>Simulate: AI Extraction</button>
                    </div>
                    <div style={{ marginTop: '32px', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '400px', textAlign: 'center' }}>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--text-secondary)', marginBottom: '8px' }}>Supported Document Types:</h4>
                        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
                            <span style={{ background: '#1e293b', padding: '4px 8px', borderRadius: '4px' }}>Lease Agreements</span>
                            <span style={{ background: '#1e293b', padding: '4px 8px', borderRadius: '4px' }}>Renewal Notices</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Processing State */}
            {state === 'processing' && (
                <div className="processing-zone glass-panel section-active" style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                    <div className="scanner-container">
                        <div className="document-mock"></div>
                        <div className="scan-line"></div>
                    </div>
                    <h3>AI extraction in progress...</h3>
                    <p className="sub-text" style={{ fontSize: '0.875rem' }}>Applying machine learning to identify clauses, rent schedules, and amenities.</p>
                    <div className="progress-bar-container"><div className="progress-bar"></div></div>
                </div>
            )}

            {/* Result State */}
            {state === 'result' && (
                <div className="result-zone section-active" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '24px', height: '100%' }}>
                    <div className="pdf-viewer glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="panel-header" style={{ marginBottom: '16px' }}>
                            <h3>Original Document</h3>
                            <span className="badge success">Verified</span>
                        </div>
                        <div className="pdf-content" style={{ flex: 1, color: '#f8fafc', background: 'rgba(255,255,255,0.05)', padding: '24px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <h4 style={{ textAlign: 'center', fontWeight: 'bold', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '24px', color: '#fff' }}>Residential Lease Agreement</h4>
                            <p style={{ marginBottom: '16px' }}>This Lease Agreement is made between GN Management and <strong style={{ background: 'rgba(56, 189, 248, 0.4)', borderBottom: '2px solid var(--accent)', color: '#fff', padding: '0 4px' }}>Michael Smith</strong>...</p>
                            <p style={{ marginBottom: '16px' }}>...tenant agrees to pay the monthly base rent of <strong style={{ background: 'rgba(56, 189, 248, 0.4)', borderBottom: '2px solid var(--accent)', color: '#fff', padding: '0 4px' }}>$1,850.00</strong>...</p>
                            <p style={{ marginBottom: '16px' }}>...an additional fee for reserved parking of <strong style={{ background: 'rgba(245, 158, 11, 0.4)', borderBottom: '2px solid var(--warning)', color: '#fff', padding: '0 4px' }}>$150.00</strong> will be applied monthly...</p>
                            <p>...commencing on <strong style={{ background: 'rgba(56, 189, 248, 0.4)', borderBottom: '2px solid var(--accent)', color: '#fff', padding: '0 4px' }}>Aug 01, 2026</strong> and terminating on <strong style={{ background: 'rgba(56, 189, 248, 0.4)', borderBottom: '2px solid var(--accent)', color: '#fff', padding: '0 4px' }}>Jul 31, 2027</strong>.</p>
                        </div>
                    </div>

                    <div className="data-form glass-panel" style={{ display: 'flex', flexDirection: 'column' }}>
                        <div className="panel-header" style={{ marginBottom: '24px' }}>
                            <div>
                                <h3 style={{ fontSize: '1.25rem' }}>Extracted Data Review</h3>
                                <p className="sub-text" style={{ fontSize: '0.75rem', marginTop: '4px' }}>Review fields assigned by AI before syncing to Yardi.</p>
                            </div>
                        </div>
                        
                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Target Property / Unit <ConfidenceBadge score={100} /></label>
                            <select className="input-field" defaultValue="310" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)' }}>
                                <option value="105" style={{ background: '#1e293b' }}>GN Towers - Unit 105</option>
                                <option value="310" style={{ background: '#1e293b' }}>GN Towers - Unit 310 (Predicted base match)</option>
                            </select>
                        </div>

                        <div className="form-group" style={{ marginBottom: '16px' }}>
                            <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Tenant Name <ConfidenceBadge score={98} /></label>
                            <input type="text" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--accent)' }} defaultValue="Michael Smith" />
                        </div>
                        
                        <div className="form-group" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Lease Start <ConfidenceBadge score={95} /></label>
                                <input type="date" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--accent)' }} defaultValue="2026-08-01" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Lease End <ConfidenceBadge score={97} /></label>
                                <input type="date" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--accent)' }} defaultValue="2027-07-31" />
                            </div>
                        </div>
                        
                        <div className="form-group" style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>Base Rent ($) <ConfidenceBadge score={99} /></label>
                                <input type="number" className="input-field" style={{ width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.1)', borderLeft: '4px solid var(--accent)' }} defaultValue="1850.00" />
                            </div>
                            <div style={{ flex: 1 }}>
                                <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '8px' }}>
                                    <span style={{ display: 'flex', alignItems: 'center' }}>Parking Fee <ConfidenceBadge score={72} /></span>
                                </label>
                                <input type="number" className="input-field" style={{ width: '100%', background: 'rgba(245, 158, 11, 0.05)', border: '1px solid rgba(245, 158, 11, 0.5)', borderLeft: '4px solid var(--warning)', color: 'var(--warning)', fontWeight: 'bold' }} defaultValue="150.00" />
                            </div>
                        </div>

                        <div className="form-actions" style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid rgba(255,255,255,0.1)', display: 'flex', justifyContent: 'space-between' }}>
                            <button className="btn btn-outline" style={{ padding: '12px 24px' }} onClick={resetParser}>Cancel</button>
                            <button className="btn btn-primary" style={{ padding: '12px 24px', boxShadow: '0 4px 12px rgba(56, 189, 248, 0.3)' }} onClick={handleApprove}>Simulate Yardi Sync</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Syncing State */}
            {(state === 'syncing' || state === 'done') && (
                <div className="modal-overlay">
                    <div className="modal glass-panel" style={{ maxWidth: '500px', width: '100%', textAlign: 'center' }}>
                        {state === 'syncing' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <svg style={{ animation: 'spin 1s linear infinite', height: '48px', width: '48px', color: 'var(--accent)', marginBottom: '24px' }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                <h4 style={{ color: '#fff', fontSize: '1.25rem', fontWeight: 500, letterSpacing: '0.025em' }}>Syncing API with Yardi Breeze...</h4>
                                <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginTop: '12px', lineHeight: 1.6 }}>Mapping verified variables. Posting new ledger entries to Property Yardi DB.</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(16, 185, 129, 0.2)', color: 'var(--success)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '24px', boxShadow: '0 0 30px rgba(16,185,129,0.3)' }}>
                                    <svg style={{ width: '40px', height: '40px' }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                                </div>
                                <h4 style={{ color: '#fff', fontSize: '1.5rem', fontWeight: 500, letterSpacing: '0.025em', marginBottom: '8px' }}>Yardi Database Updated</h4>
                                <div style={{ color: '#cbd5e1', fontSize: '0.875rem', textAlign: 'center', marginBottom: '32px', background: 'rgba(16, 185, 129, 0.05)', padding: '16px', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.1)', width: '100%' }}>
                                    <p>Successfully created lease contract for Unit 310.</p>
                                    <p style={{ fontFamily: 'monospace', color: 'var(--success)', marginTop: '8px', fontSize: '0.75rem' }}>YARDI_REF: TRX-2099-ALPHA</p>
                                </div>
                                <button className="btn btn-primary" style={{ width: '100%', padding: '12px', fontWeight: 'bold' }} onClick={resetParser}>
                                    Process Next Document
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
