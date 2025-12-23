"use client";

import React, { useEffect, useState } from "react";

type ConsentState = "unknown" | "accepted" | "rejected";

const STORAGE_KEY = "tkv24-analytics-consent-v1";

const ConsentBanner = () => {
  const [consent, setConsent] = useState<ConsentState>("unknown");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored === "accepted" || stored === "rejected") {
      setConsent(stored as ConsentState);
    }
  }, []);

  const handleChoice = (choice: "accepted" | "rejected") => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, choice);
    }
    setConsent(choice);
  };

  if (consent !== "unknown") {
    return null;
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-4 sm:px-6 sm:pb-6">
      <div className="max-w-3xl w-full rounded-2xl bg-black/90 text-white p-4 sm:p-6 shadow-lg border border-white/10">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-3 text-sm sm:text-base">
            <p className="font-semibold">Sivusto käyttää evästeitä analytiikkaan</p>
            <p>
              Käytämme Google Analytics- ja Hotjar-palveluja sivuston
              kehittämiseen. Hyväksymällä annat luvan anonyymiin
              kävijäseurantaan. Voit kieltäytyä, jolloin analytiikka ei lataudu.
            </p>
            <a
              href="/privacy"
              className="mt-2 inline-block underline underline-offset-2 text-brand-pink hover:text-brand-dark-pink"
            >
              Lue lisää tietosuojasta
            </a>
          </div>
          <div className="flex flex-row gap-2 mt-3 sm:mt-0 sm:flex-shrink-0">
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-white bg-white text-black text-sm font-semibold hover:bg-brand-pink hover:text-white transition-colors"
              onClick={() => handleChoice("accepted")}
            >
              Hyväksyn
            </button>
            <button
              type="button"
              className="px-4 py-2 rounded-full border border-white/40 text-sm font-semibold hover:bg-white/10 transition-colors"
              onClick={() => handleChoice("rejected")}
            >
              En hyväksy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentBanner;


