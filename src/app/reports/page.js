"use client";
import ReportFilter from '@/components/reports/ReportFilter';
import ReportDataGrid from '@/components/reports/ReportDataGrid';

export default function Reports() {
    return (
        <div className="section-active" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Filter Section  */}
            <ReportFilter />
            
            {/* Main Data Grid */}
            <ReportDataGrid />
        </div>
    );
}
