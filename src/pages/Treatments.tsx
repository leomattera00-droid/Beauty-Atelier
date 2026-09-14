import { useState } from 'react';
import Seo from '@/components/Seo';
import ServiceExplorer from '@/components/ServiceExplorer';
import FullPriceList from '@/components/FullPriceList';

export default function Treatments() {
  const [view, setView] = useState<'menu' | 'explorer'>('menu');

  return (
    <div>
      <Seo
        title="Treatments — Face, Body, Beauty & Wellness"
        description="A curated menu of bespoke facials, body rituals, epilation, lash and brow, nails, and beauty treatments at ATELIER ÉCLAT, Milano."
        path="/trattamenti"
      />
      {/* View toggle */}
      <div className="pt-20 bg-ivory">
        <div className="flex items-center justify-center gap-1 pb-0">
          <div className="flex border border-sand/50">
            <button
              onClick={() => setView('menu')}
              className={`px-6 py-2.5 font-sans text-xs uppercase tracking-editorial-wide transition-all duration-600 ${
                view === 'menu'
                  ? 'bg-charcoal text-porcelain'
                  : 'bg-transparent text-taupe hover:text-charcoal'
              }`}
            >
              Full Menu
            </button>
            <button
              onClick={() => setView('explorer')}
              className={`px-6 py-2.5 font-sans text-xs uppercase tracking-editorial-wide transition-all duration-600 ${
                view === 'explorer'
                  ? 'bg-charcoal text-porcelain'
                  : 'bg-transparent text-taupe hover:text-charcoal'
              }`}
            >
              Explorer
            </button>
          </div>
        </div>
      </div>

      {view === 'menu' ? <FullPriceList /> : <ServiceExplorer />}
    </div>
  );
}
