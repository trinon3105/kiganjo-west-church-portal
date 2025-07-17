import React from 'react';
import { Users, Music, UserPlus, Smile } from 'lucide-react';

const ministryData = [
  { 
    name: 'Youth Ministry', 
    description: 'Empowering young people through faith and community.',
    icon: Users 
  },
  { 
    name: 'Worship Team', 
    description: 'Leading worship and praise through music.',
    icon: Music 
  },
  { 
    name: 'Men\'s Fellowship', 
    description: 'Building strong Christian men and leaders.',
    icon: UserPlus 
  },
  { 
    name: 'Women\'s Ministry', 
    description: 'Supporting and uplifting women in faith.',
    icon: Smile 
  }
];

const Ministries: React.FC = () => {
  return (
    <section id="ministries" className="bg-secondary/10 p-8 rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-primary text-center">Our Ministries</h2>
      <div className="grid md:grid-cols-2 gap-6">
        {ministryData.map((ministry, index) => {
          const Icon = ministry.icon;
          return (
            <div 
              key={index} 
              className="flex items-center p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <Icon className="mr-6 text-primary" size={48} />
              <div>
                <h3 className="text-xl font-semibold mb-2">{ministry.name}</h3>
                <p className="text-muted-foreground">{ministry.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Ministries;