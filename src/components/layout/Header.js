"use client";
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  const getHeaderContent = () => {
    switch (pathname) {
      case '/parser':
        return {
          title: 'AI Lease Parsing',
          subtitle: 'Automate manual data entry by extracting key fields directly from signed leases.'
        };
      case '/crm':
        return {
          title: 'Prospect Hub',
          subtitle: 'Track incoming leads, schedule follow-ups, and convert Zillow prospects.'
        };
      case '/maintenance':
        return {
          title: 'Maintenance Hub',
          subtitle: 'Manage tenant work orders across the property portfolio.'
        };
      case '/reports':
        return {
          title: 'Reports Matrix',
          subtitle: 'Generate and export comprehensive audits and financial statements across the portfolio.'
        };
      case '/dashboard':
      default:
        return {
          title: 'Portfolio Overview',
          subtitle: 'Welcome back. Here is what is happening across your properties today.'
        };
    }
  };

  const content = getHeaderContent();

  return (
    <header className="top-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
      <div>
        <h1 style={{ fontSize: '1.75rem', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>{content.title}</h1>
        <p className="sub-text" style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{content.subtitle}</p>
      </div>
      <div style={{ display: 'flex' }}>
        <button className="btn-icon" style={{ background: 'var(--panel-bg)', border: '1px solid var(--panel-border)', padding: '10px', borderRadius: '50%', position: 'relative', display: 'flex', color: 'var(--text-primary)', cursor: 'pointer' }}>
          <svg style={{ width: '20px', height: '20px' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"/>
          </svg>
          <span className="badge" style={{ position: 'absolute', top: '-4px', right: '-4px' }}>3</span>
        </button>
      </div>
    </header>
  );
}
