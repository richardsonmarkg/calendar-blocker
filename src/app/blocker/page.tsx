// src/app/blocker/page.tsx
"use client";

import { useState } from "react";
import styles from "./page.module.css";

export default function BlockerPage() {
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [location, setLocation] = useState("");
  const [meetingLink, setMeetingLink] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [link, setLink] = useState("");

  const buildLink = () => {
    const params = new URLSearchParams({
      subject,
      body,
      location,
      meetingLink,
      date,
      startTime,
      endTime,
    });
    return `${window.location.origin}/api/blocker/ics?${params.toString()}`;
  };

  const handleGenerate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLink(buildLink());
  };

  const handleDownload = () => {
    window.location.href = buildLink();
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(link);
    alert("Link copied to clipboard!");
  };

  return (
    <div className={styles.container}>
      <h1>Create a Calendar Block</h1>

      <form onSubmit={handleGenerate}>
        <div className={styles.field}>
          <label>Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="E.g. Team Sync"
            required
          />
        </div>

        <div className={styles.field}>
          <label>Body</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="E.g. Please join us via the link below…"
            rows={4}
          />
        </div>

        <div className={styles.field}>
          <label>Location</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="E.g. Zoom / Office"
          />
        </div>

        <div className={styles.field}>
          <label>Meeting Link (URL)</label>
          <input
            type="url"
            value={meetingLink}
            onChange={(e) => setMeetingLink(e.target.value)}
            placeholder="https://yourcall.com/meet/123"
          />
        </div>

        <div className={styles.field}>
          <label>Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>

        <div className={styles.row}>
          <div className={styles.field}>
            <label>Start Time</label>
            <input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              required
            />
          </div>
          <div className={styles.field}>
            <label>End Time</label>
            <input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              required
            />
          </div>
        </div>

        <div className={`${styles.field} ${styles.buttonGroup}`}>
          <button type="submit">Generate Link</button>
          <button type="button" onClick={handleDownload}>
            Download .ics
          </button>
        </div>
      </form>

      {link && (
        <div className={styles.shareLink}>
          <p>
            <strong>Your shareable link:</strong>
          </p>
          <textarea readOnly value={link} rows={3} />
          <button onClick={handleCopy}>Copy Link</button>
          <p>Paste this URL into your email blast.</p>
        </div>
      )}
    </div>
  );
}
