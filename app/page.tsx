import Link from "next/link";
import Image from "next/image";
import { BrandEmblem, SociallyLogo, SociallyWordmark } from "@/components/socially-brand";
import type { Metadata } from "next";
import { Icon, type IconName } from "@/components/visuals";
import { EarlyAccessForm } from "@/components/early-access-form";
import { TidalBackground } from "@/components/tidal-background";
import { PlutoNavigation } from "@/components/pluto-navigation";
import {
  Avatar,
  CaptainGallery,
  FeeExplorer,
  HowItWorks,
  Sparkline,
} from "@/components/socially-demo";
import "./pluto.css";

export const metadata: Metadata = {
  title: "Socially · Pick a Captain. Join the Crew. Keep your keys.",
  description:
    "Social trading on Solana. Put money in a vault run by a proven trader. They can trade it. They can never take it. Join the waitlist.",
  openGraph: {
    title: "Socially · Pick a Captain. Join the Crew. Keep your keys.",
    description: "Social trading on Solana. Pick a Captain, join the Crew, keep your keys.",
  },
};

const articles: { title: string; text: string; icon: IconName }[] = [
  {
    title: "The Captain may trade",
    text: "Captains buy and sell inside your vault, and nowhere else.",
    icon: "trend",
  },
  {
    title: "The treasure stays in the vault",
    text: "No Captain can withdraw or move your money. Not even to themselves.",
    icon: "vault",
  },
  {
    title: "Losses have limits",
    text: "If a vault falls too far, new risky trades are paused.",
    icon: "shield",
  },
  {
    title: "Every trade goes in the log",
    text: "Each trade is public the moment it happens.",
    icon: "activity",
  },
  { title: "Any Crew may leave", text: "Take your money out whenever you choose.", icon: "arrow" },
];
const comparisons = [
  ["Who holds your money", "The trader", "You", "The exchange", "A protected vault"],
  [
    "How trades happen",
    "Any way they like",
    "By hand, and late",
    "Copied, with delay",
    "Instantly, inside the vault",
  ],
  ["Track record", "Screenshots", "Their word", "The exchange’s numbers", "Public and checkable"],
  [
    "Leaving",
    "When they pay you back",
    "Sell it all yourself",
    "The exchange’s rules",
    "Whenever you choose",
  ],
];
const questions = [
  [
    "Can a Captain take my money?",
    "No. A Captain can only buy and sell inside your vault. There is no way for a Captain to withdraw or send your money anywhere, including to themselves.",
  ],
  [
    "What is a vault?",
    "A shared account that holds the Crew’s money for one Captain. It runs on Solana under the five articles: the Captain can trade inside it, and only Crew can take money out. You own a share of it in proportion to what you put in.",
  ],
  [
    "What does “keep your keys” mean?",
    "Your money is never handed to Socially or to the Captain. When you sign up with email or Google, a wallet is created that only you control, and only you can approve taking money out of a vault.",
  ],
  [
    "Can I lose money?",
    "Yes. Captains can make losing trades, which is why every return is shown next to its worst drop. Socially stops a Captain from taking your money, not from trading badly.",
  ],
  [
    "Do I need a crypto wallet?",
    "No. Sign up with email or Google and Socially sets up a wallet for you. There’s no seed phrase to write down.",
  ],
  [
    "How much does it cost?",
    "You pay 10% of new profit, and only when your vault grows past its last high. The Captain gets 8 of those 10 points and Socially gets 2. There are no joining, monthly or leaving fees.",
  ],
  [
    "How do I take my money out?",
    "Leave a vault whenever you choose. Your share of its cash comes back straight away; any tokens are sold for you first, which can take a little longer.",
  ],
  [
    "How are Captains chosen?",
    "Traders apply and we review their record before a vault opens. After that, their rank rises or falls with their public results.",
  ],
  [
    "Who can use Socially?",
    "Socially will launch in selected countries. Join the waitlist and we’ll let you know when it’s available where you live.",
  ],
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="section-label">
      <span />
      {children}
    </p>
  );
}
function SociallyMark() {
  return (
    <span className="socially-mark">
      <SociallyLogo preload />
    </span>
  );
}

export default function Home() {
  return (
    <div className="socially-pluto" id="top">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <PlutoNavigation />
      <main id="main">
        <section className="pluto-hero" aria-labelledby="hero-title">
          <TidalBackground />
          <div className="pluto-hero-content">
            <SociallyMark />
            <p className="hero-kicker">
              <span />
              Social trading on Solana
            </p>
            <h1 id="hero-title">
              Pick a Captain.
              <br />
              Join the Crew.
              <br />
              <span>Keep your keys.</span>
            </h1>
            <p className="pluto-lead">
              Put money in a vault run by a proven trader.
              <br className="wide-only" /> They can trade it. They can never take it.
            </p>
            <div className="hero-actions">
              <a className="pill-button" href="#early-access">
                Join the waitlist <Icon name="arrow" />
              </a>
              <a className="secondary-button" href="#for-captains">
                Become a Captain <Icon name="arrow" />
              </a>
            </div>
            <p className="hero-assurance">
              <Icon name="shield" />
              The treasure stays in the vault.
            </p>
          </div>
          <div className="hero-bottom pluto-container">
            <span>Pick a Captain. Join the Crew. Keep your keys.</span>
            <a href="#safety">
              The Ship’s Articles <Icon name="down" />
            </a>
          </div>
        </section>

        <section
          id="safety"
          className="pluto-section safety-section"
          aria-labelledby="safety-title"
        >
          <div className="pluto-container">
            <div className="section-heading centered">
              <SectionLabel>The Ship’s Articles</SectionLabel>
              <h2 id="safety-title">
                Captains trade your money.
                <br />
                <span>They can never take it.</span>
              </h2>
              <p>
                You’re the Crew. A Captain is a vetted trader. Your money sits in a vault on Solana
                that obeys five articles, and no Captain can rewrite them.
              </p>
            </div>
            <div className="articles-grid">
              {articles.map((article, i) => (
                <article className="article-card" key={article.title}>
                  <div className="article-icon">
                    <Icon name={article.icon} />
                    <span>0{i + 1}</span>
                  </div>
                  <h3>{article.title}</h3>
                  <p>{article.text}</p>
                </article>
              ))}
            </div>
            <p className="sample-note audit-note">
              <Icon name="shield" />
              The same articles bind every vault. An independent audit is under way and will be
              published before launch.
            </p>
          </div>
        </section>

        <section className="blue-statement" aria-label="Keep your keys">
          <div className="pluto-container">
            <BrandEmblem size={48} />
            <p>
              Pick a Captain. Join the Crew.
              <br />
              <span>Keep your keys.</span>
            </p>
          </div>
        </section>

        <section
          id="how-it-works"
          className="pluto-section how-section"
          aria-labelledby="how-title"
        >
          <div className="pluto-container">
            <div className="section-heading">
              <SectionLabel>How it works</SectionLabel>
              <h2 id="how-title">Aboard in four steps.</h2>
              <p>
                No wallets to set up and no charts to learn.
                <br className="wide-only" /> Choose who trades for you, then follow along.
              </p>
            </div>
            <HowItWorks />
          </div>
        </section>

        <section
          id="captains"
          className="pluto-section captains-section"
          aria-labelledby="captains-title"
        >
          <div className="pluto-container">
            <div className="section-heading heading-with-link">
              <div>
                <SectionLabel>Port of Captains</SectionLabel>
                <h2 id="captains-title">Top Captains, side by side.</h2>
                <p>
                  Every return sits beside its worst drop:
                  <br className="wide-only" /> the biggest fall from a high in the same period.
                </p>
              </div>
              <a className="text-action" href="#early-access">
                Get early access <Icon name="arrow" />
              </a>
            </div>
            <CaptainGallery />
            <div className="ships-log">
              <span className="log-heading">
                <span className="live-dot" />
                Ship’s log <span className="sample-badge">Sample</span>
              </span>
              <span>
                <strong>Atlas</strong> bought SOL <time>2m</time>
              </span>
              <span>
                <strong>Solstice</strong> sold JUP <time>9m</time>
              </span>
              <span>
                <strong>Northstar</strong> bought BTC <time>14m</time>
              </span>
            </div>
          </div>
        </section>

        <section className="pluto-section app-section" aria-labelledby="app-title">
          <div className="pluto-container">
            <div className="section-heading centered">
              <SectionLabel>Inside the app</SectionLabel>
              <h2 id="app-title">Everything on deck, in your pocket.</h2>
              <p>What you’ll see in the Socially app. Figures are samples before launch.</p>
            </div>
            <div className="app-features">
              <article className="app-feature">
                <div className="app-feature-art">
                  <Image
                    src="/images/artwork/captain-horizon.webp"
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 520px"
                    className="feature-scenery"
                  />
                  <div className="preview-card">
                    <div className="preview-profile">
                      <Avatar name="Atlas" />
                      <div>
                        <strong>Atlas</strong>
                        <span>Solana Momentum · 14 months</span>
                      </div>
                      <span className="admiral-badge">Admiral</span>
                    </div>
                    <div className="preview-stats">
                      <div>
                        <span>90-day return</span>
                        <strong>+42.8%</strong>
                      </div>
                      <div>
                        <span>Worst drop</span>
                        <strong>−12.8%</strong>
                      </div>
                    </div>
                    <Sparkline />
                    <div className="captain-note">
                      <span>Latest update</span>
                      <p>
                        “SOL looks stronger than the market this week. I’m moving a third of the
                        vault into it.”
                      </p>
                      <small>Atlas · Today</small>
                    </div>
                  </div>
                </div>
                <SectionLabel>Before you join</SectionLabel>
                <h3>See everything a Captain does</h3>
                <p>
                  Their return beside their worst drop, the size of the vault and its Crew, and
                  their own notes on each move.
                </p>
              </article>
              <article className="app-feature">
                <div className="app-feature-art portfolio-preview">
                  <Image
                    src="/images/artwork/crew-harbor.webp"
                    alt=""
                    fill
                    sizes="(max-width: 700px) 100vw, 520px"
                    className="feature-scenery"
                  />
                  <div className="preview-card">
                    <span className="portfolio-value-label">Portfolio value</span>
                    <strong className="portfolio-total">$10,502.20</strong>
                    <small className="portfolio-growth">+$320.18 · 30D</small>
                    <div className="allocation-bar">
                      <span />
                      <span />
                      <span />
                    </div>
                    {[
                      ["Atlas", "$4,230.50"],
                      ["Solstice", "$3,980.10"],
                      ["Northstar", "$2,291.60"],
                    ].map(([name, value]) => (
                      <div className="portfolio-row" key={name}>
                        <Avatar name={name} />
                        <span>{name}</span>
                        <strong>{value}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <SectionLabel>Your portfolio</SectionLabel>
                <h3>Every vault, in one view</h3>
                <p>Your share of each Captain’s vault, updated as they trade.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="fees" className="pluto-section fee-section" aria-labelledby="fee-title">
          <div className="pluto-container">
            <div className="fee-layout">
              <div className="fee-copy">
                <SectionLabel>The Captain’s share</SectionLabel>
                <h2 id="fee-title">
                  One fee.
                  <br />
                  Only when you profit.
                </h2>
                <p>
                  You pay 10% of the new profit a Captain makes for you. If your vault doesn’t grow
                  past its last high, nobody is paid.
                </p>
                <div className="fee-percentage">
                  <strong>
                    10<span>%</span>
                  </strong>
                  <span>
                    of new profit,
                    <br />
                    nothing else
                  </span>
                </div>
                <div className="fee-split">
                  <span>
                    <i />
                    8% to the Captain
                  </span>
                  <span>
                    <i />
                    2% to Socially
                  </span>
                </div>
                <div className="zero-fees">
                  {["Joining fee", "Monthly fee", "Leaving fee"].map((fee) => (
                    <div key={fee}>
                      <span>{fee}</span>
                      <strong>$0</strong>
                    </div>
                  ))}
                </div>
                <p className="fee-fine-print">
                  Paid in vault shares, never taken out as cash. If your vault dips and recovers, no
                  fee is due until it passes its last high.
                </p>
              </div>
              <FeeExplorer />
            </div>
          </div>
        </section>

        <section
          id="for-captains"
          className="captain-invite"
          aria-labelledby="captain-invite-title"
        >
          <div className="pluto-container">
            <div>
              <SectionLabel>For traders</SectionLabel>
              <h2 id="captain-invite-title">Take the helm.</h2>
              <p>
                Trade for a Crew and earn every time
                <br className="wide-only" /> your vault reaches a new high.
              </p>
              <a href="#early-access" className="pill-button white-button">
                Apply to captain <Icon name="arrow" />
              </a>
              <small>We review every application before a vault opens.</small>
            </div>
            <div className="captain-share">
              <Image
                src="/images/artwork/captain-helm.webp"
                alt="A Captain at the helm, looking toward the Crew’s coastal harbor."
                fill
                sizes="(max-width: 700px) 100vw, 520px"
                className="captain-invite-image"
              />
              <span>Your share</span>
              <strong>
                80<span>%</span>
              </strong>
              <p>
                Of every fee your Crew pays, you keep 80%.
                <br /> Socially keeps the other 20%.
              </p>
            </div>
          </div>
          <svg viewBox="0 0 1440 500" preserveAspectRatio="none" fill="none" aria-hidden="true">
            <ellipse cx="1100" cy="250" rx="400" ry="440" />
            <ellipse cx="1100" cy="250" rx="580" ry="600" />
          </svg>
        </section>

        <section className="pluto-section comparison-section" aria-labelledby="comparison-title">
          <div className="pluto-container">
            <div className="section-heading">
              <SectionLabel>Why Socially</SectionLabel>
              <h2 id="comparison-title">Four ways to let someone trade for you.</h2>
            </div>
            <div
              className="comparison-scroll"
              role="region"
              aria-label="Compare ways to trade"
              tabIndex={0}
            >
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th scope="col">Question</th>
                    <th scope="col">Give them the money</th>
                    <th scope="col">Copy their calls</th>
                    <th scope="col">Exchange copy-trading</th>
                    <th scope="col">
                      <BrandEmblem size={20} />
                      Socially
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisons.map(([question, ...cells]) => (
                    <tr key={question}>
                      <th scope="row">{question}</th>
                      {cells.map((cell, i) => (
                        <td key={cell}>
                          {i === 3 && (
                            <span className="comparison-check" aria-hidden="true">
                              ✓
                            </span>
                          )}
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section id="faq" className="pluto-section pluto-faq" aria-labelledby="faq-title">
          <div className="pluto-container faq-columns">
            <div className="section-heading">
              <SectionLabel>Questions</SectionLabel>
              <h2 id="faq-title">
                Plain answers,
                <br />
                no fine print.
              </h2>
              <a
                className="text-action"
                href="https://x.com/tradesociallyy"
                target="_blank"
                rel="noreferrer"
              >
                Ask us on X <Icon name="arrow" />
              </a>
            </div>
            <div className="pluto-faq-list">
              {questions.map(([q, a]) => (
                <details key={q} name="socially-faq">
                  <summary>
                    {q}
                    <Icon name="plus" />
                  </summary>
                  <p>{a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section id="early-access" className="pluto-join" aria-labelledby="join-title">
          <TidalBackground quiet />
          <div className="join-content">
            <SociallyMark />
            <SectionLabel>The first voyage</SectionLabel>
            <h2 id="join-title">Reserve your berth.</h2>
            <p>We’ll email you when the first vaults open.</p>
            <EarlyAccessForm
              buttonLabel="Join the waitlist"
              caption="One email when we launch. Nothing else."
            />
            <a
              className="join-social"
              href="https://x.com/tradesociallyy"
              target="_blank"
              rel="noreferrer"
            >
              News goes out first on X: <strong>@tradesociallyy</strong> <Icon name="arrow" />
            </a>
            <div className="app-availability">
              <span>
                App Store <small>· coming soon</small>
              </span>
              <span>
                Google Play <small>· coming soon</small>
              </span>
            </div>
          </div>
        </section>
      </main>
      <footer className="pluto-footer">
        <div className="pluto-container">
          <div className="footer-top">
            <div>
              <SociallyWordmark />
              <p>
                Social trading on Solana. Pick a Captain,
                <br />
                join the Crew, keep your keys.
              </p>
            </div>
            <nav aria-label="Product navigation">
              <span>Product</span>
              <a href="#how-it-works">How it works</a>
              <a href="#captains">Captains</a>
              <a href="#safety">Safety</a>
              <a href="#fees">Fees</a>
            </nav>
            <nav aria-label="Company navigation">
              <span>Company</span>
              <a href="mailto:support@socially.trade">Contact</a>
              <a href="https://x.com/tradesociallyy" target="_blank" rel="noreferrer">
                @tradesociallyy
              </a>
              <Link href="/privacy">Privacy</Link>
              <Link href="/terms">Terms</Link>
            </nav>
          </div>
          <p className="footer-risk">
            Trading crypto assets carries risk, including the loss of your money. Returns shown on
            this site are sample figures for illustration before launch. Past results don’t predict
            future results. Socially will be available in selected countries only.
          </p>
          <div className="footer-bottom">
            <span>© 2026 Socially</span>
            <span>
              Fair winds. <Icon name="compass" />
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
