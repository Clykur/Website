import { CONTACT_EMAIL, CONTACT_PHONE_WHATSAPP } from "@/lib/site-config";

/** Official enterprise registration (MSME Udyam). GSTIN to be added when assigned. */
export const LEGAL_ENTITY = {
  legalName: "CLYKUR",
  tradeName: "Clykur",
  registeredAddressLines: [
    "G2, 1st Floor, SV Enclave",
    "Benniganahalli, 2nd Main, Pai Layout",
    "Pai Layout, Bengaluru (Urban)",
    "Karnataka 560016, India",
  ],
  registeredAddressSingleLine:
    "G2, 1st Floor, SV Enclave, Benniganahalli, 2nd Main, Pai Layout, Bengaluru (Urban), Karnataka 560016, India",
  gstin: null as string | null,
  udyamRegistrationNumber: "UDYAM-KR-03-0640844",
  enterpriseType: "Micro",
  majorActivity: "Services",
  jurisdiction: "Bengaluru, Karnataka, India",
  governingLawCountry: "India",
  email: CONTACT_EMAIL,
  phoneDisplay: CONTACT_PHONE_WHATSAPP,
  phoneTel: `+91${CONTACT_PHONE_WHATSAPP}`,
} as const;

export const LEGAL_MAILTO = {
  general: `mailto:${CONTACT_EMAIL}`,
  dpa: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("DPA request")}`,
  compliance: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Compliance inquiry")}`,
  security: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Security inquiry")}`,
  vendor: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Vendor onboarding documents")}`,
  nda: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("NDA request")}`,
  msa: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Service agreement / MSA")}`,
  gstInfo: `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("GST information request")}`,
} as const;
