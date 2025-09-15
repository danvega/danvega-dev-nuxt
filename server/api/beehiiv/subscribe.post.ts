export default defineEventHandler(async (event) => {

    const apiKey : string | undefined = process.env['BEEHIIV_API_KEY'];
    const body = await readBody(event);
    const referrerURL = getHeader(event, 'referer') || 'Unknown';

    if (!body.email || !body.campaign || !apiKey) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request: Missing email, formId or apiKey"
        });
    }

    const subscription = await $fetch("https://api.beehiiv.com/v2/publications/pub_b21fb1c9-5862-44d5-abab-2f980817e3d5/subscriptions", {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email: body.email,
            reactivate_existing: false,
            send_welcome_email: false,
            referring_site: referrerURL,
            utm_source: "danvega.dev",
            utm_campaign: body.campaign,
            utm_medium: "organic"
        })
    });

    return sendRedirect(event,"/newsletter/thank-you?success=true");
})