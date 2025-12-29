import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function PricingSection() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for getting started",
      features: [
        "5 evaluations per month",
        "Basic band score feedback",
        "Transcript with highlights",
        "Community support",
      ],
      cta: "Get Started",
      featured: false,
    },
    {
      name: "Pro",
      price: "$19",
      period: "per month",
      description: "For serious IELTS preparation",
      features: [
        "Unlimited evaluations",
        "Detailed band score breakdown",
        "Advanced pronunciation analysis",
        "Progress tracking & history",
        "Priority support",
        "Downloadable reports",
      ],
      cta: "Start Free Trial",
      featured: true,
    },
    {
      name: "Premium",
      price: "$49",
      period: "per month",
      description: "Complete IELTS mastery",
      features: [
        "Everything in Pro",
        "1-on-1 coaching sessions",
        "Personalized study plan",
        "Mock test simulations",
        "Expert feedback reviews",
        "Lifetime access to resources",
      ],
      cta: "Contact Sales",
      featured: false,
    },
  ]

  return (
    <section id="pricing" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">Simple, Transparent Pricing</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Choose the plan that fits your preparation timeline and budget. All plans include core AI evaluation
            features.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <Card
              key={index}
              className={`p-8 flex flex-col ${
                plan.featured ? "border-primary shadow-lg ring-2 ring-primary/20 scale-105" : ""
              }`}
            >
              {plan.featured && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-semibold rounded-full">
                  Most Popular
                </div>
              )}
              <div className="mb-6">
                <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-muted-foreground">/{plan.period}</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8 flex-grow">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-sm text-pretty">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button variant={plan.featured ? "default" : "outline"} className="w-full">
                {plan.cta}
              </Button>
            </Card>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm">
            All plans include a 14-day money-back guarantee. Need a custom plan?{" "}
            <a href="#" className="text-primary hover:underline">
              Contact us
            </a>
          </p>
        </div>
      </div>
    </section>
  )
}
