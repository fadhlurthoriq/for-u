const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");

const LOGIN_DATA = {

    username: "neysilla dwi carollina",

    password: "27112025"

};

usernameInput.addEventListener("input",()=>{

    const value=usernameInput.value.trim();

    if(value===""){

        Character.talk({

            emotion:"hopeful",

            message:"...."

        });

        return;

    }

    if(value===LOGIN_DATA.username){

        Character.talk({

            emotion:"love",

            message:"Iyaaa ❤️ itu nama kamu."

        });

    }

    else{

        Character.talk({

            emotion:"thinking",

            message:"Hmm... kayaknya belum benar deh."

        });

    }

});

passwordInput.addEventListener("input",()=>{

    const value=passwordInput.value.trim();

    if(value===""){

        Character.talk({

            emotion:"thinking",

            message:"Aku tunggu tanggalnya yaa."

        });

        return;

    }

    if(value===LOGIN_DATA.password){

        Character.talk({

            emotion:"happy",

            message:"Yeyyy! Benar ❤️"

        });

    }

    else{

        Character.talk({

            emotion:"angry",

            message:"Masih belum tepat 🥺"

        });

    }

});

usernameInput.addEventListener("focus",()=>{

    Character.talk({

        emotion:"happy",

        message:"Aku tunggu nama kamu yaa ❤️"

    });

});

passwordInput.addEventListener("focus",()=>{

    Character.talk({

        emotion:"thinking",

        message:"Sekarang tanggal pertama kita bertemu 🤍"

    });

});

function login(){

    const username=usernameInput.value.trim();

    const password=passwordInput.value.trim();

    if(username!==LOGIN_DATA.username){

        Character.talk({

            emotion:"thinking",

            message:"Nama kamu masih belum cocok."

        });

        usernameInput.focus();

        return;

    }

    if(password!==LOGIN_DATA.password){

        Character.talk({

            emotion:"sad",

            message:"Tanggalnya masih belum benar."

        });

        passwordInput.focus();

        return;

    }

    Character.talk({

        emotion:"love",

        message:"Yeyyy ❤️ Selamat datang."

    });

    // nanti Phase 5C
}

loginButton.addEventListener("click", login);

document.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        login();

    }

});