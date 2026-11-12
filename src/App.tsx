import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { lazy, Suspense, useEffect } from 'react';
import { featPose } from './animations/featLayout';
import { director, heroPose, POSES, ROBOT, type Key } from './animations/phoneDirector';
import { PromoPopup } from './components/Common/PromoPopup';
import { ScrollRobot } from './components/Common/ScrollRobot';
import { LandingBackdrop } from './components/Common/LandingBackdrop';
import { Footer } from './components/Footer/Footer';
import { Navbar } from './components/Navbar/Navbar';
import { FEATURES } from './data/content';
import { useExperience, useReducedMotion } from './hooks/useMedia';
import { useSmoothScroll } from './hooks/useSmoothScroll';
import { About } from './sections/About';
import { Benefits } from './sections/Benefits';
import { Contact } from './sections/Contact';
import { DashboardShowcase } from './sections/DashboardShowcase';
import { Download } from './sections/Download';
import { FAQ } from './sections/FAQ';
import { FreeAccess } from './sections/FreeAccess';
import { Features } from './sections/Features';
import { Hero } from './sections/Hero';
import { HowItWorks } from './sections/HowItWorks';
import { InteractiveDemo } from './sections/InteractiveDemo';
import { LiveDemo } from './sections/LiveDemo';
import { MoreFeatures } from './sections/MoreFeatures';
import { ScreenGallery } from './sections/ScreenGallery';
import { Security } from './sections/Security';

// three.js + R3F load only on devices that get the 3D experience.
const PhoneStage = lazy(() => import('./components/Smartphone/PhoneScene'));

const docTop = (el: Element) => el.getBoundingClientRect().top + window.scrollY;

/** Builds the 3D phone's scroll keys from the real section positions. */
function usePhoneChoreography(enabled: boolean) {
  useEffect(() => {
    if (!enabled) return;
    const build = () => {
      const vh = window.innerHeight;
      const about = document.getElementById('about');
      const stage = document.getElementById('dash-stage');
      const pin = ScrollTrigger.getById('features-pin');
      const demo = document.getElementById('demo');
      if (!about || !stage || !pin || !demo) return;
      const demoTop = docTop(demo);
      const aTop = docTop(about);
      const aH = about.offsetHeight;
      const sTop = docTop(stage);
      const first = FEATURES[0]!;
      const lastF = FEATURES[FEATURES.length - 1]!;
      const hero = heroPose(document.documentElement.clientWidth, vh);
      // The showcase phone is placed inside its feature card (see featLayout).
      const feat = featPose(document.documentElement.clientWidth, vh);
      const raw: Key[] = [
        { at: 0, pose: hero, shot: { screen: 'home' } },
        { at: aTop - vh * 0.7, pose: hero },
        { at: aTop + aH / 2 - vh / 2, pose: POSES.about, shot: { screen: 'activity' } },
        { at: aTop + aH - vh * 0.75, pose: POSES.about },
        { at: sTop + stage.offsetHeight / 2 - vh / 2, pose: POSES.dash, shot: { screen: 'home' } },
        // The live demo and the screens strip have their own phones: the 3D
        // phone glides out to the left for them, then back for the showcase.
        { at: demoTop - vh * 0.6, pose: POSES.dash },
        { at: demoTop - vh * 0.05, pose: POSES.aside },
        { at: pin.start - vh * 0.75, pose: POSES.aside },
        { at: pin.start, pose: feat, shot: { screen: first.screen, params: first.params } },
        { at: pin.end, pose: feat, shot: { screen: lastF.screen, params: lastF.params } },
        { at: pin.end + vh * 0.75, pose: POSES.exit },
      ];
      // Keep keys strictly increasing whatever the layout.
      let last = -1;
      const keys = raw.map((k) => {
        const at = Math.max(k.at, last + 1);
        last = at;
        return { ...k, at };
      });
      director.setKeys(keys);
      // The AI robot rides along with the phone into About, then bows out
      // as the Dashboard section comes in.
      director.setRobotKeys([
        { at: 0, pose: ROBOT.hero },
        { at: keys[1]!.at, pose: ROBOT.hero },
        { at: keys[2]!.at, pose: ROBOT.about },
        { at: keys[3]!.at, pose: ROBOT.about },
        { at: keys[4]!.at, pose: ROBOT.gone },
      ]);
    };
    const onScroll = () => director.update(window.scrollY);
    ScrollTrigger.addEventListener('refresh', build);
    window.addEventListener('scroll', onScroll, { passive: true });
    ScrollTrigger.refresh();
    build();
    return () => {
      ScrollTrigger.removeEventListener('refresh', build);
      window.removeEventListener('scroll', onScroll);
    };
  }, [enabled]);
}

export default function App() {
  const exp = useExperience();
  const full = exp === 'full';
  const reduced = useReducedMotion();
  useSmoothScroll(!reduced);
  usePhoneChoreography(full);

  return (
    <>
      <a href="#main" className="sr-only z-[100] rounded-xl bg-white px-4 py-2 font-bold focus:not-sr-only focus:fixed focus:left-4 focus:top-4">
        Skip to content
      </a>
      <LandingBackdrop />
      {full && (
        <Suspense fallback={null}>
          <PhoneStage />
        </Suspense>
      )}
      {full && <ScrollRobot />}
      <Navbar />
      <main id="main" className="site">
        <Hero full={full} />
        <About full={full} />
        <DashboardShowcase full={full} />
        <InteractiveDemo />
        <ScreenGallery />
        <Features full={full} />
        <MoreFeatures />
        <LiveDemo />
        <HowItWorks />
        <Benefits />
        <Security />
        <FAQ />
        <FreeAccess />
        <Download />
        <Contact />
      </main>
      <Footer />
      <PromoPopup />
    </>
  );
}
