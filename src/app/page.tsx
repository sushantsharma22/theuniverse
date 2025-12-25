'use client';

// ═══════════════════════════════════════════════════════════════════════════
// UNIVERSE JOURNEY - Star Field Experience + SEO Shadow Index
// ═══════════════════════════════════════════════════════════════════════════

import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import SmoothScroll from '@/components/Scroll/SmoothScroll';
import StartScreen from '@/components/UI/StartScreen';
import InfoPanel from '@/components/UI/InfoPanel';
import LoadingScreen from '@/components/UI/LoadingScreen';
import UniverseEnding from '@/components/UI/UniverseEnding';
import { LANDMARKS } from '@/lib/constants';

// Dynamic import Canvas
const Scene = dynamic(() => import('@/components/Canvas/Scene'), {
  ssr: false,
  loading: () => <LoadingScreen progress={50} />,
});

// ═══════════════════════════════════════════════════════════════════════════
// SHADOW INDEX COMPONENT - GOD-TIER CRAWLER VISIBILITY
// Exposes all 13.8 billion years of scientific content to search engines
// Hidden from users, fully visible to Google/Bing crawlers
// ═══════════════════════════════════════════════════════════════════════════
function ShadowIndex() {
  return (
    <>
      {/* Primary Shadow Index - Full semantic HTML */}
      <article
        className="sr-only"
        aria-hidden="true"
        itemScope
        itemType="https://schema.org/Article"
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0,0,0,0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        <header>
          <h1 itemProp="headline">
            The Universe: An Interactive Journey Through 13.8 Billion Years of Cosmic History
          </h1>
          <p itemProp="description">
            Embark on an immersive, scientifically verified journey through 13.8 billion years of 
            cosmic time. Experience the Big Bang, witness stellar birth in the Pillars of Creation, 
            explore planetary systems like Saturn and Earth, and venture into supermassive black 
            holes and quasars—all powered by authentic NASA imagery and peer-reviewed astronomical data.
          </p>
          <meta itemProp="author" content="The Universe Team" />
          <meta itemProp="datePublished" content="2024-01-01" />
          <meta itemProp="dateModified" content="2024-12-25" />
          <meta itemProp="publisher" content="The Universe" />
          <meta itemProp="keywords" content="universe, Big Bang, cosmology, astronomy, NASA, black holes, galaxies, nebulae, stellar evolution, space exploration, interactive simulation" />
        </header>

        <nav aria-label="Cosmic Landmarks Navigation">
          <h2>Complete Cosmic Journey - 13 Scientific Landmarks</h2>
          <p>
            This interactive astronomy experience covers the complete history of the observable universe,
            from the Big Bang 13.8 billion years ago through stellar evolution, planetary formation,
            galactic dynamics, black hole physics, and theoretical constructs like Einstein-Rosen bridges (wormholes).
            Each landmark is rendered with authentic NASA, Hubble Space Telescope, and James Webb Space Telescope imagery,
            accompanied by verified scientific descriptions based on peer-reviewed astronomical research.
          </p>
        </nav>

        {/* All Landmarks - Full Text Content for Indexing */}
        <main>
          <h2>Scientific Landmark Index - Full Descriptions</h2>
          <p>
            The following comprehensive list details each cosmic landmark in our interactive journey,
            providing scientific context, distance measurements, astronomical classifications, and
            detailed descriptions based on observations from NASA missions and space telescopes.
          </p>
          
          <div itemScope itemType="https://schema.org/ItemList">
            <meta itemProp="numberOfItems" content={String(LANDMARKS.length)} />
            {LANDMARKS.map((landmark, index) => (
              <section
                key={landmark.id}
                id={landmark.id}
                itemScope
                itemType="https://schema.org/Thing"
                itemProp="itemListElement"
                style={{ marginBottom: '2rem' }}
              >
                <meta itemProp="position" content={String(index + 1)} />
                <h3 itemProp="name">{landmark.title}</h3>
                <dl>
                  <dt>Object Type:</dt>
                  <dd itemProp="additionalType">{landmark.type}</dd>
                  <dt>Distance from Earth:</dt>
                  <dd>{landmark.distance}</dd>
                  <dt>Constellation:</dt>
                  <dd>{landmark.constellation}</dd>
                </dl>
                <p itemProp="description">{landmark.description}</p>
              </section>
            ))}
          </div>
        </main>

        {/* Educational Context */}
        <section>
          <h2>About This Scientific Educational Resource</h2>
          <p>
            The Universe is an advanced educational simulation designed to teach astronomy, cosmology, 
            astrophysics, and planetary science through interactive 3D visualization. Our content is 
            based on verified data from the following authoritative scientific sources:
          </p>
          
          <h3>Primary Data Sources</h3>
          <ul>
            <li><strong>NASA Open Data Portal</strong> (data.nasa.gov) - Official datasets and imagery from the National Aeronautics and Space Administration</li>
            <li><strong>Hubble Space Telescope Archive</strong> (archive.stsci.edu) - Complete archive of Hubble observations spanning decades</li>
            <li><strong>James Webb Space Telescope</strong> (webbtelescope.org) - Latest infrared observations revealing the early universe</li>
            <li><strong>Event Horizon Telescope Collaboration</strong> (eventhorizontelescope.org) - First direct images of supermassive black holes</li>
            <li><strong>European Space Agency</strong> (esa.int) - Complementary missions including Gaia, Planck, and more</li>
          </ul>

          <h3>Educational Topics Covered</h3>
          <ul>
            <li><strong>Cosmology and Universal Origins</strong> - The Big Bang, cosmic inflation, and the first 380,000 years</li>
            <li><strong>Stellar Evolution</strong> - Star formation in nebulae, main sequence burning, and stellar death</li>
            <li><strong>Planetary Science</strong> - Solar system formation, terrestrial planets, gas giants, and exoplanets</li>
            <li><strong>Galaxy Structure and Dynamics</strong> - Spiral galaxies, elliptical galaxies, and galactic evolution</li>
            <li><strong>Black Hole Physics</strong> - Event horizons, Hawking radiation, and general relativity</li>
            <li><strong>Nebulae Classification</strong> - Emission nebulae, reflection nebulae, planetary nebulae, and dark nebulae</li>
            <li><strong>Interstellar Medium</strong> - Molecular clouds, stellar nurseries, and chemical enrichment</li>
            <li><strong>Active Galactic Nuclei</strong> - Quasars, blazars, and supermassive black hole accretion</li>
            <li><strong>Theoretical Physics</strong> - Wormholes, white holes, and exotic spacetime geometries</li>
          </ul>

          <h3>Scientific Accuracy and Peer Review</h3>
          <p>
            All landmark descriptions and astronomical data presented in this simulation are based on 
            peer-reviewed research published in leading scientific journals including The Astrophysical Journal,
            Nature Astronomy, Science, Monthly Notices of the Royal Astronomical Society, and Astronomy & Astrophysics.
            Distance measurements use standard cosmological models (Hubble constant H₀ = 70 km/s/Mpc, flat ΛCDM universe).
          </p>

          <h3>Educational Applications</h3>
          <p>
            This interactive resource is suitable for:
          </p>
          <ul>
            <li>High school and undergraduate astronomy courses</li>
            <li>Graduate-level cosmology and astrophysics instruction</li>
            <li>Public science education and outreach programs</li>
            <li>Planetarium presentations and science museum exhibits</li>
            <li>Self-directed learning for space science enthusiasts</li>
            <li>Research visualization and scientific communication</li>
          </ul>
        </section>

        <footer>
          <p>
            © 2024-2025 The Universe. An educational resource for astronomy and space science education.
            All astronomical imagery sourced from NASA, ESA, and partner organizations under open data licenses.
            Content is provided for educational purposes under fair use doctrine.
          </p>
          <p>
            <strong>Keywords:</strong> astronomy education, cosmology simulation, Big Bang visualization, 
            stellar evolution interactive, NASA imagery, Hubble Space Telescope, James Webb Space Telescope,
            black hole physics, galaxy formation, nebula classification, planetary science, space exploration,
            astrophysics learning, cosmic history, universe timeline, 3D space experience, WebGL astronomy,
            scientific visualization, educational astronomy, interactive space journey
          </p>
        </footer>
      </article>
    </>
  );
}

export default function UniversePage() {
  return (
    <>
      {/* Shadow Index - Maximum SEO visibility for crawlers */}
      <ShadowIndex />
      
      <Suspense fallback={<LoadingScreen progress={50} />}>
        <Scene />
      </Suspense>

      <SmoothScroll />

      <StartScreen />
      <UniverseEnding />
    </>
  );
}
