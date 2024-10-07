import { createUser } from "@/actions/user";
import { headers } from "next/headers";
import { Webhook } from "svix";

export async function POST(req) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if(!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get Headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers then error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get Body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // New Svix instance
    const webh = new Webhook(WEBHOOK_SECRET);

    let evt;

    try {
        evt = webh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        });
    } catch(err)
    {
        console.log("Error while verifying webhook", err)
        return new Response("Error while verifying webhook", { status: 400 });
    }

    const eventType = evt.type;

    console.log("event received")
    if (eventType === "user.created") {
        
        const { id, first_name, last_name, email_addresses, image_url, username } = evt.data;
        const email_address = email_addresses?.[0].email_address;
        
        try {
            await createUser({ id, first_name, last_name, email_address, image_url, username });
        } catch {
            throw new Error("Failed to save new user in db");
        }
    }    

    console.log(`Received ${eventType} event`)
    
    return Response.json({ message: "received" });
}

export async function GET() {
    return Response.json({ message: "Hello World" });
}