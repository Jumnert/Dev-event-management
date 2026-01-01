export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
  // optional metadata
  description?: string;
  link?: string;
  tags?: string[];
}

export const events: EventItem[] = [
  {
    slug: "react-summit-2026",
    title: "React Summit 2026",
    date: "2026-04-14",
    time: "09:00 - 17:30",
    location: "Amsterdam, Netherlands",
    description:
      "A large community-driven conference focusing on React, React Native, and the React ecosystem.",
    image: "/images/event1.png",
    link: "https://reactsummit.com/",
    tags: ["react", "frontend", "javascript"],
  },
  {
    slug: "google-io-2026",
    title: "Google I/O 2026",
    date: "2026-05-19",
    time: "10:00 - 18:00",
    location: "Mountain View, CA (hybrid)",
    description:
      "Google's annual developer conference showcasing Android, web, cloud, and AI updates.",
    image: "/images/event2.png",
    link: "https://events.google.com/io/",
    tags: ["android", "web", "ai"],
  },
  {
    slug: "msft-build-2026",
    title: "Microsoft Build 2026",
    date: "2026-05-05",
    time: "09:30 - 17:00",
    location: "Seattle, WA (and online)",
    description:
      "Microsoft's flagship conference for developers building on Azure, .NET, and Microsoft platforms.",
    image: "/images/event3.png",
    link: "https://mybuild.microsoft.com/",
    tags: ["azure", "dotnet", "cloud"],
  },
  {
    slug: "aws-reinvent-2026",
    title: "AWS re:Invent 2026",
    date: "2026-11-29",
    time: "08:30 - 18:00",
    location: "Las Vegas, NV",
    description:
      "Amazon Web Services' annual conference with deep technical sessions, workshops, and launches.",
    image: "/images/event4.png",
    link: "https://reinvent.aws/",
    tags: ["aws", "cloud", "devops"],
  },
  {
    slug: "jsconf-eu-2026",
    title: "JSConf EU 2026",
    date: "2026-06-12",
    time: "09:00 - 17:00",
    location: "Berlin, Germany",
    description:
      "Community-run JavaScript conference focused on modern JS, performance and tooling.",
    image: "/images/event5.png",
    link: "https://jsconf.eu/",
    tags: ["javascript", "nodejs", "web"],
  },
  {
    slug: "github-universe-2026",
    title: "GitHub Universe 2026",
    date: "2026-10-07",
    time: "10:00 - 16:30",
    location: "San Francisco, CA (virtual + in-person)",
    description:
      "GitHub's conference highlighting the latest in developer tools, CI/CD, and open source.",
    image: "/images/event6.png",
    link: "https://githubuniverse.com/",
    tags: ["devtools", "opensource", "ci/cd"],
  },
  {
    slug: "hackmit-2026",
    title: "HackMIT 2026",
    date: "2026-09-18",
    time: "18:00 - 22:00",
    location: "Cambridge, MA",
    description:
      "One of the largest student-run hackathons in the US, welcoming beginner and veteran hackers.",
    image: "/images/event-full.png",
    link: "https://hackmit.org/",
    tags: ["hackathon", "students", "projects"],
  },
];

export default events;
