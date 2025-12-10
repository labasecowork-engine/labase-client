declare global {
  interface Window {
    VisaNet: {
      checkout: {
        configure: (config: {
          sessiontoken: string;
          channel: string;
          merchantid: string;
          purchasenumber: string;
          amount: string;
          expirationminutes: string;
          timeouturl: string;
          merchantlogo: string;
          action: string;
          complete: (params: any) => void;
        }) => void;
        open: () => void;
      };
    };
  }
}

export {};
