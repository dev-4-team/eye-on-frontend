export const ProtestsCheerCount = async () => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest`);
    const data = await response.json();
    return data;
};

export const ProtestCheerCount = async (protestId: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_DEV_URL}/api/cheer/protest/${protestId}`);
    const data = await response.json();
    return data;
};
