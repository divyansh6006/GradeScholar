"use client";

import { useEffect, useState } from "react";
import type { University, Program } from "@/lib/data";

export function useUniversities() {
  const [universities, setUniversities] = useState<University[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/universities")
      .then((res) => res.json())
      .then((data) => {
        if (active) setUniversities(data);
      });
    return () => {
      active = false;
    };
  }, []);

  return universities;
}

export function usePrograms() {
  const [programs, setPrograms] = useState<Program[]>([]);

  useEffect(() => {
    let active = true;
    fetch("/api/programs")
      .then((res) => res.json())
      .then((data) => {
        if (active) setPrograms(data);
      });
    return () => {
      active = false;
    };
  }, []);

  return programs;
}
