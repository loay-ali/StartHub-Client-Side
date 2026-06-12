interface ToggleSwitchProps {
  enabled: boolean;
}

export default function ToggleSwitch({ enabled }: ToggleSwitchProps) {
  return (
    <div
      className={`relative h-6 w-11 rounded-full transition-colors duration-300 ${
        enabled ? "bg-primary" : "bg-slate-300"
      }`}
    >
      <div
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all duration-300 ${
          enabled ? "left-[22px]" : "left-0.5"
        }`}
      />
    </div>
  );
}
