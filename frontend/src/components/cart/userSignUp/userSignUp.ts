const divCreate = document.getElementById("userDivCreate") as HTMLDivElement;
const divSignIn = document.getElementById("userDivSignIn") as HTMLDivElement;
const signInMessage = document.getElementById(
    "signInMessage"
) as HTMLParagraphElement;
const createMessage = document.getElementById(
    "createMessage"
) as HTMLParagraphElement;

const formCreate = document.getElementById("formCreate") as HTMLFormElement;
const formSignIn = document.getElementById("formSignIn") as HTMLFormElement;

const userDisplay = document.getElementById(
    "userDisplay"
) as HTMLParagraphElement;

const URL_BASE = "https://nology-group-project-production.up.railway.app/";

type User = {
    email: string;
    name: string;
};

let currentUser;

formCreate.addEventListener("submit", (event) => {
    event.preventDefault(); // prevent form from reloading the page

    const formData = new FormData(formCreate);
    const formValues: Record<string, string> = {};

    // Convert FormData into a plain object
    formData.forEach((value, key) => {
        formValues[key] = value.toString();
    });

    // Now you can manipulate the data however you like
    console.log("Form values:", formValues);

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
            divCreate.style.backgroundColor = "#d1f5e0";
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
            console.log(currentUser);
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
