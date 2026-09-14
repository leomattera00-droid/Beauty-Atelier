import Seo from '@/components/Seo';
import Hero from '@/components/Hero';
import ScrollSequence from '@/components/ScrollSequence';
import SignatureTreatments from '@/components/SignatureTreatments';
import BeautyRitual from '@/components/BeautyRitual';
import MassageWellness from '@/components/MassageWellness';
import LashBrowShowcase from '@/components/LashBrowShowcase';
import NailsGallery from '@/components/NailsGallery';
import EpilationSection from '@/components/EpilationSection';
import MembershipPackages from '@/components/MembershipPackages';
import FollowAtelier from '@/components/FollowAtelier';

export default function Home() {
  return (
    <>
      <Seo
        title="ATELIER ÉCLAT — Beauty, carefully considered."
        description="A luxury beauty and wellness center in Milano offering face, skin, body, and ritual treatments. Book your appointment online."
        path="/"
      />
      <Hero />
      <ScrollSequence />
      <SignatureTreatments />
      <BeautyRitual />
      <MassageWellness />
      <LashBrowShowcase />
      <NailsGallery />
      <EpilationSection />
      <MembershipPackages />
      <FollowAtelier />
    </>
  );
}
