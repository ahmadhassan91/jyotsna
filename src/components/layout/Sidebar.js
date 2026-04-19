"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const labelStyle = { 
      padding: '0 24px', 
      fontSize: '0.75rem', 
      fontWeight: 600, 
      color: 'var(--text-secondary)', 
      textTransform: 'uppercase', 
      letterSpacing: '0.05em', 
      marginBottom: '8px', 
      marginTop: '24px' 
  };

  return (
    <nav className="sidebar glass-panel" style={{ overflowY: 'auto' }}>
      <div className="logo">
        <div className="logo-icon">GN</div>
        <h2>GN Insight</h2>
      </div>
      
      <ul className="nav-links">
        <li style={labelStyle}>Operations</li>
        <Link href="/dashboard" style={{ textDecoration: 'none' }}>
          <li className={`nav-item ${pathname === '/dashboard' || pathname === '/' ? 'active' : ''}`}>
             <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/></svg>
             <span>Dashboard</span>
          </li>
        </Link>
        <Link href="/parser" style={{ textDecoration: 'none' }}>
          <li className={`nav-item ${pathname === '/parser' ? 'active' : ''}`}>
             <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M16 13H8"/><path d="M16 17H8"/><path d="M10 9H8"/></svg>
             <span>AI Lease Parser</span>
          </li>
        </Link>
        <Link href="/crm" style={{ textDecoration: 'none' }}>
          <li className={`nav-item ${pathname === '/crm' ? 'active' : ''}`}>
             <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
             <span>Zillow CRM</span>
          </li>
        </Link>
        <Link href="/maintenance" style={{ textDecoration: 'none' }}>
          <li className={`nav-item ${pathname === '/maintenance' ? 'active' : ''}`}>
             <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>
             <span>Maintenance Hub</span>
          </li>
        </Link>

        <li style={labelStyle}>Intelligence & Audit</li>
        <Link href="/reports" style={{ textDecoration: 'none' }}>
          <li className={`nav-item ${pathname === '/reports' ? 'active' : ''}`}>
             <svg className="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16c0 1.1.9 2 2 2h12a2 2 0 0 0 2-2V8l-6-6z"/><path d="M14 3v5h5M16 13H8M16 17H8M10 9H8"/></svg>
             <span>Reports Matrix</span>
          </li>
        </Link>
      </ul>

      <div className="user-profile" style={{ marginTop: 'auto', paddingBottom: '16px' }}>
        <div className="avatar">JG</div>
        <div className="user-details">
            <span className="user-name">Jyotsna Gupta</span>
            <span className="user-role">Management</span>
        </div>
      </div>
    </nav>
  );
}
