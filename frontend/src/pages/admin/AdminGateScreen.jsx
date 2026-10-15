import React, { useState } from "react";
import { useUser, useClerk, SignIn } from "@clerk/react";
import { dark } from "@clerk/themes";
import {
  ShieldAlert,
  ShieldCheck,
  KeyRound,
  Lock,
  LogOut,
  Sparkles,
  ArrowRight,
  BookOpen,
  Briefcase,
  Inbox,
  Crown,
  Eye,
  EyeOff,
  User,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import { useClerkConfig } from "../../context/ClerkSafeProvider";
import { verifyAdminGate } from "../../services/authApi";
import "./AdminGateScreen.css";

export default function AdminGateScreen({ onClearanceSuccess }) {
  const { isClerkConfigured } = useClerkConfig();

  // If Clerk key is missing or placeholder
  if (!isClerkConfigured) {
    return <ClerkSetupNotice />;
  }

  return <ClerkGateInner onClearanceSuccess={onClearanceSuccess} />;
}

function ClerkGateInner({ onClearanceSuccess }) {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="admin-gate-overlay">
        <div className="flex flex-col items-center gap-3 text-zinc-400">
          <RefreshCw size={24} className="animate-spin text-yellow-400" />
          <span className="text-sm">Verifying Clerk authentication...</span>
        </div>
      </div>
    );
  }

  if (!isSignedIn) {
    return <ClerkLoginGate />;
  }

  return <PasscodeGate onClearanceSuccess={onClearanceSuccess} />;
}

// -------------------------------------------------------------
// NOTICE IF CLERK IS NOT CONFIGURED YET
// -------------------------------------------------------------
function ClerkSetupNotice() {
  return (
    <div className="admin-gate-overlay">
      <div className="admin-gate-card">
        <div className="admin-gate-icon-wrapper warning">
          <ShieldAlert size={36} className="text-yellow-400" />
        </div>
        <div className="admin-gate-badge">STEP 1: CLERK SETUP</div>
        <h2 className="admin-gate-title">Connect Clerk Authentication</h2>
        <p className="admin-gate-desc">
          To activate two-factor administrative clearance, add your Clerk
          publishable key in your frontend environment file.
        </p>

        <div className="admin-gate-code-box">
          <code>
            # frontend/.env
            <br />
            VITE_CLERK_PUBLISHABLE_KEY=pk_test_...
          </code>
        </div>

        <a
          href="https://dashboard.clerk.com"
          target="_blank"
          rel="noopener noreferrer"
          className="admin-gate-btn-primary"
        >
          <span>Get Key from Clerk Dashboard</span>
          <ArrowRight size={16} />
        </a>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// GATE 1: CLERK SIGN-IN
// -------------------------------------------------------------
function ClerkLoginGate() {
  return (
    <div className="admin-gate-overlay">
      <div className="admin-gate-container">
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 mb-3">
            <Lock size={12} /> Gate 1 of 2: Identity Verification
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Third Eye Admin Portal
          </h1>
          <p className="text-sm text-zinc-400 mt-1 max-w-sm mx-auto">
            Please sign in to verify your identity before entering security clearance.
          </p>
        </div>

        <div className="clerk-embed-wrapper">
          <SignIn
            routing="hash"
            appearance={{
              baseTheme: dark,
              variables: {
                colorPrimary: "#facc15",
                colorBackground: "#12141d",
                colorInputBackground: "#090a10",
                colorInputText: "#ffffff",
                colorText: "#ffffff",
                colorTextSecondary: "#9ca3af",
                colorNeutral: "#ffffff",
              },
              elements: {
                card: "!bg-[#12141d] !border !border-[#272a38] !shadow-2xl !rounded-2xl",
                headerTitle: "!text-white !font-bold !text-xl",
                headerSubtitle: "!text-zinc-400 !text-sm",
                socialButtonsBlockButton:
                  "!border !border-[#272a38] !bg-[#181b26] hover:!bg-[#202433] !text-white",
                socialButtonsBlockButtonText: "!text-white !font-medium",
                dividerLine: "!bg-[#272a38]",
                dividerText: "!text-zinc-400 !text-xs",
                formFieldLabel: "!text-zinc-200 !font-medium",
                formFieldInput:
                  "!bg-[#090a10] !border !border-[#272a38] !text-white focus:!border-[#facc15]",
                formButtonPrimary:
                  "!bg-[#facc15] hover:!bg-[#fde047] !text-[#0c0d14] !font-bold shadow-lg shadow-yellow-400/20",
                footerActionText: "!text-zinc-400",
                footerActionLink: "!text-[#facc15] hover:!text-[#fde047] !font-semibold",
                identityPreviewText: "!text-white",
                identityPreviewEditButton: "!text-[#facc15]",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

// -------------------------------------------------------------
// GATE 2: PASSCODE CLEARANCE (4 PASSWORDS SYSTEM)
// -------------------------------------------------------------
function PasscodeGate({ onClearanceSuccess }) {
  const { user } = useUser();
  const { signOut } = useClerk();

  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Determine user identifier: name, username, or email (e.g. jaat@tecc)
  const clerkIdentifier =
    user?.username ||
    user?.fullName ||
    user?.firstName ||
    user?.primaryEmailAddress?.emailAddress ||
    "Admin";

  const handleVerify = async (e) => {
    e.preventDefault();
    if (!password.trim()) {
      setErrorMessage("Please enter your admin security password.");
      return;
    }

    setIsLoading(true);
    setErrorMessage("");

    try {
      const result = await verifyAdminGate({
        clerkName: clerkIdentifier,
        clerkId: user?.id,
        clerkEmail: user?.primaryEmailAddress?.emailAddress || "",
        password: password.trim(),
      });

      onClearanceSuccess(result);
    } catch (err) {
      setErrorMessage(err.message || "Invalid clearance password.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="admin-gate-overlay">
      <div className="admin-gate-card">
        {/* Glowing Lock Icon */}
        <div className="admin-gate-icon-wrapper success">
          <KeyRound size={32} className="text-yellow-400" />
        </div>

        <div className="admin-gate-badge">GATE 2 OF 2: SECURITY CLEARANCE</div>
        <h2 className="admin-gate-title">Enter Admin Passcode</h2>

        {/* User Identity Banner */}
        <div className="admin-identity-pill">
          <div className="admin-identity-avatar">
            {user?.imageUrl ? (
              <img src={user.imageUrl} alt={clerkIdentifier} />
            ) : (
              <User size={16} />
            )}
          </div>
          <div className="admin-identity-info">
            <span className="text-xs text-zinc-400">Authenticated Identity</span>
            <span className="text-sm font-semibold text-white">
              {clerkIdentifier}
            </span>
          </div>
        </div>

        {/* Role Levels Legend */}
        <div className="role-levels-grid">
          <div className="role-level-chip">
            <Crown size={12} className="text-amber-400" />
            <span>Global Admin</span>
          </div>
          <div className="role-level-chip">
            <BookOpen size={12} className="text-blue-400" />
            <span>Courses Admin</span>
          </div>
          <div className="role-level-chip">
            <Briefcase size={12} className="text-emerald-400" />
            <span>Jobs Admin</span>
          </div>
          <div className="role-level-chip">
            <Inbox size={12} className="text-purple-400" />
            <span>Queries Admin</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleVerify} className="admin-gate-form">
          <div className="input-group">
            <label>Security Passcode</label>
            <div className="password-input-wrapper">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password for your role..."
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errorMessage) setErrorMessage("");
                }}
                disabled={isLoading}
                autoFocus
              />
              <button
                type="button"
                className="toggle-password-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="admin-gate-error">
              <AlertCircle size={16} />
              <span>{errorMessage}</span>
            </div>
          )}

          <button
            type="submit"
            className="admin-gate-btn-primary"
            disabled={isLoading}
          >
            {isLoading ? (
              <span>Verifying Clearance...</span>
            ) : (
              <>
                <span>Unlock Control Panel</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>
        </form>

        {/* Sign Out Option */}
        <div className="admin-gate-footer">
          <button
            type="button"
            onClick={() => signOut()}
            className="admin-switch-account-btn"
          >
            <LogOut size={14} />
            <span>Switch Clerk Account</span>
          </button>
        </div>
      </div>
    </div>
  );
}
