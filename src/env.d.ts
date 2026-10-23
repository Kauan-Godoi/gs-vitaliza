// Funções globais criadas pela tag do Google (Analytics.astro); só existem quando há IDs em `tracking`.
interface Window {
  gsConsent?: (granted: boolean) => void;
  gsTrack?: (kind: 'whatsapp' | 'phone' | 'email' | 'form') => void;
}
