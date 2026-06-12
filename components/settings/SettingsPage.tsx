"use client";

import { useState } from "react";

import SettingsSidebar from "./SettingsSidebar";
import ProfileSection from "./sections/ProfileSection";
import SecuritySection from "./sections/SecuritySection";
import NotificationsSection from "./sections/NotificationsSection";
import PreferencesSection from "./sections/PreferencesSection";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile");

  const renderContent = () => {
    switch (activeTab) {
      case "security":
        return <SecuritySection />;

      case "notifications":
        return <NotificationsSection />;

      case "preferences":
        return <PreferencesSection />;

      default:
        return <ProfileSection />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="mb-8 overflow-hidden rounded-3xl border border-border bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-8">
        <span className="rounded-full bg-primary px-3 py-1 text-sm font-medium text-white">
          Settings
        </span>

        <h1 className="mt-5 text-4xl font-bold tracking-tight text-text-primary">
          Manage Your Workspace
        </h1>

        <p className="mt-3 max-w-2xl text-base leading-7 text-text-secondary">
          Configure your profile, security preferences, notifications, and
          account settings all in one place.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <SettingsSidebar activeTab={activeTab} onChange={setActiveTab} />

        <div className="rounded-3xl border border-border bg-surface p-8 shadow-sm">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}
