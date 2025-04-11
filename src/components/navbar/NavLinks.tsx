
import { useLanguage } from '@/contexts/LanguageContext';
import { translate } from '@/utils/translations';

interface NavLinksProps {
  setIsMenuOpen?: (isOpen: boolean) => void;
  isMobile?: boolean;
}

export const NavLinks = ({ 
  setIsMenuOpen, 
  isMobile = false 
}: NavLinksProps) => {
  const { language, isRTL } = useLanguage();

  const handleClick = () => {
    if (setIsMenuOpen) {
      setIsMenuOpen(false);
    }
  };

  const links = [
    { href: '#services', label: translate('navbar', 'services', language) },
    { href: '#how-it-works', label: translate('navbar', 'howItWorks', language) },
    { href: '#specialists', label: translate('navbar', 'specialists', language) },
    { href: '#plans', label: translate('navbar', 'plans', language) }
  ];

  if (isMobile) {
    return (
      <div className="flex flex-col space-y-4">
        {links.map((link) => (
          <a 
            key={link.href}
            href={link.href} 
            className="text-foreground hover:text-primary transition-colors py-2 px-4 rounded-md hover:bg-muted"
            onClick={handleClick}
          >
            {link.label}
          </a>
        ))}
      </div>
    );
  }

  return (
    <div className={`hidden md:flex items-center ${isRTL ? 'space-x-reverse' : ''} space-x-8`}>
      {links.map((link) => (
        <a 
          key={link.href}
          href={link.href} 
          className="text-foreground hover:text-primary transition-colors"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
};
