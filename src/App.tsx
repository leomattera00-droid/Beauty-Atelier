import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from '@/components/Layout';
import Seo, { localBusinessJsonLd } from '@/components/Seo';
import { routes } from '@/config/brand';

const Home = lazy(() => import('@/pages/Home'));
const Treatments = lazy(() => import('@/pages/Treatments'));
const TreatmentDetail = lazy(() => import('@/pages/TreatmentDetail'));
const Booking = lazy(() => import('@/pages/Booking'));
const Staff = lazy(() => import('@/pages/Staff'));
const Interiors = lazy(() => import('@/pages/Interiors'));
const Contact = lazy(() => import('@/pages/Contact'));

function PageLoader() {
  return (
    <div className="min-h-screen pt-20 bg-ivory flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-sand border-t-accent rounded-full animate-spin" aria-label="Loading" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Seo
        title="ATELIER ÉCLAT — Beauty, carefully considered."
        description="A luxury beauty and wellness center in Milano offering face, skin, body, and ritual treatments."
        image="https://images.pexels.com/photos/6635929/pexels-photo-6635929.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630&fit=crop"
        path="/"
        structuredData={localBusinessJsonLd}
      />
      <Layout>
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path={routes.home} element={<Home />} />
            <Route path={routes.treatments} element={<Treatments />} />
            <Route path={`${routes.treatments}/:slug`} element={<TreatmentDetail />} />
            <Route path={routes.booking} element={<Booking />} />
            <Route path={routes.staff} element={<Staff />} />
            <Route path={routes.interiors} element={<Interiors />} />
            <Route path={routes.contact} element={<Contact />} />
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
