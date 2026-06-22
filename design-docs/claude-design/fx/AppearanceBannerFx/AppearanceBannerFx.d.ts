export interface AppearanceBannerFxProps {
  kind?: 'elite' | 'boss';
  name?: string;
  duration?: number;
  onDone?: () => void;
}
export declare function AppearanceBannerFx(props: AppearanceBannerFxProps): JSX.Element;
