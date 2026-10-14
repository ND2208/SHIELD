import React, { useState } from 'react';
import { 
  Shield, 
  User, 
  Briefcase, 
  ArrowRight, 
  ArrowLeft, 
  Smartphone, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ChevronDown 
} from 'lucide-react';
import { UserRole, UserProfile, CreatorNiche } from '../types';
import { initialClientUser, initialCreatorUser, allCreatorNiches } from '../data/mockData';
import { NicheScrollingMarquee } from './NicheScrollingMarquee';

interface AuthScreenProps {
  onLoginSuccess: (user: UserProfile) => void;
  onExploreNiche?: (niche: CreatorNiche) => void;
}

type AuthMode = 'select_role' | 'client_auth' | 'creator_auth' | 'otp_verification';
type FormTab = 'login' | 'signup';
type InputMode = 'mobile' | 'email';

export const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onExploreNiche }) => {
  const [currentMode, setCurrentMode] = useState<AuthMode>('select_role');
  const [targetRole, setTargetRole] = useState<UserRole>('client');
  const [formTab, setFormTab] = useState<FormTab>('login');
  const [inputMode, setInputMode] = useState<InputMode>('mobile');

  // Creator Niche Selection
  const [creatorPrimaryNiche, setCreatorPrimaryNiche] = useState<CreatorNiche>('Brand Promotion');
  const [clientDesiredNiche, setClientDesiredNiche] = useState<CreatorNiche>('Brand Promotion');

  // Form fields
  const [countryCode, setCountryCode] = useState('+91');
  const [phoneNumber, setPhoneNumber] = useState('98765 43210');
  const [email, setEmail] = useState('rahul@gmail.com');
  const [password, setPassword] = useState('••••••••');
  const [fullName, setFullName] = useState('Rahul');
  const [companyName, setCompanyName] = useState('Apex Innovations');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);

  // OTP state
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpTimer] = useState(45);
  const [forgotPasswordMessage, setForgotPasswordMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleRoleSelect = (role: UserRole) => {
    setTargetRole(role);
    setErrorMessage('');
    if (role === 'client') {
      setEmail('rahul@gmail.com');
      setFullName('Rahul');
      setPhoneNumber('98765 43210');
      setCurrentMode('client_auth');
    } else {
      setEmail('arjun.mehta@shield.studio');
      setFullName('Arjun Mehta');
      setPhoneNumber('98450 12345');
      setCurrentMode('creator_auth');
    }
  };

  const handleDirectDemoLogin = (role: UserRole, customNiche?: CreatorNiche) => {
    if (role === 'client') {
      onLoginSuccess(initialClientUser);
    } else {
      onLoginSuccess({
        ...initialCreatorUser,
        primaryNiche: customNiche || creatorPrimaryNiche
      });
    }
  };

  const handleMarqueeNicheClick = (niche: CreatorNiche) => {
    if (onExploreNiche) {
      onExploreNiche(niche);
      return;
    }
    onLoginSuccess({
      ...initialClientUser,
      targetNiches: [niche],
      preferences: [niche, 'Video Editing']
    });
  };

  const handleSubmitAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (inputMode === 'mobile' && !phoneNumber.trim()) {
      setErrorMessage('Please enter a valid mobile number');
      return;
    }
    if (inputMode === 'email' && !email.trim()) {
      setErrorMessage('Please enter a valid email address');
      return;
    }

    const newUser: UserProfile = {
      id: targetRole === 'client' ? 'usr_client_custom' : 'usr_creator_custom',
      name: fullName || (targetRole === 'client' ? 'Rahul' : 'Arjun Mehta'),
      email: inputMode === 'email' ? email : (targetRole === 'client' ? 'rahul@gmail.com' : 'creator@shield.io'),
      phone: `${countryCode} ${phoneNumber}`,
      whatsapp: `${countryCode} ${phoneNumber}`,
      role: targetRole,
      accountType: targetRole === 'client' ? 'personal' : 'business',
      avatar: targetRole === 'client' 
        ? initialClientUser.avatar 
        : initialCreatorUser.avatar,
      preferences: targetRole === 'client' 
        ? [clientDesiredNiche, 'Video Editing', 'Design'] 
        : [creatorPrimaryNiche, 'Video Editing'],
      targetNiches: targetRole === 'client' ? [clientDesiredNiche, 'Brand Promotion', 'Thumbnail'] : undefined,
      primaryNiche: targetRole === 'creator' ? creatorPrimaryNiche : undefined,
      companyName: targetRole === 'creator' ? (companyName || 'Studio Pro') : undefined,
      location: 'Bangalore, India'
    };

    onLoginSuccess(newUser);
  };

  const handleSendOtp = () => {
    if (!phoneNumber.trim()) {
      setErrorMessage('Please enter your mobile number');
      return;
    }
    setOtpSent(true);
    setOtpCode(['5', '8', '2', '4', '1', '9']);
  };

  const handleVerifyOtp = () => {
    const fullOtp = otpCode.join('');
    if (fullOtp.length < 6) {
      setErrorMessage('Please enter the full 6-digit OTP');
      return;
    }
    const user = targetRole === 'client' ? initialClientUser : initialCreatorUser;
    onLoginSuccess(user);
  };

  const handleOtpDigitChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const updated = [...otpCode];
    updated[index] = val;
    setOtpCode(updated);
  };

  // 1. Role Selection View
  if (currentMode === 'select_role') {
    return (
      <div className="min-h-screen bg-[#060b13] text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-sky-500/10 rounded-full blur-[160px] pointer-events-none" />

        {/* Top Header */}
        <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">Shield</span>
          </div>
          <div className="hidden sm:flex items-center gap-2 text-sm text-slate-400 font-medium">
            <span>Create</span>
            <span className="text-slate-600">•</span>
            <span>Connect</span>
            <span className="text-slate-600">•</span>
            <span>Grow</span>
          </div>
        </header>

        {/* Main Center Section */}
        <main className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center my-auto py-12 z-10">
          {/* Left Title & Pitch */}
          <div className="lg:col-span-5 space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Talent meets{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-400 to-indigo-400">
                opportunity.
              </span>
            </h1>
            <p className="text-lg text-slate-400 leading-relaxed max-w-lg">
              Shield is a creator marketplace where businesses find skilled creators and creators get hired for real opportunities.
            </p>

            {/* Quick Demo Assist */}
            <div className="pt-4 flex flex-wrap gap-3">
              <span className="text-xs text-slate-500 uppercase tracking-wider block w-full">Quick 1-Click Access:</span>
              <button
                onClick={() => handleDirectDemoLogin('client')}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <User className="w-3.5 h-3.5 text-blue-400" />
                Demo Client (Personal)
              </button>
              <button
                onClick={() => handleDirectDemoLogin('creator')}
                className="px-3.5 py-2 text-xs font-medium text-slate-300 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/60 rounded-lg transition-colors flex items-center gap-2 cursor-pointer"
              >
                <Briefcase className="w-3.5 h-3.5 text-sky-400" />
                Demo Creator (Business)
              </button>
            </div>
          </div>

          {/* Right Role Cards Grid */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Card 1: Client Card */}
            <div 
              onClick={() => handleRoleSelect('client')}
              className="group relative bg-[#0b1322]/90 hover:bg-[#0e192c] border border-slate-800/90 hover:border-blue-500/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xl hover:shadow-blue-500/10 min-h-[380px]"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                  <User className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">I'm a Client</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Hire creators for your projects, inspect past works, and track your collaboration project history.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRoleSelect('client'); }}
                  className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 group-hover:gap-3 cursor-pointer"
                >
                  <span>Continue as Client</span>
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </button>
                <p className="text-center text-xs text-slate-500 font-medium">Personal Account</p>
              </div>
            </div>

            {/* Card 2: Creator Card */}
            <div 
              onClick={() => handleRoleSelect('creator')}
              className="group relative bg-[#0b1322]/90 hover:bg-[#0e192c] border border-slate-800/90 hover:border-sky-500/50 rounded-2xl p-8 flex flex-col justify-between transition-all duration-200 cursor-pointer shadow-xl hover:shadow-sky-500/10 min-h-[380px]"
            >
              <div className="space-y-6">
                <div className="w-14 h-14 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400 group-hover:bg-sky-500 group-hover:text-white transition-colors duration-200">
                  <Briefcase className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">I'm a Creator</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Showcase your editing skills, manage client proposals, upload work to portfolio, and get hired.
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <button 
                  onClick={(e) => { e.stopPropagation(); handleRoleSelect('creator'); }}
                  className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-blue-600 to-sky-600 hover:from-blue-500 hover:to-sky-500 active:from-blue-700 active:to-sky-700 transition-all flex items-center justify-center gap-2 shadow-lg shadow-sky-600/25 group-hover:gap-3 cursor-pointer"
                >
                  <span>Continue as Creator</span>
                  <ArrowRight className="w-4 h-4 transition-transform" />
                </button>
                <p className="text-center text-xs text-slate-500 font-medium">Business Account</p>
              </div>
            </div>
          </div>
        </main>

        {/* Scrolling animation on login page */}
        <div className="w-full my-4 z-10 border-t border-b border-slate-800/80 bg-[#070d18]/70 backdrop-blur-md rounded-3xl overflow-hidden shadow-2xl">
          <NicheScrollingMarquee
            onSelectNiche={handleMarqueeNicheClick}
            title="Popular Creator Specializations"
            subtitle="Click any category to immediately enter and view top verified creators"
            variant="login"
          />
        </div>

        {/* Footer */}
        <footer className="max-w-7xl w-full mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 border-t border-slate-800/60 pt-6 z-10">
          <p>© 2026 Shield Technologies Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Privacy Policy</span>
            <span className="hover:text-slate-400 transition-colors">Terms of Service</span>
            <span className="hover:text-slate-400 transition-colors">Security</span>
          </div>
        </footer>
      </div>
    );
  }

  // 2. OTP Verification Screen
  if (currentMode === 'otp_verification') {
    return (
      <div className="min-h-screen bg-[#060b13] text-slate-100 flex flex-col justify-between p-6 sm:p-10 relative overflow-hidden">
        {/* Header */}
        <header className="max-w-7xl w-full mx-auto flex items-center justify-between z-10">
          <div 
            onClick={() => setCurrentMode('select_role')} 
            className="flex items-center gap-3 cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Shield</span>
          </div>
          <button
            onClick={() => setCurrentMode(targetRole === 'client' ? 'client_auth' : 'creator_auth')}
            className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </button>
        </header>

        {/* OTP Box */}
        <main className="max-w-md w-full mx-auto my-auto z-10">
          <div className="bg-[#0b1322]/95 border border-slate-800/90 rounded-2xl p-8 sm:p-10 shadow-2xl backdrop-blur-xl space-y-6">
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-2">
                <Smartphone className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Login with Mobile Number</h2>
              <p className="text-sm text-slate-400 max-w-sm">
                {!otpSent 
                  ? "Enter your mobile number and we'll send you an OTP to verify your account."
                  : `Enter the 6-digit verification code sent to ${countryCode} ${phoneNumber}.`
                }
              </p>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {!otpSent ? (
              <div className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Mobile Number</label>
                  <div className="flex rounded-xl bg-[#070d18] border border-slate-800 focus-within:border-blue-500 transition-colors overflow-hidden">
                    <div className="flex items-center gap-1 px-3 py-3 bg-slate-900/80 border-r border-slate-800 text-slate-300 text-sm shrink-0">
                      <span>{countryCode}</span>
                      <ChevronDown className="w-3.5 h-3.5 text-slate-500" />
                    </div>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 cursor-pointer"
                >
                  Send OTP
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="flex justify-between gap-2">
                  {otpCode.map((digit, idx) => (
                    <input
                      key={idx}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpDigitChange(idx, e.target.value)}
                      className="w-12 h-14 text-center text-xl font-bold rounded-xl bg-[#070d18] border border-slate-700 focus:border-blue-500 text-white focus:outline-none transition-colors"
                    />
                  ))}
                </div>
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Resend code in {otpTimer}s</span>
                  <button 
                    type="button" 
                    onClick={handleSendOtp}
                    className="text-blue-400 hover:text-blue-300 transition-colors font-medium cursor-pointer"
                  >
                    Resend OTP
                  </button>
                </div>
                <button
                  type="button"
                  onClick={handleVerifyOtp}
                  className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Verify & Login</span>
                </button>
              </div>
            )}

            <div className="relative flex py-2 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase tracking-widest font-mono">OR</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            <div className="text-center">
              <button
                type="button"
                onClick={() => {
                  setInputMode('email');
                  setCurrentMode(targetRole === 'client' ? 'client_auth' : 'creator_auth');
                }}
                className="text-xs text-slate-400 hover:text-blue-400 transition-colors font-medium cursor-pointer"
              >
                Login with Email
              </button>
            </div>
          </div>
        </main>

        <footer className="text-center text-xs text-slate-500 z-10">
          Shield Secure Authentication Engine • 256-bit Encryption
        </footer>
      </div>
    );
  }

  // 3. Client & Creator Login / Sign Up Views
  const isClient = targetRole === 'client';
  const roleTitle = isClient ? 'Client' : 'Creator';
  const roleSubtitle = isClient 
    ? 'Access your account, inspect past creator works, and track your collaboration project history.'
    : 'Showcase your talent, manage project milestones, and get hired by top brands.';
  const accountBadge = isClient ? 'Personal Account' : 'Business Account';

  return (
    <div className="min-h-screen bg-[#060b13] text-slate-100 flex flex-col relative overflow-hidden">
      {/* Top Navigation */}
      <header className="w-full px-6 sm:px-12 py-6 flex items-center justify-between border-b border-slate-800/60 z-20 bg-[#060b13]/80 backdrop-blur-md">
        <div 
          onClick={() => setCurrentMode('select_role')} 
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-105 transition-transform">
            <Shield className="w-6 h-6 text-white" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Shield</span>
        </div>
        <button
          onClick={() => setCurrentMode('select_role')}
          className="flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors py-2 px-3 rounded-lg hover:bg-slate-800/60 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to role selection</span>
        </button>
      </header>

      {/* Main Split Layout */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 max-w-7xl w-full mx-auto items-stretch z-10">
        {/* Left Side: Brand & Visual Panel */}
        <div className="lg:col-span-5 p-8 sm:p-12 flex flex-col justify-between relative overflow-hidden border-b lg:border-b-0 lg:border-r border-slate-800/80">
          <div className="relative z-10 space-y-4 pt-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md text-xs font-medium bg-blue-500/20 border border-blue-500/30 text-blue-300">
              {isClient ? <User className="w-3.5 h-3.5" /> : <Briefcase className="w-3.5 h-3.5" />}
              <span>{accountBadge}</span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {roleTitle} <span className="text-blue-500">Login</span>
            </h2>
            <div className="w-12 h-1 bg-blue-600 rounded-full" />
            <p className="text-slate-300 text-base leading-relaxed pt-2">
              {roleSubtitle}
            </p>
          </div>

          {/* Trust Highlights on Left Side */}
          <div className="relative z-10 pt-12 space-y-4">
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isClient ? 'Verified top 1% creative talent' : 'Direct access to high-paying client contracts'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>{isClient ? 'Live milestone timeline & existing project history' : 'Automated escrow invoicing & milestone payments'}</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Personalized creator recommendations matching your goals</span>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Login / Sign Up Form */}
        <div className="lg:col-span-7 p-6 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            {/* Login / Sign Up Segmented Controls */}
            <div className="grid grid-cols-2 p-1 bg-[#09111e] rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setFormTab('login')}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  formTab === 'login'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setFormTab('signup')}
                className={`py-2.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  formTab === 'signup'
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {/* Mobile Number / Email Toggle */}
            <div className="grid grid-cols-2 p-1 bg-[#09111e] rounded-xl border border-slate-800">
              <button
                type="button"
                onClick={() => setInputMode('mobile')}
                className={`py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inputMode === 'mobile'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile Number</span>
              </button>
              <button
                type="button"
                onClick={() => setInputMode('email')}
                className={`py-2 text-xs font-medium rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer ${
                  inputMode === 'email'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Email</span>
              </button>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="p-3 bg-red-950/40 border border-red-500/30 rounded-lg text-xs text-red-300">
                {errorMessage}
              </div>
            )}

            {/* Forgot password message */}
            {forgotPasswordMessage && (
              <div className="p-3 bg-blue-950/40 border border-blue-500/30 rounded-lg text-xs text-blue-300">
                Password reset instructions have been sent to your registered contact.
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmitAuth} className="space-y-4">
              {formTab === 'signup' && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Full Name</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isClient ? 'e.g. Rahul Sharma' : 'e.g. Arjun Mehta'}
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              )}

              {formTab === 'signup' && !isClient && (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Business / Studio Name</label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="e.g. Mehta Motion Labs"
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                </div>
              )}

              {/* Creator Category / Niche Selection */}
              {!isClient ? (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#09111e] border border-blue-500/40">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white flex items-center gap-1.5">
                      <span>Select Your Creator Category</span>
                      <span className="text-blue-400 font-bold">*</span>
                    </label>
                    <span className="text-[10px] text-blue-300 font-mono">For client searches</span>
                  </div>
                  <select
                    value={creatorPrimaryNiche}
                    onChange={(e) => setCreatorPrimaryNiche(e.target.value as CreatorNiche)}
                    className="w-full bg-[#060b13] border border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2.5 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {allCreatorNiches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                  <p className="text-[11px] text-slate-400">
                    Your profile will be classified under <strong className="text-blue-400">{creatorPrimaryNiche}</strong> so clients can find your edits & portfolio instantly.
                  </p>
                </div>
              ) : (
                <div className="space-y-1.5 p-3 rounded-xl bg-[#09111e] border border-slate-800">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-white">Creator Specialization Desired</label>
                    <span className="text-[10px] text-slate-400">Optional</span>
                  </div>
                  <select
                    value={clientDesiredNiche}
                    onChange={(e) => setClientDesiredNiche(e.target.value as CreatorNiche)}
                    className="w-full bg-[#060b13] border border-slate-700 focus:border-blue-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none cursor-pointer"
                  >
                    {allCreatorNiches.map(niche => (
                      <option key={niche} value={niche}>{niche}</option>
                    ))}
                  </select>
                </div>
              )}

              {inputMode === 'mobile' ? (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Mobile Number</label>
                  <div className="flex rounded-xl bg-[#070d18] border border-slate-800 focus-within:border-blue-500 transition-colors overflow-hidden">
                    <select
                      value={countryCode}
                      onChange={(e) => setCountryCode(e.target.value)}
                      className="bg-slate-900 border-r border-slate-800 text-slate-200 text-sm px-3 py-3 focus:outline-none cursor-pointer"
                    >
                      <option value="+91">+91 (India)</option>
                      <option value="+1">+1 (US/CA)</option>
                      <option value="+44">+44 (UK)</option>
                      <option value="+971">+971 (UAE)</option>
                      <option value="+65">+65 (SG)</option>
                    </select>
                    <input
                      type="tel"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      placeholder="Enter mobile number"
                      className="w-full bg-transparent px-4 py-3 text-sm text-white focus:outline-none"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-slate-300">Email Address</label>
                  <div className="relative">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter email address"
                      className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none transition-colors"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-slate-300">Password</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Lock className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#070d18] border border-slate-800 focus:border-blue-500 rounded-xl pl-10 pr-10 py-3 text-sm text-white focus:outline-none transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-500 hover:text-slate-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded bg-[#070d18] border-slate-700 text-blue-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
                  />
                  <span>Remember me</span>
                </label>
                <button
                  type="button"
                  onClick={() => setForgotPasswordMessage(true)}
                  className="text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                >
                  Forgot password?
                </button>
              </div>

              {/* Primary Login Button */}
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{formTab === 'login' ? 'Login' : 'Create Account'}</span>
              </button>
            </form>

            {/* Divider OR */}
            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-slate-800"></div>
              <span className="flex-shrink mx-4 text-xs text-slate-500 uppercase tracking-widest font-mono">OR</span>
              <div className="flex-grow border-t border-slate-800"></div>
            </div>

            {/* Continue with OTP Button */}
            <button
              type="button"
              onClick={() => {
                setOtpSent(false);
                setCurrentMode('otp_verification');
              }}
              className="w-full py-3 px-4 rounded-xl font-medium text-sm text-slate-200 bg-[#070d18] hover:bg-[#0c1626] border border-slate-800 hover:border-slate-700 transition-colors flex items-center justify-center gap-2.5 cursor-pointer"
            >
              <Smartphone className="w-4 h-4 text-blue-400" />
              <span>Continue with OTP</span>
            </button>

            {/* Quick pre-fill banner */}
            <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
              <span>Testing credentials?</span>
              <button
                type="button"
                onClick={() => handleDirectDemoLogin(targetRole)}
                className="text-blue-400 hover:text-blue-300 font-semibold cursor-pointer"
              >
                One-Click Test Login →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Scrolling animation on login page */}
      <div className="w-full border-t border-slate-800/80 bg-[#070d18]/80 backdrop-blur-md py-4 z-10">
        <NicheScrollingMarquee
          onSelectNiche={(niche) => {
            if (isClient) {
              setClientDesiredNiche(niche);
              handleMarqueeNicheClick(niche);
            } else {
              setCreatorPrimaryNiche(niche);
              handleDirectDemoLogin('creator', niche);
            }
          }}
          title={isClient ? "Explore Creator Niches" : "Specializations You Can Register Under"}
          subtitle="Click any vibrant category to preview creators"
          variant="login"
        />
      </div>
    </div>
  );
};
