"use client";

import React, { createContext, useCallback, useContext, useState } from "react";
import { ContactModal } from "./contact-modal";

export interface ContactModalPreset {
  subject?: string;
  source?: string;
}

interface ContactContextValue {
  isOpen: boolean;
  preset: ContactModalPreset;
  openContactModal: (preset?: ContactModalPreset) => void;
  closeContactModal: () => void;
}

const ContactContext = createContext<ContactContextValue | null>(null);

export function ContactProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [preset, setPreset] = useState<ContactModalPreset>({});

  const openContactModal = useCallback((nextPreset?: ContactModalPreset) => {
    setPreset(nextPreset ?? {});
    setIsOpen(true);
  }, []);

  const closeContactModal = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <ContactContext.Provider value={{ isOpen, preset, openContactModal, closeContactModal }}>
      {children}
      <ContactModal isOpen={isOpen} preset={preset} onClose={closeContactModal} />
    </ContactContext.Provider>
  );
}

/**
 * Returns the Contact modal context, or null when mounted outside ContactProvider
 * so standalone UI unit tests remain isolated and resilient.
 */
export function useContactModal(): ContactContextValue | null {
  return useContext(ContactContext);
}
