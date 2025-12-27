import Navbar from '../components/Navbar';
import { Shield, Lock, Eye, HardDrive, AlertCircle } from 'lucide-react';

const PrivacyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-10 h-10 text-indigo-600" />
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
              Privacy Policy
            </h1>
          </div>
          
          <p className="text-gray-500 text-sm mb-8">Last updated: January 2025</p>

          <div className="prose prose-lg max-w-none">
            <div className="bg-indigo-50 border border-indigo-200 rounded-xl p-6 mb-8">
              <p className="text-indigo-900 font-medium">
                At GameVerse, your privacy is our priority. We believe in transparency and want you to understand 
                exactly how we handle your data.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
              <HardDrive className="w-6 h-6 text-indigo-600" />
              <span>Data Storage</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              GameVerse uses <strong>browser local storage</strong> exclusively to save your game progress, 
              high scores, and preferences. This means:
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>All data is stored locally on your device</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>We never collect or transmit your personal information to our servers</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Your data remains private and under your control</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>You can clear your data anytime through your browser settings</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
              <Eye className="w-6 h-6 text-indigo-600" />
              <span>Information We Collect</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              GameVerse collects minimal information to provide you with the best gaming experience:
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">Local Storage Data:</h3>
              <ul className="space-y-2 text-gray-600 text-sm">
                <li>• Game scores and achievements</li>
                <li>• Game progress and levels completed</li>
                <li>• User preferences (sound settings, difficulty levels)</li>
                <li>• Total games played counter</li>
              </ul>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 flex items-center space-x-2">
              <Lock className="w-6 h-6 text-indigo-600" />
              <span>How We Use Your Data</span>
            </h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              Since all data is stored locally on your device, we use it solely to:
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Display your high scores and game progress</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Remember your game preferences and settings</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Provide a personalized gaming experience</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Third-Party Services</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              GameVerse may use third-party advertising services in the future. If implemented, we will:
            </p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Update this privacy policy to reflect any changes</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Ensure compliance with applicable privacy regulations</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span>Provide clear opt-out options where applicable</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Cookies</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              GameVerse does not use cookies. We rely entirely on browser local storage for data persistence, 
              which provides better privacy and control over your data.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Children's Privacy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              GameVerse is suitable for all ages. Since we don't collect any personal information, 
              there are no special considerations for children's privacy. However, we recommend parental 
              guidance for younger players.
            </p>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Your Rights</h2>
            <p className="text-gray-600 leading-relaxed mb-4">You have complete control over your data:</p>
            <ul className="space-y-2 text-gray-600 mb-6">
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span><strong>Access:</strong> View your stored data through browser developer tools</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span><strong>Delete:</strong> Clear your browser's local storage to remove all GameVerse data</span>
              </li>
              <li className="flex items-start">
                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mt-2 mr-3"></span>
                <span><strong>Control:</strong> Your data never leaves your device unless you choose to share it</span>
              </li>
            </ul>

            <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              We may update this privacy policy from time to time. Any changes will be posted on this page 
              with an updated revision date. We encourage you to review this policy periodically.
            </p>

            <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-6 h-6 text-indigo-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Questions or Concerns?</h3>
                  <p className="text-gray-600 text-sm mb-2">
                    If you have any questions about this privacy policy or how we handle your data, 
                    please feel free to reach out to us.
                  </p>
                  <p className="text-gray-900 font-medium text-sm">
                    Contact: <a href="mailto:saverapps20@gmail.com" className="text-indigo-600 hover:text-indigo-700 underline">saverapps20@gmail.com</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;