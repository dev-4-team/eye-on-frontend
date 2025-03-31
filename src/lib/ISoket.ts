export interface ISocket {
    connect: () => Promise<boolean>;
    disconnect: () => void;
    join: (topic: string, callback: (message: unknown) => void) => void;
    leave: (topic: string) => void;
    sendMessage: (topic: string, message?: string | undefined) => void;
}
