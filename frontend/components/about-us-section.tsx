import { Target, Users, Zap, Shield } from "lucide-react"

export function AboutUsSection() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "Empowering IELTS candidates worldwide with AI-powered tools to achieve their target band scores.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Built by IELTS experts and AI specialists with years of experience in language assessment.",
    },
    {
      icon: Zap,
      title: "Cutting-Edge AI",
      description: "Leveraging advanced speech recognition and natural language processing for accurate evaluation.",
    },
    {
      icon: Shield,
      title: "Privacy First",
      description: "Your recordings and data are secure, encrypted, and never shared with third parties.",
    },
  ]

  return (
    <section id="about-us" className="py-20">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-balance">About Us</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            We're on a mission to make IELTS preparation accessible, effective, and affordable for everyone
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <div key={index} className="flex gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                  <Icon className="h-6 w-6" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-pretty">{value.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        <div className="bg-gradient-to-br from-primary/10 via-chart-2/10 to-chart-1/10 rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-bold mb-4 text-balance">Join Thousands of Successful Students</h3>
            <p className="text-lg text-muted-foreground mb-6 text-pretty">
              Over 10,000 students have improved their IELTS Speaking scores using our AI-powered platform. Our users
              report an average improvement of 1.5 band scores within 3 months of regular practice.
            </p>
            <div className="flex flex-wrap justify-center gap-8 text-center">
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">10,000+</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">1.5</div>
                <div className="text-sm text-muted-foreground">Avg. Band Improvement</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-bold text-primary">98%</div>
                <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
