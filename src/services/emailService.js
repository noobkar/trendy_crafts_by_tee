import emailjs from '@emailjs/browser';

// Keys provided by user
const SERVICE_ID = 'service_szj61vl';
const TEMPLATE_ID = 'template_f9r5rob';
const PUBLIC_KEY = 's-W91BBpwbABvkRv6';

export const initEmail = () => {
    emailjs.init({
        publicKey: PUBLIC_KEY,
    });
};

export const sendContactEmail = async (formData) => {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: 'zaveenm@gmail.com',
            reply_to: formData.email
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        return { success: true, response };
    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, error };
    }
};

export const sendOrderEmail = async (orderData) => {
    try {
        const { items, total, customer } = orderData;

        // Format items list for email
        const itemsHtml = items.map(item =>
            `- ${item.title} (x${item.quantity}): $${(item.price * item.quantity).toFixed(2)}`
        ).join('\n');

        const templateParams = {
            from_name: customer.name,
            from_email: customer.email,
            to_email: 'zaveenm@gmail.com', // Primary recipient
            message: `
New Order Received!

ORDER DETAILS:
----------------
${itemsHtml}
----------------
TOTAL: $${total}

CUSTOMER INFO:
Name: ${customer.name}
Email: ${customer.email}
Address: ${customer.address}, ${customer.city}
Instructions: ${customer.instructions || 'None'}
            `,
            reply_to: customer.email
        };

        const response = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams);
        return { success: true, response };
    } catch (error) {
        console.error('Email Error:', error);
        return { success: false, error };
    }
};
