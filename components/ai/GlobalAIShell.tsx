'use client';

/**
 * GlobalAIShell
 *
 * A thin client-side wrapper that bridges the AIProvider context with the
 * two fixed-position AI elements (floating button + chat panel).
 *
 * By living at the root locale layout level, this component:
 *   - Is rendered once for the entire app
 *   - Preserves chat state (messages, conversationId) across page navigations
 *   - Never fights with any page-level stacking context
 *
 * It owns the single `open` state toggle that both AIMainButton and AIWindow
 * respond to, delegating the actual state to AIProvider.
 */

import { useAIContext } from "@/components/providers/AIProvider";
import AIMainButton from "@/components/ai/MainButton";
import AIWindow from "@/components/ai/window/window";

export default function GlobalAIShell() {
    const ai = useAIContext();

    return (
        <>
            <AIMainButton
                opened={ai.open}
                setOpen={() => ai.toggleAI()}
            />
            <AIWindow
                aiPurpose={ai.purpose}
                open={ai.open}
                closeWindow={() => {
                    // Close and clear the purpose so re-opening starts fresh
                    ai.setPurpose?.('');
                    if (ai.open) ai.toggleAI();
                }}
            />
        </>
    );
}
