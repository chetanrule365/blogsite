import dynamic from "next/dynamic";

const IonHeader = dynamic(
    async () => {
        const mod = await import("@ionic/react");
        return mod.IonHeader;
    },
    { ssr: false },
);
const IonToolbar = dynamic(
    async () => {
        const mod = await import("@ionic/react");
        return mod.IonHeader;
    },
    { ssr: false },
);

export { IonHeader, IonToolbar };
