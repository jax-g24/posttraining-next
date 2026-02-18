export interface LectureLink {
  label: string;
  url?: string;
  variant?: "slides" | "default";
  disabled?: boolean;
}

export interface Lecture {
  name: string;
  date: string;
  description?: string;
  links: LectureLink[];
  tag?: { text: string; type: "due" | "release" };
}

export interface Module {
  number: number;
  title: string;
  heroImage: string;
  upcoming?: boolean;
  lectures: Lecture[];
}

export interface VideoItem {
  title: string;
  date: string;
  module: string;
  thumbnail: string;
  videoId: string;
  slides?: string;
  notes?: string;
  upcoming?: boolean;
}

export interface CalendarWeek {
  month: string;
  day: string;
  weekLabel: string;
  lecture: string;
  technicalWork: { title: string; url?: string }[];
  materials: { label: string; url: string }[];
  assignment?: { text: string; type: "due" | "release" };
  variant?: "break" | "highlight";
}

export const videos: VideoItem[] = [
  {
    title: "What We Owe Machines",
    date: "Jan 26",
    module: "Module One, Fundamentals",
    thumbnail: "/images/What we owe machines-lecture.png",
    videoId: "https://iframe.mediadelivery.net/embed/593384/9d2a9eb8-f376-448f-b346-1047f83c2252?autoplay=true",
    slides: "/slides/WhatWeOweMachines.pdf",
    notes: "https://drive.google.com/file/d/10AQCsEnCpEPpblU4TgUNZJzCu-JtUoes/view?usp=share_link",
  },
  {
    title: "The Lifecycle of a Language Model",
    date: "Feb 2",
    module: "Module One, Fundamentals",
    thumbnail: "/images/The Lifecycle of a Language Model.jpg",
    videoId: "F539mrLBUaE",
    upcoming: true,
  },
  {
    title: "Post-Training Foundations",
    date: "Feb 9",
    module: "Module Two, Post-Training",
    thumbnail: "/images/posttraining-foundations.jpg",
    videoId: "rKu0FKKNP4M",
    upcoming: true,
  },
  {
    title: "RLHF and Reward Learning",
    date: "Feb 16",
    module: "Module Two, Post-Training",
    thumbnail: "/images/RLHF and Reward Learning.jpg",
    videoId: "IPukuYb9xWw",
    upcoming: true,
  },
  {
    title: "Alignment Methods & Model Behavior",
    date: "Feb 23",
    module: "Module Two, Post-Training",
    thumbnail: "/images/Alignment Methods & Model Behavior.jpg",
    videoId: "ydYDqZQpim8",
    upcoming: true,
  },
  {
    title: "Evals as Research",
    date: "Mar 2",
    module: "Module Two, Post-Training",
    thumbnail: "/images/Evals as Research.jpg",
    videoId: "7ynL4U2v2Sw",
    upcoming: true,
  },
];

export const modules: Module[] = [
  {
    number: 1,
    title: "Fundamentals",
    heroImage: "/images/What we owe machines.jpeg",
    lectures: [
      {
        name: "What We Owe Machines",
        date: "January 26, 2026",
        description: "The hard problem in AI isn't making machines smarter, it's teaching them to handle problems without right answers.",
        links: [
          { label: "Slides", url: "https://docs.google.com/presentation/d/1nxbNp8790FXulVz9qfzK9feuBdAMdWV7xJa_wEcatF4/edit?slide=id.g3be38b50ae6_0_17#slide=id.g3be38b50ae6_0_17", variant: "slides" },
          { label: "Notes", url: "https://drive.google.com/file/d/10AQCsEnCpEPpblU4TgUNZJzCu-JtUoes/view?usp=share_link" },
          { label: "Recording", disabled: true },
        ],
      },
      {
        name: "The Lifecycle of a Language Model",
        date: "February 2, 2026",
        description: "Understanding the full training pipeline from pretraining to deployment.",
        links: [
          { label: "Slides", url: "https://docs.google.com/presentation/d/1hg_jUCT_InCxyI6_hIsFjDST93qz9quFjNZbojxAuyQ/edit?usp=sharing", variant: "slides" },
          { label: "Recording", disabled: true },
        ],
      },
    ],
  },
  {
    number: 2,
    title: "Post-Training",
    heroImage: "/images/posttraining-foundations.jpg",
    lectures: [
      {
        name: "Post-Training Foundations",
        date: "February 9, 2026",
        links: [
          { label: "Slides", url: "https://drive.google.com/file/d/1rNBEWH18fvg2gVAVeVAy2WC9cbXe-dWN/view?usp=sharing", variant: "slides" },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Final Project A Due", type: "due" },
      },
      {
        name: "RL Methods and Reward Hacks",
        date: "February 16, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Project 1 Released", type: "release" },
      },
      {
        name: "Model Behavior: Alignment, Judgment, Safety",
        date: "February 23, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Final Project B Due", type: "due" },
      },
      {
        name: "Evals as Research",
        date: "March 2, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
      },
    ],
  },
  {
    number: 3,
    title: "Reasoning & Agents",
    heroImage: "/images/Alignment Methods & Model Behavior.jpg",
    upcoming: true,
    lectures: [
      {
        name: "Search, Planning, Memory, Personalization",
        date: "March 9, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Project 1 Due", type: "due" },
      },
      {
        name: "Tool Use and Verification",
        date: "March 16, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Project 2 Released", type: "release" },
      },
      {
        name: "Spring Break",
        date: "March 23, 2026",
        description: "No class this week. Enjoy your break!",
        links: [],
      },
      {
        name: "Multi-Agentic Systems, Self-play, Self-improvement",
        date: "March 30, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Final Project C Due", type: "due" },
      },
    ],
  },
  {
    number: 4,
    title: "Product & Research",
    heroImage: "/images/Evals as Research.jpg",
    upcoming: true,
    lectures: [
      {
        name: "Product Design Workshop",
        date: "April 6, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
        tag: { text: "Project 2 Due", type: "due" },
      },
      {
        name: "Product Workshop (Continued)",
        date: "April 13, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
      },
      {
        name: "Guest Lecture",
        date: "April 20, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
      },
      {
        name: "Guest Lecture",
        date: "April 27, 2026",
        links: [
          { label: "Slides", disabled: true },
          { label: "Notes", disabled: true },
          { label: "Recording", disabled: true },
        ],
      },
      {
        name: "Demo Day 🎉",
        date: "May 4, 2026 · RRR Week",
        description: "Present your final projects to the class.",
        links: [],
        tag: { text: "Final Project Due", type: "due" },
      },
    ],
  },
];

export const calendarWeeks: CalendarWeek[] = [
  {
    month: "Jan", day: "26", weekLabel: "Week 1 · Fundamentals", lecture: "What We Owe Machines",
    technicalWork: [
      { title: "T1a: Inference Playground", url: "https://colab.research.google.com/drive/19WvcopPNIOLH4NKNH5ar1Y0M1d4yJ3mQ?usp=sharing" },
      { title: "T1b: Scaling Laws", url: "https://colab.research.google.com/drive/1deDpzYaMXkROCw2LWonMDsfcQJ34EFnD?usp=sharing" },
    ],
    materials: [
      { label: "Slides", url: "https://docs.google.com/presentation/d/1nxbNp8790FXulVz9qfzK9feuBdAMdWV7xJa_wEcatF4/edit?usp=sharing" },
      { label: "Notes", url: "https://drive.google.com/file/d/10AQCsEnCpEPpblU4TgUNZJzCu-JtUoes/view?usp=share_link" },
    ],
  },
  {
    month: "Feb", day: "2", weekLabel: "Week 2 · Fundamentals", lecture: "The Lifecycle of a Language Model",
    technicalWork: [
      { title: "T2a: Build a Context-Aware Assistant" },
      { title: "T2b: Inference Deep-Dive" },
    ],
    materials: [],
  },
  {
    month: "Feb", day: "9", weekLabel: "Week 3 · Post-Training", lecture: "Post-Training Foundations",
    technicalWork: [
      { title: "T3a: Datagen Pipelines & Quality" },
      { title: "T3b: SFT from Scratch" },
    ],
    materials: [],
    assignment: { text: "Final Project A Due", type: "due" },
  },
  {
    month: "Feb", day: "16", weekLabel: "Week 4 · Post-Training", lecture: "RLHF and Reward Learning",
    technicalWork: [
      { title: "T4a: DPO in Practice" },
      { title: "T4b: Toy Reward Modeling" },
    ],
    materials: [],
    assignment: { text: "Project 1 Released", type: "release" },
  },
  {
    month: "Feb", day: "23", weekLabel: "Week 5 · Post-Training", lecture: "Alignment Methods & Model Behavior",
    technicalWork: [
      { title: "T5a: Refusal Classifier" },
      { title: "T5b: Constitutional AI Loop" },
    ],
    materials: [],
    assignment: { text: "Final Project B Due", type: "due" },
  },
  {
    month: "Mar", day: "2", weekLabel: "Week 6 · Post-Training", lecture: "Evals as Research",
    technicalWork: [
      { title: "T6a: Evaluation Design" },
      { title: "T6b: Benchmark Hacking" },
    ],
    materials: [],
  },
  {
    month: "Mar", day: "9", weekLabel: "Week 7 · Reasoning & Agents", lecture: "Search, Planning, Memory",
    technicalWork: [
      { title: "T7a: Planning Agent" },
      { title: "T7b: AlphaEvolve" },
    ],
    materials: [],
    assignment: { text: "Project 1 Due", type: "due" },
  },
  {
    month: "Mar", day: "16", weekLabel: "Week 8 · Reasoning & Agents", lecture: "Tool Use and Verification",
    technicalWork: [
      { title: "T8a: Coding Agent with Verification" },
      { title: "T8b: Computer Use Lab" },
    ],
    materials: [],
    assignment: { text: "Project 2 Released", type: "release" },
  },
  {
    month: "Mar", day: "23", weekLabel: "Spring Break", lecture: "—",
    technicalWork: [],
    materials: [],
    variant: "break",
  },
  {
    month: "Mar", day: "30", weekLabel: "Week 9 · Reasoning & Agents", lecture: "Multi-Agent Systems",
    technicalWork: [
      { title: "T9a: Agent Telemetry" },
      { title: "T9b: Multi-Agent Collaboration" },
    ],
    materials: [],
    assignment: { text: "Final Project C Due", type: "due" },
  },
  {
    month: "Apr", day: "6", weekLabel: "Week 10 · Product", lecture: "Product Design & Development Workshop",
    technicalWork: [{ title: "T10: Self-Play Experiment" }],
    materials: [],
    assignment: { text: "Project 2 Due", type: "due" },
  },
  {
    month: "Apr", day: "13", weekLabel: "Week 11 · Product", lecture: "Product Design & Development Workshop (Ct'd)",
    technicalWork: [],
    materials: [],
  },
  {
    month: "Apr", day: "20", weekLabel: "Week 12 · Guest Lecture", lecture: "TBA",
    technicalWork: [],
    materials: [],
  },
  {
    month: "Apr", day: "27", weekLabel: "Week 13 · Guest Lecture", lecture: "TBA",
    technicalWork: [],
    materials: [],
  },
  {
    month: "May", day: "4", weekLabel: "RRR Week", lecture: "Demo Day",
    technicalWork: [],
    materials: [],
    assignment: { text: "Final Project Due", type: "due" },
    variant: "highlight",
  },
];
