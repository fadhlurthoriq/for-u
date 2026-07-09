const SceneManager = {

    current: "loading",

    change(sceneName){

        this.current = sceneName;

        console.log("Scene :", sceneName);

    }

};