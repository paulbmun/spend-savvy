import axios from "axios";
import { env } from "../../env.mjs";

const apiKey = process.env.OPENAI_API_KEY;
console.log('apiKey', apiKey);

export default function BlogPage() {
    

    const handleClick = async () => {
        try {
            const response = await axios('https://api.openai.com/v1/models', {
                headers: {
                    Authorization: "Bearer " + apiKey
                }
            });
            // const data = await response.json();
            console.log(response.data);
            return response;
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div>
            <h1>Blog Page</h1>
            <button onClick={handleClick}>Click me</button>
        </div>
    )
}