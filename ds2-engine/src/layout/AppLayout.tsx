import type { ReactNode } from "react";
import { colors, spacing } from "../theme";
import { Header, type View } from "./Header";

export function AppLayout({
  view,
  setView,
  onExport,
  onImport,
  onReset,
  onShortcuts,
  fileInputRef,
  profiles,
  buildTemplateId,
  setBuildTemplateId,
  buildTemplates,
  children,
}: {
  view: View;
  setView: (v: View) => void;
  onExport: () => void;
  onImport: (file: File) => void;
  onReset: () => void;
  onShortcuts: () => void;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  profiles?: {
    profiles: { id: string; name: string }[];
    activeProfileId: string | null;
    createProfile: (name?: string) => string;
    switchProfile: (id: string) => void;
    deleteProfile: (id: string) => void;
    renameProfile: (id: string, name: string) => void;
  };
  buildTemplateId?: string;
  setBuildTemplateId?: (id: string) => void;
  buildTemplates?: { id: string; name: string }[];
  children: ReactNode;
}) {
  return (
    <div
      style={{
        background: colors.bg,
        minHeight: "100vh",
        width: "100%",
        color: colors.lightText,
        position: "relative",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header
        view={view}
        setView={setView}
        onExport={onExport}
        onImport={onImport}
        onReset={onReset}
        onShortcuts={onShortcuts}
        fileInputRef={fileInputRef}
        profiles={profiles}
        buildTemplateId={buildTemplateId}
        setBuildTemplateId={setBuildTemplateId}
        buildTemplates={buildTemplates}
      />
      <div
        className="app-content"
        style={{
          padding: spacing[6],
          paddingBottom: spacing[10],
          flex: 1,
          width: "100%",
          maxWidth: 1400,
          margin: "0 auto",
        }}
      >
        {children}
      </div>
    </div>
  );
}
