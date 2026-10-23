"use client";

import { useState } from "react";
import { Icon, Phone } from "@/components/visuals";

const journeys = {
  crew: {
    label: "Join as Crew",
    title: "Find your people. Follow their thinking.",
    description: "Go beyond a chart. Get to know the strategy, the decisions, and the person behind a portfolio before choosing your Crew.",
    steps: ["Discover a Captain", "Explore their strategy", "Follow your portfolio"],
    screen: "crew-home" as const,
    link: "Explore the Crew experience",
    href: "#discover",
  },
  captain: {
    label: "Lead as Captain",
    title: "Give your strategy a place to grow.",
    description: "Put your approach into practice with a paper strategy. Manage your vaults and give your Crew a clearer view of your decisions.",
    steps: ["Define your approach", "Create a paper strategy", "Keep your Crew in the loop"],
    screen: "captain-home" as const,
    link: "Explore the Captain experience",
    href: "#for-captains",
  },
};

export function VoyageExplorer() {
  const [role, setRole] = useState<keyof typeof journeys>("crew");
  const journey = journeys[role];
  return (
    <section id="experience" className="section experience-section" aria-labelledby="experience-title">
      <div className="shell">
        <div className="section-heading">
          <p className="eyebrow">TWO WAYS TO COME ABOARD</p>
          <h2 id="experience-title">Your journey. <span className="editorial-accent">Your role.</span></h2>
          <p className="section-description">A place for the curious. A platform for the conviction.</p>
        </div>
        <div className="journey-switch" role="group" aria-label="Choose an experience">
          {(Object.keys(journeys) as Array<keyof typeof journeys>).map((key) => (
            <button key={key} type="button" aria-pressed={role === key} aria-controls="journey-content" onClick={() => setRole(key)}>
              <Icon name={key === "crew" ? "people" : "compass"} />{journeys[key].label}
            </button>
          ))}
        </div>
        <div id="journey-content" className="journey-panel">
          <div className="journey-copy" aria-live="polite" aria-atomic="true">
            <span className="journey-kicker">THE {role.toUpperCase()} EXPERIENCE</span>
            <h3>{journey.title}</h3>
            <p>{journey.description}</p>
            <ol>{journey.steps.map((step, i) => <li key={step}><span>0{i + 1}</span>{step}</li>)}</ol>
            <a href={journey.href} className="text-link">{journey.link}<Icon name="arrow" /></a>
          </div>
          <div className="journey-preview">
            <div className="journey-orbit" aria-hidden="true" />
            <Phone key={journey.screen} screen={journey.screen} />
            <span className="preview-label">APP PREVIEW · SAMPLE DATA</span>
          </div>
        </div>
      </div>
    </section>
  );
}
