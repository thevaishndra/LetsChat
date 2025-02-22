import { THEMES } from "../constants";
import { useThemeStore } from "../store/useThemeStore";

const SettingsPage = () => {
  const { theme, setTheme } = useThemeStore();

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 p-4 pt-20">
      <div className="w-full max-w-5xl bg-white p-6 sm:p-12 rounded-xl shadow-lg space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">Theme</h1>
          <p className="text-gray-500">
            Choose a theme for your chat interface
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
          {/* Looping through themes and creates a button*/}
          {THEMES.map((t) => (
            <button
              key={t}
              className={`
                group flex flex-col items-center gap-1.5 p-2 rounded-lg transition-colors
                ${theme === t ? "bg-base-200" : "hover:bg-base-200/50"}
              `}
              onClick={() => setTheme(t)}
            >

              {/* Displaying theme colors in 4 column grid*/}
              <div
                className="relative h-10 w-full rounded-md overflow-hidden"
                data-theme={t}>
                <div className="absolute inset-0 grid grid-cols-4 gap-px p-1">
                  <div className="rounded bg-primary"></div>
                  <div className="rounded bg-secondary"></div>
                  <div className="rounded bg-accent"></div>
                  <div className="rounded bg-neutral"></div>
                </div>
              </div>

              {/* theme names */}
              <span className="text-[11px] font-medium truncate w-full text-center">
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </span>
            </button>
          ))}
        </div>

      </div>
    </div>
  );
};
export default SettingsPage;
