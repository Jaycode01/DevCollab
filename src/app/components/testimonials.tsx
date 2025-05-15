import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Quote } from "lucide-react";

export default function Testimonials() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-50 mt-20">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <Badge variant="outline" className="px-3 py-1 text-sm">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter sm;text-4xl md:text-5xl">
            Our success stories
          </h2>
          <p className="max-w-[700px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Real feedback from real customers who have built their projects and
            ideas with our solutions.
          </p>
        </div>
        <div className="mx-auto grid max-w-5xl md:gap-6 gap-3 py-12 lg:grid-cols-3">
          <div className="grid gap-6">
            {testimonials.slice(0, 2).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>

          <div className="grid gap-6 lg:mt-10">
            {testimonials.slice(2, 4).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
          <div className="grid gap-6">
            {testimonials.slice(4, 6).map((testimonial, index) => (
              <TestimonialCard key={index} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type Testimonial = {
  name: string;
  title: string;
  company: string;
  avatar: string;
  quote: string;
};

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-white p-6 shadow-sm">
      <Quote className="absolute right-6 top-6 h-8 w-8 text-gray-100" />
      <div className="flex flex-col gap-4">
        <p className="text-gray-700">{testimonial.quote}</p>
        <div className="mt-auto flex items-center gap-4">
          <Avatar>
            <AvatarImage
              src={testimonial.avatar || "/placeholder.svg"}
              alt={testimonial.name}
            />
            <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
          </Avatar>
        </div>
        <div>
          <div className="font-medium">{testimonial.name}</div>
          <div className="text-sm text-gray-500">
            {testimonial.title}, {testimonial.company}
          </div>
        </div>
      </div>
    </div>
  );
}

const testimonials = [
  {
    name: "Alex Morgan",
    title: "E-commerce Director",
    company: "ShopWave",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The platform's intuitive design and powerful features have revolutionized how we manage our online store. Our conversion rates have increased by 30% since implementation.",
  },
  {
    name: "Jordan Lee",
    title: "CTO",
    company: "TechSolutions",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The API documentation is comprehensive and the integration process was seamless. Their technical support team was responsive and knowledgeable throughout the entire process.",
  },
  {
    name: "Taylor Swift",
    title: "Marketing Manager",
    company: "CreativeMinds",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The analytics dashboard provides invaluable insights that have helped us optimize our marketing campaigns and increase ROI significantly.",
  },
  {
    name: "Casey Johnson",
    title: "Operations Director",
    company: "LogisticsPro",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "This solution streamlined our entire supply chain management process. We've reduced operational costs by 25% and improved delivery times.",
  },
  {
    name: "Riley Zhang",
    title: "Product Manager",
    company: "InnovateCorp",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "The customization options allowed us to tailor the platform to our specific needs. It's rare to find such flexibility combined with ease of use.",
  },
  {
    name: "Morgan Smith",
    title: "CEO",
    company: "StartupSuccess",
    avatar: "/placeholder.svg?height=100&width=100",
    quote:
      "As a startup founder, I needed a solution that could scale with my business. This platform has been the perfect partner in our growth journey.",
  },
];
