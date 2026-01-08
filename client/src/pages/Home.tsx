import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, MapPin, Clock, Flame, Apple, Scale, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/fit_woman_body_portrait.png";
import logoImage from "@assets/Copy_of_TBA_LOGO_UPDATE_GOOGLE_(Facebook_Cover)_(1)_1767900892576.png";
import badgeImage from "@assets/top-rated-med-spa-badge_1767906092825.webp";
import elleLogoImage from "@assets/elle-logo-1_1767906834373.webp";
import forbesLogoImage from "@assets/Forbes-logo-1_1767906834372.webp";
import glamourLogoImage from "@assets/glamour-logo-1_1767906834375.webp";
import shapeLogoImage from "@assets/shape-logo-1_1767906834374.webp";
import nytLogoImage from "@assets/the-new-yorks-1_1767906834370.webp";
import vogueLogoImage from "@assets/vogue-logo-1_1767906834374.webp";
import womansHealthLogoImage from "@assets/womans-health-1_1767906834374.webp";
import cosmoLogoImage from "@assets/Cosmopolitan-Logo_1767906834373.webp";
import burnFatIcon from "@assets/total-body-aesthetics-los-angeles-ca-icon-burn-fat_1767907312171.webp";
import curbAppetiteIcon from "@assets/total-body-aesthetics-los-angeles-ca-icon-curb-appetite_1767907312172.webp";
import shedPoundsIcon from "@assets/total-body-aesthetics-los-angeles-ca-icon-shed-pounds_1767907312173.webp";
import howItWorksImage from "@assets/generated_images/elegant_woman_black_outfit.png";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

const featuredLogos = [
  { name: "Elle", image: elleLogoImage },
  { name: "Forbes", image: forbesLogoImage },
  { name: "Glamour", image: glamourLogoImage },
  { name: "Shape", image: shapeLogoImage },
  { name: "NY Times", image: nytLogoImage },
  { name: "Vogue", image: vogueLogoImage },
  { name: "Women's Health", image: womansHealthLogoImage },
  { name: "Cosmopolitan", image: cosmoLogoImage },
];

const benefits = [
  "Once-weekly weight loss injections available.",
  "Meet with the doctor and get medication same day.",
  "Suppress appetite and reduce cravings.",
  "Boost metabolism and energy levels.",
  "Target stubborn, exercise-resistant fat."
];

const howItWorks = [
  {
    step: "01",
    title: "Schedule Consultation",
    description: "Schedule a medical consultation with our doctor to determine if you are a candidate. We offer both in-person and virtual telehealth consultations."
  },
  {
    step: "02",
    title: "Get Your Medication",
    description: "Get medication with amino acids like L-carnitine that helps burn more fat. Receive a personalized plan with shipping options available."
  },
  {
    step: "03",
    title: "Lose Weight",
    description: "Continue to meet with our medical providers to monitor progress and dosages. Take-home options and telehealth are available."
  }
];

const treatmentBenefits = [
  {
    image: burnFatIcon,
    title: "Burn Body Fat",
    description: "Increases the body's ability to burn fat efficiently"
  },
  {
    image: curbAppetiteIcon,
    title: "Curb Appetite",
    description: "Suppresses appetite so you don't get hunger pangs"
  },
  {
    image: shedPoundsIcon,
    title: "Shed Pounds",
    description: "Decreases food intake and reduces body fat mass"
  }
];

const testimonials = [
  {
    name: "Sarah M.",
    location: "Los Angeles, CA",
    quote: "I lost 35 pounds in 3 months! The weekly injections were so easy, and I never felt hungry.",
    rating: 5
  },
  {
    name: "Jennifer K.",
    location: "Beverly Hills, CA",
    quote: "Finally found something that works. The team at Total Body Aesthetics is amazing!",
    rating: 5
  },
  {
    name: "Michelle T.",
    location: "Santa Monica, CA",
    quote: "Best decision I ever made. Down 2 dress sizes and feeling incredible.",
    rating: 5
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <header className="absolute top-0 left-0 right-0 z-50 py-4">
        <div className="container mx-auto px-4">
          <img 
            src={logoImage} 
            alt="Total Body Aesthetics" 
            className="h-16 md:h-20 w-auto"
            data-testid="img-logo-header"
          />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 py-8 lg:py-0">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center min-h-screen">
            {/* Left Content */}
            <motion.div 
              className="order-2 lg:order-1 z-10 py-12 lg:py-0"
              initial="initial"
              animate="animate"
              variants={stagger}
            >
              <motion.div variants={fadeInUp} className="mb-4">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                  <Star className="w-4 h-4 fill-primary" />
                  #1 Weight Loss Clinic in California
                </span>
              </motion.div>
              
              <motion.h1 
                variants={fadeInUp}
                className="font-display text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6 text-foreground"
              >
                Unlock the Secret to{" "}
                <span className="text-gradient">Weight Loss</span>{" "}
                with GLP-1 Medications
              </motion.h1>
              
              <motion.ul variants={fadeInUp} className="space-y-3 mb-8">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-primary" />
                    </span>
                    <span className="text-foreground/80">{benefit}</span>
                  </li>
                ))}
              </motion.ul>
              
              <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
                <Button 
                  size="lg" 
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all"
                  data-testid="button-cta-hero"
                >
                  Get $50 Off
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full border-2"
                  data-testid="button-call"
                >
                  <Phone className="w-5 h-5 mr-2" />
                  (310) 670-1920
                </Button>
              </motion.div>
            </motion.div>
            
            {/* Right Image */}
            <motion.div 
              className="order-1 lg:order-2 relative z-10"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
            >
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-accent/20 rounded-3xl blur-2xl" />
                <img 
                  src={heroImage} 
                  alt="Beautiful woman with glowing skin" 
                  className="relative w-full max-w-md mx-auto lg:max-w-full rounded-3xl shadow-2xl"
                  data-testid="img-hero"
                />
                
                {/* Gold Emblem Badge */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <img 
                    src={badgeImage} 
                    alt="Top Rated Medical Spa" 
                    className="w-28 h-28 lg:w-32 lg:h-32 drop-shadow-xl"
                    data-testid="img-badge"
                  />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured In Marquee */}
      <section className="py-8 bg-white border-y border-border/50 overflow-hidden">
        <div className="mb-4 text-center">
          <p className="text-sm font-medium text-muted-foreground uppercase tracking-widest">Treatment Featured In</p>
        </div>
        <div className="relative">
          <div className="flex animate-marquee items-center">
            {[...featuredLogos, ...featuredLogos, ...featuredLogos].map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-8 md:px-12"
                data-testid={`logo-featured-${index}`}
              >
                <img 
                  src={logo.image} 
                  alt={logo.name} 
                  className="h-10 md:h-12 w-auto opacity-70 hover:opacity-100 transition-opacity"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section with Lead Form */}
      <section id="book" className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Lasting Weight Loss Results from the{" "}
              <span className="text-gradient">#1 Clinic</span> in California
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h3 className="font-display text-2xl font-semibold mb-6">
                Kickstart your weight loss journey and conquer stubborn, exercise and diet-resistant fat.
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Combining a nutritious diet with weight loss injections is an effective way to achieve your weight loss goals. This medical treatment helps your body burn fat efficiently by curbing your appetite. It's an excellent option for men and women wanting to shed pounds without feeling hungry all the time.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                If you're thinking about using weight loss injections, Total Body Aesthetics is a leading provider of weight loss injections in Los Angeles, CA. Get in touch by calling <a href="tel:+13106701920" className="text-primary font-semibold hover:underline">(310) 670-1920</a> to book an online, telehealth or in-person consultation.
              </p>

              {/* Benefit Icons */}
              <div className="grid grid-cols-3 gap-4">
                {treatmentBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-white shadow-md border border-border/50"
                    data-testid={`card-benefit-${index}`}
                  >
                    <img 
                      src={benefit.image} 
                      alt={benefit.title} 
                      className="w-16 h-16 mx-auto mb-3"
                    />
                    <h4 className="font-display text-sm font-semibold">{benefit.title}</h4>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Right - Lead Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <form 
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl p-8 border border-border/50"
                data-testid="form-lead"
              >
                <div className="text-center mb-6">
                  <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold mb-3">
                    NEW CLIENT SPECIAL
                  </div>
                  <h3 className="font-display text-3xl font-semibold">Get $50 Off</h3>
                  <p className="text-primary font-semibold mt-2">(310) 670-1920</p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Name</label>
                    <Input 
                      type="text"
                      placeholder="Enter your name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-6 px-4 rounded-xl"
                      data-testid="input-name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input 
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full py-6 px-4 rounded-xl"
                      data-testid="input-email"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input 
                      type="tel"
                      placeholder="(999) 999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full py-6 px-4 rounded-xl"
                      data-testid="input-phone"
                    />
                  </div>
                  
                  <Button 
                    type="submit"
                    className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                    data-testid="button-submit"
                  >
                    Get $50 Off Now
                  </Button>
                  
                  <p className="text-xs text-muted-foreground text-center mt-4 leading-relaxed">
                    *By submitting this form, I consent to be contacted by Total Body Aesthetics via phone, text, email, or mail. Message and data rates may apply. Consent is not a condition of purchase. I agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge the <a href="#" className="underline">Privacy Policy</a>. Reply STOP to opt out.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-gradient-soft overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-start max-w-7xl mx-auto">
            {/* Left - Image */}
            <motion.div
              className="relative order-2 lg:order-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <img 
                src={howItWorksImage} 
                alt="Weight loss transformation" 
                className="relative w-full max-w-md mx-auto lg:max-w-full"
                data-testid="img-how-it-works"
              />
            </motion.div>

            {/* Right - Steps */}
            <div className="order-1 lg:order-2 flex flex-col">
              <motion.h2 
                className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-8 text-primary"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                How It Works
              </motion.h2>
              
              <div className="flex flex-col gap-7">
                {howItWorks.map((step, index) => (
                  <motion.div
                    key={index}
                    className="flex gap-7 items-start bg-white rounded-3xl p-8 shadow-md border border-secondary/50"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.15 }}
                    data-testid={`card-step-${index}`}
                  >
                    <div className="flex-shrink-0 w-24 h-24 bg-secondary rounded-full flex items-center justify-center">
                      <span className="text-5xl font-display font-semibold text-primary">{index + 1}</span>
                    </div>
                    <div className="pt-4">
                      <p className="text-xl text-foreground leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-32 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              What Our <span className="text-gradient">Patients</span> Say
            </h2>
            <p className="text-lg text-muted-foreground">
              Real results from real people who transformed their lives
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-testimonial-${index}`}
              >
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground mb-6 italic">"{testimonial.quote}"</p>
                <div>
                  <p className="font-semibold text-foreground">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Ready to Start Your Transformation?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of satisfied patients who have achieved their weight loss goals with Total Body Aesthetics.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg"
                className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
                data-testid="button-cta-bottom"
              >
                Get $50 Off Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                data-testid="button-call-bottom"
              >
                <Phone className="w-5 h-5 mr-2" />
                Call Now
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-foreground text-white/80">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <img 
                src={logoImage} 
                alt="Total Body Aesthetics" 
                className="h-14 w-auto mb-4 brightness-0 invert opacity-90"
                data-testid="img-logo-footer"
              />
              <p className="text-sm leading-relaxed">
                The #1 weight loss clinic in California, helping patients achieve lasting results with GLP-1 medications.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Contact</h4>
              <div className="space-y-2 text-sm">
                <p>(310) 670-1920</p>
                <p>Westchester, Los Angeles, CA</p>
                <p>Mon-Sat: 9AM - 6PM</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <div className="space-y-2 text-sm">
                <a href="#" className="block hover:text-white transition-colors" data-testid="link-privacy">Privacy Policy</a>
                <a href="#" className="block hover:text-white transition-colors" data-testid="link-terms">Terms of Service</a>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-sm">
            <p>&copy; {new Date().getFullYear()} Total Body Aesthetics. All rights reserved.</p>
            <p className="mt-2 text-xs text-white/50">*Results may vary. Individual results are not guaranteed.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
