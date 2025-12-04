import { Shield, Zap, Users, TrendingUp, Clock, Award } from 'lucide-react';
import { Card, CardContent } from './ui/card';

const features = [
  {
    icon: Shield,
    title: 'Expert Guidance',
    description: 'Get insights from experienced technology and business consultants',
    color: 'text-blue-400'
  },
  {
    icon: Zap,
    title: 'Quick Sessions',
    description: '30-60 minute focused consultancy sessions tailored to your needs',
    color: 'text-purple-400'
  },
  {
    icon: Users,
    title: 'Limited Spots',
    description: 'First 20 clients per session get free consultancy',
    color: 'text-pink-400'
  },
  {
    icon: TrendingUp,
    title: 'Growth Focused',
    description: 'Strategies designed to accelerate your business growth',
    color: 'text-green-400'
  },
  {
    icon: Clock,
    title: 'Flexible Timing',
    description: 'Multiple time slots available throughout the day',
    color: 'text-orange-400'
  },
  {
    icon: Award,
    title: 'Proven Results',
    description: 'Join successful companies that have benefited from our consultancy',
    color: 'text-yellow-400'
  }
];

export function Features() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl text-white mb-4">Why Choose RaS Techno?</h2>
        <p className="text-white/60 text-lg max-w-2xl mx-auto">
          We combine technology expertise with business strategy to help you succeed
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-white/10 bg-slate-900/50 hover:bg-slate-800/50 transition-colors">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center flex-shrink-0">
                    <Icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-white mb-2">{feature.title}</h3>
                    <p className="text-white/60 text-sm">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
