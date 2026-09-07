import { site } from '../content';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer__inner">
        <span>{site.name}</span>
        <span>{site.location}</span>
      </div>
    </footer>
  );
}
