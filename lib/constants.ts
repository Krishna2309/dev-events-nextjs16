export interface EventItem {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: EventItem[] = [
  {
    title: "Google I/O 2026 Community Recap",
    image: "/images/event1.png",
    slug: "google-io-2026-community-recap",
    location: "Bengaluru, India",
    date: "June 14, 2026",
    time: "10:00 AM IST",
  },
  {
    title: "JSNation 2026",
    image: "/images/event2.png",
    slug: "jsnation-2026",
    location: "Amsterdam, Netherlands",
    date: "June 20, 2026",
    time: "09:30 AM CEST",
  },
  {
    title: "AWS Community Day Bengaluru 2026",
    image: "/images/event3.png",
    slug: "aws-community-day-bengaluru-2026",
    location: "Bengaluru, India",
    date: "July 6, 2026",
    time: "09:00 AM IST",
  },
  {
    title: "React Summit 2026",
    image: "/images/event4.png",
    slug: "react-summit-2026",
    location: "Amsterdam, Netherlands",
    date: "July 12, 2026",
    time: "09:00 AM CEST",
  },
  {
    title: "HackMIT 2026",
    image: "/images/event5.png",
    slug: "hackmit-2026",
    location: "Cambridge, MA, USA",
    date: "September 19, 2026",
    time: "08:00 AM ET",
  },
  {
    title: "KubeCon + CloudNativeCon North America 2026",
    image: "/images/event6.png",
    slug: "kubecon-cloudnativecon-na-2026",
    location: "Los Angeles, CA, USA",
    date: "November 10, 2026",
    time: "09:00 AM PT",
  },
];
