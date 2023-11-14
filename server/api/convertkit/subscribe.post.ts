export default defineEventHandler(async (event) => {

    const apiKey : string | undefined = process.env.CONVERTKIT_API_KEY;
    const body = await readBody(event);

    if (!body.email || !body.formId || !apiKey) {
        throw createError({
            statusCode: 400,
            statusMessage: "Bad Request: Missing email, formId or apiKey"
        });
    }

    const subscription = await $fetch(`https://api.convertkit.com/v3/forms/${body.formId}/subscribe`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            api_key: apiKey,
            email: body.email
        })
    });

    return sendRedirect(event,"/newsletter/thank-you?success=true");
})