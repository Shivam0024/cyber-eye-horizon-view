
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Shield, Bug, Network, MapPin, ChevronLeft, Home, Terminal, Activity, User, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const getAppBrand = (pathname: string) => {
  if (pathname === '/') return 'DecoyNet AI';
  if (pathname.startsWith('/dashboard') || pathname.startsWith('/attack-map') || pathname.startsWith('/malware-analysis') || pathname.startsWith('/ai-monitoring')) {
    return 'Dionaea AI';
  }
  if (pathname.includes('/cowrie')) {
    return 'Cowrie AI';
  }
  return 'DecoyNet AI';
};

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHomePage = location.pathname === '/';
  const isCowriePage = location.pathname.includes('/cowrie');

  const mainNavigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Shield },
    { name: 'Attack Map', href: '/attack-map', icon: MapPin },
    { name: 'Malware Analysis', href: '/malware-analysis', icon: Bug },
    { name: 'AI Monitoring', href: '/ai-monitoring', icon: Network },
  ];

  const cowrieNavigation = [
    { name: 'Cowrie Dashboard', href: '/cowrie-dashboard', icon: Terminal },
    { name: 'Attack Map', href: '/cowrie/attack-map', icon: MapPin },
    { name: 'Session Analysis', href: '/cowrie/session-analysis', icon: Activity },
    { name: 'Attacker Profile', href: '/cowrie/attacker-profile', icon: User },
    { name: 'Cowrie Logs', href: '/cowrie/logs', icon: FileText },
  ];

  const navigation = isCowriePage ? cowrieNavigation : mainNavigation;
  const appBrand = getAppBrand(location.pathname);

  return (
    <nav className="bg-cyber-muted border-b border-cyber-border">
      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {!isHomePage && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mr-2"
                  onClick={() => navigate('/')}
                >
                  <ChevronLeft className="h-4 w-4 mr-1" />
                  <Home className="h-4 w-4" />
                </Button>
              )}
              <Link to={isCowriePage ? "/cowrie-dashboard" : isHomePage ? "/" : "/dashboard"} className="flex items-center gap-1">
                <Shield className="h-8 w-8 text-cyber-accent mr-2" />
                <span className="font-bold text-xl bg-gradient-to-r from-white to-cyber-accent bg-clip-text text-transparent transition-all duration-300">
                  {appBrand}
                </span>
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-4">
              {navigation.map((item) => {
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={cn(
                      'inline-flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all duration-200',
                      isActive
                        ? 'text-cyber-accent border-b-2 border-cyber-accent'
                        : 'text-cyber-foreground hover:text-cyber-accent'
                    )}
                  >
                    <item.icon className="mr-2 h-5 w-5" />
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-cyber-foreground hover:text-cyber-accent focus:outline-none"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {isMobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'block pl-3 pr-4 py-2 border-l-4 text-base font-medium',
                    isActive
                      ? 'border-cyber-accent text-cyber-accent bg-cyber/20'
                      : 'border-transparent text-cyber-foreground hover:bg-cyber-muted hover:border-cyber-accent/50 hover:text-cyber-accent/90'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <div className="flex items-center">
                    <item.icon className="mr-3 h-5 w-5" />
                    {item.name}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
