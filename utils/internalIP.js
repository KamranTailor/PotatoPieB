import os from 'os';

export function getInternalIP() {
    const networkInterfaces = os.networkInterfaces();

    for (const interfaces of Object.values(networkInterfaces)) {
        for (const iface of interfaces) {
            if (iface.family === 'IPv4' && !iface.internal) {
                return iface.address;
            }
        }
    }

    return null; // Return null if no suitable interface found
}
