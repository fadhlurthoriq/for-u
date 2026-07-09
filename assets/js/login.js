const Login = {}
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");
const loginButton = document.getElementById("login-btn");
let usernameDebounce;
let passwordDebounce;

Login.init = function () {

    usernameInput.addEventListener("input",()=>{
    
        Character.resetIdle();
    
        Character.changeEmotion("thinking");
    
        Character.showTyping();
    
        clearTimeout(usernameDebounce);
    
        usernameDebounce=setTimeout(()=>{
            Character.hideTyping();
    
            const value=usernameInput.value.trim();
    
            if(value===CONFIG.login.username){
    
                Character.say({
    
                    emotion:"love",
    
                    message:"Iyaaa ❤️ itu nama kamu."
    
                });
    
            }
    
            else{
    
                Character.say({
    
                    emotion:"angry",
    
                    message:"Heii kamu siapaa, itu bukan nama cewe akuu!!"
    
                });
    
            }
    
        },2000);
    
    });
    
    passwordInput.addEventListener("input",()=>{

        Character.resetIdle();

        Character.changeEmotion("thinking");

        Character.showTyping();

        clearTimeout(passwordDebounce);

        passwordDebounce = setTimeout(()=>{

            Character.hideTyping();

            const value = passwordInput.value.trim();

            if(value === CONFIG.login.password){

                Character.say({

                    emotion:"love",

                    message:"Yeyyy ❤️"

                });

            }

            else{

                Character.say({

                    emotion:"cry",

                    message:"Kamuu lupa yaah 🥺"

                });

            }

        },2000);

    });
    
    usernameInput.addEventListener("focus",()=>{
    
        Character.resetIdle();
    
        Character.say({
    
            emotion:"happy",
    
            message:"Aku tunggu nama kamu yaa ❤️"
    
        });
    
    });
    
    passwordInput.addEventListener("focus",()=>{
    
        Character.resetIdle();
    
        Character.say({
    
            emotion:"thinking",
    
            message:"Sekarang tanggal pertama kita bertemu 🤍"
    
        });
    
    });
    
    usernameInput.addEventListener("blur",()=>{
    
        Character.say({
    
            emotion:"happy",
    
            message:"...."
    
        });
    
    });
    
    passwordInput.addEventListener("blur",()=>{
    
        Character.say({
    
            emotion:"happy",
    
            message:"...."
    
        });
    
    });

    loginButton.addEventListener("click", () => {

        login();

    });

    document.addEventListener("keydown",(e)=>{

        if(e.key==="Enter"){

            login();

        }

    });

}

function login(){

    const username=usernameInput.value.trim();

    const password=passwordInput.value.trim();

    if(username!==CONFIG.login.username){

        Character.say({

            emotion:"thinking",

            message:"Nama kamu masih belum cocok."

        });

        usernameInput.focus();

        return;

    }

    if(password!==CONFIG.login.password){

        Character.say({

            emotion:"sad",

            message:"Tanggalnya masih belum benar."

        });

        passwordInput.focus();

        return;

    }

    Character.say({

        emotion:"love",

        message:"Yeyyy ❤️ Selamat datang."

    });

    Character.say({

        emotion:"excited",

        message:"Yeyyy ❤️ Selamat datang."

    });

    setTimeout(()=>{

        Scene.transition("welcome-scene");

    },1500);
    }