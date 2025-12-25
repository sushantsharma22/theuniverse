'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - Star Field Experience
// ═══════════════════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SmoothScroll from '@/components/Scroll/SmoothScroll';
import StartScreen from '@/components/UI/StartScreen';
import InfoPanel from '@/components/UI/InfoPanel';
import LoadingScreen from '@/components/UI/LoadingScreen';
import UniverseEnding from '@/components/UI/UniverseEnding';
import { LANDMARK_SCHEMA_DATA } from './jsonld';

// Dynamic import Canvas
const Scene = dynamic(() => import('@/components/Canvas/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen progress={50} />,
});

// ═══════════════════════════════════════════════════════════════════════════
// SHADOW INDEX COMPONENT
// Renders all scientific content for Google crawler visibility
// Since Three.js is client-only (ssr: false), this ensures all landmark
// descriptions are indexed by search engines for maximum SEO impact
// ═══════════════════════════════════════════════════════════════════════════
function ShadowIndex() {
  return (
    <article
      className="sr-only"
      aria-hidden="true"
      itemScope
      itemType="https://schema.org/Article"
    >
      <header>
        <h1 itemProp="headline">
          The Universe: An Interactive Journey Through 13.8 Billion Years of Cosmic History
        </h1>
        <p itemProp="description">
          Embark on an immersive, scientifically verified journey through cosmic time. 
          Experience the Big Bang, witness stellar birth in the Pillars of Creation, 
          explore planetary systems like Saturn and Earth, and venture into supermassive 
          black holes—all powered by authentic NASA imagery and peer-reviewed astronomical data.
        </p>
        <meta itemProp="author" content="The Universe Team" />
        <meta itemProp="datePublished" content="2024-01-01" />
        <meta itemProp="publisher" content="The Universe" />
      </header>

      <nav aria-label="Cosmic Landmarks Navigation">
        <h2>Journey Through the Cosmos - 13 Scientific Landmarks</h2>
        <p>
          This interactive astronomy experience covers the complete history of the universe,
          from the Big Bang 13.8 billion years ago to theoretical constructs like wormholes.
          Each landmark is rendered with NASA imagery and includes verified scientific data.
        </p>
      </nav>

      <section itemScope itemType="https://schema.org/ItemList">
        <h2 itemProp="name">Cosmic Landmarks - Complete Scientific Index</h2>
        <meta itemProp="numberOfItems" content={String(LANDMARK_SCHEMA_DATA.length)} />
        
        <ol>
          {LANDMARK_SCHEMA_DATA.map((landmark, index) => (
            <li
              key={landmark.id}
              itemScope
              itemType="https://schema.org/ListItem"
              id={landmark.id}
            >
              <meta itemProp="position" content={String(index + 1)} />
              <article itemScope itemType="https://schema.org/Thing">
                <h3 itemProp="name">{landmark.title}</h3>
                <dl>
                  <dt>Object Type:</dt>
                  <dd itemProp="additionalType">{landmark.type}</dd>
                  <dt>Distance from Earth:</dt>
                  <dd>{landmark.distance}</dd>
                </dl>
                <p itemProp="description">{landmark.description}</p>
              </article>
            </li>
          ))}
        </ol>
      </section>

      <section>
        <h2>About This Scientific Resource</h2>
        <p>
          The Universe is an advanced educational simulation designed to teach astronomy, 
          cosmology, and physics through interactive 3D visualization. Our content is based 
          on data from NASA Open Data, Hubble Space Telescope Archive, James Webb Space 
          Telescope observations, and the Event Horizon Telescope Collaboration.
        </p>
        <h3>Educational Topics Covered</h3>
        <ul>
          <li>Cosmology and the Origin of the Universe</li>
          <li>Stellar Evolution and Star Formation</li>
          <li>Planetary Science and Solar System Formation</li>
          <li>Galaxy Structure and Galactic Evolution</li>
          <li>Black Hole Physics and General Relativity</li>
          <li>Nebulae Classification and Interstellar Medium</li>
          <li>Theoretical Physics: Wormholes and Spacetime</li>
        </ul>
        <h3>Data Sources</h3>
        <ul>
          <li>NASA Open Data Portal - data.nasa.gov</li>
          <li>Hubble Space Telescope Archive - archive.stsci.edu</li>
          <li>James Webb Space Telescope - webbtelescope.org</li>
          <li>Event Horizon Telescope - eventhorizontelescope.org</li>
        </ul>
      </section>

      <footer>
        <p>
          © 2024 The Universe. An educational resource for astronomy and space science.
          All astronomical imagery sourced from NASA and partner organizations under 
          open data licenses.
        </p>
      </footer>
    </article>
  );
}

export default function UniversePage() {
  return (
    <>
      {/* Shadow Index - Visible to crawlers, hidden from users */}
      <ShadowIndex />
      
      <Suspense fallback={<LoadingScreen progress={50} />}>
        <Scene />
      </Suspense>

      <SmoothScroll />

      {/* InfoPanel removed - only start and ending text shows */}
      {/* <InfoPanel /> */}
      <StartScreen />
      <UniverseEnding />
    </>
  );
}
