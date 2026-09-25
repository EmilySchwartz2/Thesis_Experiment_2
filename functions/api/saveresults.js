// Main handler function for Cloudflare Pages
export async function onRequestPost(context) {
    const { request, env } = context;
    try{
        console.log("env");
        console.log(env);

                console.log("request")

        console.log(request)
        let data;

        data = await request.json();
        console.log("data");

        // Send data via SMTP2GO email
        console.log(data);
        
        const timestamp = new Date().toLocaleString();
        const jsonData = JSON.stringify(data, null, 2);
        const base64Data = btoa(jsonData);
        
        const smtp2goResponse = await fetch('https://api.smtp2go.com/v3/email/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Smtp2go-Api-Key': "api-4B181720CA91472797F4F7EF75632418",
            },
            body: JSON.stringify({
                to: ["emilyschwartz@cmail.carleton.ca"],
                sender: "noreply@dtksol.com",
                subject: 'Thesis Experiment Results',
                text_body: `New submission at ${timestamp}`,
                attachments: [
                    {
                        filename: 'results.json',
                        fileblob: base64Data,
                        mimetype: 'application/json',
                    }
                ],
            }),
        });

        const info = await smtp2goResponse.json();
        console.log(info);


        return new Response(JSON.stringify({
            status: 2000,
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Content-Type': 'application/json',
            }
        });

    }
    catch (error){
        console.log("error")
        console.log(error);
    }


       return new Response(JSON.stringify({
            status: 5000,
            
        }), {
            status: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Content-Type': 'application/json',
            }
        });

  
}