import React from 'react';
import { Linkedin, Twitter } from 'lucide-react';

export function FoundersSection() {
  return (
    <section className="py-28 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        <div className="text-center mb-24 max-w-2xl mx-auto">
          <div className="inline-flex items-center px-4 py-1.5 rounded-full dark:bg-[#1B1E36] border border-[#2D3154] mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span>
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300 tracking-wide">
              The Architects of Hirely
            </span>
          </div>

          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter mb-6 leading-tight">
            Meet the Visionaries Engineering the Future of Talent Acquisition
          </h2>
          <p className="text-base text-gray-500 dark:text-gray-400 leading-relaxed max-w-xl mx-auto">
            A fusion of algorithmic genius, seasoned operational strategy, and a 
            deep-seated belief that human ingenuity, when augmented by AI, can 
            achieve the impossible.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-12 items-start justify-center">
          
          <div className="flex flex-col items-center group">
            <div className="relative mb-8 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="absolute inset-0 rounded-full border border-white/5 bg-[#1B1E36]/30 backdrop-blur-sm -rotate-6 scale-105 group-hover:rotate-0 group-hover:scale-100 group-hover:border-blue-500/30 transition-all duration-500"></div>
              
              <div className="absolute inset-0 rounded-full border border-white/10 rotate-6 scale-105 group-hover:rotate-0 group-hover:scale-100 group-hover:border-blue-500/50 transition-all duration-500"></div>

              <img 
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=688&auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&fm=jpg" 
                alt="Sarah Jenkins" 
                className="relative z-10 w-48 h-48 rounded-full object-cover border-4 border-[#131527] shadow-xl group-hover:border-blue-600 transition-colors duration-500"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                Sarah Jenkins
              </h3>
              <p className="text-sm font-semibold text-blue-500 mb-4 tracking-wider uppercase">
                Co-Founder & CEO
              </p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-6 font-medium">
                Former VP of Data Science at Apex Analytics. A decade spent modeling algorithmic bias, now focused on eradicating it from recruitment.
              </p>
              
              {/* Socials */}
              <div className="flex items-center justify-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1B1E36] border dark:border-[#2D3154] flex items-center justify-center text-[#8B92A5] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1B1E36] border dark:border-[#2D3154] flex items-center justify-center text-[#8B92A5] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center group relative md:top-[-10px]">
            <div className="relative mb-8 transition-transform duration-500 group-hover:-translate-y-2">
              
              <div className="absolute -inset-10 bg-[radial-gradient(circle,rgba(59,130,246,0.15)_0%,transparent_60%)] pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

              <img 
                src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=687&auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&fm=jpg" 
                alt="Michael Chen" 
                className="relative z-10 w-56 h-56 rounded-full object-cover border-4 border-[#131527] shadow-xl group-hover:border-blue-600 transition-colors duration-500"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-2xl font-bold tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                Michael Chen
                <span className="w-2 h-2 rounded-full bg-blue-500 ml-2 inline-block shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
              </h3>
              <p className="text-sm font-semibold text-blue-500 mb-4 tracking-wider uppercase">
                Co-Founder & CTO
              </p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-sm leading-relaxed mb-6 font-medium">
                Distributed systems expert. Architected multi-node matching protocols used globally by Fortune 500s before shifting focus to ethical neural networks.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1B1E36] border dark:border-[#2D3154] flex items-center justify-center text-[#8B92A5] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center group">
            <div className="relative mb-8 transition-transform duration-500 group-hover:-translate-y-2">
              <div className="absolute inset-0 rounded-full border border-white/5 bg-[#1B1E36]/30 backdrop-blur-sm 10 rotate-6 scale-105 group-hover:rotate-0 group-hover:scale-100 group-hover:border-blue-500/30 transition-all duration-500"></div>
              
              <div className="absolute inset-0 rounded-full border border-white/10 -rotate-6 scale-105 group-hover:rotate-0 group-hover:scale-100 group-hover:border-blue-500/50 transition-all duration-500"></div>

              <img 
                src="https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixid=eyJhcHBfaWQiOjEyMDd9&fm=jpg" 
                alt="Anya Petrova" 
                className="relative z-10 w-48 h-48 rounded-full object-cover border-4 border-[#131527] shadow-xl group-hover:border-blue-600 transition-colors duration-500"
              />
            </div>
            
            <div className="text-center">
              <h3 className="text-xl font-bold tracking-tight mb-1 group-hover:text-blue-400 transition-colors">
                Anya Petrova
              </h3>
              <p className="text-sm font-semibold text-blue-500 mb-4 tracking-wider uppercase">
                Co-Founder & COO
              </p>
              
              <p className="text-sm text-gray-500 dark:text-gray-400 max-w-xs leading-relaxed mb-6 font-medium">
                Operations maven. Scaled hyper-growth startups from stealth to Series B, defining the go-to-market strategies that dominate market segments.
              </p>
              
              <div className="flex items-center justify-center gap-3">
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1B1E36] border dark:border-[#2D3154] flex items-center justify-center text-[#8B92A5] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Linkedin className="w-4 h-4" />
                </a>
                <a href="#" className="w-8 h-8 rounded-full bg-gray-100 dark:bg-[#1B1E36] border dark:border-[#2D3154] flex items-center justify-center text-[#8B92A5] hover:bg-blue-600 hover:text-white hover:border-blue-600 transition-all">
                  <Twitter className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
};