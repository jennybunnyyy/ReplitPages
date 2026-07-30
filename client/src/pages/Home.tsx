import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Phone, MapPin, Clock, Flame, Apple, Scale, ChevronRight, Star, Quote, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@assets/generated_images/fit_woman_body_portrait.png";
import logoImage from "@assets/Copy_of_TBA_UPDATE_2026_1785450268357.png";
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
import benefitImage1 from "@assets/generated_images/athletic_woman_pink_background.png";
import benefitImage2 from "@assets/generated_images/athletic_couple_pink_background.png";
import benefitImage3 from "@assets/generated_images/athletic_man_pink_background.png";
import benefitImage4 from "@assets/generated_images/woman_victory_pose_pink.png";

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
  "Physician-supervised weight management program",
  "Medical consultation to review your health and eligibility",
  "Suppress appetite and reduce cravings.",
  "Boost metabolism and energy levels.",
  "Target stubborn, exercise-resistant fat."
];

const howItWorks = [
  {
    step: "01",
    title: "Schedule Consultation",
    description: "Schedule a medical consultation with our doctor to determine if you are a candidate. We offer both in-person consultations in our beautiful Westchester, Los Angeles office and virtual telehealth consultations for patients in the Los Angeles area."
  },
  {
    step: "02",
    title: "Get Your Medication",
    description: "Get medication with amino acids like L-carnitine that helps burn more fat. Receive a personalized plan. We offer some shipping plans – ask us for more info!"
  },
  {
    step: "03",
    title: "Lose Weight",
    description: "Lose Weight! Continue to meet with our medical providers to monitor progress and dosages. Take-home options and telehealth are available."
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
    name: "Sarah C.",
    location: "Los Angeles, CA",
    quote: "I've been working with Dr. T at Total Body Aesthetic for about 2 months now – leveraging their EmSculpt Neo system. I LOVE the results so far – already seeing a smaller waist and definition four sessions in. The staff is so friendly and the environment is relaxing and not stuffy like so many med spa environments. Can't wait to try their new Emface treatment next month! High recommend.",
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

const quizQuestions = [
  {
    question: "How much weight do you want to lose?",
    options: ["5-10 lbs", "11-25 lbs", "26-50 lbs", "51-75 lbs", "76+ lbs"]
  },
  {
    question: "Why do you feel like you struggle with losing weight?",
    options: ["Genetic factors", "Diet", "Inactive lifestyle", "All of the above"]
  },
  {
    question: "How many years have you struggled with your weight?",
    options: ["Just recently", "1-4 years", "5-9 years", "Ten plus years"]
  },
  {
    question: "Are you willing to invest monthly to lose weight and become healthier?",
    options: ["Yes", "No"]
  }
];

export default function Home() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: ""
  });

  const [quizStep, setQuizStep] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<string[]>([]);
  const [quizContactData, setQuizContactData] = useState({ name: "", phone: "", email: "" });
  const [quizCompleted, setQuizCompleted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const handleQuizAnswer = (answer: string) => {
    const newAnswers = [...quizAnswers];
    newAnswers[quizStep] = answer;
    setQuizAnswers(newAnswers);
    if (quizStep < quizQuestions.length) {
      setQuizStep(quizStep + 1);
    }
  };

  const handleQuizSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setQuizCompleted(true);
    console.log("Quiz submitted:", { answers: quizAnswers, contact: quizContactData });
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
                with Once Weekly Injections
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
                  onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get Coupon
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="px-8 py-6 text-lg rounded-full border-2"
                  data-testid="button-call"
                  asChild
                >
                  <a href="tel:+13105106649">
                    <Phone className="w-5 h-5 mr-2" />
                    (310) 510-6649
                  </a>
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

      {/* Medical Weight Management Section */}
      <section className="py-20 lg:py-32 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-start max-w-7xl mx-auto">
            {/* Left - Content */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
                Medical Weight Management in{" "}
                <span className="text-gradient">Los Angeles, CA</span>
              </h2>
              <h3 className="font-display text-xl font-medium text-muted-foreground mb-6">
                Physician-supervised care tailored to your health and your goals.
              </h3>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Weight loss injections are one tool a provider may use as part of a medical weight management plan that also includes nutrition and lifestyle guidance. Used under medical supervision, they may help support appetite management while your provider monitors your progress over time.
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                At Total Body Aesthetic in Los Angeles, CA, our team reviews your health history and goals during a consultation to discuss whether treatment may be appropriate for you. To learn more or schedule an appointment, call{" "}
                <a href="tel:+13105106649" className="text-primary font-semibold hover:underline">(310) 510-6649</a>{" "}
                for an in-person or telehealth consultation.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                You will need to make consistent visits as part of your treatment plan so your provider can monitor your progress. Treatment may be administered in-office, or your provider may discuss take-home options if you and your Total Body Aesthetic provider decide that is right for you.
              </p>

              {/* Benefit Icons */}
              <div className="grid grid-cols-3 gap-4">
                {treatmentBenefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="text-center p-4 rounded-2xl bg-white shadow-md border border-border/50"
                    data-testid={`card-benefit-icon-${index}`}
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
              id="book"
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
                  <p className="text-foreground/70 text-sm mt-1">Weight Loss</p>
                  <p className="text-primary font-semibold mt-2">
                    <a href="tel:+13105106649">(310) 510-6649</a>
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Full Name</label>
                    <Input 
                      type="text"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full py-6 px-4 rounded-xl"
                      data-testid="input-name"
                      required
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
                      required
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
                      required
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
                    *By submitting this form, I consent to be contacted by Total Body Aesthetic via phone, text, email, or mail. Message and data rates may apply. Consent is not a condition of purchase. I agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge the <a href="#" className="underline">Privacy Policy</a>. Reply STOP to opt out.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white to-[#F5F0E8] overflow-hidden">
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

      {/* Weight Loss Injection Benefits */}
      <section className="py-20 lg:py-28 bg-[#F5F0E8]">
        <div className="container mx-auto px-4">
          <motion.h2 
            className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6 text-center text-foreground tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            WEIGHT LOSS INJECTION BENEFITS
          </motion.h2>
          
          <motion.div 
            className="max-w-5xl mx-auto mb-12 space-y-6 text-foreground"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <p className="text-base lg:text-lg leading-relaxed">
              Weight loss injections work with your body's natural appetite signals. In a medically supervised program, they may be used to support appetite management as part of a broader plan. Individual responses vary, and a provider will discuss potential benefits, risks, and side effects with you during your consultation. Any treatment decision should be made with a qualified healthcare provider based on your individual health.
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              When considering a weight loss plan, people want to know the benefits and drawbacks of phentermine vs. GLP-1 weight loss injections. Phentermine is a widely-used diet pill and appetite suppressant that is more affordable than weight loss shots. But there's a catch—it's only approved for short-term use. On the other hand, GLP-1 is a suitable option for those seeking a long-term weight loss solution. Not only does it help with weight management, but it also treats Type-2 diabetes and improves glycemic control.
            </p>
            <p className="text-base lg:text-lg leading-relaxed">
              GLP-1 offers a plethora of benefits. You only need one injection per week to experience reduced appetite, increased metabolism, and quicker weight loss. Men and women turn to this revolutionary treatment because:
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { text: "Increases the body's ability to burn fat.", bg: "bg-[#DCAFAB]", image: benefitImage1 },
              { text: "It suppresses your appetite, so you don't get hunger pangs as often.", bg: "bg-[#F5DDD8]", image: benefitImage2 },
              { text: "It decreases your food intake and, as a result, reduces your body's fat mass.", bg: "bg-[#DCAFAB]", image: benefitImage3 },
              { text: "It's a reliable long-term weight management option.", bg: "bg-[#F5DDD8]", image: benefitImage4 }
            ].map((benefit, index) => (
              <motion.div
                key={index}
                className={`relative h-80 lg:h-[420px] ${benefit.bg} rounded-2xl overflow-hidden flex flex-col`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                data-testid={`card-benefit-${index}`}
              >
                <div className="pt-5 px-4 pb-3">
                  <p className="text-center text-sm lg:text-base font-medium text-foreground leading-relaxed">
                    {benefit.text}
                  </p>
                </div>
                <div className="flex-1 relative overflow-hidden">
                  <img 
                    src={benefit.image} 
                    alt="Weight loss benefit" 
                    className="absolute inset-0 w-full h-full object-cover object-top"
                  />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover If Our Weight Loss Medication is Right For You — Quiz */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-4 text-center">
              Discover If Our Weight Loss{" "}
              <span className="text-gradient">Medication</span> is Right For You
            </h2>
            <p className="text-center text-muted-foreground mb-10">Answer a few quick questions to find out if you're a candidate.</p>

            <div className="bg-white rounded-3xl shadow-xl border border-border/50 p-8">
              {!quizCompleted ? (
                quizStep < quizQuestions.length ? (
                  <>
                    {/* Progress bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Question {quizStep + 1} of {quizQuestions.length}</span>
                        <span>{Math.round(((quizStep) / quizQuestions.length) * 100)}% complete</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div
                          className="h-2 bg-primary rounded-full transition-all duration-300"
                          style={{ width: `${(quizStep / quizQuestions.length) * 100}%` }}
                        />
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-semibold mb-6 text-center">
                      {quizQuestions[quizStep].question}
                    </h3>
                    <div className="grid gap-3">
                      {quizQuestions[quizStep].options.map((option) => (
                        <button
                          key={option}
                          onClick={() => handleQuizAnswer(option)}
                          className="w-full py-4 px-6 text-left rounded-xl border-2 border-border/50 hover:border-primary hover:bg-primary/5 transition-all font-medium text-foreground"
                        >
                          {option}
                        </button>
                      ))}
                    </div>

                    {quizStep > 0 && (
                      <button
                        onClick={() => setQuizStep(quizStep - 1)}
                        className="mt-4 flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                      >
                        <ChevronLeft className="w-4 h-4" /> Back
                      </button>
                    )}
                  </>
                ) : (
                  /* Contact step */
                  <form onSubmit={handleQuizSubmit}>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm text-muted-foreground mb-2">
                        <span>Almost done!</span>
                        <span>100% complete</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full">
                        <div className="h-2 bg-primary rounded-full w-full transition-all duration-300" />
                      </div>
                    </div>

                    <h3 className="font-display text-xl font-semibold mb-6 text-center">
                      You may be a great candidate! Enter your info to get started.
                    </h3>
                    <div className="space-y-4">
                      <Input
                        type="text"
                        placeholder="Full Name *"
                        value={quizContactData.name}
                        onChange={(e) => setQuizContactData({ ...quizContactData, name: e.target.value })}
                        className="py-6 px-4 rounded-xl"
                        required
                      />
                      <Input
                        type="tel"
                        placeholder="Phone *"
                        value={quizContactData.phone}
                        onChange={(e) => setQuizContactData({ ...quizContactData, phone: e.target.value })}
                        className="py-6 px-4 rounded-xl"
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Email *"
                        value={quizContactData.email}
                        onChange={(e) => setQuizContactData({ ...quizContactData, email: e.target.value })}
                        className="py-6 px-4 rounded-xl"
                        required
                      />
                      <Button type="submit" className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90">
                        NEXT
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </form>
                )
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-primary" />
                  </div>
                  <h3 className="font-display text-2xl font-semibold mb-2">Thank You!</h3>
                  <p className="text-muted-foreground mb-6">Our team will reach out to you shortly to discuss your weight loss journey.</p>
                  <a href="tel:+13105106649">
                    <Button className="bg-primary hover:bg-primary/90 rounded-full px-8">
                      <Phone className="w-4 h-4 mr-2" />
                      Call (310) 510-6649
                    </Button>
                  </a>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Weight Loss Injection Before & After */}
      <section className="py-20 lg:py-32 bg-gradient-soft">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
              Weight Loss Injection{" "}
              <span className="text-gradient">Before & After*</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Are you wondering what weight loss injections can do for you? You're not the only one—many patients ask us how they can lose weight without constantly feeling hungry. Our before and after photos from real patients show the incredible transformations possible with weight loss injections. But like any medical treatment, each person's experience and results vary.*
            </p>
          </motion.div>

          {/* Before & After Gallery */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {[benefitImage1, benefitImage2, benefitImage3, benefitImage4, benefitImage1, benefitImage2].map((img, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden bg-secondary aspect-[3/4]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <img
                  src={img}
                  alt={`Weight loss transformation ${index + 1}`}
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-muted-foreground mt-6 max-w-3xl mx-auto">
            *Before and after images reflect actual patient results. Although individual results may vary, treatment is only promised to provide permanent results. A guarantee is neither provided nor implied.
          </p>
        </div>
      </section>

      {/* Weight Loss Injection Cost */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                Weight Loss Injection{" "}
                <span className="text-gradient">Cost</span> in Los Angeles
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                The precise cost of weight loss injections depends on several factors including your provider's expertise and your current weight. A higher starting weight may require additional treatments to get you where you want to be. This results in a higher cost.
              </p>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Obtain a personalized estimate for weight loss injections by scheduling a consultation with us. After discussing your weight loss goals and assessing your current health, a specialist can let you know how much your treatment plan will cost.
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg rounded-full shadow-lg"
                onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get $50 Off Today
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Weight Loss Injection Results */}
      <section className="py-20 lg:py-28 bg-gradient-to-b from-[#F5F0E8] to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 text-foreground">
                Weight Loss Injection{" "}
                <span className="text-gradient">Results</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Weight loss injections treat obesity, a condition characterized by excess body fat. They work by suppressing hunger and promoting weight loss, helping to improve your body mass index (BMI).
              </p>
              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                Results aren't immediate with weight loss injections so it's crucial to have realistic expectations and practice consistency. Stick with your treatment plan and make healthy lifestyle changes for the best outcome. We suggest eating balanced meals and exercising every day to maximize weight loss injection benefits.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Personal results vary based on factors such as starting weight and lifestyle habits. Tracking your progress with before and after pictures will give a visual of how your body responds to the treatment over time. Many of our patients do this and find it keeps them motivated to stay on top of their weight loss goals!
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dr. Tabiza Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-4">
              Your Aesthetic Journey Begins with{" "}
              <span className="text-gradient">Expert Medical Care</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                title: "Meet Dr. Jennifer Tabiza",
                description: "Dedicated physician with a passion for helping patients achieve their cosmetic goals through personalized aesthetic treatments and access to the latest available technology."
              },
              {
                title: "Clinical Excellence",
                description: "Dr. Tabiza and a team of professional aesthetics providers, combines vast knowledge and expertise with compassionate care at their boutique clinic in the Westchester area of Los Angeles."
              },
              {
                title: "Philosophy of Care",
                description: "Committed to creating a relaxing, caring, and calm environment where every patient receives individualized attention and personalized care tailored to their unique aesthetic goals."
              },
              {
                title: "Patient-Centered Experience",
                description: "Dr. Tabiza and the team work diligently to ensure patients feel comfortable and supported throughout their aesthetic journey, focusing on safe, effective treatments that help achieve desired cosmetic outcomes."
              },
              {
                title: "Creating Your Sanctuary",
                description: "At Total Body Aesthetic, our doctors have cultivated a boutique experience that prioritizes both advanced medical expertise and the personal touch that makes each visit exceptional in the heart of Los Angeles."
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-3xl p-8 shadow-lg border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <h3 className="font-display text-xl font-semibold mb-3 text-primary">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Closing weight loss injections section */}
          <motion.div
            className="max-w-4xl mx-auto mt-16 p-8 bg-gradient-soft rounded-3xl border border-border/50"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h3 className="font-display text-2xl font-semibold mb-4">Weight Loss Injections in Los Angeles, CA</h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-6">
              Weight loss injections may be an option for some adults as part of a medically supervised weight management plan. At Total Body Aesthetic, our providers create individualized plans based on each patient's health and goals. To find out whether treatment may be right for you, call{" "}
              <a href="tel:+13105106649" className="text-primary font-semibold hover:underline">(310) 510-6649</a>{" "}
              to schedule a medical consultation.
            </p>
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-full shadow-lg"
              onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Schedule a Consultation
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </motion.div>
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

      {/* CTA Section with Bottom Form */}
      <section className="py-20 bg-gradient-to-r from-primary to-accent text-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* Left content */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold mb-6">
                Ready to Start Your Transformation?
              </h2>
              <p className="text-xl text-white/90 mb-6">
                Join thousands of satisfied patients who have achieved their weight loss goals with Total Body Aesthetics.
              </p>
              <p className="text-lg text-white/80 mb-8">
                Get $50 off — Weight Loss new client special.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="tel:+13105106649">
                  <Button 
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg rounded-full shadow-lg"
                    data-testid="button-call-bottom"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    (310) 510-6649
                  </Button>
                </a>
                <Button 
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 px-8 py-6 text-lg rounded-full"
                  data-testid="button-cta-bottom"
                  onClick={() => document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Get $50 Off Today
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </div>
            </motion.div>

            {/* Right - Bottom Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <form
                onSubmit={handleSubmit}
                className="bg-white rounded-3xl shadow-xl p-8"
              >
                <h3 className="font-display text-2xl font-semibold text-foreground mb-2 text-center">Weight Loss Injections</h3>
                <p className="text-center text-sm text-muted-foreground mb-6">New client special</p>
                <div className="space-y-4">
                  <Input
                    type="text"
                    placeholder="Full Name *"
                    className="py-6 px-4 rounded-xl"
                    required
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    className="py-6 px-4 rounded-xl"
                    required
                  />
                  <Input
                    type="tel"
                    placeholder="Phone *"
                    className="py-6 px-4 rounded-xl"
                    required
                  />
                  <Button
                    type="submit"
                    className="w-full py-6 text-lg rounded-xl bg-primary hover:bg-primary/90"
                  >
                    Get $50 Off Now
                  </Button>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    *By submitting this form, I consent to be contacted by Total Body Aesthetic via phone, text, email, or mail. Message and data rates may apply. Consent is not a condition of purchase. I agree to the <a href="#" className="underline">Terms of Service</a> and acknowledge the <a href="#" className="underline">Privacy Policy</a>. Reply STOP to opt out.
                  </p>
                </div>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Disclaimers */}
      <section className="py-10 bg-foreground/5 border-t border-border/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
            <p>*Get $50 off your first month of Weight Loss Injections as a new client with the purchase of a weight loss package. Cannot be combined with other offers. Contact Total Body Aesthetic for full offer terms.</p>
            <p>*Contraindications to Weight Loss Injections include a personal or family history of medullary thyroid cancer, allergy to Weight Loss Injections, Type 1 Diabetes or history of Diabetic Ketoacidosis, personal or family history of Multiple Endocrine Neoplasia, personal history of Pancreatitis, renal impairment or kidney disease, gallbladder disease, or concurrent use of anti-diabetic medications or insulin.</p>
            <p>*Before and after images reflect actual patient results. Although individual results may vary, treatment is only promised to provide permanent results. A guarantee is neither provided nor implied. Statements estimating treatment duration and the number of treatments required are based on the typical experience of our patients. However, individual experiences may vary.</p>
            <p>*By submitting this form you agree to be contacted by Total Body Aesthetic and receive marketing messages by phone, text, or email. You can unsubscribe from these communications at any time. We commit to protecting and respecting your privacy.</p>
            <p>*We offer compounded versions of weight loss injections, which are not FDA-approved in any manner or clinically proven to provide any benefits. References to these medications on this website pertain to compounded formulations and are not associated with or equivalent to its non-compounded counterparts. Compounded medications are prepared by licensed pharmacies as prescribed by healthcare providers, and their safety and efficacy have not been evaluated by the FDA. Please consult your healthcare provider for personalized medical advice.</p>
            <p>Source: [1] <a href="https://www.ncbi.nlm.nih.gov/pmc/articles/PMC6231279/" className="underline" target="_blank" rel="noopener noreferrer">Weight Loss Injections for the Treatment of Type 2 Diabetes Mellitus</a>, Journal of Pharmacy Technology</p>
          </div>
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
                <p><a href="tel:+13105106649" className="hover:text-white transition-colors">(310) 510-6649</a></p>
                <p>8610 S Sepulveda Blvd #100, Los Angeles, CA 90045</p>
                <p>Westchester, Los Angeles, CA</p>
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
