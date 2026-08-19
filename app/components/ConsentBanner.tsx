"use client";

import React, { useSyncExternalStore } from "react";
import {
  CONSENT_STORAGE_KEY,
  CONSENT_EVENT,
  type ConsentState,
} from "@/app/consent";

const subscribe = (onStoreChange: () => void) => {
  // `storage` covers other tabs, CONSENT_EVENT covers this one.
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(CONSENT_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(CONSENT_EVENT, onStoreChange);
  };
};

const getSnapshot = (): ConsentState => {
  try {
    const stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "accepted" || stored === "rejected" ? stored : "unknown";
  } catch (e) {
    // Storage blocked (private mode, cookie settings): treat as no choice yet.
    return "unknown";
  }
};

// No stored choice is visible while prerendering.
const getServerSnapshot = (): ConsentState => "unknown";

const ConsentBanner = () => {
  const consent = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const handleChoice = (choice: "accepted" | "rejected") => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch (e) {
      // Storage unavailable. Fall through so the banner still closes; the
      // analytics loaders re-read storage themselves and stay off.
    }
    // `storage` does not fire in the tab that made the change, so notify this
    // tab's analytics loaders — and this component — directly.
    window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: choice }));
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


