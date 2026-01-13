import { analytics } from '../config/firebaseConfig';
import { logEvent } from 'firebase/analytics';
// DISABLED: Location permission feature temporarily disabled
// import { getGeolocation } from './geolocationService';

/**
 * Initialize analytics tracking
 * Call this when the app loads
 */
export const initializeAnalytics = async () => {
    if (!analytics) {
        console.warn('Analytics not initialized - check Firebase config');
        return;
    }

    try {
        // DISABLED: Location tracking temporarily disabled
        // Get user's location
        // const location = await getGeolocation();

        // Log app initialization with location
        logEvent(analytics, 'app_initialized', {
            // DISABLED: Location data temporarily disabled
            // ...(location && {
            //     latitude: location.latitude,
            //     longitude: location.longitude,
            //     location_accuracy: location.accuracy
            // }),
            timestamp: new Date().toISOString()
        });

        console.log('Analytics initialized (location tracking disabled)');
    } catch (error) {
        console.error('Analytics initialization error:', error);
    }
};

/**
 * Track page views with location data
 */
export const trackPageView = async (pageName, additionalParams = {}) => {
    if (!analytics) return;

    try {
        // DISABLED: Location tracking temporarily disabled
        // const location = await getGeolocation();

        logEvent(analytics, 'page_view', {
            page_name: pageName,
            page_location: window.location.href,
            page_path: window.location.pathname,
            // DISABLED: Location data temporarily disabled
            // ...(location && {
            //     latitude: location.latitude,
            //     longitude: location.longitude
            // }),
            ...additionalParams,
            timestamp: new Date().toISOString()
        });

        console.log(`Page view tracked: ${pageName}`);
    } catch (error) {
        console.error('Page view tracking error:', error);
    }
};

/**
 * Track custom events with location data
 */
export const trackEvent = async (eventName, params = {}) => {
    if (!analytics) return;

    try {
        // DISABLED: Location tracking temporarily disabled
        // const location = await getGeolocation();

        logEvent(analytics, eventName, {
            // DISABLED: Location data temporarily disabled
            // ...(location && {
            //     latitude: location.latitude,
            //     longitude: location.longitude
            // }),
            ...params,
            timestamp: new Date().toISOString()
        });

        console.log(`Event tracked: ${eventName}`, params);
    } catch (error) {
        console.error('Event tracking error:', error);
    }
};

/**
 * Predefined event trackers for common actions
 */
export const trackAddToCart = async (product) => {
    await trackEvent('add_to_cart', {
        item_id: product.id,
        item_name: product.title,
        item_category: product.category,
        price: product.price,
        quantity: product.quantity || 1
    });
};

export const trackRemoveFromCart = async (product) => {
    await trackEvent('remove_from_cart', {
        item_id: product.id,
        item_name: product.title,
        price: product.price
    });
};

export const trackBeginCheckout = async (cartItems, total) => {
    await trackEvent('begin_checkout', {
        value: total,
        currency: 'USD',
        items: cartItems.map(item => ({
            item_id: item.id,
            item_name: item.title,
            price: item.price,
            quantity: item.quantity
        }))
    });
};

export const trackPurchase = async (orderData) => {
    await trackEvent('purchase', {
        transaction_id: `ORDER_${Date.now()}`,
        value: orderData.total,
        currency: 'USD',
        customer_name: orderData.customer.name,
        customer_email: orderData.customer.email,
        items: orderData.items.map(item => ({
            item_id: item.id,
            item_name: item.title,
            price: item.price,
            quantity: item.quantity
        }))
    });
};

export const trackSearch = async (searchQuery) => {
    await trackEvent('search', {
        search_term: searchQuery
    });
};

export const trackContactFormSubmit = async (formData) => {
    await trackEvent('contact_form_submit', {
        from_name: formData.name,
        from_email: formData.email
    });
};

