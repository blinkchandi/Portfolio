export interface NavItem {
  readonly name: string;
  readonly href: string;
}

export const SITE_CONFIG = {
  brand: "blinkchandi",
  ownerName: "Brown-Lee Andriamihamina",
  ownerShortName: "Brown-Lee",
  roleLabel: "Full-Stack",
  email: "brownmihamina@gmail.com",
  phoneDisplay: "+33 6 17 20 50 30",
  phoneHref: "tel:+33617205030",
  locationShort: "Alfortville (Paris) · Remote",
  locationFull: "Alfortville (Île-de-France) · Sur site & à distance",
  cvPath: "/cv-brown-lee.pdf",
  cvDownloadName: "CV_Brown-Lee.pdf",
} as const;

export const PRIMARY_NAV_LINKS: readonly NavItem[] = [
  { name: "Accueil", href: "/" },
  { name: "Projets", href: "/projets" },
  { name: "Services", href: "/services" },
  { name: "À propos", href: "/a-propos" },
  { name: "Contact", href: "/contact" },
];
