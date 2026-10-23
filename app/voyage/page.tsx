import "./voyage.css";
import type { Metadata } from "next";
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
import { VoyageExplorer } from "@/components/voyage-explorer";

export const metadata: Metadata = {
  title: "Socially — A shared voyage. Your own horizon.",
  description: "Discover a more human way to explore trading on Solana. Meet Captains, explore paper strategies, and find your Crew. Join Socially early access.",
};

const questions = [
  ["What is Socially?", "Socially is a social trading experience on Solana. Captains share strategies and manage paper vaults; Crew members explore their approach, review investment previews, and follow portfolios in one place."],
  ["Do I have to be an experienced trader?", "You can start by exploring. Review a Captain’s strategy, holdings, trading history, and risk at your own pace. Following someone does not remove the risks of trading."],
  ["How do I become a Captain?", "Join the early-access list and choose the Captain experience when you come aboard. The current app lets Captains create paper strategies, manage vaults, and share their decisions."],
  ["When can I get the app?", "Socially is preparing for early access on Android. Leave your email and we’ll share availability updates. A public launch date has not been announced."],
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
export default function VoyagePage() {
  return (
    <div className="voyage-premium">
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
            <a href="#experience">The experience</a>
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
            <h1 id="hero-title" className="hero-statement">
              The chart tells you where<span className="soft-period">.</span>{" "}
              The{" "}
              <em>
                Captain tells you why<span className="soft-period">.</span>
              </em>
            </h1>
            <p className="hero-description">
              Choose a Captain. Review the risk.
              <br />
              Ride along.
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
            <div className="hero-contour" aria-hidden="true" />
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
        <div className="foundation-strip" aria-label="Platform overview">
          <div className="shell foundation-inner">
            <span className="foundation-label">A NEW WAY TO NAVIGATE</span>
            <span><Icon name="people" /> People-led strategies</span>
            <span><Icon name="compass" /> Built on Solana</span>
            <span><Icon name="shield" /> Paper trading first</span>
          </div>
        </div>
        <section className="section introduction-section" aria-labelledby="intro-title">
          <div className="shell">
            <div className="intro-heading">
              <p className="eyebrow">LESS NOISE. MORE PERSPECTIVE.</p>
              <h2 id="intro-title">Markets move fast.<br />Find your <span className="editorial-accent">bearings.</span></h2>
              <p className="section-description">There’s a person behind every strategy. Socially brings their thinking, their activity, and your portfolio into the same conversation.</p>
            </div>
            <div className="principles-grid">
              {[
                ["compass", "01", "Discover with context", "Look beyond the headline return. Understand the approach and risk behind a Captain’s strategy."],
                ["people", "02", "Learn from the journey", "Follow the decisions behind a portfolio, with a Crew that shares your curiosity."],
                ["pie", "03", "Keep your own perspective", "Your allocation. Your timing. Your view of how each strategy fits into the bigger picture."],
              ].map(([icon, n, title, description]) => (
                <article className="principle" key={n}>
                  <div className="principle-top"><Icon name={icon as "compass" | "people" | "pie"} /><span>{n} /</span></div>
                  <h3>{title}</h3><p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <VoyageExplorer />
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
        <section className="section clarity-section" aria-labelledby="clarity-title">
          <div className="shell clarity-layout">
            <div>
              <p className="eyebrow">A CLEARER PICTURE, BEFORE YOU CHOOSE</p>
              <h2 id="clarity-title">Conviction needs<br /><span className="editorial-accent">context.</span></h2>
              <p className="section-description">A good-looking chart is a starting point. Get closer to the decisions, exposure, and trade-offs behind it.</p>
              <a href="#discover" className="text-link">Get to know a strategy <Icon name="arrow" /></a>
            </div>
            <div className="comparison-panel">
              <div className="comparison-row comparison-head"><span>LOOK BEYOND</span><span>LOOK INTO</span></div>
              {[
                ["A return in isolation", "Performance with history"],
                ["A name on a leaderboard", "A Captain with an approach"],
                ["The latest trade", "Holdings and exposure"],
                ["Someone else’s result", "Your own portfolio journey"],
              ].map(([before, after]) => <div key={before} className="comparison-row"><span>{before}</span><span><Icon name="arrow" />{after}</span></div>)}
              <p><Icon name="info" /> Historical performance does not predict future results.</p>
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
        <section id="community" className="section community-section" aria-labelledby="community-title">
          <div className="shell community-layout">
            <div className="community-art">
              <Image src="/images/voyage-cover.png" alt="An illustrated coastal voyage" fill sizes="(max-width: 768px) 100vw, 50vw" />
              <div className="community-art-caption"><Icon name="compass" /><span>A shared voyage.<br /><strong>A world of perspectives.</strong></span></div>
            </div>
            <div className="community-copy">
              <p className="eyebrow">BUILT AROUND PEOPLE</p>
              <h2 id="community-title">The best part?<br /><span className="editorial-accent">The Crew.</span></h2>
              <p className="section-description">Trading can feel like a solo crossing. Socially makes room for shared ideas, different perspectives, and the people behind the decisions.</p>
              <div className="community-values">
                <div><Icon name="people" /><div><h3>People, beyond profiles</h3><p>Get to know the approach behind the name.</p></div></div>
                <div><Icon name="activity" /><div><h3>Decisions, beyond numbers</h3><p>Follow the activity that shapes a strategy.</p></div></div>
                <div><Icon name="compass" /><div><h3>Your course, always</h3><p>Explore at your own pace and make your own choices.</p></div></div>
              </div>
              <a href="#early-access" className="text-link">Find your place aboard <Icon name="arrow" /></a>
            </div>
          </div>
        </section>
        <section className="section philosophy-section" aria-labelledby="philosophy-title">
          <div className="shell philosophy-inner">
            <Icon name="compass" />
            <p className="eyebrow">OUR NORTH STAR</p>
            <h2 id="philosophy-title">A little less trading alone.<br />A little more <span className="editorial-accent">going together.</span></h2>
            <p>We believe the story behind a strategy matters as much as the numbers. We’re building Socially to bring that story into view.</p>
            <span className="philosophy-signature">Socially — join the voyage</span>
          </div>
        </section>
        <section id="availability" className="section availability-section" aria-labelledby="availability-title">
          <div className="shell availability-layout">
            <div><p className="eyebrow">FROM THE HARBOR TO THE HORIZON</p><h2 id="availability-title">Built with intention.<br />Launching in stages.</h2><p className="section-description">Start with exploration. Get familiar with the experience. Stay close as the next chapter takes shape.</p></div>
            <div className="launch-stages">
              <article><span className="stage-status current"><span className="status-dot" /> CURRENT EXPERIENCE</span><h3>Explore. Practice. Preview.</h3><p>Paper strategies, Captain discovery, portfolio views, and investment previews. No real funds move in previews.</p></article>
              <article><span className="stage-status">NEXT CHAPTER</span><h3>Early access on Android.</h3><p>Join the list for availability updates. Live vault details and terms will be shared when those features are connected.</p><a href="#early-access" className="text-link">Be first aboard <Icon name="arrow" /></a></article>
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
              <p className="eyebrow">BEFORE YOU COME ABOARD</p>
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
              <p className="eyebrow">AN INVITATION TO SOMETHING DIFFERENT</p>
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
      <footer className="site-footer expanded-footer">
        <div className="shell">
          <div className="footer-main">
            <div className="footer-brand"><Brand /><p>A shared voyage.<br />Your own horizon.</p><span>SOCIAL TRADING ON SOLANA</span></div>
            <div className="footer-column"><h3>Explore</h3><nav aria-label="Explore"><a href="#experience">The experience</a><a href="#discover">For Crew</a><a href="#for-captains">For Captains</a><a href="#portfolio">Your portfolio</a></nav></div>
            <div className="footer-column"><h3>Come aboard</h3><nav aria-label="Get started"><a href="#how-it-works">How it works</a><a href="#community">Our community</a><a href="#availability">Launch plans</a><a href="#early-access">Get early access</a></nav></div>
            <div className="footer-column"><h3>A little clarity</h3><nav aria-label="Resources"><a href="#faq">FAQs</a><a href="mailto:support@socially.trade">Contact us <Icon name="arrow" /></a><Link href="/privacy">Privacy policy</Link><Link href="/terms">Terms of use</Link></nav></div>
          </div>
          <div className="footer-bottom"><p>© 2026 Socially. All rights reserved.</p><p>Made for the journey ahead.</p><a href="#hero-title">Back to top <Icon name="arrow" /></a></div>
        </div>
      </footer>
    </div>
  );
}
