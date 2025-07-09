declare global {
  interface Window {
    gtag: (
      command: 'config' | 'event' | 'js' | 'set',
      targetId: string | Date,
      config?: {
        page_title?: string;
        page_location?: string;
        content_group1?: string;
        content_group2?: string;
        event_category?: string;
        event_label?: string;
        value?: number;
        custom_parameter_1?: string;
        custom_parameter_2?: string;
        [key: string]: string | number | boolean | undefined;
      }
    ) => void;
    dataLayer: Array<Record<string, unknown>>;
  }
}

export {};