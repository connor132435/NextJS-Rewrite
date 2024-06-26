"use client"

import Image from "next/image"
import React, { useEffect, useState } from "react";
import "@/styles/DateCrawler.css";
import Crawl from "/public/static/images/EllipseCrawl.svg";
import lightCrawl from "/public/static/images/lightEllipseCrawl.svg";

export default function DateCrawler() {
  //fetch sheet data
  const [dayTypes, setDayTypes] = useState<String[][]>([
    ['Sun', 'Loading...', ''],
    ['Mon', 'Loading...', ''],
    ['Tue', 'Loading...', ''],
    ['Wed', 'Loading...', ''],
    ['Thu', 'Loading...', ''],
    ['Fri', 'Loading...', ''],
    ['Sat', 'Loading...', ''],
  ]);
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const fetchSheetsData = async () => {
      try {
        const ID = "1yB7zzw0I3hUjLwgKZXMpBioQ9FNkTg2bp3skTwtatHk";
        const sheet_name = "Schedule";
        const response = await fetch(
          `https://docs.google.com/spreadsheets/d/${ID}/gviz/tq?tqx=out:csv&sheet=${sheet_name}`,
        );
        const text = await response.text();
        let d = text.split("\n");
        let data = d.map((x) => {
          return x.replaceAll('"', "").split(",");
        });
        data.shift();
        setDayTypes(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchSheetsData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {dayTypes.map(
        (day, i) =>
          i !== 0 &&
          i !== 6 && (
            <div className={day[0].toLowerCase() + " day-box"} key={i}>
              <div className="ellipse-crawler">
                <Image
                  src={date.getDay() < i ? lightCrawl : Crawl}
                  alt={date.getDay() < i ? "light ellipse" : "normal ellipse"}
                  className="ellipse-item"
                />
                <p className="dateText">{day[0]}</p>
              </div>
              <p className="day-text">
                <span className="type-text">{day[1].trim()}</span>
                <span className="day-type-text">{" " + day[2]}</span>
              </p>
            </div>
          ),
      )}
    </div>
  );
}
