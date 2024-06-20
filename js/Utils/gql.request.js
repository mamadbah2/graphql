export async function makeGraphQLRequest(query) {
    const jwtToken = localStorage.getItem('jwtToken');

    try {
        const response = await fetch('https://learn.zone01dakar.sn/api/graphql-engine/v1/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${jwtToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la requête GraphQL');
        }

        const responseData = await response.json();
        return responseData;
    } catch (error) {
        console.error(error);
        return null;
    }
}
 