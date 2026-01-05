import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { Heart, Users, Gamepad2, Sparkles } from 'lucide-react';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-gray-800/50 rounded-2xl shadow-lg p-8 md:p-12 border border-gray-700">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            About Multi Game Verse
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Welcome to Multi Game Verse, your ultimate destination for classic arcade games reimagined for the modern web. 
              We believe that the best games are timeless, and we're dedicated to bringing you the most beloved 
              gaming experiences in a clean, accessible format.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-12">
              <div className="flex items-start space-x-4 p-6 bg-cyan-500/10 rounded-xl border border-cyan-500/20">
                <div className="p-2 bg-cyan-500/20 rounded-lg">
                  <Heart className="w-6 h-6 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Built with Passion</h3>
                  <p className="text-gray-400 text-sm">Every game is crafted with attention to detail and love for classic gaming.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <div className="p-2 bg-purple-500/20 rounded-lg">
                  <Users className="w-6 h-6 text-purple-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">For Everyone</h3>
                  <p className="text-gray-400 text-sm">Accessible gaming for all ages, skill levels, and devices.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-green-500/10 rounded-xl border border-green-500/20">
                <div className="p-2 bg-green-500/20 rounded-lg">
                  <Gamepad2 className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Pure Gaming</h3>
                  <p className="text-gray-400 text-sm">No accounts, no downloads, no hassle. Just click and play.</p>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-6 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                <div className="p-2 bg-yellow-500/20 rounded-lg">
                  <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white mb-2">Modern Experience</h3>
                  <p className="text-gray-400 text-sm">Classic games with contemporary design and smooth performance.</p>
                </div>
              </div>
            </div>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Our Mission</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              At Multi Game Verse, we're on a mission to preserve gaming history while making it accessible to everyone. 
              We carefully recreate classic games with modern technology, ensuring they run smoothly on any device 
              without compromising the original gameplay experience that made them legendary.
            </p>

            <h2 className="text-2xl font-bold text-white mt-12 mb-4">Why Multi Game Verse?</h2>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3"></span>
                <span><strong className="text-white">Browser-Based:</strong> Play instantly without any downloads or installations</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3"></span>
                <span><strong className="text-white">Privacy-First:</strong> Your data stays on your device with local storage</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3"></span>
                <span><strong className="text-white">Mobile-Ready:</strong> Optimized for touch controls and smaller screens</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3"></span>
                <span><strong className="text-white">Free Forever:</strong> All games are completely free to play</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mt-2 mr-3"></span>
                <span><strong className="text-white">Regular Updates:</strong> New games and features added regularly</span>
              </li>
            </ul>

            <div className="mt-12 p-6 bg-gradient-to-r from-cyan-500/10 to-purple-500/10 rounded-xl border border-cyan-500/20">
              <p className="text-gray-300 text-center">
                Thank you for choosing Multi Game Verse. We hope you enjoy your gaming experience!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;