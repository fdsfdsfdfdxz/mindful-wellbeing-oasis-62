
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const plansData = [
  {
    name: "Pay Per Session",
    price: "$60",
    period: "per session",
    description: "Flexible therapy with no commitment",
    features: [
      "One-on-one consultation with therapist",
      "Choose between text, voice, or video",
      "Access to post-session resources",
      "Session summary and notes",
      "No subscription required"
    ],
    popular: false,
    cta: "Book Single Session"
  },
  {
    name: "Monthly Essential",
    price: "$199",
    period: "per month",
    description: "Regular support for ongoing improvement",
    features: [
      "4 therapy sessions per month",
      "Unlimited messaging between sessions",
      "Priority booking with therapists",
      "Personalized progress tracking",
      "Access to all self-help resources"
    ],
    popular: true,
    cta: "Start Monthly Plan"
  },
  {
    name: "Family Plan",
    price: "$299",
    period: "per month",
    description: "Support for the whole family",
    features: [
      "6 therapy sessions to share among family",
      "Up to 4 family members per account",
      "Family assessment and counseling",
      "Parenting support resources",
      "Relationship strengthening tools"
    ],
    popular: false,
    cta: "Choose Family Plan"
  },
  {
    name: "Corporate",
    price: "Custom",
    period: "pricing",
    description: "Employee mental health support",
    features: [
      "Customized plans for your organization",
      "Anonymous employee utilization reports",
      "Mental health workshops and webinars",
      "Stress management resources",
      "Dedicated account manager"
    ],
    popular: false,
    cta: "Contact Sales"
  }
];

const Plans = () => {
  return (
    <section id="plans" className="py-20 bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center">Subscription Plans</h2>
        <p className="section-subtitle text-center">
          Choose the plan that best fits your needs, from individual sessions to comprehensive packages for families and organizations.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {plansData.map((plan, index) => (
            <Card 
              key={index} 
              className={`relative h-full border ${plan.popular ? 'border-calmBlue-500 shadow-lg' : 'border-gray-200'}`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-0 right-0 mx-auto w-fit bg-calmBlue-500 text-white text-sm font-medium py-1 px-4 rounded-full">
                  Most Popular
                </div>
              )}
              
              <CardHeader className={`pb-4 ${plan.popular ? 'pt-8' : 'pt-6'}`}>
                <CardTitle className="text-2xl font-bold">{plan.name}</CardTitle>
                <div className="mt-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-gray-500 ml-1">{plan.period}</span>
                </div>
                <CardDescription className="mt-2">{plan.description}</CardDescription>
              </CardHeader>
              
              <CardContent>
                <ul className="space-y-3">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 shrink-0 mt-0.5 mr-2" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              
              <CardFooter>
                <Button 
                  className={`w-full ${plan.popular ? 'bg-calmBlue-500 hover:bg-calmBlue-600' : ''}`}
                  variant={plan.popular ? 'default' : 'outline'}
                >
                  {plan.cta}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        <div className="mt-16 max-w-3xl mx-auto bg-gray-50 p-8 rounded-lg">
          <h3 className="text-xl font-bold mb-4 text-center">Insurance Coverage</h3>
          <p className="text-center mb-6">
            We work with many major insurance providers to help make therapy more affordable.
            Check if your insurance plan covers our services.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <img src="https://logo.clearbit.com/bluecross.com" alt="Blue Cross" className="h-12 grayscale hover:grayscale-0 transition-all" />
            <img src="https://logo.clearbit.com/cigna.com" alt="Cigna" className="h-12 grayscale hover:grayscale-0 transition-all" />
            <img src="https://logo.clearbit.com/aetna.com" alt="Aetna" className="h-12 grayscale hover:grayscale-0 transition-all" />
            <img src="https://logo.clearbit.com/humana.com" alt="Humana" className="h-12 grayscale hover:grayscale-0 transition-all" />
          </div>
          <div className="text-center mt-6">
            <Button variant="link">Verify Your Insurance</Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Plans;
