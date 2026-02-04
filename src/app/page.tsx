'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Instagram, Phone, Mail, CheckCircle2, Star, ArrowRight, Camera, Film, Heart, Award, Zap, Sparkles, PlayCircle, Moon, Sun } from 'lucide-react';

export default function LandingPage() {
  const [isDark, setIsDark] = useState(false);
  const [isVisible, setIsVisible] = useState({
    hero: false,
    packages: false,
    otherServices: false,
    about: false,
    footer: false,
  });
  const { toast } = useToast();

  const sectionRefs = {
    hero: useRef<HTMLElement>(null),
    packages: useRef<HTMLElement>(null),
    otherServices: useRef<HTMLElement>(null),
    about: useRef<HTMLElement>(null),
    footer: useRef<HTMLElement>(null),
  };

  // Load theme preference
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
    toast({
      title: newTheme ? 'Dark mode enabled' : 'Light mode enabled',
      description: `Theme changed to ${newTheme ? 'dark' : 'light'} mode`,
      duration: 2000,
    });
  };

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id;
            setIsVisible((prev) => ({ ...prev, [sectionId]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    Object.values(sectionRefs).forEach((ref) => {
      if (ref.current) {
        observer.observe(ref.current);
      }
    });

    return () => {
      Object.values(sectionRefs).forEach((ref) => {
        if (ref.current) {
          observer.unobserve(ref.current);
        }
      });
    };
  }, []);

  // Smooth scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = sectionRefs[sectionId as keyof typeof sectionRefs].current;
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // WhatsApp booking function
  const bookPackage = (packageName: string) => {
    const message = `Hey, I want to book ${packageName} package.`;
    const whatsappUrl = `https://wa.me/918269931154?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({
      title: 'Opening WhatsApp',
      description: `Redirecting to book ${packageName}`,
    });
  };

  // Package data
  const packages = [
    {
      name: 'NORMAL',
      price: '₹12,000',
      advance: '₹6,000 (50%)',
      features: ['7 Reels', 'Same day edit', 'Reel Ideas', 'Including travel expense'],
      popular: false,
      color: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    },
    {
      name: 'STANDARD',
      price: '₹17,000',
      advance: '₹3,400 (20%)',
      features: ['14 Reels', 'Same day edit', 'Reel Ideas', 'Real-time stories on Instagram', 'Real-time live on Instagram'],
      popular: false,
      color: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    },
    {
      name: 'PREMIUM',
      price: '₹25,000',
      advance: '₹5,000 (20%)',
      features: ['20 Reels', 'Same day edit', 'Reel Ideas', 'Real-time stories on Instagram', 'Real-time live on Instagram'],
      popular: false,
      color: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    },
    {
      name: 'PRO PACKAGE',
      price: '₹30,000',
      advance: '₹6,000 (20%)',
      features: [
        '30 Reels',
        'Full wedding coverage (all functions)',
        'Same day + next day edits',
        'Trending cinematic transitions',
        'Real-time stories + highlights',
      ],
      popular: true,
      color: 'from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20',
    },
    {
      name: 'VIP PACKAGE',
      price: '₹50,000+',
      advance: '₹10,000+ (20%)',
      features: [
        '40+ Reels',
        'Dedicated reel creator',
        'Ultra-cinematic editing',
        'Drone shots (if allowed)',
        'Couple cinematic intro reel',
        'All events covered (pre-wedding to vidai)',
      ],
      popular: false,
      color: 'from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900',
    },
  ];

  const monthlyPackages = [
    { reels: '15 Reels', price: '₹20,000', management: false },
    { reels: '18 Reels', price: '₹20,000', management: true },
    { reels: '20 Reels', price: '₹25,000', management: true },
  ];

  const otherServices = [
    {
      name: 'Baby Shower Reel',
      price: '₹2,000',
      icon: <Heart className="w-8 h-8" />,
      description: 'Capture beautiful moments of your baby shower',
    },
    {
      name: 'Car Delivery Reel',
      price: '₹2,500',
      icon: <CarIcon />,
      description: 'Make your new car delivery memorable',
    },
    {
      name: 'Political Reel',
      price: '₹2,500',
      icon: <Award />,
      description: 'Professional political campaign reels',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background text-foreground overflow-x-hidden">
      {/* Floating Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="fixed top-4 sm:top-6 right-4 sm:right-6 z-50 p-2.5 sm:p-3 rounded-full glass card-lift transition-all duration-300 hover:scale-110"
        aria-label="Toggle theme"
      >
        {isDark ? <Sun className="w-5 h-5 sm:w-6 sm:h-6 text-gold" /> : <Moon className="w-5 h-5 sm:w-6 sm:h-6 text-foreground" />}
      </button>

      {/* HERO SECTION */}
      <section
        id="hero"
        ref={sectionRefs.hero}
        className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24"
      >
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-muted/30 gradient-animated" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(212,175,55,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,rgba(212,175,55,0.05),transparent_50%)]" />

        {/* Floating decorative elements - responsive positioning */}
        <div className="absolute top-[10%] left-[5%] w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 rounded-full bg-primary/10 float-animation blur-xl" />
        <div className="absolute bottom-[10%] right-[5%] w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-full bg-accent/10 float-animation blur-xl" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-[15%] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 lg:w-24 lg:h-24 rounded-full bg-gold/10 float-animation blur-xl" style={{ animationDelay: '4s' }} />

        <div className="relative z-10 w-full max-w-7xl mx-auto text-center">
          {/* Main headline - fully responsive */}
          <h1
            className={`font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 leading-tight lg:leading-[1.1] xl:leading-[1.05] ${
              isVisible.hero ? 'animate-fade-in-up' : 'opacity-0'
            }`}
          >
            <span className="text-gold">Cinematic</span>{' '}
            <span className="text-foreground">Reels</span>
            <br className="hidden sm:hidden md:block" />
            <span className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-normal mt-2 sm:mt-3 md:mt-4 block text-muted-foreground">
              That Tell Your Story
            </span>
          </h1>

          {/* Subheadline */}
          <p
            className={`text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 lg:mb-12 max-w-3xl mx-auto leading-relaxed px-4 ${
              isVisible.hero ? 'animate-fade-in-up stagger-2' : 'opacity-0'
            }`}
          >
            Professional reel creation and editing services for weddings, events, and special occasions.
            <br className="hidden sm:block" />
            Transform your precious moments into stunning, share-worthy memories.
          </p>

          {/* CTA Buttons - responsive sizing and stacking */}
          <div
            className={`flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6 justify-center items-center w-full max-w-4xl mx-auto px-4 ${
              isVisible.hero ? 'animate-fade-in-up stagger-3' : 'opacity-0'
            }`}
          >
            <Button
              onClick={() => scrollToSection('packages')}
              size="lg"
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 button-press glow-hover min-h-[48px]"
            >
              <Camera className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              View Packages
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" />
            </Button>

            <Button
              onClick={() => window.open('https://instagram.com/_manishh.creation', '_blank')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg border-2 border-primary/30 hover:bg-primary/10 button-press min-h-[48px]"
            >
              <PlayCircle className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Portfolio
            </Button>

            <Button
              onClick={() => window.open('tel:8269931154')}
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg border-2 border-primary/30 hover:bg-primary/10 button-press min-h-[48px]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Contact
            </Button>
          </div>

          {/* Trust indicators - responsive spacing */}
          <div
            className={`mt-10 sm:mt-12 md:mt-16 lg:mt-20 flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 ${
              isVisible.hero ? 'animate-fade-in stagger-4' : 'opacity-0'
            }`}
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">Same Day Delivery</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Star className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">100+ Happy Clients</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
              <span className="text-xs sm:text-sm md:text-base lg:text-lg">Trending Style</span>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-6 sm:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce ${isVisible.hero ? 'animate-fade-in stagger-5' : 'opacity-0'}`}>
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gold rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      {/* PACKAGES SECTION */}
      <section
        id="packages"
        ref={sectionRefs.packages}
        className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-gradient-to-b from-background via-muted/20 to-background"
      >
        <div className="w-full max-w-7xl mx-auto">
          {/* Section Header */}
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Badge className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary border-primary/30">
              <Film className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Our Packages
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
              Choose Your <span className="text-gold">Perfect Package</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              From intimate ceremonies to grand celebrations, we have the perfect package for every occasion
            </p>
          </div>

          {/* Main Packages Grid - responsive with ultra-wide support */}
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-4 sm:gap-6 md:gap-8 lg:gap-10 mb-12 sm:mb-16 md:mb-20">
            {packages.map((pkg, index) => (
              <Card
                key={pkg.name}
                className={`relative overflow-hidden card-lift bg-gradient-to-br ${pkg.color} ${
                  isVisible.packages ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0 z-10">
                    <Badge className="m-3 sm:m-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-gradient-to-r from-gold to-gold-hover text-background font-bold rounded-full">
                      <Star className="w-3 h-3 sm:w-4 sm:h-4 mr-1 fill-background" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
                    {pkg.name}
                  </CardTitle>
                  <CardDescription className="text-sm sm:text-base">Professional reel editing</CardDescription>
                </CardHeader>

                <CardContent className="space-y-3 sm:space-y-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gold">{pkg.price}</span>
                  </div>

                  <div className="space-y-2 sm:space-y-3">
                    {pkg.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 sm:gap-3">
                        <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-gold mt-0.5 flex-shrink-0" />
                        <span className="text-xs sm:text-sm md:text-base text-foreground/80 leading-relaxed">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-3 sm:my-4" />

                  <div className="bg-background/50 rounded-lg p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">Advance:</span> {pkg.advance}
                    </p>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    onClick={() => bookPackage(pkg.name)}
                    className="w-full py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 button-press min-h-[52px]"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Book Now
                    <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-1.5 sm:ml-2" />
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Monthly Packages */}
          <div className={`mt-16 sm:mt-20 md:mt-24 ${isVisible.packages ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="text-center mb-8 sm:mb-10 md:mb-12">
              <Badge className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-accent/10 text-accent border-accent/30">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                Monthly Subscription
              </Badge>
              <h3 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
                Monthly <span className="text-gold">Packages</span>
              </h3>
              <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-4">Perfect for consistent social media presence</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
              {monthlyPackages.map((pkg, index) => (
                <Card
                  key={pkg.reels}
                  className="card-lift bg-gradient-to-br from-muted/30 to-background/50 border-2 border-primary/20 hover:border-primary/40"
                >
                  <CardHeader>
                    <CardTitle className="font-display text-lg sm:text-xl md:text-2xl font-bold">
                      {pkg.reels}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mb-3 sm:mb-4">{pkg.price}</div>
                    {pkg.management && (
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        Includes Account Management
                      </Badge>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button
                      onClick={() => bookPackage(`Monthly ${pkg.reels}`)}
                      className="w-full py-4 sm:py-5 text-sm sm:text-base bg-primary hover:bg-primary/90 button-press min-h-[48px]"
                      variant={pkg.management ? 'default' : 'outline'}
                    >
                      <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                      Book Now
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* OTHER SERVICES SECTION */}
      <section
        id="otherServices"
        ref={sectionRefs.otherServices}
        className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-background"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className={`text-center mb-10 sm:mb-12 md:mb-16 lg:mb-20 ${isVisible.otherServices ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <Badge className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary border-primary/30">
              <Camera className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Special Services
            </Badge>
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4">
              More <span className="text-gold">Services</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
              Beyond weddings, we capture all your special moments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {otherServices.map((service, index) => (
              <Card
                key={service.name}
                className={`card-lift glass border-primary/10 hover:border-primary/30 ${
                  isVisible.otherServices ? 'animate-fade-in-up' : 'opacity-0'
                }`}
                style={{ animationDelay: `${0.1 * (index + 1)}s` }}
              >
                <CardHeader>
                  <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mb-3 sm:mb-4 text-background">
                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8">
                      {service.icon}
                    </div>
                  </div>
                  <CardTitle className="font-display text-lg sm:text-xl md:text-2xl font-bold">
                    {service.name}
                  </CardTitle>
                  <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gold mt-1 sm:mt-2">{service.price}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed">{service.description}</p>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={() => bookPackage(service.name)}
                    className="w-full py-4 sm:py-5 text-sm sm:text-base md:text-lg bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 button-press min-h-[52px]"
                  >
                    <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                    Book Now
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section
        id="about"
        ref={sectionRefs.about}
        className="py-16 sm:py-20 md:py-24 lg:py-32 xl:py-40 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-gradient-to-b from-background via-muted/20 to-background"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 md:gap-16 lg:gap-20 xl:gap-24 items-center">
            <div className={`${isVisible.about ? 'animate-slide-in-left' : 'opacity-0'}`}>
              <Badge className="mb-3 sm:mb-4 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm bg-primary/10 text-primary border-primary/30">
                <Award className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                About Me
              </Badge>
              <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-4 sm:mb-6 md:mb-8">
                Meet <span className="text-gold">Manish Parmar</span>
              </h2>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-4 sm:mb-6 md:mb-8 leading-relaxed">
                I'm a passionate reel creator and professional videographer dedicated to transforming your precious moments into cinematic masterpieces. With years of experience in wedding and event cinematography, I bring creativity, technical expertise, and a keen eye for detail to every project.
              </p>
              <p className="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground mb-6 sm:mb-8 md:mb-10 leading-relaxed">
                From intimate ceremonies to grand celebrations, I specialize in creating stunning reels that capture the emotion, beauty, and magic of your special day. My editing style combines trending techniques with timeless storytelling, ensuring your memories look absolutely stunning on Instagram and beyond.
              </p>

              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background">
                    <Heart className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold">Passion for Creativity</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Every reel tells a unique story</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background">
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold">Trending Styles</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Always updated with latest techniques</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-background">
                    <Film className="w-5 h-5 sm:w-6 sm:h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm sm:text-base md:text-lg font-semibold">Professional Quality</h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">Cinematic transitions and seamless edits</p>
                  </div>
                </div>
              </div>
            </div>

            <div className={`${isVisible.about ? 'animate-slide-in-right' : 'opacity-0'}`}>
              <div className="relative">
                {/* Decorative background */}
                <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl sm:rounded-3xl blur-2xl" />
                <Card className="relative glass card-lift">
                  <CardContent className="p-6 sm:p-8 md:p-10">
                    <div className="grid grid-cols-2 gap-4 sm:gap-6 md:gap-8">
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-1 sm:mb-2">100+</div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Happy Clients</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-1 sm:mb-2">1000+</div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Reels Created</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-1 sm:mb-2">5+</div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Years Experience</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gold mb-1 sm:mb-2">24hr</div>
                        <div className="text-xs sm:text-sm md:text-base text-muted-foreground">Fast Delivery</div>
                      </div>
                    </div>

                    <Separator className="my-4 sm:my-6 md:my-8" />

                    <div className="space-y-3 sm:space-y-4">
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-xs sm:text-sm md:text-base">Same day edit available</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-xs sm:text-sm md:text-base">Real-time Instagram stories</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-xs sm:text-sm md:text-base">Professional equipment</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold" />
                        <span className="text-xs sm:text-sm md:text-base">Dedicated support</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER SECTION */}
      <footer
        id="footer"
        ref={sectionRefs.footer}
        className="py-12 sm:py-16 md:py-20 lg:py-24 xl:py-32 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24 bg-gradient-to-br from-foreground to-background border-t border-border/50"
      >
        <div className="w-full max-w-7xl mx-auto">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="font-display text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-3 sm:mb-4 md:mb-6 text-background">
              Ready to Create <span className="text-gold">Magic</span> Together?
            </h2>
            <p className="text-sm sm:text-base md:text-lg lg:text-xl text-background/80 max-w-2xl mx-auto px-4">
              Let's transform your precious moments into cinematic masterpieces
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 mb-10 sm:mb-12 md:mb-16">
            <Button
              onClick={() => window.open('https://instagram.com/_manishh.creation', '_blank')}
              size="lg"
              className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 button-press min-h-[48px]"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
              @_manishh.creation
            </Button>

            <Button
              onClick={() => window.open('https://wa.me/918269931154', '_blank')}
              size="lg"
              className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 button-press min-h-[48px]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
              WhatsApp
            </Button>

            <Button
              onClick={() => window.open('tel:8269931154')}
              size="lg"
              className="px-4 sm:px-6 md:px-8 py-3 sm:py-4 md:py-5 lg:py-6 text-sm sm:text-base md:text-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 button-press min-h-[48px]"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 mr-2" />
              8269931154
            </Button>
          </div>

          <Separator className="mb-6 sm:mb-8 md:mb-10 bg-background/20" />

          <div className="flex flex-col md:flex-row justify-between items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-gradient-to-br from-gold to-gold-hover flex items-center justify-center">
                <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-background" />
              </div>
              <div>
                <div className="font-display text-sm sm:text-base md:text-lg font-bold text-background">Manish Parmar</div>
                <div className="text-xs sm:text-sm md:text-base text-background/60">Professional Reel Editor & Videographer</div>
              </div>
            </div>

            <div className="text-xs sm:text-sm md:text-base text-background/60">
              © {new Date().getFullYear()} Manish Parmar Creations. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

// Custom car icon component
function CarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  );
}
