/* =====================================================
   CODLY CLIENT ONBOARDING WIZARD
===================================================== */


/* =====================================================
   LOGIN
===================================================== */

function login() {

    const role =
        document.getElementById(
            "loginRole"
        ).value;

    const username =
        document.getElementById(
            "username"
        ).value.trim();

    const password =
        document.getElementById(
            "password"
        ).value.trim();

    const error =
        document.getElementById(
            "loginError"
        );


    error.innerText = "";


    if (role === "") {

        error.innerText =
            "Please select a role.";

        return;
    }


    if (username === "") {

        error.innerText =
            "Please enter username.";

        return;
    }


    if (password === "") {

        error.innerText =
            "Please enter password.";

        return;
    }


    localStorage.setItem(
        "loggedRole",
        role
    );

    localStorage.setItem(
        "loggedUsername",
        username
    );


    openApplication(role);
}


/* =====================================================
   OPEN APPLICATION
===================================================== */

function openApplication(role) {

    document
        .getElementById("loginPage")
        .classList.add("d-none");


    document
        .getElementById("appPage")
        .classList.remove("d-none");


    const username =
        localStorage.getItem(
            "loggedUsername"
        );


    let roleName = "";


    if (role === "client") {

        roleName = "Client";

    }

    else if (role === "sales") {

        roleName = "Sales Team";

    }

    else if (role === "manager") {

        roleName = "Project Manager";

    }

    else {

        roleName = "Super Admin";

    }


    document.getElementById(
        "userDisplay"
    ).innerText =
        username +
        " (" +
        roleName +
        ")";


    document
        .getElementById("entryMenu")
        .classList.add("d-none");


    document
        .getElementById("managerMenu")
        .classList.add("d-none");


    document
        .getElementById("adminMenu")
        .classList.add("d-none");


    if (
        role === "client" ||
        role === "sales"
    ) {

        document
            .getElementById("entryMenu")
            .classList.remove("d-none");


        showEnterInformation();

    }


    else if (
        role === "manager"
    ) {

        document
            .getElementById("managerMenu")
            .classList.remove("d-none");


        showAllClients();

    }


    else if (
        role === "admin"
    ) {

        document
            .getElementById("adminMenu")
            .classList.remove("d-none");


        showAdminDashboard();

    }

}


/* =====================================================
   LOGOUT
===================================================== */

function logout() {

    localStorage.removeItem(
        "loggedRole"
    );

    localStorage.removeItem(
        "loggedUsername"
    );


    document
        .getElementById("appPage")
        .classList.add("d-none");


    document
        .getElementById("loginPage")
        .classList.remove("d-none");

}


/* =====================================================
   HIDE ALL SECTIONS
===================================================== */

function hideAllSections() {

    const sections = [

        "informationSection",

        "mySummarySection",

        "allClientsSection",

        "managerSummarySection",

        "adminDashboardSection",

        "adminClientsSection",

        "adminFormSection",

        "usersSection"

    ];


    sections.forEach(
        function(id) {

            document
                .getElementById(id)
                .classList.add("d-none");

        }
    );

}


/* =====================================================
   ENTER INFORMATION
===================================================== */

function showEnterInformation() {

    hideAllSections();

    document
        .getElementById(
            "informationSection"
        )
        .classList.remove("d-none");


    loadClientInformation();

}


/* =====================================================
   MY SUMMARY
===================================================== */

function showMySummary() {

    hideAllSections();

    document
        .getElementById(
            "mySummarySection"
        )
        .classList.remove("d-none");


    displayMySummary();

}


/* =====================================================
   GET VALUE
===================================================== */

function getValue(id) {

    return document
        .getElementById(id)
        .value
        .trim();

}


/* =====================================================
   SET VALUE
===================================================== */

function setValue(id, value) {

    const element =
        document.getElementById(id);


    if (element) {

        element.value =
            value || "";

    }

}


/* =====================================================
   SAVE CLIENT FORM
===================================================== */

document
    .getElementById("clientForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const username =
                localStorage.getItem(
                    "loggedUsername"
                );


            const role =
                localStorage.getItem(
                    "loggedRole"
                );


            const client = {

                id:
                    Date.now(),

                createdBy:
                    username,

                createdRole:
                    role,

                clientName:
                    getValue("clientName"),

                companyName:
                    getValue("companyName"),

                email:
                    getValue("email"),

                phone:
                    getValue("phone"),

                businessType:
                    getValue("businessType"),

                location:
                    getValue("location"),

                brandName:
                    getValue("brandName"),

                brandDescription:
                    getValue("brandDescription"),

                primaryColor:
                    getValue("primaryColor"),

                logoAvailable:
                    getValue("logoAvailable"),

                projectName:
                    getValue("projectName"),

                projectDescription:
                    getValue(
                        "projectDescription"
                    ),

                websiteType:
                    getValue("websiteType"),

                targetAudience:
                    getValue(
                        "targetAudience"
                    ),

                requiredPages:
                    getValue(
                        "requiredPages"
                    ),

                domainName:
                    getValue("domainName"),

                domainAvailable:
                    getValue(
                        "domainAvailable"
                    ),

                hostingProvider:
                    getValue(
                        "hostingProvider"
                    ),

                hostingAvailable:
                    getValue(
                        "hostingAvailable"
                    ),

                competitors:
                    getValue("competitors"),

                competitorLikes:
                    getValue(
                        "competitorLikes"
                    ),

                contentAvailable:
                    getValue(
                        "contentAvailable"
                    ),

                contentDetails:
                    getValue(
                        "contentDetails"
                    ),

                facebook:
                    getValue("facebook"),

                instagram:
                    getValue("instagram"),

                linkedin:
                    getValue("linkedin"),

                keywords:
                    getValue("keywords"),

                targetLocation:
                    getValue(
                        "targetLocation"
                    ),

                additionalNotes:
                    getValue(
                        "additionalNotes"
                    ),

                savedDate:
                    new Date()
                    .toLocaleString()

            };


            let clients =
                JSON.parse(
                    localStorage.getItem(
                        "clients"
                    )
                ) || [];


            clients.push(client);


            localStorage.setItem(
                "clients",
                JSON.stringify(clients)
            );


            alert(
                "Client information saved successfully!"
            );


            showMySummary();

        }
    );


/* =====================================================
   LOAD CLIENT INFORMATION
===================================================== */

function loadClientInformation() {

    const role =
        localStorage.getItem(
            "loggedRole"
        );


    /*
       Sales Team starts with
       a blank form.
    */

    if (role === "sales") {

        return;

    }


    const username =
        localStorage.getItem(
            "loggedUsername"
        );


    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const client =
        clients.find(
            function(item) {

                return (
                    item.createdBy ===
                    username &&
                    item.createdRole ===
                    "client"
                );

            }
        );


    if (client) {

        fillForm(client);

    }

}


/* =====================================================
   FILL FORM
===================================================== */

function fillForm(client) {

    Object.keys(client)
        .forEach(
            function(key) {

                setValue(
                    key,
                    client[key]
                );

            }
        );

}


/* =====================================================
   DISPLAY MY SUMMARY
===================================================== */

function displayMySummary() {

    const username =
        localStorage.getItem(
            "loggedUsername"
        );


    const role =
        localStorage.getItem(
            "loggedRole"
        );


    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    let client = null;


    if (role === "client") {

        client =
            clients.find(
                function(item) {

                    return (
                        item.createdBy ===
                        username
                    );

                }
            );

    }


    else if (role === "sales") {

        const salesClients =
            clients.filter(
                function(item) {

                    return (
                        item.createdBy ===
                        username
                    );

                }
            );


        if (
            salesClients.length > 0
        ) {

            client =
                salesClients[
                    salesClients.length - 1
                ];

        }

    }


    const container =
        document.getElementById(
            "mySummary"
        );


    if (!client) {

        container.innerHTML = `

            <div class="alert alert-warning">

                No saved information found.

            </div>

        `;

        return;

    }


    container.innerHTML =
        createSummary(client);

}


/* =====================================================
   PROJECT MANAGER
===================================================== */

function showAllClients() {

    hideAllSections();


    document
        .getElementById(
            "allClientsSection"
        )
        .classList.remove("d-none");


    displayAllClients();

}


/* =====================================================
   DISPLAY CLIENTS
===================================================== */

function displayAllClients() {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const container =
        document.getElementById(
            "clientsContainer"
        );


    container.innerHTML = "";


    if (
        clients.length === 0
    ) {

        container.innerHTML = `

            <div class="alert alert-warning">

                No clients found.

            </div>

        `;

        return;

    }


    clients.forEach(
        function(client, index) {

            container.innerHTML += `

                <div class="client-card">

                    <div>

                        <h5>
                            ${safe(
                                client.clientName
                            )}
                        </h5>

                        <p>
                            <strong>
                                Company:
                            </strong>

                            ${safe(
                                client.companyName
                            )}
                        </p>

                        <p>
                            <strong>
                                Project:
                            </strong>

                            ${safe(
                                client.projectName
                            )}
                        </p>

                    </div>


                    <div class="client-actions">

                        <button
                            class="btn btn-primary"
                            onclick="
                                openManagerSummary(
                                    ${index}
                                )
                            ">

                            View Summary

                        </button>


                        <button
                            class="btn btn-danger"
                            onclick="
                                deleteClient(
                                    ${index}
                                )
                            ">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }
    );

}


/* =====================================================
   DELETE CLIENT
===================================================== */

function deleteClient(index) {

    let clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    if (!clients[index]) {

        return;

    }


    const name =
        clients[index].clientName;


    if (
        !confirm(
            "Delete " +
            name +
            "?"
        )
    ) {

        return;

    }


    clients.splice(
        index,
        1
    );


    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );


    displayAllClients();

}


/* =====================================================
   MANAGER SUMMARY
===================================================== */

function openManagerSummary(index) {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const client =
        clients[index];


    if (!client) {

        return;

    }


    hideAllSections();


    document
        .getElementById(
            "managerSummarySection"
        )
        .classList.remove("d-none");


    document.getElementById(
        "managerSummary"
    ).innerHTML =
        createSummary(client);

}


/* =====================================================
   SUMMARY
===================================================== */

function createSummary(client) {

    return `
                <div class="summary-print-area">

            <div class="summary-actions no-print">

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="printSummary(this)">

                    🖨️ Print

                </button>


                <button
                    type="button"
                    class="btn btn-success"
                    onclick="downloadSummary(this)">

                    ⬇️ Download

                </button>

            </div>

        <div class="summary-header">

            <h2>
                ${safe(client.clientName)}
            </h2>

            <p>
                <strong>
                    Company:
                </strong>

                ${safe(client.companyName)}
            </p>

            <p>
                <strong>
                    Project:
                </strong>

                ${safe(client.projectName)}
            </p>

        </div>


        ${summarySection(
            "1. Client Information",
            [
                ["Client Name", client.clientName],
                ["Company Name", client.companyName],
                ["Email", client.email],
                ["Phone", client.phone],
                ["Business Type", client.businessType],
                ["Location", client.location]
            ]
        )}


        ${summarySection(
            "2. Branding Information",
            [
                ["Brand Name", client.brandName],
                [
                    "Brand Description",
                    client.brandDescription
                ],
                [
                    "Primary Color",
                    client.primaryColor
                ],
                [
                    "Logo Available",
                    client.logoAvailable
                ]
            ]
        )}


        ${summarySection(
            "3. Website / Project Requirements",
            [
                ["Project Name", client.projectName],
                [
                    "Project Description",
                    client.projectDescription
                ],
                ["Website Type", client.websiteType],
                [
                    "Target Audience",
                    client.targetAudience
                ],
                [
                    "Required Pages",
                    client.requiredPages
                ]
            ]
        )}


        ${summarySection(
            "4. Domain & Hosting",
            [
                ["Domain Name", client.domainName],
                [
                    "Domain Available",
                    client.domainAvailable
                ],
                [
                    "Hosting Provider",
                    client.hostingProvider
                ],
                [
                    "Hosting Available",
                    client.hostingAvailable
                ]
            ]
        )}


        ${summarySection(
            "5. Competitor Analysis",
            [
                [
                    "Competitor Websites",
                    client.competitors
                ],
                [
                    "Competitor Likes",
                    client.competitorLikes
                ]
            ]
        )}


        ${summarySection(
            "6. Content Collection",
            [
                [
                    "Content Availability",
                    client.contentAvailable
                ],
                [
                    "Content Details",
                    client.contentDetails
                ]
            ]
        )}


        ${summarySection(
            "7. Social Media",
            [
                ["Facebook", client.facebook],
                ["Instagram", client.instagram],
                ["LinkedIn", client.linkedin]
            ]
        )}


        ${summarySection(
            "8. SEO Information",
            [
                ["Keywords", client.keywords],
                [
                    "Target Location",
                    client.targetLocation
                ]
            ]
        )}


        ${summarySection(
            "9. Additional Notes",
            [
                [
                    "Notes",
                    client.additionalNotes
                ]
            ]
        )}
         </div>
    `;

}

/* =====================================================
   PRINT / DOWNLOAD SUMMARY
===================================================== */

function getSummaryPrintArea(button) {

    return button.closest(".summary-print-area");

}


/* =====================================================
   PRINT SUMMARY
===================================================== */

function printSummary(button) {

    const summary =
        getSummaryPrintArea(button);

    if (!summary) {
        return;
    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=1000,height=800"
        );


    if (!printWindow) {

        alert(
            "Please allow pop-ups in your browser to print the summary."
        );

        return;

    }


    const styles =
        Array.from(
            document.querySelectorAll(
                "link[rel='stylesheet'], style"
            )
        )
        .map(function(element) {

            return element.outerHTML;

        })
        .join("");


    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Project Summary
            </title>

            ${styles}


            <style>

                body {

                    background: white !important;

                    padding: 25px;

                }


                .no-print {

                    display: none !important;

                }


                .summary-card,
                .summary-header {

                    box-shadow: none !important;

                    break-inside: avoid;

                }

            </style>

        </head>


        <body>

            ${summary.outerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();


    setTimeout(function() {

        printWindow.focus();

        printWindow.print();

        printWindow.close();

    }, 500);

}


/* =====================================================
   DOWNLOAD SUMMARY
===================================================== */

function downloadSummary(button) {

    const summary =
        getSummaryPrintArea(button);


    if (!summary) {
        return;
    }


    const clientName =
        summary
            .querySelector(
                ".summary-header h2"
            )
            ?.innerText
        || "Project";


    const cleanSummary =
        summary.cloneNode(true);


    const actions =
        cleanSummary.querySelector(
            ".no-print"
        );


    if (actions) {

        actions.remove();

    }


    const styles =
        Array.from(
            document.querySelectorAll(
                "link[rel='stylesheet']"
            )
        )
        .map(function(element) {

            return element.outerHTML;

        })
        .join("");


    const fileContent = `

<!DOCTYPE html>

<html>

<head>

    <meta charset="UTF-8">

    <title>
        Project Summary -
        ${safe(clientName)}
    </title>

    ${styles}


    <style>

        body {

            background: white;

            padding: 30px;

        }


        .summary-card,
        .summary-header {

            box-shadow: none !important;

        }

    </style>

</head>


<body>

    ${cleanSummary.outerHTML}

</body>

</html>

`;


    const blob =
        new Blob(
            [fileContent],
            {
                type:
                    "text/html;charset=utf-8"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    const safeName =
        clientName

            .replace(
                /[^a-z0-9]/gi,
                "_"
            )

            .replace(
                /_+/g,
                "_"
            )

            .replace(
                /^_|_$/g,
                ""
            );


    link.href = url;


    link.download =
        (safeName || "Project") +
        "_Project_Summary.html";


    document.body.appendChild(link);

    link.click();

    link.remove();


    URL.revokeObjectURL(url);

}
/* =====================================================
   SUMMARY SECTION
===================================================== */

function summarySection(
    title,
    data
) {

    let html = `

        <div class="summary-card">

            <h4>
                ${title}
            </h4>

    `;


    data.forEach(
        function(item) {

            const value =
                item[1] ||
                "Not provided";


            html += `

                <div class="summary-item">

                    <div class="summary-label">

                        ${safe(item[0])}

                    </div>


                    <div class="summary-value">

                        ${safe(value)}

                    </div>

                </div>

            `;

        }
    );


    html += `
        </div>
    `;


    return html;

}


/* =====================================================
   SUPER ADMIN DASHBOARD
===================================================== */

function showAdminDashboard() {

    hideAllSections();


    document
        .getElementById(
            "adminDashboardSection"
        )
        .classList.remove("d-none");


    updateAdminDashboard();

}


/* =====================================================
   UPDATE ADMIN DASHBOARD
===================================================== */

function updateAdminDashboard() {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    document.getElementById(
        "totalClients"
    ).innerText =
        clients.length;


    document.getElementById(
        "totalProjects"
    ).innerText =
        clients.filter(
            c => c.projectName
        ).length;


    document.getElementById(
        "salesEntries"
    ).innerText =
        clients.filter(
            c =>
                c.createdRole ===
                "sales"
        ).length;


    document.getElementById(
        "clientEntries"
    ).innerText =
        clients.filter(
            c =>
                c.createdRole ===
                "client"
        ).length;


    const recent =
        document.getElementById(
            "recentClients"
        );


    recent.innerHTML = "";


    clients
        .slice(-5)
        .reverse()
        .forEach(
            function(client) {

                recent.innerHTML += `

                    <div class="client-card">

                        <div>

                            <h5>
                                ${safe(
                                    client.clientName
                                )}
                            </h5>

                            <p>
                                ${safe(
                                    client.companyName
                                )}
                            </p>

                        </div>

                    </div>

                `;

            }
        );

}


/* =====================================================
   ADMIN ALL CLIENTS
===================================================== */

function showAdminClients() {

    hideAllSections();


    document
        .getElementById(
            "adminClientsSection"
        )
        .classList.remove("d-none");


    displayAdminClients();

}


/* =====================================================
   DISPLAY ADMIN CLIENTS
===================================================== */

function displayAdminClients(
    searchText = ""
) {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const container =
        document.getElementById(
            "adminClientsContainer"
        );


    container.innerHTML = "";


    const search =
        searchText
            .toLowerCase()
            .trim();


    const filtered =
        clients.filter(
            function(client) {

                return (

                    client.clientName
                        .toLowerCase()
                        .includes(search)

                    ||

                    client.companyName
                        .toLowerCase()
                        .includes(search)

                    ||

                    client.projectName
                        .toLowerCase()
                        .includes(search)

                );

            }
        );


    if (
        filtered.length === 0
    ) {

        container.innerHTML = `

            <div class="alert alert-warning">

                No clients found.

            </div>

        `;

        return;

    }


    filtered.forEach(
        function(client) {

            const originalIndex =
                clients.indexOf(
                    client
                );


            container.innerHTML += `

                <div class="client-card">

                    <div>

                        <h5>
                            ${safe(
                                client.clientName
                            )}
                        </h5>

                        <p>
                            <strong>
                                Company:
                            </strong>

                            ${safe(
                                client.companyName
                            )}
                        </p>

                        <p>
                            <strong>
                                Project:
                            </strong>

                            ${safe(
                                client.projectName
                            )}
                        </p>

                    </div>


                    <div class="client-actions">

                        <button
                            class="btn btn-primary"
                            onclick="
                                adminViewClient(
                                    ${originalIndex}
                                )
                            ">

                            View Summary

                        </button>


                        <button
                            class="btn btn-warning"
                            onclick="
                                editClient(
                                    ${originalIndex}
                                )
                            ">

                            Edit

                        </button>


                        <button
                            class="btn btn-danger"
                            onclick="
                                deleteAdminClient(
                                    ${originalIndex}
                                )
                            ">

                            Delete

                        </button>

                    </div>

                </div>

            `;

        }
    );

}


/* =====================================================
   ADMIN SEARCH
===================================================== */

function searchAdminClients() {

    const search =
        document.getElementById(
            "searchClient"
        ).value;


    displayAdminClients(
        search
    );

}


/* =====================================================
   ADMIN VIEW
===================================================== */

function adminViewClient(index) {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const client =
        clients[index];


    if (!client) {

        return;

    }


    hideAllSections();


    document
        .getElementById(
            "managerSummarySection"
        )
        .classList.remove("d-none");


    document.getElementById(
        "managerSummary"
    ).innerHTML = `

        <button
            class="btn btn-secondary mb-3"
            onclick="showAdminClients()">

            ← Back to Clients

        </button>

        ${createSummary(client)}

    `;

}


/* =====================================================
   ADMIN DELETE
===================================================== */

function deleteAdminClient(index) {

    let clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const client =
        clients[index];


    if (!client) {

        return;

    }


    if (
        !confirm(
            "Delete " +
            client.clientName +
            "?"
        )
    ) {

        return;

    }


    clients.splice(
        index,
        1
    );


    localStorage.setItem(
        "clients",
        JSON.stringify(clients)
    );


    displayAdminClients();


    updateAdminDashboard();

}


/* =====================================================
   ADMIN ADD CLIENT
===================================================== */

function showAdminAddClient() {

    hideAllSections();


    document
        .getElementById(
            "adminFormSection"
        )
        .classList.remove("d-none");


    document.getElementById(
        "adminFormTitle"
    ).innerText =
        "Add Client";


    document
        .getElementById(
            "adminClientForm"
        )
        .reset();


    document.getElementById(
        "editClientId"
    ).value = "";

}


/* =====================================================
   ADMIN SAVE / EDIT
===================================================== */

document
    .getElementById(
        "adminClientForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            let clients =
                JSON.parse(
                    localStorage.getItem(
                        "clients"
                    )
                ) || [];


            const editId =
                document.getElementById(
                    "editClientId"
                ).value;


            const client = {

                id:
                    editId
                        ? Number(editId)
                        : Date.now(),

                createdBy:
                    "Super Admin",

                createdRole:
                    "admin",

                clientName:
                    document.getElementById(
                        "adminClientName"
                    ).value.trim(),

                companyName:
                    document.getElementById(
                        "adminCompanyName"
                    ).value.trim(),

                email:
                    document.getElementById(
                        "adminEmail"
                    ).value.trim(),

                phone:
                    document.getElementById(
                        "adminPhone"
                    ).value.trim(),

                projectName:
                    document.getElementById(
                        "adminProjectName"
                    ).value.trim(),

                businessType:
                    document.getElementById(
                        "adminBusinessType"
                    ).value.trim(),

                projectDescription:
                    document.getElementById(
                        "adminProjectDescription"
                    ).value.trim(),

                savedDate:
                    new Date()
                    .toLocaleString()

            };


            if (editId) {

                const index =
                    clients.findIndex(
                        c =>
                            c.id ===
                            Number(editId)
                    );


                if (index !== -1) {

                    /*
                       Keep all existing information
                       when editing.
                    */

                    clients[index] = {

                        ...clients[index],

                        ...client

                    };

                }

            }

            else {

                clients.push(
                    client
                );

            }


            localStorage.setItem(
                "clients",
                JSON.stringify(clients)
            );


            alert(
                editId
                    ? "Client updated successfully!"
                    : "Client added successfully!"
            );


            showAdminClients();

        }
    );


/* =====================================================
   EDIT CLIENT
===================================================== */

function editClient(index) {

    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const client =
        clients[index];


    if (!client) {

        return;

    }


    hideAllSections();


    document
        .getElementById(
            "adminFormSection"
        )
        .classList.remove("d-none");


    document.getElementById(
        "adminFormTitle"
    ).innerText =
        "Edit Client";


    document.getElementById(
        "editClientId"
    ).value =
        client.id;


    document.getElementById(
        "adminClientName"
    ).value =
        client.clientName || "";


    document.getElementById(
        "adminCompanyName"
    ).value =
        client.companyName || "";


    document.getElementById(
        "adminEmail"
    ).value =
        client.email || "";


    document.getElementById(
        "adminPhone"
    ).value =
        client.phone || "";


    document.getElementById(
        "adminProjectName"
    ).value =
        client.projectName || "";


    document.getElementById(
        "adminBusinessType"
    ).value =
        client.businessType || "";


    document.getElementById(
        "adminProjectDescription"
    ).value =
        client.projectDescription || "";

}


/* =====================================================
   USERS / ROLES
===================================================== */

function showUsers() {

    hideAllSections();


    document
        .getElementById(
            "usersSection"
        )
        .classList.remove("d-none");


    const clients =
        JSON.parse(
            localStorage.getItem(
                "clients"
            )
        ) || [];


    const table =
        document.getElementById(
            "usersTable"
        );


    table.innerHTML = `

        <tr>

            <td>
                Super Admin
            </td>

            <td>
                👑 Super Admin
            </td>

        </tr>

    `;


    clients.forEach(
        function(client) {

            let role = "Client";


            if (
                client.createdRole ===
                "sales"
            ) {

                role =
                    "Sales Team";

            }


            table.innerHTML += `

                <tr>

                    <td>
                        ${safe(
                            client.createdBy
                        )}
                    </td>

                    <td>
                        ${role}
                    </td>

                </tr>

            `;

        }
    );

}


/* =====================================================
   CLEAR FORM
===================================================== */

function clearForm() {

    if (
        confirm(
            "Clear the form?"
        )
    ) {

        document
            .getElementById(
                "clientForm"
            )
            .reset();

    }

}


/* =====================================================
   SECURITY - ESCAPE HTML
===================================================== */

function safe(value) {

    if (
        value === undefined ||
        value === null
    ) {

        return "";

    }


    return String(value)

        .replace(
            /&/g,
            "&amp;"
        )

        .replace(
            /</g,
            "&lt;"
        )

        .replace(
            />/g,
            "&gt;"
        )

        .replace(
            /"/g,
            "&quot;"
        )

        .replace(
            /'/g,
            "&#039;"
        );

}


/* =====================================================
   PAGE LOAD
===================================================== */

window.addEventListener(
    "load",
    function() {

        const role =
            localStorage.getItem(
                "loggedRole"
            );


        if (role) {

            openApplication(role);

        }

    }
);