/**
 * Geolocation Service
 * Handles getting user's geographic location using browser Geolocation API
 */

export const getGeolocation = () => {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            console.warn('Geolocation is not supported by this browser');
            resolve(null);
            return;
        }

        const options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const location = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: new Date().toISOString()
                };
                console.log('Geolocation obtained:', location);
                resolve(location);
            },
            (error) => {
                console.warn('Geolocation error:', error.message);
                // Don't reject - just return null if user denies permission
                resolve(null);
            },
            options
        );
    });
};

/**
 * Check if geolocation permission is granted
 */
export const checkGeolocationPermission = async () => {
    if (!navigator.permissions) {
        return 'unsupported';
    }

    try {
        const result = await navigator.permissions.query({ name: 'geolocation' });
        return result.state; // 'granted', 'denied', or 'prompt'
    } catch (error) {
        console.warn('Permission query failed:', error);
        return 'unknown';
    }
};
