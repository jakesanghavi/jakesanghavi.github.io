import { site } from '../content';

export function openGmail(subject = "Let's connect") {
  const decoded = atob(site.emailEncoded);
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(decoded)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent('Hi Jake,')}`;
  window.open(gmailUrl, '_blank', 'noopener,noreferrer');
}
