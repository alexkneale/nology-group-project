import div from "./userSignUp.html?raw";

// injecting the div into cart.html
const rootDiv = document.querySelector("#userUI-root");
if (rootDiv) rootDiv.innerHTML = div;

const divCreate = document.getElementById("user-create") as HTMLDivElement;
const divSignIn = document.getElementById("user-signin") as HTMLDivElement;
const signInMessage = document.getElementById(
    "signin-message"
) as HTMLParagraphElement;
const createMessage = document.getElementById(
    "create-message"
) as HTMLParagraphElement;

const formCreate = document.getElementById("form-create") as HTMLFormElement;
const formSignIn = document.getElementById("form-signin") as HTMLFormElement;

const userDisplay = document.getElementById(
    "user-display"
) as HTMLHeadingElement;

const URL_BASE = "https://nology-group-project-production.up.railway.app/";

type User = {
    email: string;
    name: string;
};

export let currentUser: User;

formCreate.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(formCreate);
    const formValues: Record<string, string> = {};

    // Convert FormData into a plain object
    formData.forEach((value, key) => {
        formValues[key] = value.toString();
    });

    //
    const body = {
        name: formValues["name"],
        email: formValues["email"],
    };

    fetch(`${URL_BASE}api/users`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
    })
        .then(async (response) => {
            if (!response.ok) {
                // Server responded but with an error code
                throw new Error(`${response.status}`);
            }
            divCreate.style.backgroundColor = "#e6f9e6";
            createMessage!.innerText = `User with email ${body.email} registered successfully and signed in.`;

            //currentUser = body;
            // get full user object, including newly created ID
            const responseUser = await fetch(
                `${URL_BASE}api/users/byEmail/${body.email}`
            );
            currentUser = await responseUser.json();
            userDisplay.innerText = `Signed in as Name: ${currentUser.name}, Email: ${currentUser.email}`;

            return response.json(); // or whatever the API returns
        })
        .catch((error) => {
            // email already in use case
            if (error == "Error: 500") {
                console.log("we got 500");

                divCreate.style.backgroundColor = "#fbe4e4";
                createMessage!.innerText = `User with email ${body.email} already registered. Sign in instead`;
            }
            // catch 500 errors for user already created --> display to user
        });
});

// signing in

const signInHandling = async (event: SubmitEvent): Promise<void> => {
    event.preventDefault();

    const formData = new FormData(formSignIn);
    const email = formData.get("email") as string;

    try {
        const response = await fetch(`${URL_BASE}api/users/byEmail/${email}`);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const result = await response.json();
        console.log("Signed in user:", result);
        if (result.name == (formData.get("name") as string)) {
            // success
            divSignIn.style.backgroundColor = "#e6f9e6";
            signInMessage.innerText = `Welcome back, ${result.name}!`;
            currentUser = result;
            userDisplay.innerText = `Signed in as Name: ${currentUser.name}, Email: ${currentUser.email}`;
        } else {
            // wrong name
            divSignIn.style.backgroundColor = "#fbe4e4";
            signInMessage.innerText = `Incorrect name for email ${email}. Please insert correct name.`;
        }
    } catch (error: any) {
        console.error(error.message);

        // email not registered
        divSignIn.style.backgroundColor = "#fbe4e4";
        signInMessage.innerText = `No account found for ${email}. Please create one.`;
    }
};

formSignIn.addEventListener("submit", signInHandling);
