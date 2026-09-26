let goal = {
    name: "Two-Wheeler",
    target: 120000,
    months: 12,
    saved: 0
};


// LOAD SAVED DATA

const savedData =
    localStorage.getItem("savingPot");

if (savedData) {

    goal = JSON.parse(savedData);

}


// FORMAT MONEY

function money(amount) {

    return "₹" +
        Math.round(amount)
        .toLocaleString("en-IN");

}


// SAVE DATA

function saveData() {

    localStorage.setItem(
        "savingPot",
        JSON.stringify(goal)
    );

}


// MONTHLY AMOUNT

function calculateMonthly() {

    let remaining =
        goal.target - goal.saved;

    if (remaining <= 0) {

        return 0;

    }

    return Math.ceil(
        remaining / goal.months
    );

}


// UPDATE WEBSITE

function updateDashboard() {

    const remaining =
        Math.max(
            0,
            goal.target - goal.saved
        );


    const percentage =
        goal.target === 0
        ? 0
        : (goal.saved / goal.target) * 100;


    const monthly =
        calculateMonthly();


    document.getElementById(
        "goalTitle"
    ).innerText = goal.name;


    document.getElementById(
        "savedAmount"
    ).innerText =
        money(goal.saved);


    document.getElementById(
        "remainingAmount"
    ).innerText =
        money(remaining);


    document.getElementById(
        "monthlyAmount"
    ).innerText =
        money(monthly);


    document.getElementById(
        "targetAmount"
    ).innerText =
        "Target " + money(goal.target);


    document.getElementById(
        "percentage"
    ).innerText =
        Math.round(percentage)
        + "% complete";


    document.getElementById(
        "progressBar"
    ).style.width =
        Math.min(percentage,100)
        + "%";


    document.getElementById(
        "summary"
    ).innerText =
        money(goal.saved)
        + " saved";


    createMonthlyPlan();

    saveData();

}


// CREATE MONTHLY PLAN

function createMonthlyPlan() {

    const container =
        document.getElementById(
            "monthlyList"
        );


    container.innerHTML = "";


    let remaining =
        goal.target - goal.saved;


    let monthly =
        Math.ceil(
            remaining / goal.months
        );


    for (
        let i = 1;
        i <= goal.months;
        i++
    ) {

        let amount;

        if (i === goal.months) {

            amount = remaining;

        } else {

            amount =
                Math.min(
                    monthly,
                    remaining
                );

        }


        if (amount < 0) {

            amount = 0;

        }


        const row =
            document.createElement(
                "div"
            );


        row.className =
            "month-row";


        row.innerHTML = `

            <div class="month-name">
                Month ${i}
            </div>

            <div class="month-bar">

                <div
                    class="month-progress"
                    style="width:
                    ${goal.saved >= amount ? 100 : 20}%"
                ></div>

            </div>

            <div class="month-amount">
                ${money(amount)}
            </div>

        `;


        container.appendChild(row);


        remaining -= amount;


        if (remaining <= 0) {

            break;

        }

    }

}


// ADD SAVING

function addSaving() {

    const input =
        document.getElementById(
            "saveInput"
        );


    const amount =
        Number(input.value);


    if (
        !amount ||
        amount <= 0
    ) {

        alert(
            "Please enter a valid amount."
        );

        return;

    }


    const remaining =
        goal.target -
        goal.saved;


    const actualAmount =
        Math.min(
            amount,
            remaining
        );


    goal.saved += actualAmount;


    input.value = "";


    updateDashboard();


    if (goal.saved >= goal.target) {

        alert(
            "🎉 Congratulations! Your saving goal is complete!"
        );

    }

}


// OPEN MODAL

function openModal() {

    document
        .getElementById("goalModal")
        .classList.add("show");


    document.getElementById(
        "goalName"
    ).value = goal.name;


    document.getElementById(
        "goalTarget"
    ).value = goal.target;


    document.getElementById(
        "goalMonths"
    ).value = goal.months;

}


// CLOSE MODAL

function closeModal() {

    document
        .getElementById("goalModal")
        .classList.remove("show");

}


// CREATE GOAL

function createGoal() {

    const name =
        document.getElementById(
            "goalName"
        ).value;


    const target =
        Number(
            document.getElementById(
                "goalTarget"
            ).value
        );


    const months =
        Number(
            document.getElementById(
                "goalMonths"
            ).value
        );


    if (
        !name ||
        !target ||
        target <= 0
    ) {

        alert(
            "Please enter valid details."
        );

        return;

    }


    goal.name = name;

    goal.target = target;

    goal.months = months;


    /*
        Existing saved money remains.
        But it can never be more than
        the new target.
    */

    if (goal.saved > target) {

        goal.saved = target;

    }


    closeModal();


    updateDashboard();


    document
        .getElementById("dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// SCROLL

function scrollToDashboard() {

    document
        .getElementById("dashboard")
        .scrollIntoView({
            behavior: "smooth"
        });

}


// RESET APP

function resetApp() {

    const confirmReset =
        confirm(
            "Are you sure you want to reset Saving Pot?"
        );


    if (!confirmReset) {

        return;

    }


    goal = {

        name: "Two-Wheeler",

        target: 120000,

        months: 12,

        saved: 0

    };


    localStorage.removeItem(
        "savingPot"
    );


    updateDashboard();

}


// INITIAL LOAD

updateDashboard();