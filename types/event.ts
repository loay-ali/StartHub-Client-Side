export interface EcosystemEvent {
  id: string;
  organizerName: string;
  organizerLogoText: string;
  organizerLogoColor: string;
  eventName: string;
  eventBannerLabel: string;
  eventBannerTone: string;
  category?: string;
  location: string;
  startsAt: string;
  endsAt?: string;
  description: string;
  awards?: string[];
  registerUrl: string;
  contactEmail: string;
  contactPhone?: string;
  contactPerson?: string;
}