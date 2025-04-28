// src/app/api/blocker/ics/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const subject     = searchParams.get("subject")     || "Event";
  const body        = searchParams.get("body")        || "";
  const location    = searchParams.get("location")    || "";
  const meetingLink = searchParams.get("meetingLink") || "";
  const date        = searchParams.get("date")!;        // YYYY-MM-DD
  const startTime   = searchParams.get("startTime")!;   // HH:MM
  const endTime     = searchParams.get("endTime")!;     // HH:MM

  const pad = (n:number) => n.toString().padStart(2, "0");
  function toLocalICS(d: Date) {
    return (
      d.getFullYear() +
      pad(d.getMonth() + 1) +
      pad(d.getDate()) +
      "T" +
      pad(d.getHours()) +
      pad(d.getMinutes()) +
      pad(d.getSeconds())
    );
  }

  const now     = new Date();
  const dtstamp = toLocalICS(now);
  const dtstart = toLocalICS(new Date(`${date}T${startTime}:00`));
  const dtend   = toLocalICS(new Date(`${date}T${endTime}:00`));
  const uid     = `${dtstamp}-${Math.random().toString(36).slice(2)}@calendar-blocker`;

  const descLines = [];
  if (body)        descLines.push(body.replace(/\r?\n/g, "\\n"));
  if (meetingLink) descLines.push(meetingLink);
  const description = descLines.join("\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Calendar-Blocker//EN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `DTSTART:${dtstart}`,
    `DTEND:${dtend}`,
    `SUMMARY:${subject}`,
    `DESCRIPTION:${description}`,
    `LOCATION:${location}`,
    meetingLink ? `URL:${meetingLink}` : "",
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter(Boolean);

  return new NextResponse(lines.join("\r\n"), {
    status: 200,
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": 'attachment; filename="block.ics"',
    },
  });
}
