import ToggleSwitch from "../../ui/ToggleSwitch";

export default function NotificationsSection() {
  return (
    <div>
      <h2 className="text-2xl font-semibold">Notifications</h2>

      <p className="mt-2 text-text-secondary">
        Manage notification preferences.
      </p>

      <div className="mt-8 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email Notifications</h4>

            <p className="text-sm text-text-secondary">
              Receive important updates via email.
            </p>
          </div>

          <ToggleSwitch enabled />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Company Updates</h4>

            <p className="text-sm text-text-secondary">
              Get notified about company activity.
            </p>
          </div>

          <ToggleSwitch enabled />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Marketing Emails</h4>

            <p className="text-sm text-text-secondary">
              Receive product announcements.
            </p>
          </div>

          <ToggleSwitch enabled={false} />
        </div>
      </div>
    </div>
  );
}
