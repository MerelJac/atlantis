export const hello = (body) => {
    return body?.name ? `Hello ${body.name}` : 'Hello World!'
};