import Link from "next/link";
import Image from "next/image";
import {
  Brand,
  Feature,
  Icon,
  Phone,
  Portrait,
  PortraitCluster,
} from "@/components/visuals";
import { EarlyAccessForm } from "@/components/early-access-form";

const questions = [
  [
    "Is this live investing?",
    "The current app includes paper trading and investment previews. Live fund deposits are not connected, and no real funds move in the investment preview.",
  ],
  [
    "What are fund shares?",
    "Fund shares represent a proportional stake in a shared portfolio, rather than a separate copy of every trade. Their value can rise or fall.",
  ],
  [
    "What about fees?",
    "Review each strategy’s fee terms before allocating. Your personal return depends on when you join, your allocation, and any applicable fees.",
  ],
  [
    "Can I withdraw?",
    "Live withdrawal terms will be shown when live vaults are connected. Exits may involve a queue when positions cannot be sold immediately.",
  ],
];
export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <div className="hero-wrap">
        <Image
          src="/images/coastal-harbor.webp"
          alt=""
          fill
          preload
          sizes="100vw"
          className="scene hero-scene"
        />
        <header className="site-header shell">
          <Brand />
          <nav
            aria-label="Main navigation"
            className="flex items-center gap-6 md:gap-9"
          >
            <a href="#discover">Discover</a>
            <a href="#how-it-works">How it works</a>
            <a href="#for-captains">For Captains</a>
            <a href="#faq">FAQ</a>
          </nav>
          <a className="header-download" href="#early-access">
            Get early access <Icon name="arrow" />
          </a>
        </header>
        <section className="hero shell" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow">
              <span className="status-dot" /> SOCIAL TRADING ON SOLANA
            </p>
            <h1 id="hero-title">
              Meet your
              <br />
              Captain<span className="soft-period">.</span>
            </h1>
            <p className="hero-description">
              Pick a Captain. Join the Crew.
              <br />
              Explore trading on Solana.
            </p>
            <EarlyAccessForm />
            <p className="hero-note">
              <Icon name="compass" /> A shared voyage. Your own horizon.
            </p>
          </div>
          <div
            className="hero-art"
            aria-label="Socially app preview with community portraits"
          >
            <PortraitCluster />
            <Phone screen="discover" priority className="hero-phone" />
            <div className="floating-note">
              <span className="note-line" />
              Built around people.
              <br />
              <span className="font-editorial italic">
                Made for your journey.
              </span>
            </div>
          </div>
        </section>
        <div className="hero-caption shell">
          <span>DISCOVER A CAPTAIN. FIND YOUR CREW.</span>
          <a href="#discover">
            Explore the voyage <Icon name="down" />
          </a>
        </div>
      </div>
      <main id="main">
        <section
          id="discover"
          className="section section-discover"
          aria-labelledby="discover-title"
        >
          <div className="shell section-grid">
            <div className="section-copy">
              <p className="eyebrow">01 / FOR CREW</p>
              <h2 id="discover-title">
                Find the strategy
                <br className="desktop-break" /> behind the Captain.
              </h2>
              <p className="section-description">
                Explore strategies, holdings, trading history, and risk before
                you choose a Crew.
              </p>
              <div className="feature-grid">
                <Feature icon="trend" title="Strategy">
                  Understand their approach and investment focus.
                </Feature>
                <Feature icon="chart" title="Track record">
                  Explore historical performance and trading activity.
                </Feature>
                <Feature icon="shield" title="Risk">
                  Review risk and drawdowns before you join.
                </Feature>
              </div>
              <a className="text-link" href="#how-it-works">
                See how it works <Icon name="arrow" />
              </a>
            </div>
            <div className="section-art discovery-art">
              <div className="art-halo" />
              <PortraitCluster compact />
              <Phone screen="discover" />
              <p className="art-caption">
                Different perspectives.
                <br />
                <span className="font-editorial italic">A stronger Crew.</span>
              </p>
            </div>
          </div>
        </section>
        <section
          id="how-it-works"
          className="section section-invest"
          aria-labelledby="invest-title"
        >
          <Image
            src="/images/investment-coast.webp"
            alt=""
            fill
            sizes="100vw"
            className="scene investment-scene"
          />
          <div className="shell section-grid reverse-grid">
            <div className="section-art investment-art">
              <div className="art-halo" />
              <Phone screen="investment" />
              <span className="glass-label">
                <Icon name="coins" />A portion of the fund. Your own shares.
              </span>
            </div>
            <div className="section-copy">
              <p className="eyebrow">02 / HOW INVESTING WORKS</p>
              <h2 id="invest-title">
                Choose your amount.
                <br />
                Review your share.
              </h2>
              <p className="section-description">
                Review your USDC amount, estimated fund shares, strategy risk,
                and fees before continuing.
              </p>
              <ol className="investment-steps">
                {[
                  [
                    "Choose a Captain",
                    "Find a strategy that fits your perspective.",
                  ],
                  [
                    "Review an amount",
                    "See estimated shares, fees, and risk together.",
                  ],
                  [
                    "Follow your shares",
                    "Explore how a position is tracked in your portfolio.",
                  ],
                ].map(([title, description], i) => (
                  <li key={title}>
                    <span className="step-number">0{i + 1}</span>
                    <div>
                      <h3>{title}</h3>
                      <p>{description}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <p className="info-note">
                <Icon name="info" />
                <span>
                  Investment preview · No funds move.
                  <br />
                  Share value can rise or fall.
                </span>
              </p>
            </div>
          </div>
        </section>
        <section
          id="portfolio"
          className="section section-portfolio"
          aria-labelledby="portfolio-title"
        >
          <div className="shell section-grid">
            <div className="section-copy">
              <p className="eyebrow">03 / YOUR CREW PORTFOLIO</p>
              <h2 id="portfolio-title">
                Your voyage,
                <br />
                in one view.
              </h2>
              <p className="section-description">
                See your allocations, portfolio value, and returns since you
                joined. Your part of every voyage, together in one place.
              </p>
              <div className="feature-grid">
                <Feature icon="pie" title="Your allocations">
                  See how your portfolio is shared across strategies.
                </Feature>
                <Feature icon="trend" title="Your returns">
                  Follow your own performance over time.
                </Feature>
                <Feature icon="activity" title="Vault activity">
                  Keep up with the strategies you follow.
                </Feature>
              </div>
              <p className="quiet-note">
                Your personal return depends on timing, allocation, and fees.
              </p>
            </div>
            <div className="section-art portfolio-art">
              <div className="art-halo" />
              <PortraitCluster compact />
              <Phone screen="crew-home" />
            </div>
          </div>
        </section>
        <section
          id="for-captains"
          className="section section-captains"
          aria-labelledby="captains-title"
        >
          <div className="shell section-grid reverse-grid">
            <div className="section-art captain-art">
              <div className="art-halo" />
              <PortraitCluster compact />
              <Phone screen="captain-home" />
            </div>
            <div className="section-copy">
              <p className="eyebrow">04 / FOR CAPTAINS</p>
              <h2 id="captains-title">
                Lead a strategy.
                <br />
                Build your Crew.
              </h2>
              <p className="section-description">
                Create a paper strategy, manage your vaults, and share your
                trading decisions.
              </p>
              <div className="feature-grid">
                <Feature icon="plus" title="Create a strategy">
                  Define your approach and start a paper strategy.
                </Feature>
                <Feature icon="vault" title="Manage vaults">
                  Keep your vaults and their activity in view.
                </Feature>
                <Feature icon="people" title="Share updates">
                  Keep your Crew close to your decisions.
                </Feature>
              </div>
              <a href="#early-access" className="text-link">
                Start your voyage <Icon name="arrow" />
              </a>
              <p className="quiet-note">Current experience: paper trading.</p>
            </div>
          </div>
        </section>
        <section
          id="faq"
          className="section section-faq"
          aria-labelledby="faq-title"
        >
          <div className="shell faq-layout">
            <div className="faq-intro">
              <p className="eyebrow">05 / A LITTLE MORE CLARITY</p>
              <h2 id="faq-title">
                A few things
                <br />
                to know.
              </h2>
              <p className="section-description">
                A clearer picture,
                <br />
                before you come aboard.
              </p>
              <div className="faq-portraits">
                <Portrait person={0} />
                <Portrait person={1} />
                <Portrait person={2} />
              </div>
              <a className="text-link" href="mailto:support@socially.trade">
                Still have a question? <Icon name="arrow" />
              </a>
            </div>
            <div className="faq-list">
              {questions.map(([q, a], i) => (
                <details key={q} name="faq" open={i === 0}>
                  <summary>
                    <span>{q}</span>
                    <Icon name="plus" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section
          id="early-access"
          className="download-section"
          aria-labelledby="download-title"
        >
          <Image
            src="/images/coastal-harbor.webp"
            alt=""
            fill
            sizes="100vw"
            className="scene download-scene"
          />
          <div className="shell download-inner">
            <div>
              <p className="eyebrow">YOUR CREW IS OUT THERE</p>
              <h2 id="download-title">
                Your next voyage
                <br />
                starts here.
              </h2>
              <p className="section-description">
                Be first aboard when Socially launches.
              </p>
              <EarlyAccessForm />
              <p className="risk-note">
                Trading involves risk. Simulated results do not predict future
                performance.
              </p>
            </div>
            <div className="download-art">
              <Phone screen="discover" />
              <span className="download-orbit" />
            </div>
          </div>
        </section>
      </main>
      <footer className="site-footer">
        <div className="shell footer-inner">
          <Brand small />
          <nav aria-label="Footer navigation">
            <Link href="/privacy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <a href="mailto:support@socially.trade">Contact</a>
          </nav>
          <p>© 2026 Socially</p>
        </div>
      </footer>
    </>
  );
}
