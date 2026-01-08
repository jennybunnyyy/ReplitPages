import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, MapPin, Clock, Flame, Apple, Scale, ChevronRight, Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/fit_woman_body_portrait.png";
import logoImage from "@assets/Copy_of_TBA_LOGO_UPDATE_GOOGLE_(Facebook_Cover)_(1)_1767900892576.png";

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
  "Elle", "Forbes", "Glamour", "Shape", "NY Times", "Vogue", "Women's Health", "Cosmo"
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
    icon: Flame,
    title: "Burn Body Fat",
    description: "Increases the body's ability to burn fat efficiently"
  },
  {
    icon: Apple,
    title: "Curb Appetite",
    description: "Suppresses appetite so you don't get hunger pangs"
  },
  {
    icon: Scale,
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
                  (310) 510-6649
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
                
                {/* Floating Badge */}
                <motion.div 
                  className="absolute -bottom-4 -left-4 lg:bottom-8 lg:-left-8 bg-white rounded-2xl shadow-xl p-4 border border-border/50"
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Star className="w-6 h-6 text-primary fill-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">Top Rated</p>
                      <p className="text-xs text-muted-foreground">Med Spa 2024</p>
                    </div>
                  </div>
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
          <div className="flex animate-marquee">
            {[...featuredLogos, ...featuredLogos, ...featuredLogos].map((logo, index) => (
              <div 
                key={index} 
                className="flex-shrink-0 px-12 text-2xl font-display text-muted-foreground/40 font-semibold"
                data-testid={`logo-featured-${index}`}
              >
                {logo}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Lasting Weight Loss Results from the{" "}
              <span className="text-gradient">#1 Clinic</span> in California
            </h2>
            <p className="text-lg text-muted-foreground">
              Kickstart your weight loss journey and conquer stubborn, exercise and diet-resistant fat. 
              Combining a nutritious diet with weight loss injections is an effective way to achieve your goals.
            </p>
          </motion.div>

          {/* Benefit Icons */}
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {treatmentBenefits.map((benefit, index) => (
              <motion.div
                key={index}
                className="text-center p-8 rounded-3xl bg-white shadow-lg border border-border/50 hover:shadow-xl transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-benefit-${index}`}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl flex items-center justify-center">
                  <benefit.icon className="w-8 h-8 text-primary" />
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Form Section */}
      <section id="book" className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-block px-4 py-2 bg-primary text-white rounded-full text-sm font-semibold mb-6">
                NEW CLIENT SPECIAL
              </div>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold mb-6">
                Get <span className="text-gradient">$50 Off</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Schedule your consultation today and take the first step toward your weight loss goals. 
                Our expert team is ready to create a personalized treatment plan just for you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Phone className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Call Us</p>
                    <p className="font-semibold text-foreground">(310) 510-6649</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <MapPin className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Location</p>
                    <p className="font-semibold text-foreground">Westchester, Los Angeles, CA</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Hours</p>
                    <p className="font-semibold text-foreground">Mon-Sat: 9AM - 6PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

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
                <h3 className="font-display text-2xl font-semibold mb-6 text-center">Book Your Consultation</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
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
                      placeholder="Enter your phone"
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
                  
                  <p className="text-xs text-muted-foreground text-center mt-4">
                    By submitting this form, I consent to be contacted by Total Body Aesthetics. 
                    Message and data rates may apply.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              How It <span className="text-gradient">Works</span>
            </h2>
            <p className="text-lg text-muted-foreground">
              Your journey to lasting weight loss is just three simple steps away
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {howItWorks.map((step, index) => (
              <motion.div
                key={index}
                className="relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
                data-testid={`card-step-${index}`}
              >
                <div className="text-center p-8">
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-primary to-accent rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-2xl font-bold text-white">{step.step}</span>
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
                
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/20 to-accent/20" />
                )}
              </motion.div>
            ))}
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
                <p>(310) 510-6649</p>
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
