/* eslint-disable @typescript-eslint/no-unsafe-function-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import React, { createContext, ReactNode, useContext, useState } from 'react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface AIContextValue {
  /** Whether the chat panel is visible */
  open: boolean;
  /** Current AI purpose slug (e.g. "recruitment-jobs") */
  purpose: string;
  /** Toggle the chat panel open/closed */
  toggleAI: Function;
  /** Set the purpose slug; pass '' to clear */
  setPurpose: Function | null;
  /** (legacy) add an initial message programmatically */
  addMessage?: (msg: string) => any;

  suggestions: string[]
}

// ── Context ───────────────────────────────────────────────────────────────────

export const AIContext = createContext<AIContextValue>({
  open: false,
  purpose: '',
  toggleAI: () => {},
  setPurpose: null,
  addMessage: undefined,
  suggestions: []
});

/**
 * Access the global AI assistant state from any component.
 * Previously this hook was exported from DashboardLayout — it is now
 * exported from here so non-dashboard pages can also consume it.
 */
export const useAIContext = () => useContext(AIContext);

// ── Provider ──────────────────────────────────────────────────────────────────

/**
 * Root-level AI provider.
 * Mount this once, at the top of the tree (locale layout), so the chat
 * panel persists its state (messages, conversationId) across page navigations.
 */
export function AIProvider({ children }: { children: ReactNode }) {
  const [isUsingAI, setIsUsingAI] = useState(false);
  const [aiPurpose, setAiPurpose] = useState('');
  const [addMessage] = useState<(msg: string) => any>(() => () => {});

  return (
    <AIContext.Provider
      value={{
        open: isUsingAI,
        purpose: aiPurpose,
        toggleAI: () => setIsUsingAI((s) => !s),
        setPurpose: (purpose: string) => setAiPurpose(purpose),
        addMessage,
        suggestions: []
      }}
    >
      {children}
    </AIContext.Provider>
  );
}
