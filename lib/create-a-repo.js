import { enterRepositoryInformations } from "./inquirer.js";
import { createOctoApp } from "./github-credentials.js"

export const createRemoteRepository = async (token) =>{
    const octo = await createOctoApp(token)
    let response;
    try {
        const repoInformation = await enterRepositoryInformations();
        console.log(repoInformation);
        response = await octo.rest.repos.createForAuthenticatedUser({
            name: repoInformation.name,
            description: repoInformation.description,
            private: repoInformation.visibility === "private",
        });
    } catch (error) {
        throw new Error("Repository Creation Error", "Repository cannot be created");
    }
    return response
}